# Architecture and trust boundaries

The app is buildless HTML, CSS and native JavaScript modules. No runtime libraries, remote fonts, analytics, APIs or target-site requests are required.

## Components

| File | Responsibility |
| --- | --- |
| dist/curriculum.js | Eight modules and 20 stable exercise definitions |
| dist/engine.js | Fixed answer evaluation, escaped preview construction and saved-state validation |
| dist/app.js | Navigation, forms, preview tabs, hints, completions, resets and journal |
| dist/style.css | Responsive forest-green workspace design |
| .agents/skills/xss-field-coach | Portable coaching instructions and references |

## Learner input

All strings are data. The evaluator recognizes a narrow, inert marker grammar or fixed predictions; it is not an HTML/JavaScript interpreter. The parent app escapes values inserted into templates, uses textContent for trace text and never executes learner code.

The iframe has an empty sandbox permission list, an opaque origin and a script/network-denying CSP. The preview builder escapes learner strings and renders only fixed trusted proof markup for recognized outcomes. The CSP examples are text and model decisions, not executable scripts or live policy experiments.

Do not add allow-scripts, allow-same-origin, event-handler execution, eval, external preview resources, arbitrary srcdoc input, target fetching or script execution as an exercise feature. Preserve the distinction between a simulation and a live browser result.

## State

The versioned localStorage record stores the current exercise, drafts, synthetic comments, hints, attempts, completions and notes. Restoration accepts known exercise IDs, validates types and limits lengths. Per-exercise reset clears all of that exercise's state; global reset replaces the entire state after an explicit interface confirmation. Storage failures fall back to the current session.

## Access

The static app has no authentication backend. The original private host provides owner authentication outside the files in this repository. A local loopback server limits access to the local machine. A remote copy needs access control from its own hosting environment. A private GitHub repository alone does not authenticate site visitors.

## Validation limits

The automated tests validate deterministic model behavior, input escaping, persistence/reset helpers and static boundary assertions. They do not replace a real-browser layout/accessibility pass or prove behavior in every browser. The authoring environment did not provide browser control. The cover SVG is a design asset, not a QA screenshot.
