/**
 * Copyright (c) 2006-2026, JGraph Holdings Ltd
 */

//**********************************************************************************************************************************************************
//Atlassian app icon: rounded-square or hexagonal tile (tileShape) with a glyph stencil painted in the style fillColor, optionally extended into a logo lockup (icon + wordmark stencils in one shape)
//**********************************************************************************************************************************************************
/**
* Extends mxShape.
*/
function mxShapeAtlassian2Icon(bounds, fill, stroke, strokewidth)
{
	mxShape.call(this);
	this.bounds = bounds;
	this.fill = fill;
	this.stroke = stroke;
	this.strokewidth = (strokewidth != null) ? strokewidth : 1;
};

/**
* Extends mxShape.
*/
mxUtils.extend(mxShapeAtlassian2Icon, mxShape);

mxShapeAtlassian2Icon.prototype.customProperties = [
	// all primary colors -> rows in the Style panel; the tile is toggled via
	// the Tile Color checkbox (no separate visibility key: a tile without a
	// color does not exist). tileShape selects the tile GEOMETRY only. NOT
	// primary: enums render in the Property section only. COMPAT INVARIANT:
	// the default must remain 'square' forever and non-default shapes are
	// written explicitly into styles, so key-less diagrams keep rendering
	// identically.
	{name: 'tileShape', dispName: 'Tile Shape', type: 'enum', defVal: 'square',
		enumList: [{val: 'square', dispName: 'Rounded Square'}, {val: 'hex', dispName: 'Hexagon'}]},
	{name: 'tileColor', dispName: 'Tile Color', type: 'color', defVal: '#1868DB', primary: true},
	{name: 'tileOutlineColor', dispName: 'Tile Outline', type: 'color', defVal: '#DDDEE1', primary: true},
	{name: 'wordmarkColor', dispName: 'Text Color', type: 'color', defVal: '#101214', primary: true},
	// the glyph's scale, canonical to the rounded square (1 = square-native
	// size on any tile shape). Paint-only, about the cell/slot center, and
	// deliberately NOT coupled into the tile on/off resize factors — the
	// tile-off cell hugs the AUTHORED ink. Hex sidebar entries ship an
	// explicit value (HEX_GLYPH_FACTOR, or a per-icon atlassian2HexScale
	// calibration) and the Tile Shape toggle maintains it; the defVal only
	// seeds the Property row for key-less styles
	{name: 'glyphScale', dispName: 'Icon Scale', type: 'float', min: 0, defVal: 1}
];

mxShapeAtlassian2Icon.prototype.cst = {
		SHAPE_ICON : 'mxgraph.atlassian2.icon'
};

// width over height of the reference agent hexagon (identical in both
// upstream icons); the cell geometry of hex icons is authored at this aspect
mxShapeAtlassian2Icon.HEX_ASPECT = 0.8971;

// the UNIFORM hex-native Icon Scale. glyphScale is canonical to the rounded
// square (1 = square-native size on any shape; hex glyph geometry is
// pipeline-normalized to that base — KEEP IN SYNC with the converter's
// HEX_GLYPH_FACTOR). The value equals HEX_ASPECT because that is upstream's
// own design rule: the agent hexagon scales the product glyph by exactly the
// tile-width ratio (verified on jira-coding-agent vs jira to 0.1%). The
// acting value is always EXPLICIT in the style: hex sidebar entries ship
// glyphScale at this constant — or at a per-icon derived calibration, baked
// as the glyph stencil's 'hexscale' attribute, where upstream deviates from
// its own rule (rovo-dev-agent, 0.98) — and the Tile Shape toggle
// (styleChanged) moves it between the shapes' defaults
// proportion-preservingly. Paint itself has no shape-dependent default.
mxShapeAtlassian2Icon.HEX_GLYPH_FACTOR = 0.8971;

/**
* Function: paintVertexShape
*
* Paints the vertex shape.
*/
mxShapeAtlassian2Icon.prototype.paintVertexShape = function(c, x, y, w, h)
{
	// like mxNetworks2: a missing tile color means NO tile — the customProperties
	// defVal only seeds the panel swatch, sidebar styles always set it explicitly
	var tileColor = mxUtils.getColorValue(this.style, 'tileColor', 'none');
	var tileVisible = tileColor != 'none';
	var wordmark = mxUtils.getValue(this.style, 'atlassian2Wordmark', null);
	// lockup: the icon occupies the left slot at the tile's natural aspect
	// (hex tiles are narrower than square ones), the wordmark the rest.
	// atlassian2LockupBox = "k yOff" (set-authored) covers lockups whose text
	// ink rises above or dips below the icon block (descenders, taller caps —
	// e.g. Jira Align, where the text is 1.47x the mark height): the CELL is
	// the full lockup ink box, k = inkHeight/iconHeight, so the icon block
	// renders h/k tall with its top at yOff icon-heights. Absent = "1 0",
	// the icon block IS the ink box (the previous behavior).
	var ih = h;
	var iy = 0;

	if (wordmark != null)
	{
		var lb = String(mxUtils.getValue(this.style, 'atlassian2LockupBox', '1 0')).split(' ');
		var k = parseFloat(lb[0]);
		ih = (isNaN(k) || k <= 0) ? h : h / k;
		var yo = parseFloat(lb[1] || 0);
		iy = (isNaN(yo)) ? 0 : ih * yo;
	}

	var iw = (wordmark != null) ? Math.min(w, ih * this.tileAspect()) : w;
	c.translate(x, y);

	if (tileVisible)
	{
		this.background(c, 0, iy, iw, ih, tileColor);
	}

	c.setShadow(false);
	this.foreground(c, 0, iy, iw, ih, tileVisible, wordmark != null);

	if (wordmark != null)
	{
		this.wordmark(c, ih, wordmark, iw, iy);
	}
};

/**
* Function: iconData
*
* Per-icon DATA with a style-key override: the style key wins when present
* (power-user escape hatch), else the same-meaning attribute on the glyph
* stencil's root node — the pipeline bakes ink / tile / hexscale attributes
* into the stencils, so calibration travels with the glyph and an icon
* swapped by hand in Edit Style brings its own data along. Null when neither
* source has a value.
*/
mxShapeAtlassian2Icon.prototype.iconData = function(style, stencil, styleKey, attr)
{
	var v = mxUtils.getValue(style, styleKey, null);

	if (v == null && stencil != null && stencil.desc != null)
	{
		v = stencil.desc.getAttribute(attr);
	}

	return (v != null && v != '') ? String(v) : null;
};

/**
* Function: parseBox
*
* Parses "x y w h" into an array; null for malformed or non-positive
* dimensions (degenerate boxes would divide into Infinity coordinates).
*/
mxShapeAtlassian2Icon.prototype.parseBox = function(s)
{
	if (s == null)
	{
		return null;
	}

	var b = String(s).split(' ');
	var box = [parseFloat(b[0]), parseFloat(b[1]), parseFloat(b[2]), parseFloat(b[3])];

	return (isNaN(box[0]) || isNaN(box[1]) || !(box[2] > 0) || !(box[3] > 0)) ? null : box;
};

/**
* Function: parseLayout
*
* Parses a lockup layout "gap textHeight verticalOffset" (all relative to
* the icon height) into an array, substituting the set defaults for
* missing or malformed values and a non-positive text height, so the
* wordmark never receives NaN coordinates.
*/
mxShapeAtlassian2Icon.prototype.parseLayout = function(s)
{
	var l = String((s != null) ? s : '').split(' ');
	var gap = parseFloat(l[0]);
	var th = parseFloat(l[1]);
	var vOff = parseFloat(l[2]);

	return [(isNaN(gap)) ? 0.3 : gap, (isNaN(th) || th <= 0) ? 0.65 : th,
		(isNaN(vOff)) ? 0 : vOff];
};

/**
* Function: tileBounds
*
* The tile's own bbox within the glyph stencil canvas, "x y w h" in
* stencil-canvas units: the stencil's 'tile' attribute (baked by the
* pipeline for AUTHORED hex agents, i.e. rovo-dev-agent) or an
* atlassian2TileBounds style override; product-glyph agents and icons
* switched to hex use the synthesized centered box below. Null means the
* tile IS the canvas (square tiles).
*/
mxShapeAtlassian2Icon.prototype.tileBounds = function(stencil)
{
	// only meaningful while the CURRENT shape is hex: the data describes the
	// hex tile's box, and with a square tile the canvas IS the tile (identity
	// mapping) — authored hex data must not leak into other shapes after a
	// Tile Shape switch (it would inflate the glyph by canvas/tile = 1.115)
	if (mxUtils.getValue(this.style, 'tileShape', 'square') != 'hex')
	{
		return null;
	}

	// a malformed/degenerate box falls through to the synthesized default
	var box = this.parseBox(this.iconData(this.style, stencil, 'atlassian2TileBounds', 'tile'));

	if (box != null)
	{
		return box;
	}

	// no explicit bounds but a hex shape (an icon switched via the Tile Shape
	// property): synthesize the centered default hex box so the glyph mapping
	// and toggle factors stay correct for ANY icon, not just the agents
	if (stencil != null && mxUtils.getValue(this.style, 'tileShape', 'square') == 'hex')
	{
		var bw = stencil.h0 * mxShapeAtlassian2Icon.HEX_ASPECT;

		return [(stencil.w0 - bw) / 2, 0, bw, stencil.h0];
	}

	return null;
};

/**
* Function: tileAspect
*
* Width over height of the tile: explicit atlassian2TileBounds when present,
* else the built-in aspect of the current tile shape. Used for the lockup
* icon slot, which needs no stencil.
*/
mxShapeAtlassian2Icon.prototype.tileAspect = function()
{
	// same shape gate as tileBounds: a square tile is always square
	if (mxUtils.getValue(this.style, 'tileShape', 'square') != 'hex')
	{
		return 1;
	}

	// same degenerate-box guard as tileBounds: a malformed or zero-size
	// override would divide into NaN/Infinity slot widths
	var box = this.parseBox(mxUtils.getValue(this.style, 'atlassian2TileBounds', null));

	if (box != null)
	{
		return box[2] / box[3];
	}

	return mxShapeAtlassian2Icon.HEX_ASPECT;
};

mxShapeAtlassian2Icon.prototype.background = function(c, x, y, w, h, tileColor)
{
	// like mxNetworks2: the tile honors the standard gradient style rows
	var gradientColor = mxUtils.getColorValue(this.style, mxConstants.STYLE_GRADIENTCOLOR, 'none');
	var gradientDir = mxUtils.getValue(this.style, 'gradientDirection', 'south');

	var outlineColor = mxUtils.getColorValue(this.style, 'tileOutlineColor', 'none');

	if (gradientColor == 'none')
	{
		c.setFillColor(tileColor);
	}
	else
	{
		c.setGradient(tileColor, gradientColor, 0, 0, w, h, gradientDir);
	}

	if (outlineColor != 'none')
	{
		// reference form (DC family): border 1/24 of the tile, inset by half
		// its width so it stays inside the bounds
		var bw = Math.max(1, w / 24);
		var inset = bw / 2;
		c.setStrokeColor(outlineColor);
		c.setStrokeWidth(bw);
		this.tilePath(c, x, y, w, h, inset);
		c.fillAndStroke();

		// restore the style stroke so the glyph stencil strokes independently
		// (Line in the UI strokes the icon, not the tile)
		c.setStrokeColor(this.stroke);
		c.setStrokeWidth(this.strokewidth);
	}
	else
	{
		this.tilePath(c, x, y, w, h, 0);
		c.fill();
	}
};

/**
* Function: tilePath
*
* Single definition of the tile geometry: the upstream app tile — a rounded
* square with corner radius 6/24 of the tile size — or the agents' pointy-top
* rounded hexagon, optionally inset for a border. A future tile shape variant
* (e.g. a round tile, should Atlassian ever ship one) needs: a branch HERE
* keyed on a new tileShape enum value, that value's Tile Shape enum entry,
* and a corner offset in getConstraints. COMPAT INVARIANT (see tileShape in
* customProperties): 'square' stays the key-less default forever and new
* shapes are written explicitly into styles, so diagrams saved before such
* an addition keep rendering exactly like today.
*/
mxShapeAtlassian2Icon.prototype.tilePath = function(c, x, y, w, h, inset)
{
	if (mxUtils.getValue(this.style, 'tileShape', 'square') == 'hex')
	{
		// upstream agent tile: pointy-top rounded hexagon, corner radius
		// 0.1146 of the tile height (identical in both reference icons). It
		// FILLS the bounds — the natural width/height aspect (0.8971) comes
		// from the authored cell geometry and the tile box (authored
		// atlassian2TileBounds or the synthesized default in tileBounds), so
		// hex cells hug the tile with no side margins
		var hh = h - 2 * inset;
		var hw = w - 2 * inset;
		var r = Math.max(0, hh * 0.1146 - inset * 0.5);
		var cx = x + w / 2;
		var y0 = y + inset;
		var pts = [[cx, y0], [cx + hw / 2, y0 + hh / 4], [cx + hw / 2, y0 + 3 * hh / 4],
			[cx, y0 + hh], [cx - hw / 2, y0 + 3 * hh / 4], [cx - hw / 2, y0 + hh / 4]];
		// per edge: trim the tangent length of a 120 degree corner
		// (r / tan(60deg)) off both ends, then join edges with corner arcs
		var t = r / Math.sqrt(3);
		var seg = [];

		for (var i = 0; i < 6; i++)
		{
			var p = pts[i];
			var n = pts[(i + 1) % 6];
			var dx = n[0] - p[0];
			var dy = n[1] - p[1];
			var len = Math.sqrt(dx * dx + dy * dy);
			seg.push([p[0] + dx * t / len, p[1] + dy * t / len,
				n[0] - dx * t / len, n[1] - dy * t / len]);
		}

		c.begin();
		c.moveTo(seg[0][0], seg[0][1]);

		for (var i = 0; i < 6; i++)
		{
			c.lineTo(seg[i][2], seg[i][3]);
			var nx = seg[(i + 1) % 6];
			c.arcTo(r, r, 0, 0, 1, nx[0], nx[1]);
		}

		c.close();
	}
	else
	{
		c.roundrect(x + inset, y + inset, w - 2 * inset, h - 2 * inset,
			w * 0.25 - inset, h * 0.25 - inset);
	}
};

mxShapeAtlassian2Icon.prototype.foreground = function(c, x, y, w, h, tileVisible, inLockup)
{
	var stencilName = mxUtils.getValue(this.style, 'atlassian2Icon', null);
	var stencil = null;

	if (stencilName != null)
	{
		stencil = mxStencilRegistry.getStencil(stencilName);
	}

	if (stencil != null)
	{
		// missing fill = unchecked Fill row: standard fill-none semantics
		// (the canvas maps 'none' to null), so the glyph goes invisible or
		// stroke-only when Line is set — same as any other shape
		c.setFillColor(mxUtils.getColorValue(this.style, mxConstants.STYLE_FILLCOLOR, 'none'));

		// in a lockup the icon square never rescales to the ink bounds — the
		// wordmark position depends on the fixed square
		var dx, dy, dw, dh;

		if (tileVisible || inLockup)
		{
			var tb = this.tileBounds(stencil);

			if (tb != null)
			{
				// hex tiles are narrower than their canvas: map the tile bbox
				// onto the bounds so the cell hugs the tile with no margins
				// (paint and cell geometry compensate together)
				dx = x - tb[0] * w / tb[2];
				dy = y - tb[1] * h / tb[3];
				dw = w * stencil.w0 / tb[2];
				dh = h * stencil.h0 / tb[3];
			}
			else
			{
				// glyphs are authored in tile coordinates, so with a square
				// tile they paint across the full bounds
				dx = x; dy = y; dw = w; dh = h;
			}
		}
		else
		{
			// no tile: map the glyph's real ink bbox (the stencil's 'ink'
			// attribute, style-overridable as atlassian2IconBounds) onto the
			// bounds, so the cell hugs the visible glyph with no padding —
			// together with the geometry scale in styleChanged the glyph
			// keeps its absolute size when the tile is toggled; 4 4 16 16 is
			// the app-glyph norm fallback
			var box = this.parseBox(this.iconData(this.style, stencil,
				'atlassian2IconBounds', 'ink')) || [4, 4, 16, 16];
			var bx = box[0];
			var by = box[1];
			var bw = box[2];
			var bh = box[3];
			dx = x - bx * w / bw;
			dy = y - by * h / bh;
			dw = w * stencil.w0 / bw;
			dh = h * stencil.h0 / bh;
		}

		// glyphScale is canonical to the ROUNDED SQUARE: 1 renders the
		// square-native glyph size on ANY tile shape, and the value in the
		// style is the value that acts — no hidden shape defaults. Hex
		// sidebar entries carry an explicit glyphScale (HEX_GLYPH_FACTOR, or
		// the icon's atlassian2HexScale calibration) and the Tile Shape
		// toggle maintains it in styleChanged. Paint-only, about the
		// cell/slot center (see the customProperties note).
		var gs = parseFloat(mxUtils.getValue(this.style, 'glyphScale', 1));
		gs = (isNaN(gs)) ? 1 : gs;

		if (gs != 1)
		{
			dx = (x + w / 2) + (dx - (x + w / 2)) * gs;
			dy = (y + h / 2) + (dy - (y + h / 2)) * gs;
			dw *= gs;
			dh *= gs;
		}

		stencil.drawShape(c, this, dx, dy, dw, dh);
	}
};

/**
* Function: wordmark
*
* Paints the wordmark stencil to the right of the icon square. Layout comes
* from atlassian2Lockup = "gap textHeight verticalOffset", all relative to
* the icon height; the text aspect comes from the stencil itself. An optional
* BRAND segment (atlassian2Wordmark2 + atlassian2Lockup2, same layout format)
* sits between the icon and the wordmark and follows the FILL color like the
* mark it belongs to — e.g. the blue "Atlassian" in the Marketplace lockup;
* the pipeline then measures the main gap from that segment's right edge.
*/
mxShapeAtlassian2Icon.prototype.wordmark = function(c, h, wordmark, iw, iy)
{
	var stencil = mxStencilRegistry.getStencil(wordmark);
	iy = iy || 0;

	if (stencil != null)
	{
		var lk = this.parseLayout(mxUtils.getValue(this.style, 'atlassian2Lockup', null));
		var gap = lk[0];
		var th = h * lk[1];
		var vOff = lk[2];
		var tw = th * stencil.w0 / stencil.h0;
		var x = iw;
		var wm2 = mxUtils.getValue(this.style, 'atlassian2Wordmark2', null);
		var stencil2 = (wm2 != null) ? mxStencilRegistry.getStencil(wm2) : null;

		if (stencil2 != null)
		{
			var lk2 = this.parseLayout(mxUtils.getValue(this.style, 'atlassian2Lockup2', null));
			var th2 = h * lk2[1];
			var tw2 = th2 * stencil2.w0 / stencil2.h0;
			c.setFillColor(mxUtils.getColorValue(this.style, mxConstants.STYLE_FILLCOLOR, 'none'));
			stencil2.drawShape(c, this, x + h * lk2[0],
				iy + h * (0.5 + lk2[2]) - th2 / 2, tw2, th2);
			x += h * lk2[0] + tw2;
		}

		// missing text color = unchecked Text Color row -> invisible wordmark
		// (or stroke-only when Line is set), same semantics as the Fill row
		c.setFillColor(mxUtils.getColorValue(this.style, 'wordmarkColor', 'none'));
		// the pipeline measures the gap from the tile's right edge (or the
		// brand segment's right edge), so the wordmark starts after the icon
		// slot (h for square tiles, narrower for hex) plus the gap; h and iy
		// here are the ICON BLOCK's height and top (see atlassian2LockupBox)
		stencil.drawShape(c, this, x + h * gap, iy + h * (0.5 + vOff) - th / 2, tw, th);
	}
};

/**
* Function: getConstraints
*
* Fixed connection points, following the visible silhouette: on a tile the
* four exact cardinals, one point per corner halfway on the rounding, and
* the center (9). Tile off: the glyph stencil's own silhouette points
* (exact axis intersections for N/S/E/W, ray-cast diagonals, center where
* the artwork covers it), remapped into the ink bounds.
*/
mxShapeAtlassian2Icon.prototype.getConstraints = function(style, w, h)
{
	var tileColor = mxUtils.getColorValue(style, 'tileColor', 'none');
	var constr = [];

	// lockups connect on their overall box
	if (mxUtils.getValue(style, 'atlassian2Wordmark', null) != null)
	{
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false));
		constr.push(new mxConnectionConstraint(new mxPoint(0.5, 0), false));
		constr.push(new mxConnectionConstraint(new mxPoint(1, 0), false));
		constr.push(new mxConnectionConstraint(new mxPoint(1, 0.5), false));
		constr.push(new mxConnectionConstraint(new mxPoint(1, 1), false));
		constr.push(new mxConnectionConstraint(new mxPoint(0.5, 1), false));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 1), false));
		constr.push(new mxConnectionConstraint(new mxPoint(0, 0.5), false));

		return constr;
	}

	function add(x, y, name)
	{
		var mc = new mxConnectionConstraint(new mxPoint(
			Math.round(x * 1000) / 1000, Math.round(y * 1000) / 1000), false);
		mc.name = name;
		constr.push(mc);
	};

	if (tileColor != 'none')
	{
		if (mxUtils.getValue(style, 'tileShape', 'square') == 'hex')
		{
			// hexagon tile fills the bounds: top/bottom points, the vertical
			// edges at mid-height, the four slope-edge midpoints, the center
			add(0.5, 0, 'N');
			add(1, 0.5, 'E');
			add(0.5, 1, 'S');
			add(0, 0.5, 'W');
			add(0.75, 0.125, 'NE');
			add(0.75, 0.875, 'SE');
			add(0.25, 0.875, 'SW');
			add(0.25, 0.125, 'NW');
		}
		else
		{
			// exact cardinals plus ONE point per corner, halfway on the
			// rounding (45 degrees on the corner arc), and the center
			add(0.5, 0, 'N');
			add(1, 0.5, 'E');
			add(0.5, 1, 'S');
			add(0, 0.5, 'W');

			// 45-degree offset from the corner arc center: r * (1 - 1/sqrt(2)),
			// r = 0.25 on the rounded tile
			var d = 0.25 * (1 - Math.SQRT1_2);
			add(1 - d, d, 'NE');
			add(1 - d, 1 - d, 'SE');
			add(d, 1 - d, 'SW');
			add(d, d, 'NW');
		}

		add(0.5, 0.5, 'C');
	}
	else
	{
		// no tile: use the silhouette support points stored in the glyph
		// stencil's connections, remapped from stencil-canvas coordinates
		// into the ink bounds the cell hugs in this mode
		var stencilName = mxUtils.getValue(style, 'atlassian2Icon', null);
		var stencil = (stencilName != null) ? mxStencilRegistry.getStencil(stencilName) : null;
		var box = this.parseBox(this.iconData(style, stencil, 'atlassian2IconBounds', 'ink'));

		if (stencil != null && stencil.constraints != null && box != null)
		{
			var bx = box[0];
			var by = box[1];
			var bw = box[2];
			var bh = box[3];

			for (var i = 0; i < stencil.constraints.length; i++)
			{
				var cp = stencil.constraints[i].point;
				var mc = new mxConnectionConstraint(new mxPoint(
					Math.min(1, Math.max(0, (cp.x * stencil.w0 - bx) / bw)),
					Math.min(1, Math.max(0, (cp.y * stencil.h0 - by) / bh))), false);
				mc.name = stencil.constraints[i].name;
				constr.push(mc);
			}
		}
		else
		{
			constr.push(new mxConnectionConstraint(new mxPoint(0, 0), false));
			constr.push(new mxConnectionConstraint(new mxPoint(0.5, 0), false));
			constr.push(new mxConnectionConstraint(new mxPoint(1, 0), false));
			constr.push(new mxConnectionConstraint(new mxPoint(1, 0.5), false));
			constr.push(new mxConnectionConstraint(new mxPoint(1, 1), false));
			constr.push(new mxConnectionConstraint(new mxPoint(0.5, 1), false));
			constr.push(new mxConnectionConstraint(new mxPoint(0, 1), false));
			constr.push(new mxConnectionConstraint(new mxPoint(0, 0.5), false));
		}
	}

	return constr;
};

/**
* Function: styleChanged
*
* Called by mxGraph.setCellStyles for every style write (like mxNetworks2).
* Three responsibilities: restore memory for this shape's own color
* checkboxes; resize the cell and maintain glyphScale when the Tile Shape
* toggles (proportion-preserving, per-icon defaults); resize the cell by the
* per-icon ink/tile factors when the tile is toggled off/on via the Tile
* Color checkbox (16/24 is only the fallback for styles without
* atlassian2IconBounds). state.style still carries the previous values here.
*/
mxShapeAtlassian2Icon.prototype.styleChanged = function(key, value, state)
{
	// Restore memory for this shape's OWN color checkboxes (tileColor,
	// tileOutlineColor, wordmarkColor): the Format panel rebuilds its rows
	// after every change, losing the built-in "re-check restores the previous
	// color" closure state, so re-enabling would always apply the row default.
	// The shape instance survives style changes (same technique as
	// prevNetwork2BgColor in mxNetworks2): remember the color on uncheck and
	// rewrite the incoming default on re-check (session-only by design; the
	// swatch is hidden while unchecked, so the checkbox is the only regular
	// write path — a manual Edit Style change in that window is overridden
	// once, acceptable edge). STANDARD keys (fillColor etc.) are deliberately
	// NOT covered: shared Format panel behavior must stay uniform across all
	// shapes, so that fix belongs upstream in the panel. This block is a
	// candidate for hoisting into the shared custom-properties picker — sets
	// with custom color properties would then inherit it declaratively.
	if (key == 'tileColor' || key == 'tileOutlineColor' || key == 'wordmarkColor')
	{
		var prevField = 'prev_' + key;
		var prevValue = mxUtils.getColorValue(state.style, key, 'none');

		if (value == null || value == 'none')
		{
			if (prevValue != 'none')
			{
				this[prevField] = prevValue;
			}
		}
		else if (this[prevField] != null)
		{
			var restore = this[prevField];
			this[prevField] = null;

			if (value != restore)
			{
				// re-enters styleChanged, which then performs the resize once
				state.view.graph.setCellStyles(key, restore, [state.cell]);
				return;
			}
		}
	}

	// shape toggle: a hex tile is HEX_ASPECT as wide as a square one, so the
	// cell width follows the shape (paint and geometry compensate together,
	// same contract as the tile on/off toggle) — lockups adjust by the icon
	// slot delta instead, keeping the wordmark block intact
	if (key == 'tileShape')
	{
		var oldShape = mxUtils.getValue(state.style, 'tileShape', 'square');
		var newShape = (value != null && value != '') ? value : 'square';

		if (oldShape != newShape)
		{
			var graph = state.view.graph;
			var geometry = graph.getCellGeometry(state.cell);
			var oldA = (oldShape == 'hex') ? mxShapeAtlassian2Icon.HEX_ASPECT : 1;
			var newA = (newShape == 'hex') ? mxShapeAtlassian2Icon.HEX_ASPECT : 1;

			if (geometry != null && graph.getModel().isVertex(state.cell) && oldA != newA)
			{
				geometry = geometry.clone();

				if (mxUtils.getValue(state.style, 'atlassian2Wordmark', null) != null)
				{
					// the slot height is the ICON BLOCK, cell height / k
					// when the lockup ink box exceeds the icon block
					var lb = String(mxUtils.getValue(state.style,
						'atlassian2LockupBox', '1 0')).split(' ');
					var bk = parseFloat(lb[0]);
					bk = (isNaN(bk) || bk <= 0) ? 1 : bk;
					geometry.width += (geometry.height / bk) * (newA - oldA);
				}
				else
				{
					var f = newA / oldA;
					geometry.x += geometry.width * (1 - f) / 2;
					geometry.width *= f;
				}

				graph.getModel().setGeometry(state.cell, geometry);
			}

			// glyphScale is canonical to the square (see foreground) and the
			// acting value always lives in the style. The toggle is
			// PROPORTION-PRESERVING: while the value sits at the old shape's
			// default, switching writes the new shape's default so the mark
			// keeps its mark-to-tile ratio — it scales exactly as much as
			// the tile does. Defaults are per icon: hexDef comes from the
			// glyph stencil's 'hexscale' calibration attribute (0.98 on
			// rovo-dev-agent whose mark runs over the family rule; style key
			// atlassian2HexScale overrides; uniform HEX_GLYPH_FACTOR
			// otherwise) and squareDef = hexDef / the factor — 1 for
			// uncalibrated icons, 1.0924 for rovo-dev-agent. A customized
			// value is the user's and stays verbatim (its square-canonical
			// meaning is shape-independent), so an explicit 1 — the
			// family-rule square inset — survives switching.
			var iconStencilName = mxUtils.getValue(state.style, 'atlassian2Icon', null);
			var iconStencil = (iconStencilName != null) ?
				mxStencilRegistry.getStencil(iconStencilName) : null;
			var iconHex = parseFloat(this.iconData(state.style, iconStencil,
				'atlassian2HexScale', 'hexscale'));
			iconHex = (isNaN(iconHex)) ? mxShapeAtlassian2Icon.HEX_GLYPH_FACTOR : iconHex;
			var hexDef = iconHex;
			var squareDef = iconHex / mxShapeAtlassian2Icon.HEX_GLYPH_FACTOR;
			var gs = parseFloat(mxUtils.getValue(state.style, 'glyphScale', 1));
			gs = (isNaN(gs)) ? 1 : gs;
			var oldDef = (oldShape == 'hex') ? hexDef : squareDef;
			var newDef = (newShape == 'hex') ? hexDef : squareDef;

			if (Math.abs(gs - oldDef) < 0.0005)
			{
				// re-enters styleChanged for glyphScale — a no-op key there
				state.view.graph.setCellStyles('glyphScale',
					(Math.abs(newDef - 1) < 0.0005) ? null :
					String(Math.round(newDef * 10000) / 10000), [state.cell]);
			}
		}
	}

	if (key == 'tileColor')
	{
		var oldColor = mxUtils.getColorValue(state.style, 'tileColor', 'none');
		var oldVisible = oldColor != 'none';
		var newVisible = value != null && value != 'none';

		// lockup cells keep their geometry: the icon square is fixed and the
		// glyph never rescales to ink bounds there
		if (oldVisible != newVisible &&
			mxUtils.getValue(state.style, 'atlassian2Wordmark', null) == null)
		{
			var graph = state.view.graph;
			var geometry = graph.getCellGeometry(state.cell);
			var fw = 16 / 24;
			var fh = 16 / 24;
			var stencilName = mxUtils.getValue(state.style, 'atlassian2Icon', null);
			var stencil = (stencilName != null) ? mxStencilRegistry.getStencil(stencilName) : null;
			var box = this.parseBox(this.iconData(state.style, stencil,
				'atlassian2IconBounds', 'ink'));

			// per-icon ink bbox -> the tile-less cell takes the glyph's
			// natural bounds (and natural aspect ratio)
			if (stencil != null && box != null)
			{
				// the tile-on cell hugs the TILE bbox (narrower than the
				// canvas for hex), so the toggle factor is ink over tile —
				// not ink over canvas — or absolute sizes would drift
				var tb = this.tileBounds(stencil);
				fw = box[2] / ((tb != null) ? tb[2] : stencil.w0);
				fh = box[3] / ((tb != null) ? tb[3] : stencil.h0);
			}

			if (geometry != null && graph.getModel().isVertex(state.cell))
			{
				geometry = geometry.clone();
				var sw = (newVisible) ? 1 / fw : fw;
				var sh = (newVisible) ? 1 / fh : fh;
				geometry.x += geometry.width * (1 - sw) / 2;
				geometry.y += geometry.height * (1 - sh) / 2;
				geometry.width *= sw;
				geometry.height *= sh;
				graph.getModel().setGeometry(state.cell, geometry);
			}
		}
	}
};

mxCellRenderer.registerShape(mxShapeAtlassian2Icon.prototype.cst.SHAPE_ICON, mxShapeAtlassian2Icon);
