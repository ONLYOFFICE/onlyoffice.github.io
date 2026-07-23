# OnlyOffice NLP Solver

A nonlinear programming (NLP) solver plugin for OnlyOffice Spreadsheet. 
Define a target cell, side conditions, and parameter cells with optional bounds,
then let the solver find optimal values to minimize your target function.

## Download

Download on the project page:

[Project page](https://karlbreuer.com/nlp-solver/en)

Planning to submit this to the OnlyOffice plugin store

## How to Use

1. Select the cell you want to minimize
2. Select your parameter range (with optional min/max bounds—defaults to -1.0 and 1.0 if unset)
3. Select your side conditions (with info if min/max are defined or not)
4. Click **Start**

## Examples

Check out `oo-nlp-solver_examples.xlsx` for working examples.

[Examples here](https://karlbreuer.com/nlp-solver/en)

## Contributing

I'd love your help improving this plugin! Here's how you can contribute:

- **Found a bug?** Send me your spreadsheet file so I can reproduce and fix the issue
- **Have a tricky optimization problem?** Share it—I'm always looking for edge cases to test against
- **Benchmarked against Excel or LibreOffice Calc?** I'd really appreciate comparison feedback (better, worse, different results)

The solver currently uses a custom Nelder-Mead (simplex downhill) implementation that could probably be tuned further.

## Keywords

NLP, solver, optimization, OnlyOffice plugin, spreadsheet, nonlinear programming, WebAssembly, Go, parameter fitting, minimization

## License

AGPL-3.0 with additional commercial restrictions.

**TL;DR:**
- ✅ Free to use and modify
- ✅ Modifications must be shared (open source)
- ❌ Commercial sale requires permission
