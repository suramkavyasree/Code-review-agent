Semgrep test PR

This branch adds an isolated test file at `src/tests/vulnerable.js` which intentionally uses `innerHTML` so Semgrep can detect it.

How to use:

1. Create a branch and push it, then open a PR on your remote repository.
2. Run Semgrep locally: `semgrep --config .semgrep.yml --verbose` from the repo root.
3. The rule `js.xss.innerhtml` should flag the `innerHTML` assignment in `src/tests/vulnerable.js`.

Notes:
- This file is intentionally isolated and does not modify application code. Do not merge into production branches.
