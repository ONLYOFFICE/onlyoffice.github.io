/**
 * Copyright (c) 2020-2025, JGraph Holdings Ltd
 * Copyright (c) 2020-2025, draw.io AG
 */
/**
 * Tags plugin. Adds the built-in Tags window, which sets the tags of the
 * selected cells and hides the cells with the selected tags, to the Extras
 * menu.
 */
Draw.loadPlugin(function(editorUi)
{
	var menu = editorUi.menus.get('extras');
	var oldFunct = menu.funct;

	menu.funct = function(menu, parent)
	{
		oldFunct.apply(this, arguments);

		editorUi.menus.addMenuItems(menu, ['-', 'tags'], parent);
	};
});
