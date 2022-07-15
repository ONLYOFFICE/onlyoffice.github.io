echo off
echo package installation 
call npm install
echo package installation end
echo start compilation
java -jar ./node_modules/google-closure-compiler-java/compiler.jar --js ./store/scripts/code.js --js_output_file ./store/scripts/code_min.js
echo end compilation
pause