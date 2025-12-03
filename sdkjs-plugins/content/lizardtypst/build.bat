@echo off
set PLUGIN_NAME=lizardtypst
echo Building %PLUGIN_NAME%.plugin...
if not exist deploy mkdir deploy
if exist deploy\%PLUGIN_NAME%.plugin del deploy\%PLUGIN_NAME%.plugin
powershell -Command "Compress-Archive -Path config.json,index.html,README.md,scripts,resources -DestinationPath deploy\%PLUGIN_NAME%.zip -Force"
move /Y deploy\%PLUGIN_NAME%.zip deploy\%PLUGIN_NAME%.plugin >nul
echo Done! Created deploy\%PLUGIN_NAME%.plugin
dir deploy\%PLUGIN_NAME%.plugin | find "%PLUGIN_NAME%"
