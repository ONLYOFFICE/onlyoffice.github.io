const toolbarMenuItem = {
    "id": "ai-btn-settings",
    "type": "button",
    "text": "Settings",
    "hint": "Settings",
    "icons": "resources/icons/%theme-type%(light|dark)/big/settings%scale%(default|*).png",
    "separator": false
};
const toolbarMenuTab = {
    "id": "ai",
    "text": "AI",
    "items": [toolbarMenuItem]
};
const toolbarMenuMainItem = {
    "guid": "asc.{90fe3acd-d346-4b85-a93b-0429851e9968}",
    "tabs": [toolbarMenuTab]
};