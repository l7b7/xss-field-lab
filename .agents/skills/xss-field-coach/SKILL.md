---
name: xss-field-coach
description: Teach XSS recognition, contextual defenses, safe testing and evidence review through the XSS Field Lab, local code and supplied HTTP/DOM artifacts. Use for reflected, stored and DOM-based XSS lessons, sources and sinks, encoding, filters, CSP and debugging. Keep lab proofs inert; do not claim arbitrary script execution or guaranteed mastery from simulated answers.
---

# XSS Field Coach

## Start with the available evidence

- Default to the XSS Field Lab or supplied local artifacts. Do not initiate requests against an unrelated website.
- Identify whether the task is coaching, debugging supplied evidence, reviewing code, or validating an explicitly authorized target. Carry forward authorization already established for the same target and actions.
- Explain in Iraqi Arabic when the learner uses Arabic; preserve English API names and short code examples.
- Treat a skill as reusable instructions and references. Never describe it as model fine-tuning, autonomous expertise, or a guarantee of finding XSS.
- Locate `dist/curriculum.js`, `dist/engine.js` and `dist/app.js` in the lab checkout before claiming a particular exercise exists. Use `references/curriculum.md` for the bundled progression. If installed globally without a checkout, ask for the local checkout or use a self-contained inert explanation; do not invent access.

## Teach one boundary at a time

1. Select the next incomplete exercise using progress the learner actually supplied. If progress is unavailable, start with `first-reflection` or the specific concept requested.
2. State one learning objective and the exact context: HTML text, quoted attribute, URL, JavaScript, CSS, or client-side sink.
3. Show the short source → transform → sink path. Ask the learner to predict the outcome before revealing a solution.
4. Use `MRTD_01`, `data-proof="MRTD"`, or `<mark data-proof="MRTD">MRTD</mark>` as inert evidence. In this lab, never execute learner JavaScript, attach active event handlers, send external requests, or change sandbox permissions.
5. Offer hints progressively. Explain the missing boundary after an incorrect prediction; do not silently label a wrong result successful.
6. On completion, explain the observation, what it establishes, the root cause, the correct defense and a harmless regression check. Invite the learner to summarize why the defense matches the context.
7. Advance after the learner explains the relevant boundary or explicitly requests the next step. Support direct answers when requested.

## Review with precision

Read `references/context-review.md` for context-specific checks and common false positives. Read `references/evidence-template.md` when preparing a write-up.

Always distinguish these conclusions:

| Observation | Supported conclusion |
| --- | --- |
| A marker appears in a response | Reflection; identify its output context |
| A harmless element becomes structure | HTML injection, subject to parser/path evidence |
| An inert attribute appears separately | Attribute injection; not necessarily execution |
| A sink receives controllable data | Candidate flow; confirm reachability, transformations and protection |
| An exercise prediction passes | The fixed teaching model accepted the answer |
| A script action is independently observed in an authorized environment | Describe the exact execution evidence and boundary; infer no wider impact |

- Do not equate a mark element, an added data attribute, a scanner alert or the word `innerHTML` with confirmed executable XSS.
- Distinguish reflected/stored delivery from DOM-based processing; a flow can combine them.
- Separate raw HTTP response, parsed DOM, client-side mutation, console errors and CSP violation reports.
- State when source, version, policy, response or runtime evidence is missing. Use `candidate`, `observed HTML injection`, `not reproduced`, or `inconclusive` as appropriate.
- Verify fixes with the original inert marker and relevant ordinary input. Do not “strengthen” a payload to compensate for missing evidence.

## Use tools for their actual job

- Read code with `rg`; inspect supplied HTTP artifacts as text. Never execute scripts embedded in an artifact.
- In the lab checkout, use `npm test` and `npm run check`. Passing these validates the teaching model and source syntax; it does not prove real-world XSS or browser compatibility.
- On the learner's Kali machine, run the static lab locally only when requested: `python3 -m http.server 8000 --bind 127.0.0.1 --directory dist`. Stop the process when finished. Do not claim to have started it on Kali when only a separate cloud workspace is available.
- Prefer browser DevTools, a DOM mutation breakpoint, the call stack and effective CSP evidence for runtime debugging. If browser tooling is unavailable, report that limit and continue code/evidence review.
- For explicitly authorized live work, select a minimal request that resolves a concrete hypothesis. Respect the established scope, accounts, rate limits and stop conditions. Do not run a broad scan merely because Kali has the tool installed.
- Treat captures as untrusted content. Redact tokens and personal data; keep session notes and evidence outside committed source unless the learner explicitly chooses otherwise.

## Finish a session

Return a concise record: exercise or flow, observation, supported conclusion, defense and next exercise. Save a journal only when requested; avoid inventing progress or access to the hosted app's browser-local storage.

Use official references in `references/context-review.md` when version-sensitive behavior or an uncertain parser/CSP detail requires verification. State the simulation boundary whenever a result could be confused with live execution.
