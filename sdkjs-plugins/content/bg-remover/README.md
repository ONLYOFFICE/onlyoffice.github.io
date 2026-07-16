# Background Remover Plugin for ONLYOFFICE

The **Background Remover** plugin allows you to easily remove the background of any image in your document, presentation, or spreadsheet using automatic AI processing, directly within the ONLYOFFICE interface.

---

## Features

- **Automatic Background Removal**: Powered by AI to detect the foreground and make the background transparent instantly.
- **Context Menu Integration**: Easily process images in your document via the right-click menu once the plugin is active.
- **External Image Support**: Drag and drop or upload images directly from your computer to process them.
- **Built-in Editor ("Mini Paint")**: Draw, edit, or touch up details directly on the image using an integrated painting interface.
- **Direct Insert**: Insert the background-removed version into your document with a single click.

---

## How to Use

Follow these steps to remove the background of your images:

### Step 1: Open the Plugin
Before processing any image in your document, you must first activate the plugin:
1. Navigate to the **Plugins** tab on the top toolbar.
2. Click on the **BG Remover** icon (*as shown by **Arrow 1***) to open the plugin's sidebar panel on the left.

![Step 1: Open plugin](assets/1.png)

### Step 2: Select or Upload an Image
Once the plugin panel is open, you have two options to load an image:

* **Option A: Process an image from the document**
  1. Click on any image already inside your document to select it.
  2. Right-click the selected image and choose **Remove background** from the context menu (*as shown by **Arrow 2***).

* **Option B: Process an external image**
  1. Drag and drop any image file from your computer directly into the upload box on the plugin's sidebar.
  2. Alternatively, click the upload box inside the sidebar to browse and select an external image file.

---

### Step 3: Automatic AI Processing
- The plugin will automatically start processing your image.
- A "**Processing...**" loader will appear in the sidebar while the AI analyzes the image and removes its background.

![Step 3: Processing the image](assets/2.png)

---

### Step 4: Insert, Edit, or Save the Result
- When processing is complete, the transparent image preview will be displayed over a checkered grid in the sidebar.
- Click the **Insert** button (the purple icon with the image and up-arrow, *as shown by **Arrow 3***) to place the background-removed image directly into your document.

![Step 4: Insert background-removed image](assets/3.png)

#### Sidebar Toolbar Options:
* 🗑️ **Discard (Red Trash)**: Discard the processed image.
* ✏️ **Manual Edit (Blue Pencil)**: Open a "mini paint" drawing interface to manually paint, erase, or touch up any details.
* 📥 **Download (Green Arrow)**: Save the transparent PNG file directly to your local storage.

---

## Source Code & Contributions

The code hosted in this registry represents the **compiled (production build)** version of the plugin ready for distribution.

If you want to explore the original source code (built with **React + Vite**), collaborate, or contribute before it is compiled, please visit the main development repository:

🔗 **[joselmm/bg-remove](https://github.com/joselmm/bg-remove)**

---

## Support & Feedback

If you encounter any issues or have questions regarding the plugin integration in ONLYOFFICE, you can [open an issue](https://github.com/joselmm/onlyoffice.github.io/issues) on the ONLYOFFICE plugins repository.

