# Bundled lab progression

Use this map to choose an exercise. Read the local exercise source when a precise expected answer is needed; reveal hints progressively. The IDs are stable and match `dist/curriculum.js`.

## Fundamentals (Beginner)

- **first-reflection — Follow your first reflection**: Send the harmless marker MRTD_01 through a simulated search. Find it in the response and decide what this evidence proves. Context: HTML text · encoded.
- **classify-flow — Name the data flow**: A comment is saved on Monday and appears in another reader’s page on Tuesday. Which delivery pattern is this? Context: Delivery pattern.

## Reflected XSS (Beginner)

- **html-boundary — Cross the HTML text boundary**: In this model, the search template inserts input as HTML. Make the preview show the highlighted MRTD marker using a mark element with data-proof="MRTD". Context: HTML text · raw.
- **attribute-boundary — Recognize a quoted attribute**: The model inserts input inside a double-quoted value attribute. Add the harmless attribute data-proof="MRTD" by closing the existing value. Do not add an event handler. Context: Double-quoted HTML attribute.
- **script-context — Spot the JavaScript context**: A server interpolates a profile name into an inline JavaScript string. Choose the strongest redesign for plain text display. Context: Inline JavaScript string.

## Stored XSS (Intermediate)

- **stored-marker — Leave a marker for the next visit**: Save a mark element containing MRTD, then visit as the simulated reader. Completion requires the saved marker to appear during the second visit. Context: Persisted HTML · simulated reader.
- **stored-defense — Protect every reader**: Public comments are encoded, but an admin review page uses raw HTML. Which fix covers the root cause? Context: Multiple output sinks.

## DOM-based XSS (Intermediate)

- **source-sink — Trace the source to the sink**: Identify the untrusted source and the HTML-parsing sink. The fragment is read by browser code; it is not sent as part of an HTTP request URL. Context: Client-side HTML flow.
- **fragment-decode — Follow one decoding step**: Supply a percent-encoded MRTD mark element, prefixed with #. The model decodes it once and passes it into the HTML sink. This never changes the actual site URL. Context: Fragment → decode → HTML.
- **safe-sink — Repair the DOM sink**: The feature is a plain text greeting. Choose the repair that keeps angle brackets visible without parsing HTML. Context: Plain text DOM output.

## Output encoding (Intermediate)

- **encode-text — Encode for HTML text**: Encode <MRTD & "ok"> for a template that writes an HTML text node. Use the lab encoder’s canonical form for all five special characters. Context: HTML text.
- **encode-attribute — Keep an attribute value intact**: Encode the two double quotes in the input " data-proof="MRTD so the whole string stays inside value="…". Use &quot; for each quote. Context: Double-quoted attribute.
- **url-context — Validate before encoding a URL**: A profile link is user-controlled. What is the right sequence when the application permits only HTTPS links? Context: URL inside an HTML attribute.

## Filters & sanitizers (Advanced)

- **filter-case — Find a filter’s blind spot**: A toy filter removes lowercase mark elements only, before a case-insensitive HTML model. Use an uppercase MARK element and the MRTD proof attribute to show the mismatch. Context: Case-sensitive filter → HTML.
- **sanitize — Choose the right content policy**: A comment editor intentionally supports bold and italic formatting. Which strategy preserves formatting while controlling HTML? Context: Intentional rich HTML.

## Content Security Policy (Advanced)

- **csp-inline — Predict an inline-script decision**: Predict what an enforced script-src 'self' policy does to this inline proof script. The decision is modeled; the script is never inserted or executed. Context: CSP · enforced.
- **csp-nonce — Understand a nonce boundary**: A script block has a matching nonce. A button has an inline onclick handler. Which is authorized by this policy? The nonce below is an illustrative placeholder. Context: CSP · nonce model.
- **csp-report-only — Separate reporting from enforcement**: An inline marker violates a report-only script policy. No enforced policy is present. Predict the policy’s effect. Context: CSP · report-only.

## Debugging & evidence (Advanced)

- **debug-dom — Compare the response with the DOM**: The HTTP response has no marker, but DevTools Elements shows it after client code runs. Where should you investigate next? Context: Response vs live DOM.
- **capstone — Build a precise evidence trail**: Review this stored-to-DOM flow. Classify the delivery, identify the sink and select the fix for a plain text reader. Do not claim execution from an inert mark element. Context: Stored delivery + DOM processing.
