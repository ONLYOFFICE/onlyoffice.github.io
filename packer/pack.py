#!/usr/bin/env python
"""
Plugin Packer - Utility for packaging plugins with configurable exclusions
"""

import os
import shutil
import json
import time
from pathlib import Path
from fnmatch import fnmatch
import argparse
import zipfile


class PluginPacker:
    """Main class for packing plugins with configurable exclusion patterns"""
    
    DEFAULT_EXCLUDES = ['deploy/*', 'node_modules/*', '.dev/*']
    MAX_RETRIES = 3
    RETRY_DELAY = 1
    
    def __init__(self, old_mode=False):
        self.old_mode = old_mode
        self.content_dir = "sdkjs-plugins/content/"
        self.artifacts_dir = "artifacts"

    def parse_arguments(self):
        """Parse command line arguments"""
        parser = argparse.ArgumentParser(description='Pack plugins')
        parser.add_argument(
            '--old-mode', 
            action='store_true', 
            help='The old way: put the result in the root of each plugin\'s folder.'
        )
        return parser.parse_args()

    def safe_rename(self, src, dst, max_retries=MAX_RETRIES, delay=RETRY_DELAY):
        """Safely rename file with retry logic for locked files"""
        for attempt in range(max_retries):
            try:
                Path(src).rename(dst)
                return True
            except PermissionError:
                if attempt < max_retries - 1:
                    print(f"  File busy, retrying in {delay} second(s)...")
                    time.sleep(delay)
                else:
                    print(f"  Failed to rename after {max_retries} attempts")
                    return False
        return False

    def delete_dir(self, path, max_retries=MAX_RETRIES, delay=RETRY_DELAY):
        """Safely delete directory with retry logic"""
        if not os.path.exists(path):
            return True
            
        for attempt in range(max_retries):
            try:
                shutil.rmtree(path)
                return True
            except PermissionError:
                if attempt < max_retries - 1:
                    print(f"Attempt {attempt + 1}: File in use... {path}")
                    time.sleep(delay)
                else:
                    print(f"Failed to delete {path}")
                    return False
        return False

    def get_plugin_excludes(self, plugin_path):
        """Get exclusion patterns for plugin from config.json"""
        plugin_config_path = os.path.join(plugin_path, ".dev", "config.json")
        excludes = self.DEFAULT_EXCLUDES.copy()
        
        if os.path.exists(plugin_config_path):
            try:
                with open(plugin_config_path, 'r', encoding='utf-8') as f:
                    config = json.load(f)
                    excludes = config.get("excludes", excludes)
                    print(f"[{os.path.basename(plugin_path)}] Loaded exclude patterns: {excludes}")
            except (json.JSONDecodeError, Exception) as e:
                print(f"[{os.path.basename(plugin_path)}] Error reading config: {e}")
        
        return excludes

    def should_exclude(self, path, base_dir, excludes):
        """Check if path should be excluded based on patterns"""
        if not excludes:
            return False
            
        # Convert path to relative format
        if os.path.isabs(path):
            relative_path = os.path.relpath(path, base_dir)
        else:
            relative_path = path
        
        # Normalize path separators
        relative_path = relative_path.replace('\\', '/')
        
        # Check all exclusion patterns
        for pattern in excludes:
            pattern = pattern.replace('\\', '/')
            if (fnmatch(relative_path, pattern) or 
                fnmatch(relative_path + '/', pattern + '/')):
                return True
        
        return False

    def copy_filtered_files(self, source_dir, dest_dir, excludes):
        """Copy files with exclusion patterns applied"""
        for root, dirs, files in os.walk(source_dir):
            # Filter directories during traversal
            dirs[:] = [d for d in dirs if not self.should_exclude(
                os.path.join(root, d), source_dir, excludes)]
            
            for file in files:
                source_file = os.path.join(root, file)
                relative_path = os.path.relpath(source_file, source_dir)
                
                if not self.should_exclude(relative_path, source_dir, excludes):
                    dest_file = os.path.join(dest_dir, relative_path)
                    os.makedirs(os.path.dirname(dest_file), exist_ok=True)
                    shutil.copy2(source_file, dest_file)

    def copy_dir(self, src, dst, excludes=None):
        """Copy directory with optional exclusion patterns"""
        if os.path.exists(dst):
            self.delete_dir(dst)
        
        if excludes:
            self.copy_filtered_files(src, dst, excludes)
        else:
            shutil.copytree(src, dst)

    def archive_folder(self, source_pattern, zip_path, excludes=None):
        """Create zip archive with exclusion support"""
        if excludes is None:
            excludes = []
            
        source_dir = source_pattern.rstrip('/*')
        os.makedirs(os.path.dirname(zip_path), exist_ok=True)
        
        with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
            for root, dirs, files in os.walk(source_dir):
                if excludes:
                    dirs[:] = [d for d in dirs if not self.should_exclude(
                        os.path.join(root, d), source_dir, excludes)]
                
                for file in files:
                    file_path = os.path.join(root, file)
                    relative_path = os.path.relpath(file_path, source_dir)

                    if excludes and self.should_exclude(relative_path, source_dir, excludes):
                        continue
                    
                    arcname = file if root == source_dir else relative_path
                    zipf.write(file_path, arcname)

    def move_file(self, src, dst):
        """Move file with retry logic"""
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        
        for attempt in range(3):
            try:
                shutil.move(src, dst)
                break
            except PermissionError:
                if attempt < 2:
                    time.sleep(0.5)
                else:
                    raise

    def create_plugin_archive(self, source_dir, plugin_name, output_dir, excludes=None):
        """Create .plugin archive from source directory"""
        temp_dir = os.path.join(output_dir, f"temp_{plugin_name}")
        os.makedirs(temp_dir, exist_ok=True)
        
        try:
            # Copy filtered files
            self.copy_filtered_files(source_dir, temp_dir, excludes or [])
            
            # Check if any files remain
            if not any(os.scandir(temp_dir)):
                print(f"[{plugin_name}] No files to pack after filtering")
                return False
            
            # Create and rename archive
            zip_file = os.path.join(output_dir, plugin_name)
            zip_path = shutil.make_archive(zip_file, 'zip', temp_dir)
            plugin_file_path = Path(zip_path).with_suffix(".plugin")
            
            if self.safe_rename(zip_path, plugin_file_path):
                print(f"✅ Created: {plugin_name}")
                return True
            else:
                print(f"❌ Failed to create: {plugin_name}")
                return False
                
        except Exception as e:
            print(f"[{plugin_name}] Error: {e}")
            return False
        finally:
            self.delete_dir(temp_dir)

    def pack_plugin_new_mode(self, plugin_path, plugin_name):
        """Pack plugin in new mode (artifacts directory)"""
        excludes = self.get_plugin_excludes(plugin_path)
        return self.create_plugin_archive(plugin_path, plugin_name, self.artifacts_dir, excludes)

    def pack_plugin_old_mode(self, plugin_path, plugin_name):
        """Pack plugin in old mode (plugin's deploy directory)"""
        excludes = self.get_plugin_excludes(plugin_path)
        destination_path = os.path.join(plugin_path, "deploy")
        temp_src_path = os.path.join(destination_path, plugin_name)
        
        # Clean up old deploy folder
        if os.path.exists(destination_path):
            self.delete_dir(destination_path)
        
        if excludes:
            os.makedirs(destination_path, exist_ok=True)
            self.copy_filtered_files(plugin_path, temp_src_path, excludes)
            
            if not any(os.scandir(temp_src_path)):
                print(f"[{plugin_name}] No files to pack after filtering")
                self.delete_dir(destination_path)
                return False
        else:
            self.copy_dir(plugin_path, temp_src_path)
        
        # Create archive
        zip_file_path = os.path.join(destination_path, f"{plugin_name}.zip")
        source_pattern = f"{temp_src_path}/*" if excludes else temp_src_path
        self.archive_folder(source_pattern, zip_file_path, excludes)
        
        # Rename to .plugin
        plugin_file_path = os.path.join(destination_path, f"{plugin_name}.plugin")
        self.move_file(zip_file_path, plugin_file_path)
        
        # Cleanup
        if os.path.exists(temp_src_path):
            self.delete_dir(temp_src_path)
        
        print(f"✅ Processed plugin: {plugin_name}")
        return True

    def pack_plugins(self):
        """Main packing method"""
        if not os.path.exists(self.content_dir):
            print(f"Content directory {self.content_dir} does not exist")
            return
        
        os.makedirs(self.artifacts_dir, exist_ok=True)
        
        for plugin_name in os.listdir(self.content_dir):
            plugin_path = os.path.join(self.content_dir, plugin_name)
            
            if not os.path.isdir(plugin_path):
                continue
            
            if self.old_mode:
                self.pack_plugin_old_mode(plugin_path, plugin_name)
            else:
                self.pack_plugin_new_mode(plugin_path, plugin_name)

    def run(self):
        """Run the plugin packer"""
        args = self.parse_arguments()
        self.old_mode = args.old_mode
        self.pack_plugins()


def main():
    """Main entry point"""
    packer = PluginPacker()
    packer.run()


if __name__ == "__main__":
    main()