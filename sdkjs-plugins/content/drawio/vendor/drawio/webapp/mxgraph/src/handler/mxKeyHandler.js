/**
 * Copyright (c) 2006-2015, JGraph Holdings Ltd
 * Copyright (c) 2006-2015, draw.io AG
 */
/**
 * Class: mxKeyHandler
 *
 * Event handler that listens to keystroke events. This is not a singleton,
 * however, it is normally only required once if the target is the document
 * element (default).
 * 
 * This handler installs a key event listener in the topmost DOM node and
 * processes all events that originate from descandants of <mxGraph.container>
 * or from the topmost DOM node. The latter means that all unhandled keystrokes
 * are handled by this object regardless of the focused state of the <graph>.
 * 
 * Example:
 * 
 * The following example creates a key handler that listens to the delete key
 * (46) and deletes the selection cells if the graph is enabled.
 * 
 * (code)
 * var keyHandler = new mxKeyHandler(graph);
 * keyHandler.bindKey(46, function(evt)
 * {
 *   if (graph.isEnabled())
 *   {
 *     graph.removeCells();
 *   }
 * });
 * (end)
 * 
 * Keycodes:
 * 
 * See http://tinyurl.com/yp8jgl or http://tinyurl.com/229yqw for a list of
 * keycodes or install a key event listener into the document element and print
 * the key codes of the respective events to the console.
 * 
 * Keystrokes with modifier keys are bound by passing a combination of
 * <mxKeyHandler.SHIFT>, <mxKeyHandler.CONTROL> and <mxKeyHandler.ALT> to
 * <bindKey>. The following example binds Ctrl+Alt+D.
 *
 * (code)
 * keyHandler.bindKey(68, function(evt)
 * {
 *   graph.selectCells(true, false);
 * }, mxKeyHandler.CONTROL | mxKeyHandler.ALT);
 * (end)
 *
 * To support the Command key and the Control key on the Mac, the following
 * code can be used.
 *
 * (code)
 * keyHandler.isControlDown = function(evt)
 * {
 *   return mxEvent.isControlDown(evt) || (mxClient.IS_MAC && evt.metaKey);
 * };
 * (end)
 * 
 * Constructor: mxKeyHandler
 *
 * Constructs an event handler that executes functions bound to specific
 * keystrokes.
 * 
 * Parameters:
 * 
 * graph - Reference to the associated <mxGraph>.
 * target - Optional reference to the event target. If null, the document
 * element is used as the event target, that is, the object where the key
 * event listener is installed.
 */
function mxKeyHandler(graph, target)
{
	if (graph != null)
	{
		this.graph = graph;
		this.target = target || document.documentElement;
		
		// Creates the arrays to map from keycodes to functions
		this.normalKeys = [];
		this.shiftKeys = [];
		this.controlKeys = [];
		this.controlShiftKeys = [];
		this.altKeys = [];
		this.altShiftKeys = [];
		this.controlAltKeys = [];
		this.controlAltShiftKeys = [];
		
		this.keydownHandler = mxUtils.bind(this, function(evt)
		{
			this.keyDown(evt);
		});

		// Installs the keystroke listener in the target
		mxEvent.addListener(this.target, 'keydown', this.keydownHandler);
	}
};

/**
 * Variable: SHIFT
 *
 * Modifier mask for the shift key (see <bindKey>). Value is 1.
 */
mxKeyHandler.SHIFT = 1;

/**
 * Variable: CONTROL
 *
 * Modifier mask for the control key (see <bindKey> and <isControlDown>).
 * Value is 2.
 */
mxKeyHandler.CONTROL = 2;

/**
 * Variable: ALT
 *
 * Modifier mask for the alt key (see <bindKey>). Value is 4.
 */
mxKeyHandler.ALT = 4;

/**
 * Variable: graph
 * 
 * Reference to the <mxGraph> associated with this handler.
 */
mxKeyHandler.prototype.graph = null;

/**
 * Variable: target
 * 
 * Reference to the target DOM, that is, the DOM node where the key event
 * listeners are installed.
 */
mxKeyHandler.prototype.target = null;

/**
 * Variable: normalKeys
 * 
 * Maps from keycodes to functions for non-pressed control keys.
 */
mxKeyHandler.prototype.normalKeys = null;

/**
 * Variable: shiftKeys
 * 
 * Maps from keycodes to functions for pressed shift keys.
 */
mxKeyHandler.prototype.shiftKeys = null;

/**
 * Variable: controlKeys
 * 
 * Maps from keycodes to functions for pressed control keys.
 */
mxKeyHandler.prototype.controlKeys = null;

/**
 * Variable: controlShiftKeys
 * 
 * Maps from keycodes to functions for pressed control and shift keys.
 */
mxKeyHandler.prototype.controlShiftKeys = null;

/**
 * Variable: altKeys
 *
 * Maps from keycodes to functions for pressed alt keys.
 */
mxKeyHandler.prototype.altKeys = null;

/**
 * Variable: altShiftKeys
 *
 * Maps from keycodes to functions for pressed alt and shift keys.
 */
mxKeyHandler.prototype.altShiftKeys = null;

/**
 * Variable: controlAltKeys
 *
 * Maps from keycodes to functions for pressed control and alt keys.
 */
mxKeyHandler.prototype.controlAltKeys = null;

/**
 * Variable: controlAltShiftKeys
 *
 * Maps from keycodes to functions for pressed control, alt and shift keys.
 */
mxKeyHandler.prototype.controlAltShiftKeys = null;

/**
 * Variable: enabled
 * 
 * Specifies if events are handled. Default is true.
 */
mxKeyHandler.prototype.enabled = true;

/**
 * Function: isEnabled
 * 
 * Returns true if events are handled. This implementation returns
 * <enabled>.
 */
mxKeyHandler.prototype.isEnabled = function()
{
	return this.enabled;
};

/**
 * Function: setEnabled
 * 
 * Enables or disables event handling by updating <enabled>.
 * 
 * Parameters:
 * 
 * enabled - Boolean that specifies the new enabled state.
 */
mxKeyHandler.prototype.setEnabled = function(enabled)
{
	this.enabled = enabled;
};

/**
 * Function: bindKey
 * 
 * Binds the specified keycode to the given function. This binding is used
 * if exactly the given modifier keys are pressed. If the given function is
 * null then the binding is removed.
 * 
 * Parameters:
 *
 * code - Integer that specifies the keycode.
 * funct - JavaScript function that takes the key event as an argument.
 * modifiers - Optional combination of <mxKeyHandler.SHIFT>,
 * <mxKeyHandler.CONTROL> and <mxKeyHandler.ALT>. Default is 0.
 */
mxKeyHandler.prototype.bindKey = function(code, funct, modifiers)
{
	var keys = this.getKeys(modifiers || 0);

	if (funct != null)
	{
		keys[code] = funct;
	}
	else
	{
		delete keys[code];
	}
};

/**
 * Function: bindShiftKey
 * 
 * Binds the specified keycode to the given function. This binding is used
 * if the shift key is pressed.
 * 
 * Parameters:
 *
 * code - Integer that specifies the keycode.
 * funct - JavaScript function that takes the key event as an argument.
 */
mxKeyHandler.prototype.bindShiftKey = function(code, funct)
{
	this.bindKey(code, funct, mxKeyHandler.SHIFT);
};

/**
 * Function: bindControlKey
 * 
 * Binds the specified keycode to the given function. This binding is used
 * if the control key is pressed.
 * 
 * Parameters:
 *
 * code - Integer that specifies the keycode.
 * funct - JavaScript function that takes the key event as an argument.
 */
mxKeyHandler.prototype.bindControlKey = function(code, funct)
{
	this.bindKey(code, funct, mxKeyHandler.CONTROL);
};

/**
 * Function: bindControlShiftKey
 * 
 * Binds the specified keycode to the given function. This binding is used
 * if the control and shift key are pressed.
 * 
 * Parameters:
 *
 * code - Integer that specifies the keycode.
 * funct - JavaScript function that takes the key event as an argument.
 */
mxKeyHandler.prototype.bindControlShiftKey = function(code, funct)
{
	this.bindKey(code, funct, mxKeyHandler.CONTROL | mxKeyHandler.SHIFT);
};

/**
 * Function: getKeys
 *
 * Returns the array that maps from keycodes to functions for the given
 * combination of <mxKeyHandler.SHIFT>, <mxKeyHandler.CONTROL> and
 * <mxKeyHandler.ALT>.
 *
 * Parameters:
 *
 * modifiers - Combination of the modifier masks.
 */
mxKeyHandler.prototype.getKeys = function(modifiers)
{
	return [this.normalKeys, this.shiftKeys, this.controlKeys,
		this.controlShiftKeys, this.altKeys, this.altShiftKeys,
		this.controlAltKeys, this.controlAltShiftKeys][modifiers];
};

/**
 * Function: getModifiers
 *
 * Returns the combination of <mxKeyHandler.SHIFT>, <mxKeyHandler.CONTROL>
 * and <mxKeyHandler.ALT> for the modifier keys that are pressed in the
 * given event. This uses <isControlDown> for the control key.
 *
 * Parameters:
 *
 * evt - Key event whose modifier keys should be returned.
 */
mxKeyHandler.prototype.getModifiers = function(evt)
{
	return ((mxEvent.isShiftDown(evt)) ? mxKeyHandler.SHIFT : 0) |
		((this.isControlDown(evt)) ? mxKeyHandler.CONTROL : 0) |
		((mxEvent.isAltDown(evt)) ? mxKeyHandler.ALT : 0);
};

/**
 * Function: isControlDown
 * 
 * Returns true if the control key is pressed. This uses <mxEvent.isControlDown>.
 * 
 * Parameters:
 * 
 * evt - Key event whose control key pressed state should be returned.
 */
mxKeyHandler.prototype.isControlDown = function(evt)
{
	return mxEvent.isControlDown(evt);
};

/**
 * Function: getFunction
 * 
 * Returns the function associated with the given key event or null if no
 * function is associated with the given event.
 * 
 * Parameters:
 * 
 * evt - Key event whose associated function should be returned.
 */
mxKeyHandler.prototype.getFunction = function(evt)
{
	var keys = (evt != null) ? this.getKeys(this.getModifiers(evt)) : null;
	
	return (keys != null) ? keys[evt.keyCode] : null;
};
	
/**
 * Function: isGraphEvent
 * 
 * Returns true if the event should be processed by this handler, that is,
 * if the event source is either the target, one of its direct children, a
 * descendant of the <mxGraph.container>, or the <mxGraph.cellEditor> of the
 * <graph>.
 * 
 * Parameters:
 * 
 * evt - Key event that represents the keystroke.
 */
mxKeyHandler.prototype.isGraphEvent = function(evt)
{
	var source = mxEvent.getSource(evt);
	
	// Accepts events from the target object or
	// in-place editing inside graph
	if ((source == this.target || source.parentNode == this.target) ||
		(this.graph.cellEditor != null && this.graph.cellEditor.isEventSource(evt)))
	{
		return true;
	}
	
	// Accepts events from inside the container
	return mxUtils.isAncestorNode(this.graph.container, source);
};

/**
 * Function: keyDown
 * 
 * Handles the event by invoking the function bound to the respective keystroke
 * if <isEnabledForEvent> returns true for the given event and if
 * <isEventIgnored> returns false, except for escape for which
 * <isEventIgnored> is not invoked.
 * 
 * Parameters:
 * 
 * evt - Key event that represents the keystroke.
 */
mxKeyHandler.prototype.keyDown = function(evt)
{
	if (this.isEnabledForEvent(evt))
	{
		// Cancels the editing if escape is pressed
		if (evt.keyCode == 27 /* Escape */)
		{
			this.escape(evt);
		}
		
		// Invokes the function for the keystroke
		else if (!this.isEventIgnored(evt))
		{
			var boundFunction = this.getFunction(evt);
			
			if (boundFunction != null)
			{
				boundFunction(evt);
				mxEvent.consume(evt);
			}
		}
	}
};

/**
 * Function: isEnabledForEvent
 * 
 * Returns true if the given event should be handled. <isEventIgnored> is
 * called later if the event is not an escape key stroke, in which case
 * <escape> is called. This implementation returns true if <isEnabled>
 * returns true for both, this handler and <graph>, if the event is not
 * consumed and if <isGraphEvent> returns true.
 * 
 * Parameters:
 * 
 * evt - Key event that represents the keystroke.
 */
mxKeyHandler.prototype.isEnabledForEvent = function(evt)
{
	return (this.graph.isEnabled() && !mxEvent.isConsumed(evt) &&
		this.isGraphEvent(evt) && this.isEnabled());
};

/**
 * Function: isEventIgnored
 * 
 * Returns true if the given keystroke should be ignored. This returns
 * graph.isEditing().
 * 
 * Parameters:
 * 
 * evt - Key event that represents the keystroke.
 */
mxKeyHandler.prototype.isEventIgnored = function(evt)
{
	return this.graph.isEditing();
};

/**
 * Function: escape
 * 
 * Hook to process ESCAPE keystrokes. This implementation invokes
 * <mxGraph.stopEditing> to cancel the current editing, connecting
 * and/or other ongoing modifications.
 * 
 * Parameters:
 * 
 * evt - Key event that represents the keystroke. Possible keycode in this
 * case is 27 (ESCAPE).
 */
mxKeyHandler.prototype.escape = function(evt)
{
	if (this.graph.isEscapeEnabled())
	{
		this.graph.escape(evt);
	}
};

/**
 * Function: destroy
 * 
 * Destroys the handler and all its references into the DOM. This does
 * normally not need to be called, it is called automatically when the
 * window unloads (in IE).
 */
mxKeyHandler.prototype.destroy = function()
{
	if (this.target != null && this.keydownHandler != null)
	{
		mxEvent.removeListener(this.target, 'keydown', this.keydownHandler);
		this.keydownHandler = null;
	}
	
	this.target = null;
};
