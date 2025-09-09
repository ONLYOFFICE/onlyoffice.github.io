### A convenient plugin that allows you to easily insert Font Awesome icons into your documents.

### Features

🔍 Search icons from Font Awesome library  
⚡ Quick insertion with simple clicks  
🎨 Customizable size, color, and style  
📋 Copy HTML code or icon class names  
🔄 Regular/Solid/Brands icon styles support

### Update Font Awesome Icons (windows)

```bash
git clone https://github.com/FortAwesome/Font-Awesome.git temp-repo
cp -r temp-repo/svgs-full ./resources/font-awesome/svgs-full
cp -r temp-repo/sprites-full ./resources/font-awesome/sprites-full
cp -r temp-repo/metadata/categories.yml ./resources/font-awesome/
rm -r -Force temp-repo
```

Generate icon paths by category

```bash
cd PLUGIN_DIR/svg-path-generator
npm i
npm run generate-paths
```

### Browser Support

IE11+
