/**
 * Copyright (c) 2020-2025, JGraph Holdings Ltd
 * Copyright (c) 2020-2025, draw.io AG
 */
/**
 * Sample plugin. Numbers all vertices with the built-in shape numbers of the
 * enumerate style (see mxGraphView.redrawEnumerationState in Editor.js).
 */
Draw.loadPlugin(function(ui) {

	// Adds numbered toggle property
	Editor.commonVertexProperties.push({name: 'numbered', dispName: 'Numbered', type: 'bool', defVal: true, onChange: function(graph, newValue)
	{
		graph.refresh();
	}});

	var graph = ui.editor.graph;
	var enabled = true;

	// Older apps do not call isEnumerated and show no numbers if they load
	// this file (the service worker can serve the previous app.min.js)
	var graphViewIsEnumerated = graph.view.isEnumerated;

	graph.view.isEnumerated = function(state)
	{
		return graphViewIsEnumerated.apply(this, arguments) ||
			(enabled && graph.model.isVertex(state.cell) &&
			mxUtils.getValue(state.style, 'numbered', 1) == 1);
	};

	// Extends View menu
	mxResources.parse('number=Number');

    // Adds action
    var action = ui.actions.addAction('number...', function()
    {
		enabled = !enabled;
		graph.refresh();
    });

    action.setToggleAction(true);
	action.setSelectedCallback(function() { return enabled; });

	var menu = ui.menus.get((urlParams['sketch'] == '1') ? 'extras' : 'view');
	var oldFunct = menu.funct;

	menu.funct = function(menu, parent)
	{
		oldFunct.apply(this, arguments);

		ui.menus.addMenuItems(menu, ['-', 'number'], parent);
	};

	// Forces refresh if file was loaded before plugin
	if (ui.getCurrentFile() != null)
	{
		graph.refresh();
	}
});
