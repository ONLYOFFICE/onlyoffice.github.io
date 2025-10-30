#!/usr/bin/env python

import os
import shutil
import time
import zipfile
import json
from fnmatch import fnmatch

def get_plugin_excludes(plugin_path):
    plugin_config_path = os.path.join(plugin_path, ".dev", "config.json")
    excludes = []
    
    if os.path.exists(plugin_config_path):
        try:
            with open(plugin_config_path, 'r', encoding='utf-8') as f:
                config = json.load(f)
                excludes = config.get("excludes", [])
                print(f"[{os.path.basename(plugin_path)}] Loaded exclude patterns: {excludes}")
        except (json.JSONDecodeError, Exception) as e:
            print(f"[{os.path.basename(plugin_path)}] Error reading config: {e}")
    
    return excludes

def should_exclude(path, base_dir, excludes):
    """Check if a path should be excluded based on patterns"""
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
        # Normalize pattern
        pattern = pattern.replace('\\', '/')
    
        # Check pattern match
        if fnmatch(relative_path, pattern) or fnmatch(relative_path + '/', pattern + '/'):
            return True
  
    return False

def delete_dir(path, max_retries=3, delay=1):
  if not os.path.exists(path):
    return
      
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

def copy_dir(src, dst, excludes=None):
    if os.path.exists(dst):
        delete_dir(dst)
    
    if excludes:
        copy_filtered_files(src, dst, excludes)
    else:
        shutil.copytree(src, dst)

def copy_filtered_files(source_dir, dest_dir, excludes):
    """Copy files from source_dir to dest_dir, excluding specified patterns"""
    for root, dirs, files in os.walk(source_dir):
        # Filter directories
        dirs[:] = [d for d in dirs if not should_exclude(os.path.join(root, d), source_dir, excludes)]
        
        for file in files:
            source_file = os.path.join(root, file)
            relative_path = os.path.relpath(source_file, source_dir)
            
            if not should_exclude(relative_path, source_dir, excludes):
                dest_file = os.path.join(dest_dir, relative_path)
                os.makedirs(os.path.dirname(dest_file), exist_ok=True)
                shutil.copy2(source_file, dest_file)

def archive_folder(source_pattern, zip_path, excludes=None):
    source_dir = source_pattern.rstrip('/*')
    os.makedirs(os.path.dirname(zip_path), exist_ok=True)
    
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(source_dir):
            if excludes:
                dirs[:] = [d for d in dirs if not should_exclude(os.path.join(root, d), source_dir, excludes)]
            
            for file in files:
                file_path = os.path.join(root, file)
                relative_path = os.path.relpath(file_path, source_dir)

                if excludes and should_exclude(relative_path, source_dir, excludes):
                    continue
                
                if root == source_dir:
                    arcname = file
                else:
                    arcname = os.path.relpath(file_path, source_dir)
                
                zipf.write(file_path, arcname)

def move_file(src, dst):
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    
    # Attempt to move the file
    for attempt in range(3):
        try:
            shutil.move(src, dst)
            break
        except PermissionError:
            if attempt < 2:
                time.sleep(0.5)
            else:
                raise

def pack_plugins():
    content_dir = "../sdkjs-plugins/content/"
    
    if not os.path.exists(content_dir):
        print(f"Directory {content_dir} does not exist")
        return

    for plugin_name in os.listdir(content_dir):
        plugin_path = os.path.join(content_dir, plugin_name)
        
        if not os.path.isdir(plugin_path):
            continue

        excludes = get_plugin_excludes(plugin_path)
            
        destination_path = os.path.join(plugin_path, "deploy")
        temp_src_path = os.path.join(destination_path, plugin_name)

        # Remove old deploy folder
        if os.path.exists(destination_path):
            delete_dir(destination_path)

        copy_dir(plugin_path, temp_src_path, excludes)
        
        if not os.path.exists(temp_src_path) or not any(os.scandir(temp_src_path)):
            print(f"[{plugin_name}] No files to pack after filtering")
            if os.path.exists(destination_path):
                delete_dir(destination_path)
            continue
        
        zip_file_path = os.path.join(destination_path, f"{plugin_name}.zip")
        archive_folder(temp_src_path + "/*", zip_file_path, excludes)
        
        # Rename to .plugin
        plugin_file_path = os.path.join(destination_path, f"{plugin_name}.plugin")
        move_file(zip_file_path, plugin_file_path)
        
        # Remove temp folder
        delete_dir(temp_src_path)
        
        print(f"Processed plugin: {plugin_name}")

if __name__ == "__main__":
    pack_plugins()