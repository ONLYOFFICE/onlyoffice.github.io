#!/usr/bin/env python
import os
import shutil

def is_exist(path):
  return os.path.exists(path)

def delete_dir(path):
  if os.path.exists(path):
    shutil.rmtree(path)

def pack_plugins():
  content_dir = "sdkjs-plugins/content/"
  
  if not is_exist(content_dir):
    print(f"Content directory {content_dir} does not exist")
    return
  
  artifacts_dir = "artifacts"
  os.makedirs(artifacts_dir, exist_ok=True)
  
  plugin_files = []
  
  for plugin_name in os.listdir(content_dir):
    plugin_path = os.path.join(content_dir, plugin_name)
    
    # Skip if not a directory
    if not os.path.isdir(plugin_path):
      continue
    
    plugin_deploy_path = os.path.join(plugin_path, "deploy")
    
    print(f"Processing plugin: {plugin_name}")
    
    if is_exist(plugin_deploy_path):
      delete_dir(plugin_deploy_path)
    
    os.makedirs(plugin_deploy_path, exist_ok=True)

    zip_file = os.path.join(plugin_deploy_path, f"{plugin_name}.zip")
    
    # Create zip
    shutil.make_archive(zip_file, 'zip', plugin_path)
    zip_file = zip_file + '.zip'
    shutil.copy2(zip_file, artifacts_dir)

    print(f"Created: {plugin_name}")
  
  return plugin_files

if __name__ == "__main__":
  pack_plugins()
