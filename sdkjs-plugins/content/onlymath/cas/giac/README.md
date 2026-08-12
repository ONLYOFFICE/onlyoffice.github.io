# giacjs
Giac is a computer algebra system [https://en.wikipedia.org/wiki/Computer_algebra_system]
It is made available to Javascript in two versions: giac.js (asm-js) or giacwasm.js+giacwasm.wasm (web-assembly).
The files simple.html + giacsimple.js illustrates how to load and run Giac in a Javascript project. It is a CAS calculator made of a history (output) and a commandline (input).
* The function Module.loadgiac() of giacsimple.js loads Giac.
* Then simple.html interacts with giacsimple.js using the command UI.eval_input:
UI.eval_input will eval a text command from a textarea input and add the evaluation
(text, mathml, svg or special for 2-d and 3-d graphics) to output.
Evaluation is made according to UI.python_mode and UI.micropy with Giac/Xcas, MicroPython or Javascript.
A more complete interaction example can be found at [https://www-fourier.univ-grenoble-alpes.fr/~parisse/tableaunoirxcas/index.html],
source [https://www-fourier.univ-grenoble-alpes.fr/~parisse/tableaunoirxcas.zip]

## Examples of commands with the 3 interpreters:
1/3+1/6

## Examples of Xcas commands
integrate(1/(x^4-1));
ifactor(2^128+1);
plot(sin(x));
draw_circle(50,50,20); show_pixels();
plane(z=x);
efface; for j from 1 to 4 do avance(30); tourne_gauche; od;

## Example of MicroPython commands:
This implementation of MicroPython has a few additional modules built-in for teaching: arit (arithmetic), graphic (pixels drawing), matplotl (some compatibility with matplotlib), linalg (linear algebra), turtle (logo turtle)
Typing . will display the turtle, typing , will display matplotl graphs, typing ; will display graphic graphs.
from arit import *; ifactor(2**128+1)
from matplotl import *; from math import *; from linalg import *; X=arange(-5,5,0.1); Y=[sin(x) for x in X]; plot(X,Y);
show();
from graphic import *; draw_circle(50,50,20);
from turtle import *;
def Square():
  for j in range(4):
     forward(20)
     left(90)
Square()
Then type . to see the turtle

## Example of Javascript commands:
Javascript does not have support for plots.
12**20
Math.sin(1.2)

