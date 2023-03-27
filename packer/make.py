#!/usr/bin/env python

import os
import sys
sys.path.append("../../build_tools/scripts")
import base

base.configure_common_apps()

def pack_plugins():

    content_dir = "../sdkjs-plugins/content/"
    
    if not base.is_exist(content_dir):
        return

    for plugin_name in os.listdir(content_dir):
        
        plugin_name_path = content_dir + plugin_name
        plugin_release_path = plugin_name_path + "/release/"
        plugin_release_src_path = plugin_release_path + plugin_name
        
        if base.is_exist(plugin_release_path):
            base.delete_dir(plugin_release_path)

        base.copy_dir(plugin_name_path, plugin_release_src_path)
        base.archive_folder(plugin_release_src_path + "/*", plugin_release_path + plugin_name + ".zip")
        base.move_file(plugin_release_path + plugin_name + ".zip", plugin_release_path + plugin_name + ".plugin")
        base.delete_dir(plugin_release_src_path)        
      
    return

pack_plugins()