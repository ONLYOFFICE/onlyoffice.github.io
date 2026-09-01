# OnlyMath

Do the maths inside the document you are writing.

OnlyMath turns an ONLYOFFICE text document into a CAS-calculator.

Insert an equation field (a mathematical field), type an expression the way you would write it on paper (i.e. 2+2), and press Alt+C to calculate it. The result is written straight back into the document as a real equation (i.e. 2+2=4).

Runs locally. OnlyMath is free. There is no service to sign up for, no account, no API key, and nothing leaves the machine.

## What it can do

- Calculate (Alt+C) — OnlyMath calculates arithmetic and symbolic expressions like: `2+2`, `sin(60)`, `f(1)`, `f'(1)`, `√18`
- Solve equations like `2x-4=6` — press Alt+L — OnlyMath will respond: `x=5`.
- Define your own functions — write `f(x):=2x²+3` (and press Alt+C). Then write `f(1)` in a new math field (and press Alt+C). OnlyMath will respond: `f(1)=5`.
- Differentiate — define a function and then write `f'(x)` Alt+C and OnlyMath will respond `f'(x)=4x`
- Integrate — define a function and then write `F(x)` Alt+C and OnlyMath will respond `F(x)=(2/3)x³+3x+k`

## Written for Danish high school students (A-levels, upper-secondary maths)

Output follows the conventions students are expected to use: decimal comma,
`k` as the integration constant, and Scandinavian solution notation.

## Using it

Insert an equation field, type into it, then evaluate.

**Keyboard**

| Shortcut | Action                                                                            |
| -------- | --------------------------------------------------------------------------------- |
| `Alt+M`  | Insert a new **m**athematics field                                                |
| `Alt+C`  | **C**alculate the expression in the math field the cursor is in                    |
| `Alt+L`  | Solve the equation in the math field the cursor is in (Danish: **l**øs ligningen)  |

**Example (normal flow in an OnlyMath exercise)**

*The function f is defined by*  `f(x)=x²-4x+3`

*Calculate* `f(4)` *and find the x-coordinate of the vertex (Danish: Toppunkt).*

The student defines the function by typing: "Alt+M   f(x):=x^2-4x+3   Alt+C" (and OnlyMath replies by writing `f(x)=x²-4x+3`)

To get the result, on the next line the student types: "Alt+M   f(4)   Alt+C" (and OnlyMath replies by writing `f(4)=3` )

To find the x-coordinate of the vertex, the student solves the equation f'(x)=0 by typing: "Alt+M   f'(x)=0   Alt+L" (and OnlyMath replies by writing `x=2,000` )

**Toolbar**

As an alternative to the shortcuts, use the Insert tab menu of ONLYOFFICE, click OnlyMath (the blue icon) and choose your command.

**Right-click in math field** — with the cursor inside a math field, the context menu offers Calculate, Solve and OnlyMath Settings.

### Settings

OnlyMath Settings — from the toolbar menu or the right-click menu — opens a side panel where you set the output precision and choose which parameter to solve for, or whether to solve in the real domain or in the complex domain. The panel also lists the functions you have defined in the document.

Defined functions can be cleared in the OnlyMath settings by pushing the "Undefine all" button.

## How it works

Expressions are evaluated by Giac/Xcas, a mature open-source computer algebra system, compiled to WebAssembly and run in a background worker so the editor stays responsive. The engine ships inside the plugin, which is why OnlyMath needs no connection of any kind.

**Limitations**

OnlyMath cannot draw a graph (use GeoGebra for that — you can copy your math field directly into GeoGebra).

OnlyMath doesn't do any statistics, probability calculations, triangle-solve or regression (please use GeoGebra for that).

## Requirements

ONLYOFFICE Docs 7.2 or newer. Text documents only.

## Licence

OnlyMath is free software under the GNU General Public License v3.0 or later
(see [LICENSE](./LICENSE)), because it bundles and links the GPL-licensed
Giac/Xcas engine. Bundled third-party components and their licences are listed in
[3rd-Party.txt](./3rd-Party.txt).