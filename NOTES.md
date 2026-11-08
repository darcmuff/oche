# DuffDarts (oche) — dev notes

Read this file first on any future job. Keep it current in the same change when the picture changes. Work on `dev` only until Marc expressly approves `main`. These notes stay documentation unless he asks for a product change. Never put secrets, tokens, or private details in this file or in commits.

## Purpose

DuffDarts is a phone-first darts scorer: `index.html`, `sw.js`, and `.nojekyll`. There is no build step and there was no README.

Games on the setup screen: 501, 301, cricket, round the clock, Shanghai, and Halve-it. One to four players. 501 and 301 offer double-out or straight-out, first to 1, 2, 3, 5, or 7 legs, and a checkout hint. The in-progress match (`oche:match`), names (`oche:names`), and league table (`oche:league`: played, won, win rate) stay in `localStorage` on that phone. When results exist, home shows a scrolling league preview; its header opens the full table.

Service worker cache name is `oche-v22`. Navigations are network-first so a published page can update; other same-origin files and Google fonts are cache-first, with the cached page as the offline fallback.

## Current state (8 Nov 2026)

Checked against `main` `45aae325cba5ca714e2d5b3f67c56ce8ee22bff2` (16 Sep 2026, "Bump cache to oche-v22 for entry beside Enter"). `main` was the only branch. `dev` was created from that commit for this file.

Still the shipped UI from that day:

- Score entry sits beside Enter (cache `oche-v22`).
- The match pad stays large and the scoreboard tightens for 3–4 players (`oche-v21`).
- The home league preview scrolls, and the header opens the full pane (`oche-v20`).

Script defaults when the phone has no saved names: 501, double-out, first to 3 legs. `index.html` has no TODO or FIXME. The tree does not describe a further product change.

## Where to look

`index.html` holds the UI, the `GAMES` list, checkout maths, and the league. `sw.js` is only the cache name and fetch strategy. A visible update that should reach an installed copy has shipped as its own commit plus a new `oche-vN` name in `sw.js`.

## Next work

No next task is recorded in the source or history. Leave features, cache names, and deploys alone until Marc asks.

## Rules

Commit further work, including note updates, on `dev`. Leave `main` untouched until Marc expressly approves it. If behaviour, the cache name, or the branch state changes, rewrite the dated section above.
