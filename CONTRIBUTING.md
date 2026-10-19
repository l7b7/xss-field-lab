# Contributing

Keep exercises small, explicit and inert. Describe the objective, context, controlled source, transformations, sink, hints, completion explanation and relevant repair. Preserve stable IDs so local progress remains usable.

Use fixed proof markers and deterministic decisions. Do not introduce real payload execution, target requests or broader iframe permissions. Keep the source → transform → sink path inspectable.

After changes, run `npm test` and `npm run check`. Include the observed behavior and the check results in the pull request. Explain any browser verification limit. Keep the coach's curriculum reference in sync when changing the learning path.

Do not commit tokens, session evidence, personal data, journals or private notes. Report potential sandbox escapes through the private route in SECURITY.md.
