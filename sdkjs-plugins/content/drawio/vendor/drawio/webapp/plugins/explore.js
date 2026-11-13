/**
 * Copyright (c) 2020-2025, JGraph Holdings Ltd
 * Copyright (c) 2020-2025, draw.io AG
 */
/**
 * Explore plugin. Adds the built-in Explore action to the context menu of
 * cells with connections and explores the clicked shape in chromeless mode.
 */
Draw.loadPlugin(function(ui)
{
	var uiCreatePopupMenu = ui.menus.createPopupMenu;
	ui.menus.createPopupMenu = function(menu, cell, evt)
	{
		uiCreatePopupMenu.apply(this, arguments);

		if (ui.actions.get('explore').isEnabled())
		{
			this.addMenuItems(menu, ['-', 'explore'], null, evt);
		}
	};

	// Click handler for chromeless mode
	if (ui.editor.isChromelessView())
	{
		ui.editor.graph.click = function(me)
		{
			if (ui.editor.graph.model.isVertex(me.getCell()) &&
				ui.editor.graph.model.getEdgeCount(me.getCell()) > 0 &&
				this.getLinkForCell(me.getCell()) == null)
			{
				Graph.exploreFromCell(ui.editor.graph, me.getCell());
			}
		};
	}
});
