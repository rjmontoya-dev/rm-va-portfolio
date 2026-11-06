# Roger A. Montoya Jr. — VA Portfolio

A single-page portfolio built with Next.js, three.js (3D rings around the photo) and GSAP (text and scroll animations).
It exports to plain static files, so it hosts for free on Vercel or Netlify.

## Change the words, links, photos and videos

Open **`content/site.js`**. Every piece of text on the page lives there, along with the list of projects and videos.

- Your photo: `public/profile.png`
- Website screenshots: `public/work/`
- Videos: `public/videos/` (cover pictures in `public/posters/`)
- `LINKS.siteUrl`: set this to your live address after you deploy

Colors for light and dark mode are at the top of `app/globals.css`.

## Run it on your computer

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Deploy for free

**Vercel:** push this folder to a GitHub repository, then on vercel.com choose *Add New → Project*, pick the repo, and click *Deploy*. No settings needed.

**Netlify:** push to GitHub, then on netlify.com choose *Add new site → Import an existing project*. The included `netlify.toml` already tells Netlify to run `npm run build` and publish the `out` folder.

After the first deploy, put your real address in `LINKS.siteUrl` and deploy again so link previews use it.

## Files

| File | What it does |
| --- | --- |
| `content/site.js` | All text, links, projects and videos (edit this) |
| `app/page.js` | Order and layout of the sections |
| `app/globals.css` | Colors, spacing, light and dark mode |
| `app/layout.js` | Page title, description, Open Graph tags |
| `app/opengraph-image.js` | Generates the link-preview picture at build time |
| `lib/effects.js` | Light/dark switch, typing text, switching words, 3D rings (three.js), scroll animations (GSAP) |
| `components/Effects.jsx` | Turns those effects on when the page loads |
| `components/Icon.jsx` | Line icons |
