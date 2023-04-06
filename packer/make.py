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
        
        plugin_path = content_dir + plugin_name
        plugin_deploy_path = plugin_path + "/deploy/"
        plugin_deploy_src_path = plugin_deploy_path + plugin_name

        if base.is_exist(plugin_deploy_path):
            base.delete_dir(plugin_deploy_path)

        base.copy_dir(plugin_path, plugin_deploy_src_path)
        base.archive_folder(plugin_deploy_src_path + "/*", plugin_deploy_path + plugin_name + ".zip")
        base.move_file(plugin_deploy_path + plugin_name + ".zip", plugin_deploy_path + plugin_name + ".plugin")
        base.delete_dir(plugin_deploy_src_path)        
      
    return

pack_plugins()