10-Day Data Analyst Roadmap - Static Site

This repository contains a small static HTML/CSS/JS site that renders the "10-Day Data Analyst Roadmap" and provides a checkbox for each day. The selections persist in your browser via localStorage.

How to use

Open `index.html` in a browser. For a lightweight local server (optional), run:

```bash
# from the repo root (requires Python 3)
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

Files

- `index.html` — main page with the roadmap and checkboxes
- `styles.css` — styling (no glow effects, subtle colors)
- `script.js` — saves checkbox state to localStorage

Notes

- The checkboxes are per-day. Progress saves in the browser that you used to check the boxes.
