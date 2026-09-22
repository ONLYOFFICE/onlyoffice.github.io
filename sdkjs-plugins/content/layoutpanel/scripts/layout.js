/**
 * OO-Layout Plugin – scripts/layout.js
 *
 * Provides a right-panel UI for the Presentation (slide) editor that
 * consolidates size, position, rotation, alignment and distribution
 * controls that are otherwise scattered across menus.
 *
 * Coordinate / size unit used by the DocBuilder API: 1/36000 of a cm (EMU).
 * For display we convert to millimetres (1 mm = 36000 EMU).
 */

(function () {
  "use strict";

  // ─── Constants ─────────────────────────────────────────────────────────────

  /** 1 mm in EMU */
  var MM_TO_EMU = 36000;

  // ─── State ─────────────────────────────────────────────────────────────────

  /**
   * @type {{ x: number, y: number, w: number, h: number, rot: number,
   *          id: string|null }[]}
   */
  var selectedObjects = [];

  /** Aspect ratio of the first selected object (w/h), null when not locked */
  var aspectRatio = null;

  /** Prevent overlapping refresh calls that can lag/freeze the panel */
  var refreshInFlight = false;
  var refreshQueued = false;
  var refreshTimer = null;

  // ─── DOM references ────────────────────────────────────────────────────────

  var elSelectionStatus = document.getElementById("selection-status");
  var elControls        = document.getElementById("layout-controls");
  var elSectionSize     = document.getElementById("section-size");
  var elSectionPosition = document.getElementById("section-position");
  var elSectionRotation = document.getElementById("section-rotation");
  var elSectionAlign    = document.getElementById("section-align");
  var elSectionDistrib  = document.getElementById("section-distribute");
  var elWidth           = document.getElementById("input-width");
  var elHeight          = document.getElementById("input-height");
  var elX               = document.getElementById("input-x");
  var elY               = document.getElementById("input-y");
  var elRotation        = document.getElementById("input-rotation");
  var elLockAspect      = document.getElementById("lock-aspect");

  function getAlignTargetValue() {
    var checked = document.querySelector('input[name="align-target"]:checked');
    return checked && checked.value === "slide" ? "slide" : "selection";
  }

  function executeCommandAndRefresh(script) {
    window.Asc.plugin.callCommand(new Function(script), false, true, function () { // eslint-disable-line no-new-func
      loadSelectedDrawings(function (drawings) {
        var normalized = normalizeSelectedObjects(drawings);
        if (normalized.length > 0 && hasUsableMetrics(normalized[0])) {
          applySelection(normalized);
          return;
        }

        refreshSelection();
      });
    });
  }

  // ─── Helpers ───────────────────────────────────────────────────────────────

  function emuToMm(emu) {
    return Math.round(emu / MM_TO_EMU * 10) / 10; // one decimal place
  }

  function mmToEmu(mm) {
    return Math.round(parseFloat(mm) * MM_TO_EMU);
  }

  function setInputValue(el, value) {
    el.value = value !== null && value !== undefined ? value : "";
  }

  function normalizeKeyName(key) {
    return String(key || "").toLowerCase();
  }

  function findNestedPropertyValue(object, names) {
    var targets = [];
    var i;
    var queue;
    var seen;
    var found = null;

    for (i = 0; i < names.length; i++) {
      targets.push(normalizeKeyName(names[i]));
    }

    queue = [object];
    seen = [];

    while (queue.length > 0 && found === null) {
      var current = queue.shift();
      if (!current || typeof current !== "object") {
        continue;
      }

      if (seen.indexOf(current) !== -1) {
        continue;
      }
      seen.push(current);

      if (Array.isArray(current)) {
        queue.push.apply(queue, current);
        continue;
      }

      Object.keys(current).forEach(function (key) {
        if (found !== null) {
          return;
        }

        var normalizedKey = normalizeKeyName(key);
        if (targets.indexOf(normalizedKey) !== -1) {
          var value = current[key];
          if (value !== undefined && value !== null) {
            found = value;
          }
          return;
        }

        if (current[key] && typeof current[key] === "object") {
          queue.push(current[key]);
        }
      });
    }

    return found;
  }

  function getNumericProperty(object, names, fallback) {
    var i;
    for (i = 0; i < names.length; i++) {
      var value = findNestedPropertyValue(object, [names[i]]);
      if (value !== undefined && value !== null) {
        if (typeof value === "number" && !isNaN(value)) {
          return value;
        }

        if (typeof value === "string" && value.trim() !== "") {
          var parsed = parseFloat(value);
          if (!isNaN(parsed)) {
            return parsed;
          }
        }
      }
    }
    return fallback;
  }

  function getMethodNumericProperty(object, methodNames, fallback) {
    var i;
    for (i = 0; i < methodNames.length; i++) {
      var methodName = methodNames[i];
      if (object && typeof object[methodName] === "function") {
        try {
          var value = object[methodName]();
          if (typeof value === "number" && !isNaN(value)) {
            return value;
          }
          if (typeof value === "string" && value.trim() !== "") {
            var parsed = parseFloat(value);
            if (!isNaN(parsed)) {
              return parsed;
            }
          }
        } catch (error) {
          // Ignore getter failures and continue with other candidates.
        }
      }
    }
    return fallback;
  }

  function hasAnyMethod(object, methodNames) {
    var i;
    for (i = 0; i < methodNames.length; i++) {
      if (object && typeof object[methodNames[i]] === "function") {
        return true;
      }
    }
    return false;
  }

  function toNumber(value) {
    if (typeof value === "number" && !isNaN(value)) {
      return value;
    }

    if (typeof value === "string" && value.trim() !== "") {
      var parsed = parseFloat(value);
      return isNaN(parsed) ? null : parsed;
    }

    return null;
  }

  function getBoundsMetrics(value) {
    var bounds = {};
    var left;
    var top;
    var right;
    var bottom;
    var width;
    var height;

    if (Array.isArray(value) && value.length >= 4) {
      left = toNumber(value[0]);
      top = toNumber(value[1]);
      right = toNumber(value[2]);
      bottom = toNumber(value[3]);
      bounds = {
        Left: left,
        Top: top,
        Right: right,
        Bottom: bottom,
        X: left,
        Y: top,
        W: right !== null && left !== null ? right - left : null,
        H: bottom !== null && top !== null ? bottom - top : null
      };
    } else if (value && typeof value === "object") {
      bounds = value;
    }

    left = getNumericProperty(bounds, ["X", "Left", "x", "left"], null);
    top = getNumericProperty(bounds, ["Y", "Top", "y", "top"], null);
    right = getNumericProperty(bounds, ["Right", "R", "right", "r"], null);
    bottom = getNumericProperty(bounds, ["Bottom", "B", "bottom", "b"], null);
    width = getNumericProperty(bounds, ["Width", "W", "width", "w"], null);
    height = getNumericProperty(bounds, ["Height", "H", "height", "h"], null);

    if (width === null && left !== null && right !== null) {
      width = right - left;
    }

    if (height === null && top !== null && bottom !== null) {
      height = bottom - top;
    }

    return {
      x: left,
      y: top,
      w: width,
      h: height
    };
  }

  function isLineObject(object, typeName) {
    var fallbackName = String(typeName || "");
    if (/line|connector|curve|polyline|path/.test(fallbackName.toLowerCase())) {
      return true;
    }

    if (!object) {
      return false;
    }

    var hasLineEndpoints = hasAnyMethod(object, [
      "GetStartX", "GetStartY", "GetEndX", "GetEndY",
      "GetX1", "GetY1", "GetX2", "GetY2"
    ]);

    if (hasLineEndpoints) {
      return true;
    }

    return hasAnyMethod(object, ["GetPathW", "GetPathH"]) && hasAnyMethod(object, [
      "GetStartX", "GetStartY", "GetEndX", "GetEndY",
      "GetX1", "GetY1", "GetX2", "GetY2"
    ]);
  }

  function getLineMetrics(object, boundsValue) {
    var bounds = getBoundsMetrics(boundsValue || {});
    var startX = getMethodNumericProperty(object, ["GetStartX", "GetX1"], null);
    var startY = getMethodNumericProperty(object, ["GetStartY", "GetY1"], null);
    var endX = getMethodNumericProperty(object, ["GetEndX", "GetX2"], null);
    var endY = getMethodNumericProperty(object, ["GetEndY", "GetY2"], null);

    var x = null;
    var y = null;
    var w = null;
    var h = null;

    if (startX !== null && endX !== null) {
      x = Math.min(startX, endX);
      w = Math.abs(endX - startX);
    } else if (startX !== null) {
      x = startX;
    } else {
      x = bounds.x;
    }

    if (startY !== null && endY !== null) {
      y = Math.min(startY, endY);
      h = Math.abs(endY - startY);
    } else if (startY !== null) {
      y = startY;
    } else {
      y = bounds.y;
    }

    if (w === null) {
      w = bounds.w;
    }

    if (h === null) {
      h = bounds.h;
    }

    return {
      x: x,
      y: y,
      w: w,
      h: h
    };
  }

  function getNestedNumericProperty(object, paths) {
    var i;
    for (i = 0; i < paths.length; i++) {
      var path = paths[i];
      var current = object;
      var j;
      for (j = 0; j < path.length; j++) {
        if (!current || current[path[j]] === undefined || current[path[j]] === null) {
          current = null;
          break;
        }
        current = current[path[j]];
      }

      if (typeof current === "number" && !isNaN(current)) {
        return current;
      }
    }

    return null;
  }

  function getObjectMetrics(object) {
    var width = getMethodNumericProperty(object, ["GetWidth", "GetW", "GetXfrmExtX", "GetPathW"],
      getNumericProperty(object, ["Width", "W", "width", "w"], null));
      var height = getMethodNumericProperty(object, ["GetHeight", "GetH", "GetXfrmExtY", "GetPathH"],
      getNumericProperty(object, ["Height", "H", "height", "h"], null));
    var x = getMethodNumericProperty(object, ["GetPosX", "GetX", "GetLeft", "GetXfrmOffX", "GetStartX"],
      getNumericProperty(object, ["X", "Left", "PosX", "x", "left"], null));
    var y = getMethodNumericProperty(object, ["GetPosY", "GetY", "GetTop", "GetXfrmOffY", "GetStartY"],
      getNumericProperty(object, ["Y", "Top", "PosY", "y", "top"], null));
    var rot = getMethodNumericProperty(object, ["GetRotation", "GetRot", "GetAngle"],
      getNumericProperty(object, ["Rot", "Rotation", "Angle", "rot", "rotation", "angle"], null));
    var boundsMetrics = {};
    var boundsValue = null;
    var typeName = "";

    if (object && (typeof object.GetClassType === "function" || typeof object.GetType === "function")) {
      try {
        typeName = String(typeof object.GetClassType === "function" ? object.GetClassType() : object.GetType());
      } catch (error) {
        typeName = "";
      }
    }

    if (!typeName) {
      typeName = String(findNestedPropertyValue(object, ["Type", "type", "ObjectType", "objectType", "ClassName", "className"]) || "");
    }

    var isLineLike = isLineObject(object, typeName);

    if (object && typeof object.GetBounds === "function") {
      try {
        boundsValue = object.GetBounds();
      } catch (error) {
        boundsValue = null;
      }
    }

    if (!boundsValue) {
      boundsValue = findNestedPropertyValue(object, ["Bounds", "bounds", "BBox", "bbox", "Transform", "transform"]);
    }

    if (!boundsValue && object && object.Value && typeof object.Value === "object") {
      boundsValue = findNestedPropertyValue(object.Value, ["Bounds", "bounds", "BBox", "bbox", "Transform", "transform"]);
    }

    if (boundsValue && !isLineLike) {
      var shapeGettersPresent = hasAnyMethod(object, ["GetPosX", "GetX", "GetLeft", "GetPosY", "GetY", "GetTop", "GetWidth", "GetW", "GetHeight", "GetH"]);
      if (!shapeGettersPresent) {
        isLineLike = true;
      }
    }

    // Lines are ApiShape objects in the presentation API. Their normal
    // position and size getters are the editable geometry; endpoint/path
    // methods are only a fallback for older editor builds.
    if (isLineLike && boundsValue && (x === null || y === null || width === null || height === null)) {
      boundsMetrics = getLineMetrics(object, boundsValue);
    } else if (isLineLike && (x === null || y === null || width === null || height === null)) {
      boundsMetrics = getLineMetrics(object, boundsValue || {});
    }

    if (width === null) {
      width = getNestedNumericProperty(object, [
        ["Size", "Width"], ["Size", "W"], ["size", "width"], ["size", "w"],
        ["Transform", "ExtX"], ["transform", "extX"],
        ["Bounds", "W"], ["Bounds", "Width"], ["bounds", "w"], ["bounds", "width"]
      ]);
    }

    if (height === null) {
      height = getNestedNumericProperty(object, [
        ["Size", "Height"], ["Size", "H"], ["size", "height"], ["size", "h"],
        ["Transform", "ExtY"], ["transform", "extY"],
        ["Bounds", "H"], ["Bounds", "Height"], ["bounds", "h"], ["bounds", "height"]
      ]);
    }

    if (x === null) {
      x = getNestedNumericProperty(object, [
        ["Position", "X"], ["Position", "Left"], ["position", "x"], ["position", "left"],
        ["Transform", "OffX"], ["transform", "offX"],
        ["Bounds", "X"], ["Bounds", "Left"], ["bounds", "x"], ["bounds", "left"]
      ]);
    }

    if (y === null) {
      y = getNestedNumericProperty(object, [
        ["Position", "Y"], ["Position", "Top"], ["position", "y"], ["position", "top"],
        ["Transform", "OffY"], ["transform", "offY"],
        ["Bounds", "Y"], ["Bounds", "Top"], ["bounds", "y"], ["bounds", "top"]
      ]);
    }

    if (rot === null) {
      rot = getNestedNumericProperty(object, [
        ["Transform", "Rot"], ["Transform", "Rotation"], ["transform", "rot"], ["transform", "rotation"]
      ]);
    }

    if (isLineLike && x === null) {
      x = boundsMetrics.x;
    }

    if (isLineLike && y === null) {
      y = boundsMetrics.y;
    }

    if (isLineLike && width === null) {
      width = boundsMetrics.w;
    }

    if (isLineLike && height === null) {
      height = boundsMetrics.h;
    }

    return {
      x: x,
      y: y,
      w: width,
      h: height,
      rot: rot
    };
  }

  function hasUsableMetrics(object) {
    var m = getObjectMetrics(object || {});
    return m.w !== null || m.h !== null || m.x !== null || m.y !== null || m.rot !== null;
  }

  function hasLineLikeSelection(objects) {
    if (!objects || !objects.length) {
      return false;
    }

    return objects.some(function (object) {
      if (!object) {
        return false;
      }

      var typeName = "";
      if (object && (typeof object.GetClassType === "function" || typeof object.GetType === "function")) {
        try {
          typeName = String(typeof object.GetClassType === "function" ? object.GetClassType() : object.GetType());
        } catch (error) {
          typeName = "";
        }
      }

      if (!typeName) {
        typeName = String(findNestedPropertyValue(object, ["Type", "type", "ObjectType", "objectType", "ClassName", "className"]) || "");
      }

      return isLineObject(object, typeName);
    });
  }

  function setSectionDisabled(section, disabled) {
    if (!section) {
      return;
    }

    section.classList.toggle("is-disabled", disabled);

    Array.prototype.forEach.call(section.querySelectorAll("input, button"), function (control) {
      control.disabled = disabled;
    });
  }

  function setSelectionStatus(count) {
    if (!elSelectionStatus) {
      return;
    }

    if (count > 0) {
      elSelectionStatus.textContent = count + " object" + (count === 1 ? "" : "s") + " selected";
      elSelectionStatus.classList.add("has-selection");
    } else {
      elSelectionStatus.textContent = "No object selected";
      elSelectionStatus.classList.remove("has-selection");
    }
  }

  function updateUiFromSelection(objects) {
    var hasSelection = objects && objects.length > 0;
    var isSingleSelection = objects && objects.length === 1;
    var isMultiSelection = objects && objects.length > 1;
    var hasLineSelection = hasLineLikeSelection(objects);

    setSelectionStatus(objects ? objects.length : 0);

    if (!hasSelection) {
      setInputValue(elWidth, "");
      setInputValue(elHeight, "");
      setInputValue(elX, "");
      setInputValue(elY, "");
      setInputValue(elRotation, "");
      aspectRatio = null;
    } else {
      var first = objects[0] || {};
      var metrics = getObjectMetrics(first);

      if (isSingleSelection) {
        setInputValue(elWidth, metrics.w !== null ? emuToMm(metrics.w) : "");
        setInputValue(elHeight, metrics.h !== null ? emuToMm(metrics.h) : "");
        setInputValue(elX, metrics.x !== null ? emuToMm(metrics.x) : "");
        setInputValue(elY, metrics.y !== null ? emuToMm(metrics.y) : "");
        setInputValue(elRotation, metrics.rot !== null ? metrics.rot : "");

        aspectRatio = (typeof metrics.w === "number" && typeof metrics.h === "number" && metrics.h !== 0)
          ? metrics.w / metrics.h
          : null;
      } else {
        setInputValue(elWidth, "");
        setInputValue(elHeight, "");
        setInputValue(elX, "");
        setInputValue(elY, "");
        setInputValue(elRotation, "");
        aspectRatio = null;
      }
    }

    setSectionDisabled(elSectionSize, !hasSelection);
    setSectionDisabled(elSectionPosition, !hasSelection);
    setSectionDisabled(elSectionRotation, !hasSelection);
    setSectionDisabled(elSectionAlign, !hasSelection);
    setSectionDisabled(elSectionDistrib, !isMultiSelection);

    document.querySelectorAll("[data-align]").forEach(function (btn) {
      btn.disabled = !hasSelection || hasLineSelection;
    });

    document.querySelectorAll("[data-distribute]").forEach(function (btn) {
      btn.disabled = !isMultiSelection || hasLineSelection;
    });

    if (elLockAspect) {
      elLockAspect.disabled = !isSingleSelection;
    }

  }

  function normalizeSelectedObjects(result) {
    function normalizeItem(item) {
      if (!item || typeof item !== "object") {
        return null;
      }

      // Some editor builds return descriptors in the form:
      // { Type: "Shape", Value: { Width, Height, X, Y, ... } }
      var valueSource = item.Value || item.value || null;
      if (valueSource && typeof valueSource === "object") {
        var merged = {};
        var key;
        for (key in valueSource) {
          if (Object.prototype.hasOwnProperty.call(valueSource, key)) {
            merged[key] = valueSource[key];
          }
        }
        if (item.Type !== undefined) {
          merged.Type = item.Type;
        }
        if (item.type !== undefined) {
          merged.Type = item.type;
        }
        return merged;
      }

      return item;
    }

    function asArray(value) {
      if (Array.isArray(value)) {
        return value;
      }
      if (!value) {
        return [];
      }
      return [value];
    }

    if (Array.isArray(result)) {
      return result.map(normalizeItem).filter(function (item) {
        return !!item;
      });
    }

    if (!result) {
      return [];
    }

    if (Array.isArray(result.selectedObjects)) {
      return result.selectedObjects.map(normalizeItem).filter(function (item) {
        return !!item;
      });
    }

    if (Array.isArray(result.objects)) {
      return result.objects.map(normalizeItem).filter(function (item) {
        return !!item;
      });
    }

    if (Array.isArray(result.items)) {
      return result.items.map(normalizeItem).filter(function (item) {
        return !!item;
      });
    }

    return asArray(result).map(normalizeItem).filter(function (item) {
      return !!item;
    });
  }

  function getSelectionObjects(selection) {
    if (!selection) {
      return [];
    }

    function asArray(value) {
      if (Array.isArray(value)) {
        return value;
      }
      if (!value) {
        return [];
      }
      return [value];
    }

    if (selection.GetShapes && typeof selection.GetShapes === "function") {
      var selectedObjectsList = selection.GetShapes();
      var selectedObjectsArray = asArray(selectedObjectsList);
      if (selectedObjectsArray.length > 0) {
        return selectedObjectsArray;
      }
    }

    if (selection.GetSelectedObjects && typeof selection.GetSelectedObjects === "function") {
      var selectedObjectsFallback = selection.GetSelectedObjects();
      var selectedObjectsFallbackArray = asArray(selectedObjectsFallback);
      if (selectedObjectsFallbackArray.length > 0) {
        return selectedObjectsFallbackArray;
      }
    }

    if (selection.GetObjects && typeof selection.GetObjects === "function") {
      var objects = asArray(selection.GetObjects());
      if (objects.length > 0) {
        return objects;
      }
    }

    if (selection.GetType || selection.GetBounds || selection.GetPosX || selection.GetWidth || selection.GetRotation) {
      return asArray(selection);
    }

    return [];
  }

  function loadSelectedDrawings(callback) {
    window.Asc.plugin.callCommand(function () {
      function toNumberLocal(value) {
        if (typeof value === "number" && !isNaN(value)) {
          return value;
        }

        if (typeof value === "string" && value.trim() !== "") {
          var parsed = parseFloat(value);
          return isNaN(parsed) ? null : parsed;
        }

        return null;
      }

      function getBoundsMetricsLocal(value) {
        var bounds = {};
        var left;
        var top;
        var right;
        var bottom;
        var width;
        var height;

        if (Array.isArray(value) && value.length >= 4) {
          left = toNumberLocal(value[0]);
          top = toNumberLocal(value[1]);
          right = toNumberLocal(value[2]);
          bottom = toNumberLocal(value[3]);
          bounds = {
            Left: left,
            Top: top,
            Right: right,
            Bottom: bottom,
            X: left,
            Y: top,
            W: right !== null && left !== null ? right - left : null,
            H: bottom !== null && top !== null ? bottom - top : null
          };
        } else if (value && typeof value === "object") {
          bounds = value;
        }

        left = bounds.X !== undefined && bounds.X !== null ? bounds.X : (bounds.Left !== undefined && bounds.Left !== null ? bounds.Left : null);
        top = bounds.Y !== undefined && bounds.Y !== null ? bounds.Y : (bounds.Top !== undefined && bounds.Top !== null ? bounds.Top : null);
        right = bounds.Right !== undefined && bounds.Right !== null ? bounds.Right : (bounds.R !== undefined && bounds.R !== null ? bounds.R : null);
        bottom = bounds.Bottom !== undefined && bounds.Bottom !== null ? bounds.Bottom : (bounds.B !== undefined && bounds.B !== null ? bounds.B : null);
        width = bounds.Width !== undefined && bounds.Width !== null ? bounds.Width : (bounds.W !== undefined && bounds.W !== null ? bounds.W : null);
        height = bounds.Height !== undefined && bounds.Height !== null ? bounds.Height : (bounds.H !== undefined && bounds.H !== null ? bounds.H : null);

        if (width === null && left !== null && right !== null) {
          width = right - left;
        }

        if (height === null && top !== null && bottom !== null) {
          height = bottom - top;
        }

        return {
          x: left,
          y: top,
          w: width,
          h: height
        };
      }

      function isLineObjectLocal(object, typeName) {
        var fallbackName = String(typeName || "");
        if (/line|connector|curve|polyline|path/.test(fallbackName.toLowerCase())) {
          return true;
        }

        if (!object) {
          return false;
        }

        var hasLineEndpoints = hasAnyMethodLocal(object, [
          "GetStartX", "GetStartY", "GetEndX", "GetEndY",
          "GetX1", "GetY1", "GetX2", "GetY2"
        ]);

        if (hasLineEndpoints) {
          return true;
        }

        return hasAnyMethodLocal(object, ["GetPathW", "GetPathH"]) && hasAnyMethodLocal(object, [
          "GetStartX", "GetStartY", "GetEndX", "GetEndY",
          "GetX1", "GetY1", "GetX2", "GetY2"
        ]);
      }

      function getLineMetricsLocal(object, boundsValue) {
        var bounds = getBoundsMetricsLocal(boundsValue || {});
        var startX = getMethodNumericPropertyLocal(object, ["GetStartX", "GetX1"], null);
        var startY = getMethodNumericPropertyLocal(object, ["GetStartY", "GetY1"], null);
        var endX = getMethodNumericPropertyLocal(object, ["GetEndX", "GetX2"], null);
        var endY = getMethodNumericPropertyLocal(object, ["GetEndY", "GetY2"], null);

        var x = null;
        var y = null;
        var w = null;
        var h = null;

        if (startX !== null && endX !== null) {
          x = Math.min(startX, endX);
          w = Math.abs(endX - startX);
        } else if (startX !== null) {
          x = startX;
        } else {
          x = bounds.x;
        }

        if (startY !== null && endY !== null) {
          y = Math.min(startY, endY);
          h = Math.abs(endY - startY);
        } else if (startY !== null) {
          y = startY;
        } else {
          y = bounds.y;
        }

        if (w === null) {
          w = bounds.w;
        }

        if (h === null) {
          h = bounds.h;
        }

        return {
          x: x,
          y: y,
          w: w,
          h: h
        };
      }

      function getSelectionObjectsLocal(selection) {
        if (!selection) {
          return [];
        }

        function asArrayLocal(value) {
          if (Array.isArray(value)) {
            return value;
          }
          if (!value) {
            return [];
          }
          return [value];
        }

        if (selection.GetShapes && typeof selection.GetShapes === "function") {
          var selectedObjectsList = asArrayLocal(selection.GetShapes());
          if (selectedObjectsList.length > 0) {
            return selectedObjectsList;
          }
        }

        if (selection.GetSelectedObjects && typeof selection.GetSelectedObjects === "function") {
          var selectedObjectsFallback = asArrayLocal(selection.GetSelectedObjects());
          if (selectedObjectsFallback.length > 0) {
            return selectedObjectsFallback;
          }
        }

        if (selection.GetObjects && typeof selection.GetObjects === "function") {
          var objects = asArrayLocal(selection.GetObjects());
          if (objects.length > 0) {
            return objects;
          }
        }

        if (selection.GetType || selection.GetBounds || selection.GetPosX || selection.GetWidth || selection.GetRotation) {
          return asArrayLocal(selection);
        }

        return [];
      }

      function getMethodNumericPropertyLocal(object, methodNames, fallback) {
        var i;
        for (i = 0; i < methodNames.length; i++) {
          var methodName = methodNames[i];
          if (object && typeof object[methodName] === "function") {
            try {
              var value = object[methodName]();
              if (typeof value === "number" && !isNaN(value)) {
                return value;
              }
              if (typeof value === "string" && value.trim() !== "") {
                var parsed = parseFloat(value);
                if (!isNaN(parsed)) {
                  return parsed;
                }
              }
            } catch (error) {
              // Ignore getter failures and continue with other candidates.
            }
          }
        }
        return fallback;
      }

      function hasAnyMethodLocal(object, methodNames) {
        var i;
        for (i = 0; i < methodNames.length; i++) {
          if (object && typeof object[methodNames[i]] === "function") {
            return true;
          }
        }
        return false;
      }

      var result = [];
      var selection = Api.GetSelection ? Api.GetSelection() : null;
      if (!selection) {
        return result;
      }

      if (selection.IsEmpty && selection.IsEmpty()) {
        return result;
      }

      var drawings = getSelectionObjectsLocal(selection);

      var i;
      for (i = 0; i < drawings.length; i++) {
        var drawing = drawings[i];
        var typeName = "";
        var bounds = null;
var x = getMethodNumericPropertyLocal(drawing, ["GetPosX", "GetX", "GetLeft", "GetStartX", "GetXfrmOffX"], null);
      var y = getMethodNumericPropertyLocal(drawing, ["GetPosY", "GetY", "GetTop", "GetStartY", "GetXfrmOffY"], null);
      var w = getMethodNumericPropertyLocal(drawing, ["GetWidth", "GetW", "GetPathW", "GetXfrmExtX"], null);
      var h = getMethodNumericPropertyLocal(drawing, ["GetHeight", "GetH", "GetPathH", "GetXfrmExtY"], null);

        if (drawing.GetClassType || drawing.GetType) {
          try {
            typeName = String(drawing.GetClassType ? drawing.GetClassType() : drawing.GetType());
          } catch (error) {
            typeName = "";
          }
        }

        var isLineLike = isLineObjectLocal(drawing, typeName);

        if (drawing.GetBounds) {
          try {
            bounds = drawing.GetBounds();
          } catch (error) {
            bounds = null;
          }
        }

        if (bounds && (isLineLike || !hasAnyMethodLocal(drawing, ["GetPosX", "GetX", "GetLeft", "GetPosY", "GetY", "GetTop", "GetWidth", "GetW", "GetHeight", "GetH"]) || (x === null && y === null && w === null && h === null))) {
          var boundsMetrics = isLineLike ? getLineMetricsLocal(drawing, bounds) : getBoundsMetricsLocal(bounds);
          x = x !== null ? x : boundsMetrics.x;
          y = y !== null ? y : boundsMetrics.y;
          w = w !== null ? w : boundsMetrics.w;
          h = h !== null ? h : boundsMetrics.h;
        } else if (isLineLike && (x === null || y === null || w === null || h === null)) {
          var lineFallbackMetrics = getLineMetricsLocal(drawing, bounds || {});
          x = x !== null ? x : lineFallbackMetrics.x;
          y = y !== null ? y : lineFallbackMetrics.y;
          w = w !== null ? w : lineFallbackMetrics.w;
          h = h !== null ? h : lineFallbackMetrics.h;
        }

        result.push({
          Type: typeName,
          Bounds: bounds,
          X: x,
          Y: y,
          Width: w,
          Height: h,
          Rot: getMethodNumericPropertyLocal(drawing, ["GetRotation", "GetRot", "GetAngle"], null),
          Name: drawing.GetName ? drawing.GetName() : ""
        });
      }

      return result;
    }, false, false, function (objects) {
      callback(Array.isArray(objects) ? objects : []);
    });
  }

  function loadSelectedObjectsViaMethod(callback) {
    window.Asc.plugin.executeMethod("GetSelectedObjects", [], function (objects) {
      callback(normalizeSelectedObjects(objects));
    });
  }

  function applySelection(objects) {
    selectedObjects = normalizeSelectedObjects(objects);

    if (selectedObjects.length === 1) {
      var m = getObjectMetrics(selectedObjects[0] || {});
      aspectRatio = (typeof m.w === "number" && typeof m.h === "number" && m.h !== 0)
        ? m.w / m.h
        : null;
    } else {
      aspectRatio = null;
    }

    updateUiFromSelection(selectedObjects);
  }

  function fetchSelectedObjects(callback) {
    // ApiSelection.GetShapes() is the documented Presentation API and also
    // returns line drawings as ApiShape objects. Use it before descriptor
    // methods, which do not consistently include lines across editor builds.
    loadSelectedDrawings(function (drawings) {
      var normalized = normalizeSelectedObjects(drawings);
      if (normalized.length > 0 && hasUsableMetrics(normalized[0])) {
        callback(normalized);
        return;
      }

      loadSelectedObjectsViaMethod(function (selected) {
        if (selected.length > 0 && hasUsableMetrics(selected[0])) {
          callback(selected);
          return;
        }

        if (selected.length > 0) {
          callback(selected);
          return;
        }

        window.Asc.plugin.executeMethod("GetSelectionType", [], function (selectionType) {
          var type = typeof selectionType === "string" ? selectionType.toLowerCase() : "";
          var looksLikeObjectSelection = type === "drawing"
            || type === "shape"
            || type === "object"
            || type === "image"
            || type === "chart"
            || type === "group"
            || type === "line"
            || type === "connector"
            || type === "curve"
            || type === "polyline";

          callback(looksLikeObjectSelection ? [{}] : []);
        });
      });
    });
  }

  // ─── Apply size / position / rotation ──────────────────────────────────────

  /**
   * Builds a DocBuilder script that resizes and repositions the currently
   * selected shapes on the active slide.
   * All parameters are optional – empty inputs are skipped.
   */
  function buildApplyScript(newW, newH, newX, newY, newRot) {
      return "var selection = Api.GetSelection ? Api.GetSelection() : null;"
        + "if (!selection) { return; }"
          + "var shapes = selection.GetShapes ? selection.GetShapes() : (selection.GetSelectedObjects ? selection.GetSelectedObjects() : (selection.GetObjects ? selection.GetObjects() : (selection.GetType || selection.GetBounds || selection.GetPosX || selection.GetWidth || selection.GetRotation ? [selection] : [])));"
        + "if (!Array.isArray(shapes)) { shapes = shapes ? [shapes] : []; }"
        + "var i, s, bounds, x, y, w, h;"
        + "for (i = 0; i < shapes.length; i++) {"
        + "  s = shapes[i];"
        + "  bounds = s.GetBounds ? s.GetBounds() : null;"
        + "  x = s.GetPosX ? s.GetPosX() : (s.GetX ? s.GetX() : (s.GetLeft ? s.GetLeft() : (bounds && (bounds.Left !== undefined || bounds.X !== undefined) ? (bounds.Left !== undefined ? bounds.Left : bounds.X) : null)));"
        + "  y = s.GetPosY ? s.GetPosY() : (s.GetY ? s.GetY() : (s.GetTop ? s.GetTop() : (bounds && (bounds.Top !== undefined || bounds.Y !== undefined) ? (bounds.Top !== undefined ? bounds.Top : bounds.Y) : null)));"
        + "  w = s.GetWidth ? s.GetWidth() : (s.GetW ? s.GetW() : (bounds ? (bounds.Width !== undefined ? bounds.Width : (bounds.W !== undefined ? bounds.W : (bounds.Right !== undefined && bounds.Left !== undefined ? bounds.Right - bounds.Left : null))) : null));"
        + "  h = s.GetHeight ? s.GetHeight() : (s.GetH ? s.GetH() : (bounds ? (bounds.Height !== undefined ? bounds.Height : (bounds.H !== undefined ? bounds.H : (bounds.Bottom !== undefined && bounds.Top !== undefined ? bounds.Bottom - bounds.Top : null))) : null));"
        + (newW !== null && newH !== null
              ? "  if (s.SetSize) { s.SetSize(" + newW + "," + newH + "); }"
              : "")
        + (newX !== null && newY !== null
              ? "  if (s.SetPosition) { s.SetPosition(" + newX + "," + newY + "); }"
              : "")
        + (newRot !== null
              ? "  if (s.SetRotation) { s.SetRotation(" + newRot + "); }"
              : "")
        + "}";
  }

  function applyLayoutValues() {
    var wRaw   = elWidth.value.trim();
    var hRaw   = elHeight.value.trim();
    var xRaw   = elX.value.trim();
    var yRaw   = elY.value.trim();
    var rotRaw = elRotation.value.trim();

    var newW   = wRaw   !== "" ? mmToEmu(wRaw)   : null;
    var newH   = hRaw   !== "" ? mmToEmu(hRaw)   : null;
    var newX   = xRaw   !== "" ? mmToEmu(xRaw)   : null;
    var newY   = yRaw   !== "" ? mmToEmu(yRaw)   : null;
    var newRot = rotRaw !== "" ? parseFloat(rotRaw) : null;

    // For single selection, allow changing only one dimension/coordinate by
    // filling missing pair values from the current object geometry.
    if (selectedObjects.length === 1) {
      var current = getObjectMetrics(selectedObjects[0] || {});
      if (newW !== null && newH === null && current.h !== null) {
        newH = current.h;
      } else if (newH !== null && newW === null && current.w !== null) {
        newW = current.w;
      }

      if (newX !== null && newY === null && current.y !== null) {
        newY = current.y;
      } else if (newY !== null && newX === null && current.x !== null) {
        newX = current.x;
      }
    }

    // Enforce aspect ratio on single-selection when lock is active
    if (selectedObjects.length === 1 && elLockAspect.checked && aspectRatio) {
      if (newW !== null && hRaw === "") {
        newH = Math.round(newW / aspectRatio);
        setInputValue(elHeight, emuToMm(newH));
      } else if (newH !== null && wRaw === "") {
        newW = Math.round(newH * aspectRatio);
        setInputValue(elWidth, emuToMm(newW));
      }
    }

    var script = buildApplyScript(newW, newH, newX, newY, newRot);

    executeCommandAndRefresh(script);
  }

  // ─── Alignment ─────────────────────────────────────────────────────────────

  /**
   * Maps button data-align attribute values to the DocBuilder align commands
   * available in the presentation API.
   * See: https://api.onlyoffice.com/docbuilder/presentationapi/ApiShape/SetAlignObject
   */
  var ALIGN_MAP = {
    "left":     "left",
    "center-h": "center",
    "right":    "right",
    "top":      "top",
    "center-v": "ctr",
    "bottom":   "bottom"
  };

  function buildAlignScript(alignType, targetMode) {
      var mode = targetMode === "slide" ? "slide" : "selection";
      var relativeModeScript = mode === "slide"
          ? "var slideWidth = 0, slideHeight = 0; var slide = null; if (pres && pres.GetCurrentSlide) { slide = pres.GetCurrentSlide ? pres.GetCurrentSlide() : null; } if (slide && slide.GetWidth) { slideWidth = slide.GetWidth(); } if (slide && slide.GetHeight) { slideHeight = slide.GetHeight(); } if (slideWidth === 0 && pres && pres.GetWidth) { slideWidth = pres.GetWidth(); } if (slideHeight === 0 && pres && pres.GetHeight) { slideHeight = pres.GetHeight(); } if (slideWidth === 0 && pres && pres.GetPageWidth) { slideWidth = pres.GetPageWidth(); } if (slideHeight === 0 && pres && pres.GetPageHeight) { slideHeight = pres.GetPageHeight(); } if (slideWidth === 0 && pres && pres.GetSlides) { var allSlides = pres.GetSlides(); if (allSlides && allSlides.length) { var firstSlide = allSlides[0]; if (firstSlide && firstSlide.GetWidth) { slideWidth = firstSlide.GetWidth(); } if (firstSlide && firstSlide.GetHeight) { slideHeight = firstSlide.GetHeight(); } } } "
          : "var minX = null, minY = null, maxX = null, maxY = null;";

      return "var pres = Api.GetPresentation ? Api.GetPresentation() : null;"
         + "var selection = Api.GetSelection ? Api.GetSelection() : null;"
        + "if (!pres || !selection) { return; }"
         + "var shapes = selection.GetShapes ? selection.GetShapes() : (selection.GetSelectedObjects ? selection.GetSelectedObjects() : (selection.GetObjects ? selection.GetObjects() : (selection.GetType || selection.GetBounds || selection.GetPosX || selection.GetWidth || selection.GetRotation ? [selection] : [])));"
         + "if (!Array.isArray(shapes)) { shapes = shapes ? [shapes] : []; }"
        + "if (shapes.length < 2 && \"" + mode + "\" === \"selection\") { return; }"
        + "var i, s, x, y, w, h, nx, ny, bounds;"
        + relativeModeScript
        + "if (\"" + mode + "\" === \"selection\") {"
        + "for (i = 0; i < shapes.length; i++) {"
        + "  s = shapes[i];"
        + "  bounds = s.GetBounds ? s.GetBounds() : null;"
        + "  x = s.GetPosX ? s.GetPosX() : (s.GetX ? s.GetX() : (s.GetLeft ? s.GetLeft() : (bounds && (bounds.Left !== undefined || bounds.X !== undefined) ? (bounds.Left !== undefined ? bounds.Left : bounds.X) : null)));"
        + "  y = s.GetPosY ? s.GetPosY() : (s.GetY ? s.GetY() : (s.GetTop ? s.GetTop() : (bounds && (bounds.Top !== undefined || bounds.Y !== undefined) ? (bounds.Top !== undefined ? bounds.Top : bounds.Y) : null)));"
        + "  w = s.GetWidth ? s.GetWidth() : (s.GetW ? s.GetW() : (bounds ? (bounds.Width !== undefined ? bounds.Width : (bounds.W !== undefined ? bounds.W : (bounds.Right !== undefined && bounds.Left !== undefined ? bounds.Right - bounds.Left : null))) : null));"
        + "  h = s.GetHeight ? s.GetHeight() : (s.GetH ? s.GetH() : (bounds ? (bounds.Height !== undefined ? bounds.Height : (bounds.H !== undefined ? bounds.H : (bounds.Bottom !== undefined && bounds.Top !== undefined ? bounds.Bottom - bounds.Top : null))) : null));"
        + "  if (x === null || y === null) { continue; }"
        + "  if (minX === null || x < minX) { minX = x; }"
        + "  if (minY === null || y < minY) { minY = y; }"
        + "  if (maxX === null || (x + (w !== null ? w : 0)) > maxX) { maxX = x + (w !== null ? w : 0); }"
        + "  if (maxY === null || (y + (h !== null ? h : 0)) > maxY) { maxY = y + (h !== null ? h : 0); }"
        + "}"
        + "if (minX === null || minY === null || maxX === null || maxY === null) { return; }"
        + "var centerX = Math.round((minX + maxX) / 2);"
        + "var centerY = Math.round((minY + maxY) / 2);"
        + "}"
        + "if (\"" + mode + "\" === \"slide\") {"
        + "if (slideWidth === 0) { slideWidth = 100000; }"
        + "if (slideHeight === 0) { slideHeight = 100000; }"
        + "var slideCenterX = Math.round(slideWidth / 2);"
        + "var slideCenterY = Math.round(slideHeight / 2);"
        + "}"
         + "for (i = 0; i < shapes.length; i++) {"
         + "  s = shapes[i];"
         + "  bounds = s.GetBounds ? s.GetBounds() : null;"
         + "  x = s.GetPosX ? s.GetPosX() : (s.GetX ? s.GetX() : (s.GetLeft ? s.GetLeft() : (bounds && (bounds.Left !== undefined || bounds.X !== undefined) ? (bounds.Left !== undefined ? bounds.Left : bounds.X) : null)));"
         + "  y = s.GetPosY ? s.GetPosY() : (s.GetY ? s.GetY() : (s.GetTop ? s.GetTop() : (bounds && (bounds.Top !== undefined || bounds.Y !== undefined) ? (bounds.Top !== undefined ? bounds.Top : bounds.Y) : null)));"
         + "  w = s.GetWidth ? s.GetWidth() : (s.GetW ? s.GetW() : (bounds ? (bounds.Width !== undefined ? bounds.Width : (bounds.W !== undefined ? bounds.W : (bounds.Right !== undefined && bounds.Left !== undefined ? bounds.Right - bounds.Left : null))) : null));"
         + "  h = s.GetHeight ? s.GetHeight() : (s.GetH ? s.GetH() : (bounds ? (bounds.Height !== undefined ? bounds.Height : (bounds.H !== undefined ? bounds.H : (bounds.Bottom !== undefined && bounds.Top !== undefined ? bounds.Bottom - bounds.Top : null))) : null));"
         + "  if (x === null || y === null) { continue; }"
         + "  nx = x;"
         + "  ny = y;"
        + (alignType === "left" ? "  nx = (\"" + mode + "\" === \"selection\") ? minX : 0;" : "")
        + (alignType === "center" ? "  if (w !== null) { nx = (\"" + mode + "\" === \"selection\") ? Math.round(centerX - (w / 2)) : Math.round(slideCenterX - (w / 2)); }" : "")
        + (alignType === "right" ? "  if (w !== null) { nx = (\"" + mode + "\" === \"selection\") ? maxX - w : slideWidth - w; }" : "")
        + (alignType === "top" ? "  ny = (\"" + mode + "\" === \"selection\") ? minY : 0;" : "")
        + (alignType === "ctr" ? "  if (h !== null) { ny = (\"" + mode + "\" === \"selection\") ? Math.round(centerY - (h / 2)) : Math.round(slideCenterY - (h / 2)); }" : "")
        + (alignType === "bottom" ? "  if (h !== null) { ny = (\"" + mode + "\" === \"selection\") ? maxY - h : slideHeight - h; }" : "")
         + "  if (s.SetPosition) { s.SetPosition(nx, ny); }"
         + "}";
  }

  function buildDistributeScript(direction, targetMode) {
    var mode = targetMode === "slide" ? "slide" : "selection";
    var alignTarget = mode === "slide" ? "Asc.c_oAscObjectsAlignType.Slide" : "Asc.c_oAscObjectsAlignType.Selected";
    var methodName = direction === "h" ? "DistributeHorizontally" : "DistributeVertically";

    return "var pres = Api.GetPresentation ? Api.GetPresentation() : null;"
      + "if (!pres) { return; }"
      + "var target = " + alignTarget + ";"
      + "if (pres && pres." + methodName + ") { pres." + methodName + "(target); return; }"
      + "if (pres && pres.DistributeHorizontally && pres.DistributeVertically) {" + (direction === "h" ? "pres.DistributeHorizontally(target);" : "pres.DistributeVertically(target);") + "}";
  }

  // ─── OnlyOffice Plugin lifecycle ───────────────────────────────────────────

  window.Asc.plugin.init = function () {
    updateUiFromSelection([]);

    if (window.Asc.plugin.attachEditorEvent) {
      window.Asc.plugin.attachEditorEvent("onSelectionChanged", refreshSelection);
    } else if (window.Asc.plugin.attachEvent) {
      window.Asc.plugin.attachEvent("onSelectionChanged", refreshSelection);
    }

    window.Asc.plugin.onSelectionChanged = refreshSelection;

    if (window.Asc.plugin.event_onSelectionChanged === undefined) {
      window.Asc.plugin.event_onSelectionChanged = refreshSelection;
    }

    // Fallback for builds where selection events are not always emitted.
    window.clearInterval(window.Asc.plugin._layoutSelectionWatchdog);
    window.Asc.plugin._layoutSelectionWatchdog = window.setInterval(refreshSelection, 700);

    // Request the current selection immediately so the panel is populated
    // as soon as the plugin opens.
    refreshSelection();
  };

  /**
   * Fetch selected objects from the editor via executeMethod and update the UI.
   */
  var inputFields = [elWidth, elHeight, elX, elY, elRotation];

  function anyInputFocused() {
    var active = document.activeElement;
    for (var i = 0; i < inputFields.length; i++) {
      if (inputFields[i] === active) { return true; }
    }
    return false;
  }

  function refreshSelection() {
    // Never overwrite values while the user is actively editing a field.
    if (anyInputFocused()) { return; }

    if (refreshTimer) {
      window.clearTimeout(refreshTimer);
    }

    refreshTimer = window.setTimeout(function () {
      refreshTimer = null;

    if (refreshInFlight) {
      refreshQueued = true;
      return;
    }

    refreshInFlight = true;

    function finish() {
      refreshInFlight = false;
      if (refreshQueued) {
        refreshQueued = false;
        refreshSelection();
      }
    }

    fetchSelectedObjects(function (objects) {
      applySelection(objects);
      finish();
    });
    }, 80);
  }

  // ─── Event listeners ───────────────────────────────────────────────────────

  // Allow pressing Enter in any numeric field to apply immediately
  [elWidth, elHeight, elX, elY, elRotation].forEach(function (el) {
    el.addEventListener("keydown", function (e) {
      if (e.key === "Enter") { applyLayoutValues(); }
    });
  });

  // Alignment buttons
  document.querySelectorAll("[data-align]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var alignKey = btn.getAttribute("data-align");
      var alignVal = ALIGN_MAP[alignKey];
      var alignTarget = getAlignTargetValue();
      if (alignVal) {
        var script = buildAlignScript(alignVal, alignTarget);
        executeCommandAndRefresh(script);
      }
    });
  });

  // Distribute buttons
  document.querySelectorAll("[data-distribute]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var dir    = btn.getAttribute("data-distribute");
      var alignTarget = getAlignTargetValue();
      var script = buildDistributeScript(dir, alignTarget);
      executeCommandAndRefresh(script);
    });
  });

}());
