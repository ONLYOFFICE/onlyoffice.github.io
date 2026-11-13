/**
 * Copyright (c) 2006-2024, JGraph Holdings Ltd
 * Copyright (c) 2006-2024, draw.io AG
 */
// Overrides of global vars need to be pre-loaded
window.DRAWIO_PUBLIC_BUILD = true;
window.EXPORT_URL = null; // Replace with the URL of your export server to enable server-side PDF and image export, e.g. https://www.example.com/export. With null, export to PDF uses the print dialog
window.PLANT_URL = 'REPLACE_WITH_YOUR_PLANTUML_SERVER';
window.DRAWIO_BASE_URL = window.location.href.substring(0,  window.location.href.lastIndexOf("/")); // Replace with path to base of deployment, e.g. https://www.example.com/folder
window.DRAWIO_VIEWER_URL = window.DRAWIO_BASE_URL + "/js/viewer.min.js"; // Replace your path to the viewer js, e.g. https://www.example.com/js/viewer.min.js
window.DRAWIO_LIGHTBOX_URL = null; // Replace with your lightbox URL, eg. https://www.example.com
window.DRAW_MATH_URL = window.DRAWIO_BASE_URL + '/math4/es5';
window.DRAWIO_CONFIG = null; // Replace with your custom draw.io configurations. For more details, https://www.drawio.com/doc/faq/configure-diagram-editor

window.STENCIL_PATH = window.DRAWIO_BASE_URL + "/stencils";
window.IMAGE_PATH = window.DRAWIO_BASE_URL + "/images";
window.STYLE_PATH = window.DRAWIO_BASE_URL + "/styles";
window.CSS_PATH = window.DRAWIO_BASE_URL + "/styles";
window.OPEN_FORM = window.DRAWIO_BASE_URL + "/open.html";

window.mxImageBasePath = window.DRAWIO_BASE_URL + "/mxgraph/images";

window.EMF_CONVERT_URL = window.EMF_CONVERT_URL || "internal"

urlParams['sync'] = 'manual';
urlParams['local'] = '1';
// urlParams['offline'] = '1';
