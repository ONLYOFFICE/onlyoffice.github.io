#!/usr/bin/env python
import os
import shutil
import json
import time
from pathlib import Path
from fnmatch import fnmatch

def parse_arguments():
  parser = argparse.ArgumentParser(description='Pack plugins')
  parser.add_argument('--old-mode', action='store_true', 
                      help='The old way: put the result in the root of each plugin\'s folder.')
  return parser.parse_args()

def safe_rename(src, dst, max_retries=3, delay=1):
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

def safe_rmtree(path, max_retries=3, delay=1):
  if not os.path.exists(path):
    return
      
  for attempt in range(max_retries):
    try:
      shutil.rmtree(path)
      return True
    except PermissionError:
      if attempt < max_retries - 1:
        print(f"  Directory busy, retrying in {delay} second(s)...")
        time.sleep(delay)
      else:
        print(f"  Failed to remove directory after {max_retries} attempts: {path}")
        return False
  return False

def pack_plugins():
  content_dir = "sdkjs-plugins/content/"
  
  if not os.path.exists(content_dir):
    print(f"Content directory {content_dir} does not exist")
    return
  
  artifacts_dir = f"artifacts"
  os.makedirs(artifacts_dir, exist_ok=True)
  
  for plugin_name in os.listdir(content_dir):
    plugin_path = os.path.join(content_dir, plugin_name)

    # Load exclusion configuration for this specific plugin
    plugin_config_path = os.path.join(plugin_path, ".dev", "config.json")
    excludes = []

    if os.path.exists(plugin_config_path):
      try:
        with open(plugin_config_path, 'r') as f:
          config = json.load(f)
          excludes = config.get("excludes", [])
          print(f"[{plugin_name}] Loaded exclude patterns: {excludes}")
      except json.JSONDecodeError as e:
        print(f"[{plugin_name}] Error parsing config.json: {e}")
        continue
        
      # Create temporary directory for filtered files
      temp_dir = os.path.join(artifacts_dir, f"temp_{plugin_name}")
      os.makedirs(temp_dir, exist_ok=True)

      try:
        # Copy only files that match the plugin's configuration
        copy_filtered_files(plugin_path, temp_dir, excludes)
        
        # Check if any files remain after filtering
        if not any(os.scandir(temp_dir)):
          print(f"[{plugin_name}] No files to pack after filtering")
          continue
        
        # Create zip archive from filtered directory
        zip_file = os.path.join(artifacts_dir, f"{plugin_name}")
        zip_path = shutil.make_archive(zip_file, 'zip', temp_dir)
        
        # Rename to .plugin extension
        plugin_file_path = Path(zip_path).with_suffix(".plugin")
        
        if safe_rename(zip_path, plugin_file_path):
            print(f"✅ Created: {plugin_name}")
        else:
            print(f"❌ Failed to create: {plugin_name}")
              
      except Exception as e:
        print(f"[{plugin_name}] Error: {e}")
      finally:
        # Clean up temporary directory
        safe_rmtree(temp_dir)
    else:
      zip_file = os.path.join(artifacts_dir, f"{plugin_name}")
      
      # Create zip
      zip_path = shutil.make_archive(zip_file, 'zip', plugin_path)
      # Rename to plugin
      plugin_path = Path(zip_path).with_suffix(".plugin")
      if safe_rename(zip_path, plugin_path):
        print(f"✅ Created: {plugin_name}")
      else:
        print(f"❌ Failed to create: {plugin_name}")
  
  return

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

def should_exclude(path, base_dir, excludes):
  """Check if a path should be excluded based on patterns"""
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

if __name__ == "__main__":
  pack_plugins()
  