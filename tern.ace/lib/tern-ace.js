define('ace/tern/server', [ 'require', 'exports', 'module' ], function(require,
    exports, module) {

  var TernServer = function(options) {
    var self = this;
    this.options = options || {};
    var plugins = this.options.plugins || (this.options.plugins = {});
    if (!plugins.doc_comment) plugins.doc_comment = true;
    if (this.options.useWorker) {
      this.server = new WorkerServer(this);
    } else {
      this.server = new tern.Server({
        getFile: function(name, c) { return getFile(self, name, c); },
        async: true,
        defs: this.options.defs || [],
        plugins: plugins
      });
    }
    this.docs = Object.create(null);
    this.trackChange = function(doc, change) { trackChange(self, doc, change); };

    this.cachedArgHints = null;
    this.activeArgHints = null;
    this.jumpStack = [];
  };

  TernServer.prototype = {
    addDoc: function(name, doc) {
      var data = {doc: doc, name: name, changed: null};
      this.server.addFile(name, docValue(this, data));
      doc.on("change", this.trackChange);
      return this.docs[name] = data;
    },

    delDoc: function(name) {
      var found = this.docs[name];
      if (!found) return;
      found.doc.off("change", this.trackChange);
      delete this.docs[name];
      this.server.delFile(name);
    },

    hideDoc: function(name) {
      closeArgHints(this);
      var found = this.docs[name];
      if (found && found.changed) sendDoc(this, found);
    },

    getCompletions: function(editor, session, pos, prefix, callback) {
     getCompletions(this, editor, session, pos, prefix, callback);
    },

    getHint: function(cm, c) { return hint(this, cm, c); },

    showType: function(cm, pos) { showType(this, cm, pos); },

    updateArgHints: function(cm) { updateArgHints(this, cm); },

    jumpToDef: function(cm) { jumpToDef(this, cm); },

    jumpBack: function(cm) { jumpBack(this, cm); },

    rename: function(cm) { rename(this, cm); },

    selectName: function(cm) { selectName(this, cm); },

    request: function (cm, query, c, pos) {
      var self = this;
      var doc = findDoc(this, cm);
      var request = buildRequest(this, doc, query, pos);

      this.server.request(request, function (error, data) {
        if (!error && self.options.responseFilter)
          data = self.options.responseFilter(doc, query, request, error, data);
        c(error, data);
      });
    }
  };
  
  exports.TernServer = TernServer;
  
  function findDoc(ts, doc, name) {
    for (var n in ts.docs) {
      var cur = ts.docs[n];
      if (cur.doc == doc) return cur;
    }
    if (!name) for (var i = 0;; ++i) {
      n = "[doc" + (i || "") + "]";
      if (!ts.docs[n]) { name = n; break; }
    }
    return ts.addDoc(name, doc);
  }

  //Generic request-building helper
  
  function toTernLoc(pos) {
    if (pos.row) return {line: pos.row, ch: pos.column}
    return pos;
  }

  function buildRequest(ts, doc, query, pos) {
    var files = [], offsetLines = 0, allowFragments = !query.fullDocs;
    if (!allowFragments) delete query.fullDocs;
    if (typeof query == "string") query = {type: query};
    query.lineCharPositions = true;
    if (query.end == null) {
      query.end = toTernLoc(pos || doc.doc.getCursorPosition());
      // TODO
      //if (doc.doc.somethingSelected())
      //  query.start = doc.doc.getCursor("start");
    }
    var startPos = query.start || query.end;

    // TODO
    doc.changed = true;
    if (doc.changed) {
      /*if (doc.doc.lineCount() > bigDoc && allowFragments !== false &&
          doc.changed.to - doc.changed.from < 100 &&
          doc.changed.from <= startPos.line && doc.changed.to > query.end.line) {
        files.push(getFragmentAround(doc, startPos, query.end));
        query.file = "#0";
        var offsetLines = files[0].offsetLines;
        if (query.start != null) query.start = Pos(query.start.line - -offsetLines, query.start.ch);
        query.end = Pos(query.end.line - offsetLines, query.end.ch);
      } else {*/
        files.push({type: "full",
                    name: doc.name,
                    text: docValue(ts, doc)});
        query.file = doc.name;
        doc.changed = null;
      //}
    } else {
      query.file = doc.name;
    }
    for (var name in ts.docs) {
      var cur = ts.docs[name];
      if (cur.changed && cur != doc) {
        files.push({type: "full", name: cur.name, text: docValue(ts, cur)});
        cur.changed = null;
      }
    }

    return {query: query, files: files};
  }

  function getFragmentAround(data, start, end) {
    var doc = data.doc;
    var minIndent = null, minLine = null, endLine, tabSize = 4;
    for (var p = start.line - 1, min = Math.max(0, p - 50); p >= min; --p) {
      var line = doc.getLine(p), fn = line.search(/\bfunction\b/);
      if (fn < 0) continue;
      var indent = CodeMirror.countColumn(line, null, tabSize);
      if (minIndent != null && minIndent <= indent) continue;
      minIndent = indent;
      minLine = p;
    }
    if (minLine == null) minLine = min;
    var max = Math.min(doc.lastLine(), end.line + 20);
    if (minIndent == null || minIndent == CodeMirror.countColumn(doc.getLine(start.line), null, tabSize))
      endLine = max;
    else for (endLine = end.line + 1; endLine < max; ++endLine) {
      var indent = CodeMirror.countColumn(doc.getLine(endLine), null, tabSize);
      if (indent <= minIndent) break;
    }
    var from = Pos(minLine, 0);

    return {type: "part",
            name: data.name,
            offsetLines: from.line,
            text: doc.getRange(from, Pos(endLine, 0))};
  }
  
  function docValue(ts, doc) {
    var val = doc.doc.getValue();
    if (ts.options.fileFilter) val = ts.options.fileFilter(val, doc.name, doc.doc);
    return val;
  }
  
  function getCompletions(ts, editor, session, pos, prefix, callback) {
    ts.request(editor, {type: "completions", types: true, origins: true}, function(error, data) {
      if (error) return showError(editor, error);
      callback(null, data.completions.map(function(item) {
        return {
          caption: item.name,
          snippet: getSnippet(item),
          score: 1,
          meta: item.origin ? item.origin : "tern"
        };
      }));      
    });        
  }

  function showError(cm, msg) {
    
  }
  
  function startsWith(str, token) {
    return str.slice(0, token.length).toUpperCase() == token.toUpperCase();
  }
  
  function getSnippet(completion) {
    var text = completion.name;
    var type = completion.type;
    var firstParam = null, currentParam = null, typeParsing = false, nbParams = 0;
    if (startsWith(type, 'fn(')) {
      text += '(';
      var bracket = 0;
      var afterStartFn = type.substring(2, type.length);
      var i = 0;
      for (i = 0; i < afterStartFn.length; i++) {
        var c = afterStartFn.charAt(i);
        switch (c) {
        case '(':
          bracket++;
          break;
        case ')':
          bracket--;
          break;
        default:
          if (bracket == 1) {
            if (typeParsing) {
              if (c == ',')
                typeParsing = false;
            } else {
              if (currentParam == null) {
                if (c != ' ' && c != '?') {
                  currentParam = c;
                }
              } else {
                if (c == ':') {
                  typeParsing = true;
                  if (firstParam == null) {
                    firstParam = currentParam;
                  } else {
                    text += ', ';
                  }
                  nbParams++;
                  text += '${';
                  text += nbParams;
                  text += ':';
                  text += currentParam;
                  text += '}';
                  currentParam = null;                  
                } else {
                  if (c != ' ' && c != '?') {
                    currentParam += c;
                  }
                }
              }
            }
          }
        }
        if (bracket == 0)
          break;
      }
      text += ')';
    }
    return text;
  }
  
  function trackChange(ts, doc, change) {
    //var data = findDoc(editor);
    
    //var argHints = cachedArgHints;
    //TODO
    //if (argHints && argHints.doc == doc && cmpPos(argHints.start, change.to) <= 0)
    //  cachedArgHints = null;
  } 

});

define('ace/tern/tern_tooltip', ['require', 'exports', 'module' , 'ace/lib/dom', 'ace/lib/event', 'ace/range'], function(require, exports, module) {


  var dom = require("ace/lib/dom");
  var event = require("ace/lib/event");
  var Range = require("ace/range").Range;

  var tooltipNode;

  var TernTooltip = function(editor, server) {
      if (editor.ternTooltip)
          return;
      editor.ternTooltip = this;    
      this.editor = editor;
      this.server = server;
      
      editor.tooltip = tooltipNode || this.$init();

      this.update = this.update.bind(this);
      this.onMouseMove = this.onMouseMove.bind(this);
      this.onMouseOut = this.onMouseOut.bind(this);
      event.addListener(editor.renderer.scroller, "mousemove", this.onMouseMove);
      event.addListener(editor.renderer.content, "mouseout", this.onMouseOut);
  };

  (function(){
      this.token = {};
      this.range = new Range();
      
      this.update = function() {
          this.$timer = null;
          
          var r = this.editor.renderer;
          if (this.lastT - (r.timeStamp || 0) > 1000) {
              r.rect = null;
              r.timeStamp = this.lastT;
              this.maxHeight = window.innerHeight;
              this.maxWidth = window.innerWidth;
          }

          var canvasPos = r.rect || (r.rect = r.scroller.getBoundingClientRect());
          var offset = (this.x + r.scrollLeft - canvasPos.left - r.$padding) / r.characterWidth;
          var row = Math.floor((this.y + r.scrollTop - canvasPos.top) / r.lineHeight);
          var col = Math.round(offset);

          var screenPos = {row: row, column: col, side: offset - col > 0 ? 1 : -1};
          var session = this.editor.session;
          var docPos = session.screenToDocumentPosition(screenPos.row, screenPos.column);
          var token = session.getTokenAt(docPos.row, docPos.column);

          if (!token && !session.getLine(docPos.row)) {
              token = {
                  type: "",
                  value: "",
                  state: session.bgTokenizer.getState(0)
              };
          }
          if (!token) {
              session.removeMarker(this.marker);
              tooltipNode.style.display = "none";
              this.isOpen = false;
              return;
          }
          if (!this.isOpen) {
              tooltipNode.style.display = "";
              this.isOpen = true;
          }
          
          var self = this;
          var tokenText = null;
          this.server.request(editor, {type: "type", types: true, origins: true, docs: true, urls: true}, function(error, data) {
            if (error) return;// showError(editor, error);
            if(data.type) {
              tokenText = '';
              if(data.doc) tokenText += data.doc;
              if (tokenText != '') {
                tokenText += '\n';
              }
              if(data.name) tokenText += ' - name: ' +data.name;
              if (tokenText != '') {
                tokenText += '\n';
              }
              tokenText += ' - type: ' + data.type;
              if(data.origin) tokenText += '\n - origin: ' + data.origin;
              if(data.url) tokenText += '\n - @see ' + data.url;
            } 
            }
          , docPos);
          
          if (!tokenText) {
            session.removeMarker(this.marker);
            tooltipNode.style.display = "none";
            this.isOpen = false;
            return;
        }
          
          /*var tokenText = token.type;
          if (token.state)
              tokenText += "|" + token.state;
          if (token.merge)
              tokenText += "\n  merge";
          if (token.stateTransitions)
              tokenText += "\n  " + token.stateTransitions.join("\n  ");
          */
          
          if (self.tokenText != tokenText) {
              tooltipNode.textContent = tokenText;
              self.tooltipWidth = tooltipNode.offsetWidth;
              self.tooltipHeight = tooltipNode.offsetHeight;
              self.tokenText = tokenText;
          }
          
          self.updateTooltipPosition(self.x, self.y);

          self.token = token;
          session.removeMarker(self.marker);
          self.range = new Range(docPos.row, token.start, docPos.row, token.start + token.value.length);
          self.marker = session.addMarker(self.range, "ace_bracket", "text");
      };
      
      this.onMouseMove = function(e) {
          this.x = e.clientX;
          this.y = e.clientY;
          if (this.isOpen) {
              this.lastT = e.timeStamp;
              this.updateTooltipPosition(this.x, this.y);
          }
          if (!this.$timer)
              this.$timer = setTimeout(this.update, 100);
      };
      
      this.onMouseOut = function(e) {
          var t = e && e.relatedTarget;
          var ct = e &&  e.currentTarget;
          while(t && (t = t.parentNode)) {
              if (t == ct)
                  return;
          }
          tooltipNode.style.display = "none";
          this.editor.session.removeMarker(this.marker);
          this.$timer = clearTimeout(this.$timer);
          this.isOpen = false;
      };
      
      this.updateTooltipPosition = function(x, y) {
          var st = tooltipNode.style;
          if (x + 10 + this.tooltipWidth > this.maxWidth)
              x = window.innerWidth - this.tooltipWidth - 10;
          if (y > window.innerHeight * 0.75 || y + 20 + this.tooltipHeight > this.maxHeight)
              y = y - this.tooltipHeight - 30;
          
          st.left = x + 10 + "px";
          st.top = y + 20 + "px";
      };

      this.$init = function() {
          tooltipNode = document.documentElement.appendChild(dom.createElement("div"));
          var st = tooltipNode.style;
          st.position = "fixed";
          st.display = "none";
          st.background = "lightyellow";
          st.borderRadius = "";
          st.border = "1px solid gray";
          st.padding = "1px";
          st.zIndex = 1000;
          st.fontFamily = "monospace";
          st.whiteSpace = "pre-line";
          return tooltipNode;
      };

      this.destroy = function() {
          this.onMouseOut();
          event.removeListener(this.editor.renderer.scroller, "mousemove", this.onMouseMove);
          event.removeListener(this.editor.renderer.content, "mouseout", this.onMouseOut);
          delete this.editor.ternTooltip;    
      };

  }).call(TernTooltip.prototype);

  exports.TernTooltip = TernTooltip;

  });