# XSS Field Lab development

- Preserve the buildless static app in dist/ and its green workspace design.
- Learner input is data. Never evaluate it, attach active handlers, permit frame scripts or allow external requests from an exercise.
- Keep an empty iframe sandbox token list, escaped learner strings, fixed inert proof markup and the restrictive CSPs.
- Distinguish the simulation's result from live browser behavior and executable XSS.
- Keep exercise IDs stable and the bundled xss-field-coach curriculum in sync with dist/curriculum.js.
- Avoid runtime dependencies, analytics and external assets.
- Keep session evidence, tokens, journals and hosting credentials out of source commits.
- Preserve the hosted site's owner-only audience. Repository visibility and website access are independent.
- Run npm test and npm run check after behavioral changes. Report browser QA separately; do not claim visual validation from source tests.
