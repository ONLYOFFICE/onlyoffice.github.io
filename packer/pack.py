#!/usr/bin/env python
"""
Plugin Packer - Utility for packaging plugins with configurable exclusions
"""

import os
import shutil
import json
import time
import re
from pathlib import Path
from fnmatch import fnmatch
import argparse


class PluginPacker:
    """Main class for packing plugins with configurable exclusion patterns"""
    
    DEFAULT_EXCLUDES = ['deploy/*', 'node_modules/*', '.dev/*']
    MAX_RETRIES = 3
    RETRY_DELAY = 1
    OLD_PATH_PATTERN = r'https://onlyoffice\.github\.io/sdkjs-plugins/v1/[\w\-\./\*]*'
    NEW_PATH = './../v1/'
    
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

    def replace_html_paths(self, file_path):
        """Replace paths in HTML files before packing"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = re.sub(self.OLD_PATH_PATTERN, lambda match: self.NEW_PATH + match.group(0).split('/v1/')[1], content)
            
            # If changes were made, write back to file
            if new_content != content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                return True
            return False
                
        except Exception as e:
            print(f"  Error processing HTML file {file_path}: {e}")
            return False

    def process_html_files(self, directory):
        """Find and process all HTML files in directory"""
        html_files_processed = 0
        for root, dirs, files in os.walk(directory):
            for file in files:
                if file.lower().endswith('.html'):
                    file_path = os.path.join(root, file)
                    if self.replace_html_paths(file_path):
                        html_files_processed += 1
        return html_files_processed

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

        excludes_set = set(self.DEFAULT_EXCLUDES)
        
        if os.path.exists(plugin_config_path):
            try:
                with open(plugin_config_path, 'r', encoding='utf-8') as f:
                    config = json.load(f)
                    custom_excludes = config.get("excludes", [])
                    excludes_set.update(custom_excludes)
            except (json.JSONDecodeError, Exception) as e:
                print(f"[{os.path.basename(plugin_path)}] Error reading config: {e}")
    
        return list(excludes_set)

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

    def create_plugin_archive(self, source_dir, plugin_name, output_dir, excludes):
        """Create .plugin archive from source directory"""
        temp_dir = os.path.join(output_dir, f"temp_{plugin_name}")
        os.makedirs(temp_dir, exist_ok=True)
        
        try:
            # Copy filtered files to temp directory
            self.copy_filtered_files(source_dir, temp_dir, excludes or [])
            
            # Check if any files remain
            if not any(os.scandir(temp_dir)):
                print(f"[{plugin_name}] No files to pack after filtering")
                return False
            
            # Process HTML files in temp directory (before archiving)
            self.process_html_files(temp_dir)

            
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

        # Clean up old deploy folder
        if os.path.exists(destination_path):
            self.delete_dir(destination_path)

        return self.create_plugin_archive(plugin_path, plugin_name, destination_path, excludes)

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