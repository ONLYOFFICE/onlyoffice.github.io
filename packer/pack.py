#!/usr/bin/env python
import os
import shutil

def pack_plugins():
  content_dir = "sdkjs-plugins/content/"
  
  if not os.path.exists(content_dir):
    print(f"Content directory {content_dir} does not exist")
    return
  
  artifacts_dir = f"artifacts"
  os.makedirs(artifacts_dir, exist_ok=True)
  
  for plugin_name in os.listdir(content_dir):
    plugin_path = os.path.join(content_dir, plugin_name)
    
    zip_file = os.path.join(artifacts_dir, f"{plugin_name}")
    
    # Create zip
    print(f"Created: {plugin_path}")
    shutil.make_archive(zip_file, 'zip', plugin_path)

    print(f"Created: {plugin_name}")
  
  return

if __name__ == "__main__":
  pack_plugins()
