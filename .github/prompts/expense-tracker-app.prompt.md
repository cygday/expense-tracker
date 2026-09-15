---
name: "Expense Tracker App"
description: "Implement or improve a feature in this vanilla expense tracker while preserving its localStorage data and simple browser-only architecture."
argument-hint: "Describe the expense tracker feature or bug to implement"
agent: "agent"
---
Work on the requested change for this browser-only expense tracker:

${input:request:Describe the feature, bug, or UX improvement to implement}

Before editing, inspect the relevant code and identify the smallest owning change. Use the existing architecture and conventions in:
- [index.html](../../index.html)
- [script.js](../../script.js)
- [style.css](../../style.css)

Requirements:
- Keep the app dependency-free and compatible with directly opening `index.html` in a browser.
- Preserve existing transactions stored under the `localStorage` key `transactions`; handle older records without newly introduced fields.
- Keep calculations correct for positive income, negative expenses, empty data, decimal amounts, and local dates.
- Keep the UI usable on narrow screens and accessible with labels, keyboard interaction, semantic controls, visible focus states, and meaningful status text where relevant.
- Avoid inline event handlers and unsafe HTML interpolation when the requested change touches rendering; preserve user-entered text safely.
- Match the existing visual language unless the request explicitly asks for a redesign.
- Do not add unrelated refactors or dependencies.

Implementation workflow:
1. Trace the affected HTML, JavaScript state flow, rendering, and styles.
2. Implement the smallest complete change across only the necessary files.
3. Check the changed behavior with a focused browser or runtime check, including the relevant edge cases.
4. Report the files changed, behavior implemented, and validation performed. Mention any limitation that could not be verified.
