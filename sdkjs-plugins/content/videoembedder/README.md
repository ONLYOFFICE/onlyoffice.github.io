# Video Embedder Plugin

This plugin allows users to embed videos from various platforms directly into their documents using validated URLs. It supports popular video platforms like Bilibili, Youku, QQ, Ixigua, and Iqiyi.

## Features
- **Automatic ID Extraction:** Extracts video IDs based on platform-specific rules.
- **Live Preview:** Provides an iframe-based preview of the video before embedding it in the document.

## Supported Platforms

### [**Bilibili**](https://www.bilibili.com)
- **Supported Links:**  
  `https://www.bilibili.com/video/{videoId}`  
  Example: `https://www.bilibili.com/video/BV1zv411q7y8`

---

### [**QQ (Tencent Video Player)**](https://v.qq.com)
- **Supported Links:**  
  - Cover videos: `https://v.qq.com/x/cover/{coverId}/{videoId}.html`  
    Example: `https://v.qq.com/x/cover/mzc00200txzcq9a/c0042j0sf2b.html`
  - Cover videos Type 2 (Works, but not recommended to use.): `https://v.qq.com/x/cover/{videoId}.html`
    Example: `https://v.qq.com/x/cover/c0042j0sf2b`
  - Page videos: `https://v.qq.com/x/page/{videoId}.html`  
    Example: `https://v.qq.com/x/page/c0042j0sf2b.html`

---

### [**Ixigua**](https://www.ixigua.com)
- **Supported Links:**  
  `https://www.ixigua.com/{videoId}`  
  Example: `https://www.ixigua.com/6823310010429010440`

---

### [**Youku**](https://www.youku.com)
- **Supported Links:**  
  `https://v.youku.com/v_show/id_{videoId}.html`  
  Example: `https://v.youku.com/v_show/id_XNDAwMjExMzM2OA==.html`

---

### [**IQIYI**](https://www.iq.com)
- **Supported Links:**  
  `https://www.iq.com/play/{videoTitle}-{videoId}?{optionalParams}`  
  Example: `https://www.iq.com/play/fangs-of-fortune-episode-1-rz7c6zo49o?lang=en_us`

---

## How It Works
1. **Paste a Video URL:**  
   Enter a valid URL into the input field.
   
2. **Validate the URL:**  
   The plugin will check if the URL is from one of the supported platforms.

3. **Generate the Embed:**  
   If valid, the plugin extracts the video ID and displays a live preview using an iframe.

4. **Add to Document:**  
   The video embed is inserted into your document for viewing.

---
