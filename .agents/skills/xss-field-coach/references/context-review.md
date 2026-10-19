# Context review

## HTML text and attributes

- Prefer textContent or context-aware template escaping for plain text. Track &, <, > and quote delimiters according to the actual output context.
- Keep attribute names fixed and values quoted. A normal value/title attribute differs from an event-handler, style or URL attribute.
- Assigning a normal text property can avoid markup construction. HTML encoding alone does not validate a URL's protocol.
- Avoid using encoded output as input to a later decode-and-HTML-parse step. Track transformations in order and the number of decoding steps.

## JavaScript and CSS

- Identify both the HTML parser boundary and the JavaScript grammar when data is embedded inside a script element. HTML entity encoding is not a universal JavaScript serializer.
- Prefer data passed separately from executable code. If embedding data is required, use a maintained framework serializer suitable for the HTML/script boundary; generic JSON.stringify is not by itself a complete HTML embedding policy.
- Avoid dynamic code construction and untrusted event-handler content. A textContent call after an unsafe script interpolation does not repair the earlier boundary.
- Keep CSS property names fixed and validate allowed values. Do not generalize an HTML encoding result to a CSS parser.

## URLs

Parse with a standard URL parser, enforce the feature's allowed protocol and destination rules, then assign through an appropriate API or encode for its surrounding quoted attribute. Percent encoding is a transport representation, not a general output defense. Be explicit about relative URLs and the chosen base URL.

## DOM flows

Identify the exact source, normalization/decoding, guards, sink and reachable call path. Query parameters, fragments, postMessage data and persisted API results can be untrusted. A fragment is not included in the HTTP request URL. postMessage review also needs sender origin/source validation.

A sink name alone is a candidate, not proof. Compare raw response and live DOM; pause on mutation and inspect the call stack. Browser HTML parsing, node insertion and script execution are distinct events. The lab models only fixed, inert paths.

## Storage and rich content

Confirm a write and a separate read; identify the reader's view and role. Review previews, moderation panels and notifications as separate outputs. Prefer canonical storage plus protection at each output. If formatting is intentional, choose a maintained sanitizer with a narrow policy and avoid unsafe mutations after sanitizing. The lab marker recognizer is not a production HTML sanitizer.

## Filters

Review parser mismatch, case handling, transformations and context. A blacklist is not equivalent to an HTML sanitizer. Use inert examples to demonstrate a mismatch; do not invent executable impact from one. Confirm ordinary text still works after a repair.

## CSP

Inspect the actual enforced headers and any report-only headers. Identify the effective directive for the operation (including script-src-elem/script-src-attr and fallbacks). Multiple enforced policies constrain an operation together.

- self alone does not authorize inline script blocks.
- A matching script nonce can authorize that script element; it does not generally authorize inline event attributes.
- Nonces must be unpredictable and fresh per response. Never turn the lab's illustrative placeholder into a production nonce.
- Report-only does not itself block; another enforced policy still can. Deliver report-only policy through HTTP headers.
- CSP is a defense layer. It does not encode input, repair a DOM sink or prove a markup injection harmless.
- Some CSP directives and features depend on delivery mode and browser support. Verify unfamiliar behavior rather than generalizing the lab's three fixed cases.

## Primary sources

- [OWASP XSS Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [OWASP DOM-based XSS Prevention](https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html)
- [MDN script-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/script-src)
- [MDN iframe sandbox](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe)
- [OpenAI local skills](https://learn.chatgpt.com/docs/build-skills)
