# Nithin Bobbiligama — Portfolio

A static, single-page portfolio site. No build step, no Jekyll, no npm —
just `index.html`, `styles.css`, `script.js`, and an `assets/` folder,
hosted directly on GitHub Pages.

Live at: **https://nithinbobbili.github.io**

---

## File structure

```
/
├── index.html          — all page content and structure
├── styles.css           — all styling (colors, layout, animations)
├── script.js             — scroll effects, mobile menu, nav highlighting
├── favicon.svg          — browser tab icon
├── README.md
└── assets/
    ├── resume.pdf         — linked from the nav and Contact section
    └── images/
        ├── nb.jpg          — hero + about photo
        └── nithin.jpg      — unused backup photo (safe to delete)
```

Every path in `index.html` is **case-sensitive** and must match exactly:
`assets/images/nb.jpg` and `assets/resume.pdf`. GitHub Pages runs on a
case-sensitive filesystem, so `Assets/Images/NB.jpg` will 404 even though
it looks right in a folder listing.

---

## How this was deployed (manual steps, no git command line)

This was set up entirely through the GitHub website — no terminal, no
`git push`. These are the exact steps used, kept here so future updates
can follow the same process.


### 1. Uploaded the new static site
From the repo's main page:
**Add file → Upload files** → dragged in `index.html`, `styles.css`,
`script.js` → scrolled down → wrote a commit message → **Commit changes**
(committed directly to `main`, no pull request).

### 2. Uploaded the assets folder
Same **Add file → Upload files** flow, dragging in the `assets` folder
(containing `images/` and `resume.pdf`).

### 3. Added the favicon
Uploaded `favicon.svg` to the repo root the same way (Add file → Upload
files).

---

## How to make a future edit (no git required)

1. Go to https://github.com/NithinBobbili/nithinbobbili.github.io
2. Click the file you want to change (`index.html`, `styles.css`, or
   `script.js`)
3. Click the **pencil (edit)** icon in the top-right of the file view
4. Make your change, scroll down, add a short commit message
5. Click **Commit changes...** → commit directly to `main`
6. Wait ~1 minute, then visit the live site and hard-refresh
   (`Ctrl+Shift+R` / `Cmd+Shift+R`) to bypass the browser cache

To add a brand-new file (e.g. a new project image), use
**Add file → Upload files** from the repo's main page instead.

---

## Checking the site settings

If the site ever stops updating or shows a 404:

1. Go to the repo → **Settings → Pages**
2. **Source** should be "Deploy from a branch"
3. **Branch** should be `main`, folder `/ (root)`
4. If those look right but the site is still stale, it's almost always a
   browser cache — hard refresh, or try an incognito window.

---

## Content sections in `index.html`

| Section | Element ID | What it holds |
|---|---|---|
| Hero | `#top` | Headline, intro, hero photo, stats strip, pipeline diagram |
| About | `#about` | Bio paragraphs |
| Skills | `#skills` | Tagged skill categories |
| Experience | `#experience` | Timeline of roles |
| Projects | `#projects` | Project cards |
| Education | `#education` | Degree list |
| Contact | `#contact` | Email + social links |

To add a new project, copy an existing `<article class="project-card">`
block inside `#projects` and edit its contents.

To add a new skill tag, add another `<span class="tag">Name</span>`
inside the relevant `.tag-row` in `#skills`.
