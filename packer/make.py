#!/usr/bin/env python

import os
import shutil
import time
import zipfile

def is_exist(path):
    return os.path.exists(path)

def delete_dir(path, max_retries=3):
    if not os.path.exists(path):
        return
        
    for attempt in range(max_retries):
        try:
            shutil.rmtree(path)
            break
        except PermissionError as e:
            if attempt < max_retries - 1:
                print(f"Attempt {attempt + 1}: File in use... {path}")
                time.sleep(1)  # Wait before retry (1 second)
            else:
                print(f"Failed to delete {path}: {e}")
                # Try alternative method
                try:
                    os.system(f'rmdir /S /Q "{path}"')  # For Windows
                except:
                    pass

def copy_dir(src, dst):
    if os.path.exists(dst):
        delete_dir(dst)
    shutil.copytree(src, dst)

def archive_folder(source_pattern, zip_path):
    source_dir = source_pattern.rstrip('/*')
    os.makedirs(os.path.dirname(zip_path), exist_ok=True)
    
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(source_dir):
            for file in files:
                file_path = os.path.join(root, file)
                
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
    
    if not is_exist(content_dir):
        print(f"Directory {content_dir} does not exist")
        return

    for plugin_name in os.listdir(content_dir):
        plugin_path = os.path.join(content_dir, plugin_name)
        
        if not os.path.isdir(plugin_path):
            continue
            
        plugin_deploy_path = os.path.join(plugin_path, "deploy")
        plugin_deploy_src_path = os.path.join(plugin_deploy_path, plugin_name)

        # Remove old deploy folder
        if is_exist(plugin_deploy_path):
            delete_dir(plugin_deploy_path)

        copy_dir(plugin_path, plugin_deploy_src_path)
        
        # Create .zip
        zip_file_path = os.path.join(plugin_deploy_path, f"{plugin_name}.zip")
        archive_folder(plugin_deploy_src_path + "/*", zip_file_path)
        
        # Rename to .plugin
        plugin_file_path = os.path.join(plugin_deploy_path, f"{plugin_name}.plugin")
        move_file(zip_file_path, plugin_file_path)
        
        # Remove temp folder
        delete_dir(plugin_deploy_src_path)
        
        print(f"Processed plugin: {plugin_name}")

if __name__ == "__main__":
    pack_plugins()