tern.ace
========

This project was just a POC. Please use this tern ace project https://github.com/sevin7676/Ace.Tern

[tern.js](https://github.com/marijnh/tern) is a stand-alone code-analysis engine for JavaScript written in Javascript.

[Ace](https://github.com/ajaxorg/ace) is a standalone code editor written in JavaScript.

**tern.ace** gives you the capability to use [tern.js](https://github.com/marijnh/tern) in a [Ace](https://github.com/ajaxorg/ace) editor like the [CodeMirror Tern addon](http://ternjs.net/doc/demo.html)

# Features

## Completion 

If you open completion, on Array variable, you will see functions of the array : 

![Tern ACE Completion](https://github.com/angelozerr/tern.ace/wiki/images/TernACE_CompletionOverview.png)

If you apply the completion, it will generate the signature of the selected function : 

![Tern ACE Completion Apply](https://github.com/angelozerr/tern.ace/wiki/images/TernACE_CompletionApply.png)

Use tab, to switch to next parameter.

## Text Hover 

If you hover known JS elements, a tooltip displays some useful information like documentation, type, url : 

![Tern ACE Completion Apply](https://github.com/angelozerr/tern.ace/wiki/images/TernACE_TextHover.png)

# Structure

The basic structure of the project is given in the following way:

* `demos/` demos with Tern and ACE. Open tern-autocompletion.html.
* `lib/` contains `tern-ace.js` which is the glue between Tern and ACE.

# Similar project

https://github.com/sevin7676/Ace.Tern

