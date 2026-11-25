# Lemuel Ajewole - Portfolio

Live: https://ajewolelemuel.vercel.app
Code: https://github.com/Ajewole-CODER/My-Website

Plain HTML, CSS and JavaScript. No build step, no frameworks.

## How to update your repo

1. In your local `My-Website` folder, **delete** the old files: `index.html`, `toggle.js`, `styles/`, `TOGGLE/`, `TODO.md`, and everything in `images/`.
2. Copy everything from this zip into the folder (keep the folder structure).
3. Open `index.html` in your browser (or use VS Code Live Server) and check it.
4. Commit and push. Vercel redeploys on its own:

```bash
git add -A
git commit -m "Rebuild portfolio: fix bugs, new design, animations"
git push
```

## Folder structure

```
index.html
favicon.svg
robots.txt, sitemap.xml
assets/
  css/style.css
  js/main.js
  img/            avatar.webp, about.webp, og-preview.png
  img/projects/   project thumbnails (SVG)
```

## What was broken, and is now fixed

| Problem in the old version | Fix |
| --- | --- |
| `toggle.js` crashed on load (it looked for a menu button and theme button that did not exist), so the scroll-to-top button and theme toggle never worked | Rewritten as `main.js`; every element it needs now exists and each feature checks first |
| On phones and tablets the sidebar was hidden and there was no menu button, so visitors could not navigate | Added a hamburger menu with overlay, Esc to close, and keyboard-safe hidden state |
| WhatsApp link `wa.me/+234(0)9035409282` | `wa.me/2349035409282` |
| Telegram link pointed to telegram.org | `t.me/ajewolecoder` |
| X link had an `@` in the URL | `x.com/AjewoleLemuel` |
| Project cards used stock images (with a watermark) and a wallpaper, and the lightbox library was never loaded | Replaced with layout sketches; removed the broken lightbox |
| AOS animation library was loaded without its CSS and never started | Replaced with a small built-in scroll reveal |
| Fonts (Raleway, Poppins, Open Sans) were named in CSS but never loaded | Loads Bricolage Grotesque + Instrument Sans from Google Fonts |
| Home address published on the page | Removed. Only "Ekiti State, Nigeria" is shown |
| JavaScript skill bar at 10%, "years of practice" and "full-stack" claims | Skills now grouped as Strong / Learning / Tools; copy toned down to what is true |
| Duplicate emails and phones | One email (ajewolelemuel@gmail.com) and one phone number (0903 540 9282) for calls and WhatsApp |
| Two `<h1>` tags, images with no alt text, form fields with no labels | One `<h1>`, alt text everywhere, real `<label>`s |
| Footer was fixed over the sidebar nav on short screens | Footer moved into the page; theme toggle lives in the sidebar |
| ~3 MB of images (three 1 MB profile PNGs) | Cropped and compressed: the whole `assets` folder is about 300 KB |
| Full Bootstrap CSS and JS loaded just for the grid | Removed; own CSS grid (Bootstrap Icons font is still used) |
| No SEO or share preview | Meta description, Open Graph tags, favicon, social preview image, robots.txt, sitemap |
| Contact form reloaded the page and showed a Formspree screen | Sends in the background and shows a success or error message under the button. Spam honeypot added |

## Animations

- **Hero (page load):** name rises into view line by line, then a code window slides in and types out your details. A soft spotlight follows the mouse.
- **Scroll reveal:** sections, cards and skill chips fade in with a small stagger; section underlines draw themselves; the four "How a project works" steps connect with a line.
- **Interactions:** nav bar indicator, button arrows, social icons, project thumbnail tilt, service icon wobble, pulsing "available" dot.
- **Page:** scroll progress bar at the top, back-to-top button, light/dark theme switch.
- All motion is switched off for visitors who set "reduce motion" in their system.

## Things for you to check or add

- [ ] **Read all the text** and change anything that doesn't sound like you (About section especially). It says you are a student at FUTA, Akure; delete that line if you'd rather not show it.
- [ ] **Skills:** edit the three groups in `index.html` so they match what you can really do.
- [ ] **Muel & Nuel School:** add the live link (there is a commented-out line in `index.html`).
- [ ] **Add real screenshots** of finished sites to `assets/img/projects/` and swap them in for the sketches. Screenshots sell better than sketches.
- [ ] Add more real projects: copy one `<article class="project">` block.
- [ ] **Resume:** if you have a CV, add a PDF to the repo and a "Download CV" button.
- [ ] Test the contact form once after deploying and check the message reaches your inbox.
- [ ] Pick one portfolio URL (Vercel) and redirect or remove the old Netlify site.
- [ ] If your domain changes, update the URLs in the `<head>` of `index.html`, `robots.txt` and `sitemap.xml`.
# ajewolelemuel
