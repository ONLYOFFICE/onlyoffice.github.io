/**
 * Copyright (c) 2019-2020, JGraph Holdings Ltd
 */
/**
 * Class: mxOrgChartLayout
 * 
 * Extends <mxGraphLayout> to implement organization chart layout algorithm.
 * The vertices need to be connected for this layout to work, vertices
 * with no connections are ignored.
 * 
 * Example:
 * 
 * (code)
 * var layout = new mxOrgChartLayout(graph);
 * layout.execute(graph.getDefaultParent());
 * (end)
 * 
 */
function mxOrgChartLayout(graph, branchOptimizer, parentChildSpacing, siblingSpacing, stackLevel)
{
	mxGraphLayout.call(this, graph);
	this.correctY = false;
	
	switch(parseInt(branchOptimizer))
	{
		case 0:
			this.branchOptimizer = mxOrgChartLayout.prototype.BRANCH_OPT_LINEAR;
			this.correctY = true;
			break;
		case 1:
			this.branchOptimizer = mxOrgChartLayout.prototype.BRANCH_OPT_HANGER2;
			this.correctY = true;
			break;
		case 3:
			this.branchOptimizer = mxOrgChartLayout.prototype.BRANCH_OPT_FISHBONE1;
			break;
		case 4:
			this.branchOptimizer = mxOrgChartLayout.prototype.BRANCH_OPT_FISHBONE2;
			break;
		case 5:
			this.branchOptimizer = mxOrgChartLayout.prototype.BRANCH_OPT_1COLUMN_L;
			break;
		case 6:
			this.branchOptimizer = mxOrgChartLayout.prototype.BRANCH_OPT_1COLUMN_R;
			break;
		case 7:
			this.branchOptimizer = mxOrgChartLayout.prototype.BRANCH_OPT_SMART;
			break;
		case 8:
			this.branchOptimizer = mxOrgChartLayout.prototype.BRANCH_OPT_STACKED_LEAVES;
			this.correctY = true;
			break;
		default: //and case 2
			this.branchOptimizer = mxOrgChartLayout.prototype.BRANCH_OPT_HANGER4;
			this.correctY = true;
	}
	
	this.parentChildSpacing = parentChildSpacing > 0 ? parentChildSpacing : 20;
	this.siblingSpacing = siblingSpacing > 0 ? siblingSpacing : 20;

	if (stackLevel != null)
	{
		this.stackLevel = stackLevel;
	}
};

/**
 * Extends mxGraphLayout.
 */
mxOrgChartLayout.prototype = new mxGraphLayout();
mxOrgChartLayout.prototype.constructor = mxOrgChartLayout;

/**
 * The library checks all steps of a boundary after each step of a merge
 * (Boundary.ValidateState), which is O(N^3) for a chain of N boxes (26 s
 * for 1,000). The check is an assertion without side effects, so it runs
 * once after each merge instead.
 */
(function()
{
	var proto = OrgChart.Layout.Boundary.prototype;
	var validateState = proto.ValidateState;
	var mergeFrom = proto.MergeFrom;

	if (typeof validateState === 'function' && typeof mergeFrom === 'function')
	{
		proto.ValidateState = function() {};

		proto.MergeFrom = function()
		{
			mergeFrom.apply(this, arguments);
			validateState.apply(this, arguments);
		};
	}
})();

//Branch Optimizers
mxOrgChartLayout.prototype.BRANCH_OPT_LINEAR = 'branchOptimizerAllLinear';
mxOrgChartLayout.prototype.BRANCH_OPT_HANGER2 = 'branchOptimizerAllHanger2';
mxOrgChartLayout.prototype.BRANCH_OPT_HANGER4 = 'branchOptimizerAllHanger4';
mxOrgChartLayout.prototype.BRANCH_OPT_FISHBONE1 = 'branchOptimizerAllFishbone1';
mxOrgChartLayout.prototype.BRANCH_OPT_FISHBONE2 = 'branchOptimizerAllFishbone2';
mxOrgChartLayout.prototype.BRANCH_OPT_1COLUMN_L = 'branchOptimizerAllSingleColumnLeft';
mxOrgChartLayout.prototype.BRANCH_OPT_1COLUMN_R = 'branchOptimizerAllSingleColumnRight';
mxOrgChartLayout.prototype.BRANCH_OPT_SMART = 'branchOptimizerSmart';
mxOrgChartLayout.prototype.BRANCH_OPT_STACKED_LEAVES = 'branchOptimizerStackedLeaves';

/**
 * Variable: stackLevel
 * 
 * The first level whose shapes are stacked in columns with their subtrees,
 * where the shapes without a parent are on level 1: the parents of the
 * shapes on this level and below stack their children in a column, the
 * parents above use the branch optimizer. Values below 2 turn stacking off.
 * Default is 0.
 */
mxOrgChartLayout.prototype.stackLevel = 0;

/**
 * Function: isVertexIgnored
 *
 * Returns true if the given vertex is not a box of the chart, eg. to lay out
 * only the new shapes of a CSV import. The boxes are the visible vertex
 * children of the parent that are not ignored. Other vertices keep their
 * positions, are no parents of boxes, and the connectors to them keep their
 * routes. This implementation returns true for ties (see Graph.isTie).
 */
mxOrgChartLayout.prototype.isVertexIgnored = function(vertex)
{
	return typeof this.graph.isTie === 'function' && this.graph.isTie(vertex);
};

/**
 * Function: getRoutePoints
 *
 * Returns the given waypoints of a connector from the given source to the
 * given target geometry without the points that don't change its route. The
 * routing walks past every junction of a shared line, which gives a team of N
 * reports N^2 / 2 waypoints. The connectors are orthogonal, which takes the x
 * and the y of the waypoints in turns (mxEdgeStyle.SegmentConnector), so only
 * repeated points and points between their neighbours on a vertical or
 * horizontal line are removed, and an even number of them between the points
 * that keep their place: the first point, the last two points, the points in
 * the terminals and the first and last point outside of them, and the points
 * around diagonal steps, turn backs (the routing gives them for more than 32
 * lines of a connector) and segments shorter than the given minimum length
 * (see getMinSegmentLength).
 */
mxOrgChartLayout.getRoutePoints = function(points, source, target, minLength)
{
	var n = points.length;
	var fixed = [];

	for (var i = 0; i < n; i++)
	{
		fixed.push(i == 0 || i >= n - 2);
	}

	var fix = function(from, to)
	{
		for (var i = Math.max(0, from); i <= Math.min(n - 1, to); i++)
		{
			fixed[i] = true;
		}
	};

	var isInside = function(geo, p)
	{
		return geo != null && p.x >= geo.x && p.x <= geo.x + geo.width &&
			p.y >= geo.y && p.y <= geo.y + geo.height;
	};

	var getLength = function(a, b)
	{
		return Math.abs(b.x - a.x) + Math.abs(b.y - a.y);
	};

	var isBetween = function(a, b, c)
	{
		return (a.x == b.x && b.x == c.x && (b.y - a.y) * (c.y - b.y) >= 0) ||
			(a.y == b.y && b.y == c.y && (b.x - a.x) * (c.x - b.x) >= 0);
	};

	// Points in the terminals and the first and last point outside of them
	var first = 0;
	var last = n - 1;

	while (first < n - 1 && isInside(source, points[first]))
	{
		first++;
	}

	while (last > 0 && isInside(target, points[last]))
	{
		last--;
	}

	fix(0, first);
	fix(last, n - 1);

	for (var i = 1; i < n; i++)
	{
		var a = points[i - 1];
		var b = points[i];

		if ((a.x != b.x && a.y != b.y) || getLength(a, b) < minLength)
		{
			fix(i - 2, i + 1);
		}
		else if (a.x != b.x || a.y != b.y)
		{
			// Turn back after the repeated points of b
			var j = i + 1;

			while (j < n && points[j].x == b.x && points[j].y == b.y)
			{
				j++;
			}

			if (j < n && ((a.x == b.x && b.x == points[j].x) || (a.y == b.y &&
				b.y == points[j].y)) && !isBetween(a, b, points[j]))
			{
				fix(i - 2, j + 1);
			}
		}
	}

	var result = [];
	var odd = null;

	for (var i = 0; i < n; i++)
	{
		if (!fixed[i] && isBetween(result[result.length - 1], points[i], points[i + 1]))
		{
			// Index and point of the first of an odd number of removed points
			odd = (odd == null) ? [result.length, points[i]] : null;
		}
		else
		{
			if (fixed[i] && odd != null)
			{
				result.splice(odd[0], 0, odd[1]);
				odd = null;
			}

			result.push(points[i]);
		}
	}

	return result;
};

/**
 * Function: getMinSegmentLength
 *
 * Returns the length of the segments of a connector with the given style
 * below which getRoutePoints keeps the points around them. Connectors with
 * other shapes than connector (eg. the joints of flexArrow), curved and
 * bezier curves, sketches and line jumps (no jumps at the bends of a
 * connector) depend on all points (Infinity). Rounded corners are limited by
 * half the distance to the next points (see mxShape.addPoints), so they only
 * keep their size if points are at least 1.5 times the arc size away. The
 * flags are compared with 1 like the painters do (mxPolyline.paintEdgeShape,
 * mxShape.isRounded), so that 1.0 or 01 count as 1.
 */
mxOrgChartLayout.getMinSegmentLength = function(style)
{
	var rough = (typeof urlParams !== 'undefined' && urlParams['rough'] == '1') ? '1' : '0';

	if (mxUtils.getValue(style, mxConstants.STYLE_SHAPE, mxConstants.SHAPE_CONNECTOR) != mxConstants.SHAPE_CONNECTOR ||
		mxUtils.getValue(style, mxConstants.STYLE_CURVED, 0) == 1 ||
		mxUtils.getValue(style, mxConstants.STYLE_BEZIER, 0) == 1 ||
		mxUtils.getValue(style, 'sketch', rough) != '0' ||
		mxUtils.getValue(style, 'comic', '0') != '0' ||
		mxUtils.getValue(style, 'jumpStyle', 'none') != 'none')
	{
		return Infinity;
	}
	else if (mxUtils.getValue(style, mxConstants.STYLE_ROUNDED, 0) == 1)
	{
		var arcSize = parseFloat(mxUtils.getValue(style, mxConstants.STYLE_ARCSIZE, mxConstants.LINE_ARCSIZE));

		return (arcSize >= 0) ? 1.5 * arcSize : Infinity;
	}

	return 0;
};

/**
 * Function: execute
 * 
 * Implements <mxGraphLayout.execute>. This operates on all children of the
 * given parent.
 */
mxOrgChartLayout.prototype.execute = function(parent)
{
	this.graph.model.beginUpdate();
	try
	{
		RPOrgChart.main(this.graph, parent, this.branchOptimizer, this.parentChildSpacing, this.siblingSpacing, this.correctY, this.stackLevel,
			mxUtils.bind(this, this.isVertexIgnored));
	}
	finally
	{
		this.graph.model.endUpdate();
	}
}

Bridge.define('RPOrgChart',
{
    statics: {
        config: {
            init: function() {

            }
        },
        main: function (graph, parent, branchOptimizer, parentChildSpacing, siblingSpacing, correctY, stackLevel, isVertexIgnored) {
            Bridge.Console.log = console.log;
            Bridge.Console.error = console.error;
            Bridge.Console.debug = console.debug;

            RPOrgChart.graph = graph;
            RPOrgChart.parent = parent;
            RPOrgChart.isVertexIgnored = (isVertexIgnored != null) ? isVertexIgnored : function() { return false; };
			RPOrgChart.dx = 0;
			RPOrgChart.dy = 0;
			
			if (parent.style == 'group' && parent.geometry)
			{
				RPOrgChart.dx = parent.geometry.x;
				RPOrgChart.dy = parent.geometry.y;
			}
			
            RPOrgChart.branchOptimizer = branchOptimizer;
			RPOrgChart.correctY = correctY;

			// Invalid levels (eg. from a config) turn stacking off
			stackLevel = parseInt(stackLevel);
			RPOrgChart.stackLevel = (isFinite(stackLevel) && stackLevel >= 2) ? stackLevel : 0;
            RPOrgChart.parentChildSpacing = parseInt(parentChildSpacing);
            RPOrgChart.siblingSpacing = parseInt(siblingSpacing);
            RPOrgChart.buildChart(true);
        },

        diagram: {},
        dataSource: {},

        buildChart: function (initData) {
            if (initData) {
                RPOrgChart.initDiagram();
            }
            RPOrgChart.positionBoxes();
        },

        collapseAllBoxes: function(boxContainer, isCollapsed) {
            var en = boxContainer.getBoxesById().getValues().getEnumerator();
            while (en.moveNext()) {
                var box = en.getCurrent();
                if (!box.IsSpecial) {
                    box.IsCollapsed = isCollapsed;
                }
            }
        },

        generateData: function () 
        {
        	var dataSource = new OrgChart.Test.TestDataSource();
        	
            var graph = RPOrgChart.graph;
            var cells = graph.getChildVertices(RPOrgChart.parent);
            var isVertexIgnored = RPOrgChart.isVertexIgnored;
            var boxes = [];

            // getChildVertices returns the visible vertices only
            RPOrgChart.boxes = new mxDictionary();
            
            for (var i = 0; i < cells.length; i++)
        	{
            	var cell = cells[i];
            	
            	if (cell.geometry != null && cell.vertex && cell.parent == RPOrgChart.parent && //Vertices and first level children only
            		!isVertexIgnored(cell))
            	{
            		boxes.push(cell);
            		RPOrgChart.boxes.put(cell, true);
            	}
           	}
            
            for (var i = 0; i < boxes.length; i++)
        	{
            	var cell = boxes[i];
            	
            	// Find cell parent. If it has more than one parent, take first parent (should be an error?)
            	// Sources that are not boxes of the chart (eg. hidden, ignored or outside the parent) are
            	// ignored, the layout throws for unknown parents
            	var parentId = null;
            	var incomingEdges = graph.getIncomingEdges(cell);
            	
            	for (var j = 0; j < incomingEdges.length && parentId == null; j++)
       			{
            		var source = incomingEdges[j].source;
            		
            		if (source != null && source != cell && RPOrgChart.boxes.get(source))
            		{
            			parentId = source.id;
            		}
       			}
            	
            	var item = new OrgChart.Test.TestDataItem();
            	item.Id = cell.id;
            	item.ParentId = parentId;
            	dataSource.Items.add(item.getId(), item);
           	}
            
            return dataSource;
        },

        initDiagram: function () {
            var dataSource = RPOrgChart.generateData();

            RPOrgChart.dataSource = dataSource;

            var boxContainer = new OrgChart.Layout.BoxContainer.$ctor1(dataSource);
            RPOrgChart.diagram = new OrgChart.Layout.Diagram();

            var diagram = RPOrgChart.diagram;
            diagram.setBoxes(boxContainer);

            var linearLayoutStrategy = new OrgChart.Layout.LinearLayoutStrategy();
            linearLayoutStrategy.ParentAlignment = OrgChart.Layout.BranchParentAlignment.Center;
            linearLayoutStrategy.ParentChildSpacing = RPOrgChart.parentChildSpacing;
            linearLayoutStrategy.SiblingSpacing = RPOrgChart.siblingSpacing;
            diagram.LayoutSettings.LayoutStrategies.add("linear", linearLayoutStrategy);

            var multiLineHangerLayoutStrategy = new OrgChart.Layout.MultiLineHangerLayoutStrategy();
            multiLineHangerLayoutStrategy.ParentAlignment = OrgChart.Layout.BranchParentAlignment.Center;
            multiLineHangerLayoutStrategy.MaxSiblingsPerRow = 2;
            multiLineHangerLayoutStrategy.ParentChildSpacing = RPOrgChart.parentChildSpacing;
            multiLineHangerLayoutStrategy.SiblingSpacing = RPOrgChart.siblingSpacing;
            diagram.LayoutSettings.LayoutStrategies.add("hanger2", multiLineHangerLayoutStrategy);

            multiLineHangerLayoutStrategy = new OrgChart.Layout.MultiLineHangerLayoutStrategy();
            multiLineHangerLayoutStrategy.ParentAlignment = OrgChart.Layout.BranchParentAlignment.Center;
            multiLineHangerLayoutStrategy.MaxSiblingsPerRow = 4;
            multiLineHangerLayoutStrategy.ParentChildSpacing = RPOrgChart.parentChildSpacing;
            multiLineHangerLayoutStrategy.SiblingSpacing = RPOrgChart.siblingSpacing;
            diagram.LayoutSettings.LayoutStrategies.add("hanger4", multiLineHangerLayoutStrategy);

            var singleColumnLayoutStrategy = new OrgChart.Layout.SingleColumnLayoutStrategy();
            singleColumnLayoutStrategy.ParentAlignment = OrgChart.Layout.BranchParentAlignment.Right;
            singleColumnLayoutStrategy.ParentChildSpacing = RPOrgChart.parentChildSpacing;
            singleColumnLayoutStrategy.SiblingSpacing = RPOrgChart.siblingSpacing;
            diagram.LayoutSettings.LayoutStrategies.add("singleColumnRight", singleColumnLayoutStrategy);

            singleColumnLayoutStrategy = new OrgChart.Layout.SingleColumnLayoutStrategy();
            singleColumnLayoutStrategy.ParentAlignment = OrgChart.Layout.BranchParentAlignment.Left;
            singleColumnLayoutStrategy.ParentChildSpacing = RPOrgChart.parentChildSpacing;
            singleColumnLayoutStrategy.SiblingSpacing = RPOrgChart.siblingSpacing;
            diagram.LayoutSettings.LayoutStrategies.add("singleColumnLeft", singleColumnLayoutStrategy);

            var fishboneLayoutStrategy = new OrgChart.Layout.MultiLineFishboneLayoutStrategy();
            fishboneLayoutStrategy.ParentAlignment = OrgChart.Layout.BranchParentAlignment.Center;
            fishboneLayoutStrategy.MaxGroups = 1;
            fishboneLayoutStrategy.ParentChildSpacing = RPOrgChart.parentChildSpacing;
            fishboneLayoutStrategy.SiblingSpacing = RPOrgChart.siblingSpacing;
            diagram.LayoutSettings.LayoutStrategies.add("fishbone1", fishboneLayoutStrategy);

            fishboneLayoutStrategy = new OrgChart.Layout.MultiLineFishboneLayoutStrategy();
            fishboneLayoutStrategy.ParentAlignment = OrgChart.Layout.BranchParentAlignment.Center;
            fishboneLayoutStrategy.MaxGroups = 2;
            fishboneLayoutStrategy.ParentChildSpacing = RPOrgChart.parentChildSpacing;
            fishboneLayoutStrategy.SiblingSpacing = RPOrgChart.siblingSpacing;
            diagram.LayoutSettings.LayoutStrategies.add("fishbone2", fishboneLayoutStrategy);

            var hstackLayoutStrategy = new OrgChart.Layout.StackingLayoutStrategy();
            hstackLayoutStrategy.ParentAlignment = OrgChart.Layout.BranchParentAlignment.InvalidValue;
            hstackLayoutStrategy.Orientation = OrgChart.Layout.StackOrientation.SingleRowHorizontal;
            hstackLayoutStrategy.ParentChildSpacing = RPOrgChart.parentChildSpacing;
            hstackLayoutStrategy.SiblingSpacing = RPOrgChart.siblingSpacing;
            diagram.LayoutSettings.LayoutStrategies.add("hstack", hstackLayoutStrategy);

            var vstackLayoutStrategy = new OrgChart.Layout.StackingLayoutStrategy();
            vstackLayoutStrategy.ParentAlignment = OrgChart.Layout.BranchParentAlignment.InvalidValue;
            vstackLayoutStrategy.Orientation = OrgChart.Layout.StackOrientation.SingleColumnVertical;
            vstackLayoutStrategy.ParentChildSpacing = RPOrgChart.parentChildSpacing;
            vstackLayoutStrategy.SiblingSpacing = RPOrgChart.siblingSpacing;
            diagram.LayoutSettings.LayoutStrategies.add("vstack", vstackLayoutStrategy);

            vstackLayoutStrategy = new OrgChart.Layout.StackingLayoutStrategy();
            vstackLayoutStrategy.ParentAlignment = OrgChart.Layout.BranchParentAlignment.InvalidValue;
            vstackLayoutStrategy.Orientation = OrgChart.Layout.StackOrientation.SingleColumnVertical;
            vstackLayoutStrategy.ParentChildSpacing = RPOrgChart.parentChildSpacing;
            vstackLayoutStrategy.SiblingSpacing = RPOrgChart.siblingSpacing;
            diagram.LayoutSettings.LayoutStrategies.add("vstackMiddle", vstackLayoutStrategy);

            vstackLayoutStrategy = new OrgChart.Layout.StackingLayoutStrategy();
            vstackLayoutStrategy.ParentAlignment = OrgChart.Layout.BranchParentAlignment.InvalidValue;
            vstackLayoutStrategy.Orientation = OrgChart.Layout.StackOrientation.SingleColumnVertical;
            vstackLayoutStrategy.ParentChildSpacing = RPOrgChart.parentChildSpacing;
            vstackLayoutStrategy.SiblingSpacing = RPOrgChart.siblingSpacing;
            diagram.LayoutSettings.LayoutStrategies.add("vstackTop", vstackLayoutStrategy);

            var assistantsLayoutStrategy = new OrgChart.Layout.FishboneAssistantsLayoutStrategy();
            assistantsLayoutStrategy.ParentAlignment = OrgChart.Layout.BranchParentAlignment.Center;
            assistantsLayoutStrategy.ParentChildSpacing = RPOrgChart.parentChildSpacing;
            assistantsLayoutStrategy.SiblingSpacing = RPOrgChart.siblingSpacing;
            diagram.LayoutSettings.LayoutStrategies.add("assistants", assistantsLayoutStrategy);

            diagram.LayoutSettings.DefaultLayoutStrategyId = "vstack";
            diagram.LayoutSettings.DefaultAssistantLayoutStrategyId = "assistants";
            //diagram.LayoutSettings.setBranchSpacing(5);
        },

        getBoxLevel: function(boxContainer, box) {
            var level = 0;
            var obj = {};
            while (box.ParentId > 0) {
                if (!boxContainer.getBoxesById().tryGetValue(box.ParentId, obj)) {
                    break;
                }
                box = obj.v;
                level++;
            }

            return level;
        },

        onLayoutStateChanged: function (sender, args) {
            if (args.State.getCurrentOperation() === OrgChart.Layout.LayoutState.Operation.PreprocessVisualTree) {
                // When layout algorithm is ready to preprocess the tree,
                // we need to have box sizes ready -> hence have to render visible boxes in HTML.
                // Rendering can happen at earlier time, but it's just more convenient to do it here,
                // to utilize some readily available information about visual tree.
                RPOrgChart.renderBoxes();
            }
        },
        
        renderBoxes: function () {
            var visitorFunc = function (node) {
                var box = node.Element;

                if (box.getIsDataBound()) {
                    // we're being run when nodes have already been marked as visible or hidden,
                    // based on IsCollapsed attribute of each Box
                    // so use this knowledge to prevent unnecessary rendering of invisible branches
                    if (node.State.IsHidden) {
                        return true;
                    }

                    box.Size = RPOrgChart.getBoxElementSize(box.DataId);
                }

                return true;
            }

            RPOrgChart.diagram.getVisualTree().IterateParentFirst(visitorFunc);
        },

        getBranchOptimizerFunc: function () {
            var optimizer = RPOrgChart[RPOrgChart.branchOptimizer];
            var stackLevel = RPOrgChart.stackLevel;

            // The parents of the shapes on the stack level and below (the level
            // of the system root is 0) stack their children in a column
            return (stackLevel >= 2) ? function(node) {
                return (!node.getIsAssistantRoot() && node.Level >= stackLevel - 1) ?
                    "singleColumnLeft" : optimizer(node);
            } : optimizer;
        },

        branchOptimizerAllLinear: function(node) {
            return node.getIsAssistantRoot() ? null : "linear";
        },
        
        branchOptimizerAllHanger2: function(node) {
            return node.getIsAssistantRoot() ? null : "hanger2";
        },
        
        branchOptimizerAllHanger4: function(node) {
            return node.getIsAssistantRoot() ? null : "hanger4";
        },
        
        branchOptimizerAllFishbone1: function(node) {
            return node.getIsAssistantRoot() ? null : "fishbone1";
        },

        branchOptimizerAllFishbone2: function (node) {
            return node.getIsAssistantRoot() ? null : "fishbone2";
        },

        branchOptimizerAllSingleColumnLeft: function (node) {
            return node.getIsAssistantRoot() ? null : "singleColumnRight";
        },

        branchOptimizerAllSingleColumnRight: function (node) {
            return node.getIsAssistantRoot() ? null : "singleColumnLeft";
        },

        branchOptimizerStackers: function(node) {
            if (node.getIsAssistantRoot()) {
                return null;
            }
            return node.Level === 0 // this is Node for boxContainer.SystemRoot, which is not visible itself
                ? "vstackTop"
                : node.Level === 1 // this is children of SystemRoot - they appear as roots in the diagram
                ? "vstackMiddle"
                : "hstack";

        },

        // Shapes without reports are stacked in a column, the others are side by side
        branchOptimizerStackedLeaves: function(node) {
            if (node.getIsAssistantRoot()) {
                return null;
            }

            for (var i = 0; i < node.getChildCount(); i++) {
                if (node.Children.getItem(i).getChildCount() > 0) {
                    return "linear";
                }
            }

            return "singleColumnLeft";
        },

        branchOptimizerSmart: function(node) {
            if (node.getIsAssistantRoot()) {
                return null;
            }

            var childCount = node.getChildCount();

            if (childCount <= 1) {
                return "vstack";
            }

            var nonLeafChildren = 0;
            for (var i = 0; i < childCount; i++) {
                if (node.Children.getItem(i).getChildCount() > 0) {
                    nonLeafChildren++;
                }
            }

            if (nonLeafChildren <= 1) {
                if (childCount <= 4) {
                    return "vstack";
                }
                if (childCount <= 8) {
                    return "fishbone1";
                }
                return "fishbone2";
            }

            return "hanger4";
        },

        boxSizeFunc: function (dataId) {
            // ChartLayoutAlgorithm requires this function to accept data ID
            // so have to convert it to Box ID first, to get rendered visual element
            var boxId = RPOrgChart.diagram.getBoxes().getBoxesByDataId().getItem(dataId).Id;
            return RPOrgChart.diagram.getBoxes().getBoxesById().getItem(boxId).Size;
        },

        getBoxElementSize: function (boxId) {
    		var geo = RPOrgChart.graph.model.cells[boxId].geometry;
    		return new OrgChart.Layout.Size.$ctor1(geo.width, geo.height);
        },

        positionBoxes: function () {
            var diagram = RPOrgChart.diagram;

            var state = new OrgChart.Layout.LayoutState(diagram);

            state.addOperationChanged(RPOrgChart.onLayoutStateChanged);
            state.BoxSizeFunc = Bridge.fn.bind(this, RPOrgChart.boxSizeFunc, null, true);
            var optimizer = RPOrgChart.getBranchOptimizerFunc();
            state.LayoutOptimizerFunc = Bridge.fn.bind(this, optimizer, null, true);

            OrgChart.Layout.LayoutAlgorithm.Apply(state);

            var diagramBoundary = OrgChart.Layout.LayoutAlgorithm.ComputeBranchVisualBoundingRect(diagram.getVisualTree());

			var offsetx = -diagramBoundary.getLeft() + diagramBoundary.getTop();

			var graph = RPOrgChart.graph;
            var cells = graph.model.cells;
			var pointsList = [];
            
            var visitorVertexFunc = function (node) 
            {
                if (node.State.IsHidden) {
                    return false;
                }

                var box = node.Element;

                if (box.getIsDataBound()) {
                    var cell = cells[box.DataId];
                    var geo = cell.geometry.clone();
                    geo.x = node.State.TopLeft.X + offsetx;
                    geo.y = node.State.TopLeft.Y;
                    graph.model.setGeometry(cell, geo);
                }
                
                return true;
            }
            
            var visitorEdgeFunc = function (node) 
            {
				//The algorithm default is 5 px only above the node, this centers it (not for
				//the columns of stacked leaves, whose connectors end at the side of the nodes)
				var yCorrection = (RPOrgChart.correctY && optimizer(node) !=
					'singleColumnLeft') ? Math.min(0, -(RPOrgChart.parentChildSpacing / 2) + 5) : 0;
                // Render connectors
                if (node.State.Connector != null) {
                	
                    var cell = cells[node.Element.DataId];
                         
                	var outgoingEdge = graph.getOutgoingEdges(cell);

                	var uniquePoints = {};
                	
                	// Adds the given segment indices to the segments of the given point
                	function addSegs(p, segs)
                	{
                		for (var k = 0; k < segs.length; k++)
                		{
                			if (mxUtils.indexOf(p.segs, segs[k]) < 0)
                			{
                				p.segs.push(segs[k]);
                			}
                		}
                	};
                	
                	//Sort segments points from top to bottom or left to right + add offset
                	for (var ix = 0; ix < node.State.Connector.Segments.length; ix++) 
                    {
                		var edge = node.State.Connector.Segments[ix];
                		edge.segs = [ix];
                        edge.From.X += offsetx;
                        edge.To.X += offsetx;
                        var fx = edge.From.X, fy = edge.From.Y, tx = edge.To.X, ty = edge.To.Y;
                        
                        if ((fx == tx && fy > ty) || (fy == ty && fx > tx))
                    	{
                        	var tmp = edge.From;
                        	edge.From = edge.To;
                        	edge.To = tmp;
                    	}
                    }
                	
                	//Collecting points including intersection of segments
                    for (var ix = 0; ix < node.State.Connector.Segments.length; ix++) 
                    {
                    	var edge = node.State.Connector.Segments[ix];
                        var fx = edge.From.X, fy = edge.From.Y, tx = edge.To.X, ty = edge.To.Y;
                        var fp = new mxPoint(fx, fy);
						pointsList.push(fp);
                        fp.segs = edge.segs.slice();
                        var up = uniquePoints[fx + ',' + fy];
                        
                        if (up != null)
                    	{
                        	addSegs(up, fp.segs);
                    	}
                        else
                        {
                        	uniquePoints[fx + ',' + fy] = fp;
                        }
                        
                        var tp = new mxPoint(tx, ty);
						pointsList.push(tp);
                        tp.segs = edge.segs.slice();
                        var up = uniquePoints[tx + ',' + ty];
                        
                        if (up != null)
                    	{
                        	addSegs(up, tp.segs);
                    	}
                        else
                        {
                        	uniquePoints[tx + ',' + ty] = tp; 
                        }
                        
                        //Find intersections
                        for (var j = ix + 1; j < node.State.Connector.Segments.length; j++) 
                        {
                        	var e2 = node.State.Connector.Segments[j];
                        	var fx2 = e2.From.X, fy2 = e2.From.Y, tx2 = e2.To.X, ty2 = e2.To.Y;
                        	
                        	if (fx == tx && fy <= fy2 && ty >= fy2 && fx2 <= fx && tx2 >= fx) //Ver |_ Hor
                    		{
                        		var ip = new mxPoint(fx, fy2);
								pointsList.push(ip);
                        		ip.segs = [ix, j];
                        		var up = uniquePoints[fx + ',' + fy2];
                                
                                if (up != null)
                            	{
                                	addSegs(up, ip.segs);
                            	}
                                else
                                {
                                	uniquePoints[fx + ',' + fy2] = ip;
                                }
                    		}
                        	else if (fy == ty && fx <= fx2 && tx >= fx2 && fy2 <= fy && ty2 >= fy) //Hor _| Ver
                    		{
                        		var ip = new mxPoint(fx2, fy);
								pointsList.push(ip);
                        		ip.segs = [ix, j];
                        		var up = uniquePoints[fx2 + ',' + fy]
                                
                                if (up != null)
                            	{
                                	addSegs(up, ip.segs);
                            	}
                                else
                                {
                                	uniquePoints[fx2 + ',' + fy] = ip;
                                }
                    		}
                        }
                    }
                    
                    //Sort points on y then x
                    var pointsArr = [];
                    
                    for (var k in uniquePoints)
                	{
                    	pointsArr.push(uniquePoints[k]);
                	}
                    
                    pointsArr.sort(function(a, b)
                   	{
                    	var dy = a.y - b.y;
                    	
                    	return dy == 0? a.x - b.x : dy; 
                    });
                    
                    function pointOnCell(geo, p)
                    {
                    	return p.x >= geo.x && p.x <= geo.x + geo.width && p.y >= geo.y && p.y <= geo.y + geo.height;
                    };
                    
                    function adjustEdgeGeoAndStyle(edge, edgePoints)
                    {
                        var eGeo = edge.geometry.clone();
						
						for (var i = 0; edgePoints && i < edgePoints.length; i++)
						{
							if (!edgePoints[i].corrected)
							{
								edgePoints[i].y += yCorrection;
								edgePoints[i].corrected = true
							}
						}
						
						// Removes the points that don't change the route after the correction
						var points = (edgePoints != null) ? mxOrgChartLayout.getRoutePoints(edgePoints,
							(edge.source != null) ? edge.source.geometry : null,
							(edge.target != null) ? edge.target.geometry : null,
							mxOrgChartLayout.getMinSegmentLength(graph.getCellStyle(edge))) : edgePoints;
						
                        eGeo.points = points;
                        graph.model.setGeometry(edge, eGeo);

                        //Remove entry and exit points
                        graph.setCellStyles('entryX', null, [edge]);
                        graph.setCellStyles('entryY', null, [edge]);
                        graph.setCellStyles('exitX', null, [edge]);
                        graph.setCellStyles('exitY', null, [edge]);
                        //Set type orthogonal
                        graph.setCellStyles('edgeStyle', 'orthogonalEdgeStyle', [edge]);
                    };
                    
                    // Connectors to vertices that are no boxes (eg. hidden or ignored) keep their routes
                    var outgoingEdge = graph.getOutgoingEdges(cell).filter(function(edge)
                    {
                        return edge.target == null || RPOrgChart.boxes.get(edge.target);
                    });
                    
                    //Simple case of a single segment. TODO Handle this case earlier
                    if (pointsArr.length == 2 && outgoingEdge.length == 1)
                	{
                        adjustEdgeGeoAndStyle(outgoingEdge[0], pointsArr);
                	}
                    else
                	{
                        var srcGeo = cell.geometry;
                        var srcP;
                        var srcIndex = -1;

                        //Find src starting point //TODO It should be first point always?
                        for (var i = 0; i < pointsArr.length; i++)
                    	{
                        	if (pointOnCell(srcGeo, pointsArr[i]))
                    		{
                        		srcP = pointsArr[i];
                        		srcIndex = i;
                        		break;
                    		}
                    	}

                        // Indices of the points on each segment in the order of pointsArr. Segment
                        // indices instead of bits of a number, which wrapped for more than 32
                        // segments and broke the routes of teams of 25 reports and more (31 for
                        // Linear).
                        var segCount = node.State.Connector.Segments.length;
                        var segPoints = [];

                        for (var b = 0; b < segCount; b++)
                        {
                        	segPoints.push([]);
                        }

                        for (var i = 0; i < pointsArr.length; i++)
                        {
                        	for (var k = 0; k < pointsArr[i].segs.length; k++)
                        	{
                        		segPoints[pointsArr[i].segs[k]].push(i);
                        	}
                        }

                        function getKey(p)
                        {
                        	return p.x + ',' + p.y;
                        };

                        // Walks from srcP to the first unselected point in pointsArr on a segment
                        // of the last point and back if there is none, until all points that can
                        // be reached are selected. Returns the order in which the points were
                        // selected and the point before each point by index in pointsArr, and if
                        // all points were selected. The walk selects the points by their
                        // coordinates, which the y correction of the routes changes.
                        function walk()
                        {
                        	var selected = {};
                        	var segNext = [];
                        	var order = [];
                        	var parent = [];
                        	var count = 0;

                        	for (var b = 0; b < segCount; b++)
                        	{
                        		segNext.push(0);
                        	}

                        	selected[getKey(srcP)] = true;
                        	var stack = [srcIndex];

                        	while (stack.length > 0)
                        	{
                        		var lp = pointsArr[stack[stack.length - 1]];
                        		var best = -1;

                        		// A point that is selected stays selected during the walk, so each
                        		// list is scanned once
                        		for (var k = 0; k < lp.segs.length; k++)
                        		{
                        			var b = lp.segs[k];
                        			var list = segPoints[b];

                        			while (segNext[b] < list.length && selected[getKey(pointsArr[list[segNext[b]]])])
                        			{
                        				segNext[b]++;
                        			}

                        			if (segNext[b] < list.length && (best < 0 || list[segNext[b]] < best))
                        			{
                        				best = list[segNext[b]];
                        			}
                        		}

                        		if (best >= 0)
                        		{
                        			selected[getKey(pointsArr[best])] = true;
                        			order[best] = count++;
                        			parent[best] = stack[stack.length - 1];
                        			stack.push(best);
                        		}
                        		else
                        		{
                        			stack.pop();
                        		}
                        	}

                        	return {order: order, parent: parent, complete: pointsArr.every(function(p)
                        	{
                        		return selected[getKey(p)];
                        	})};
                        };

                        // Each connector ends at the first point of the walk in its target. The
                        // walk is the same for all connectors (a walk per connector took N^2
                        // steps for N reports), unless the y correction of a route moves a point
                        // onto the coordinates of another point
                        var shared = true;
                        var moved = {};
                        var finite = isFinite(yCorrection);

                        for (var i = 0; i < pointsArr.length; i++)
                        {
                        	var p = pointsArr[i];
                        	var key = p.x + ',' + (p.y + yCorrection);
                        	var q = uniquePoints[key];
                        	shared = shared && !moved[key] && (q == null || q == p);
                        	moved[key] = true;
                        	finite = finite && isFinite(p.x) && isFinite(p.y);
                        }

                        // y of the points before the y correction, which moves a point up by d
                        // once at most. findPoint needs finite coordinates, which keep the order
                        // of pointsArr.
                        var ys = pointsArr.map(function(p) { return p.y; });
                        var d = -yCorrection;

                        // First index in pointsArr at or after the given point in the order of
                        // pointsArr (by y, then x)
                        function findPoint(x, y)
                        {
                        	var lo = 0, hi = pointsArr.length;

                        	while (lo < hi)
                        	{
                        		var mid = (lo + hi) >> 1;

                        		if (ys[mid] < y || (ys[mid] == y && pointsArr[mid].x < x))
                        		{
                        			lo = mid + 1;
                        		}
                        		else
                        		{
                        			hi = mid;
                        		}
                        	}

                        	return lo;
                        };

                        // Index of the first point of the walk in the given geometry or -1 (the
                        // points of the routes so far are corrected)
                        function getTargetPoint(w, geo)
                        {
                        	var best = -1;

                        	function visit(i)
                        	{
                        		if (w.order[i] != null && pointOnCell(geo, pointsArr[i]) &&
                        			(best < 0 || w.order[i] < w.order[best]))
                        		{
                        			best = i;
                        		}
                        	};

                        	if (finite)
                        	{
                        		var i = findPoint(geo.x, geo.y);

                        		while (i < pointsArr.length && ys[i] <= geo.y + geo.height + d)
                        		{
                        			if (pointsArr[i].x < geo.x)
                        			{
                        				i = Math.max(i + 1, findPoint(geo.x, ys[i]));
                        			}
                        			else if (pointsArr[i].x > geo.x + geo.width)
                        			{
                        				i = Math.max(i + 1, findPoint(Infinity, ys[i]));
                        			}
                        			else
                        			{
                        				visit(i++);
                        			}
                        		}
                        	}
                        	else
                        	{
                        		for (var i = 0; i < pointsArr.length; i++)
                        		{
                        			visit(i);
                        		}
                        	}

                        	return best;
                        };

                        var w = null;

                    	for (var j = 0; j < outgoingEdge.length; j++)
                		{
                    		if (outgoingEdge[j].target != null)
                			{
                    			if (w == null || !shared)
                    			{
                    				w = walk();
                    			}

                    			var t = getTargetPoint(w, outgoingEdge[j].target.geometry);
                                var edgePoints = [];

                                if (t >= 0)
                                {
                                	for (var i = t; i != srcIndex; i = w.parent[i])
                                	{
                                		edgePoints.push(pointsArr[i]);
                                	}

                                	edgePoints.push(srcP);
                                	edgePoints.reverse();
                                }
                                else if (!w.complete)
                                {
                                	// Like the walk per connector, which threw when it came back to
                                	// srcP and some points were not selected
                                	throw new Error('Unreachable target');
                                }

                                //Remove retracted points TODO can we do it in a better way?
                                if (edgePoints.length > 2)
                                {
	                                var spX = edgePoints[0].x;
	                                var lpX = edgePoints[edgePoints.length - 1].x;
	                                
	                                for (var i = edgePoints.length - 2; i > 0; i--)
	                            	{
	                                	if ((spX > lpX && edgePoints[i].x < lpX) || (spX < lpX && edgePoints[i].x < spX))
	                            		{
	                                		edgePoints.splice(i, 1);
	                            		}
	                            	}
                                }
                                
                                var eGeo = outgoingEdge[j].geometry.clone();
                                eGeo.points = edgePoints;
                                RPOrgChart.graph.model.setGeometry(outgoingEdge[j], eGeo);
                                
                                //Fix edge points and style
                                adjustEdgeGeoAndStyle(outgoingEdge[j], edgePoints);
                			}
                		}                            
            		}
                }

                return true;
            }

            diagram.getVisualTree().IterateParentFirst(visitorVertexFunc);
            diagram.getVisualTree().IterateParentFirst(visitorEdgeFunc);
			
			//Cleanup
			for (var i = 0; i < pointsList.length; i++)
			{
				delete pointsList[i].segs;
				delete pointsList[i].corrected;
			}
        }

    }
});

Bridge.init();
