# Shehadeh Law Office Website

Static marketing website for Shehadeh Law Office, a law firm based in Beit Jala, Palestine.

This repository contains the production-ready front-end, extracted source material, and the Playwright scraper used during the redesign process.

## Overview

The site is built as a simple static project with no build step. It focuses on:

- professional institutional presentation
- responsive layout across desktop, tablet, and mobile
- SEO-friendly HTML structure and metadata
- lightweight JavaScript for navigation and contact form behavior
- easy handoff for future maintenance

## Live Site Structure

The shipped website lives in `src/`:

```text
src/
├── index.html
├── pages/
│   ├── about.html
│   ├── services.html
│   ├── team.html
│   └── contact.html
├── css/
│   ├── styles.css
│   └── responsive.css
├── js/
│   └── main.js
├── assets/
│   └── images/
│       └── logo.jpg
├── legal-notice.html
├── privacy-policy.html
├── sitemap.xml
├── robots.txt
└── .htaccess
```

Supporting material in the repository:

- `content/extracted/`: raw content captured from the original site
- `scripts/scraper.js`: Playwright scraper used for extraction
- `PROJECT_SUMMARY.md`: concise delivery summary and remaining follow-up items

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- `http-server` for local preview
- Playwright for content extraction

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install dependencies

```bash
npm install
```

### Run the local preview server

```bash
npm start
```

The site will be served from `src/` at `http://localhost:8000`.

Alternative local preview:

```bash
cd src
python3 -m http.server 8000
```

## Available Scripts

- `npm start`: serves the static site from `src/`
- `npm run dev`: serves the static site with disabled caching
- `npm run scrape`: runs the Playwright scraper
- `npm run build`: placeholder only; there is no build pipeline

## Content and Branding

Current site sections:

- Home
- About
- Practice Areas
- Our Team
- Contact
- Legal Notice
- Privacy Policy

Brand and contact information currently used in the site:

- Firm: Shehadeh Law Office
- Location: Virgin Mary Street, P.O. Box 276, Beit Jala, Palestine
- Phone: +970-2-274 3543 / +970-2-274 8237
- Email: sami@shehadehlawoffice.com

## Contact Form

The contact page is prepared for EmailJS in the browser.

What is already in place:

- front-end validation in `src/js/main.js`
- EmailJS browser SDK loaded on the contact page
- placeholder config constants for public key, service ID, and template ID

Before the form can send real messages, update these constants in `src/js/main.js`:

```javascript
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY_HERE';
const EMAILJS_SERVICE_ID = 'service_shehadeh';
const EMAILJS_TEMPLATE_ID = 'template_contact';
```

Expected EmailJS template variables:

- `from_name`
- `from_email`
- `phone`
- `subject`
- `message`
- `to_email`

If you do not want to use EmailJS, replace the front-end submission logic with a backend endpoint.

## SEO and Deployment Notes

Included in the project:

- page-level meta descriptions
- Open Graph metadata on key pages
- `sitemap.xml`
- `robots.txt`
- legal-service structured data on the homepage
- Apache-focused `.htaccess` for compression, caching, and security headers

Recommended deployment flow:

1. Upload the contents of `src/` to the hosting environment.
2. Ensure the web root points to those files.
3. Enable HTTPS.
4. Configure the final domain and canonical URLs if needed.
5. Test the contact form after EmailJS configuration.
6. Submit `sitemap.xml` to Google Search Console.

## GitHub Pages

This repository includes a GitHub Pages workflow in `.github/workflows/deploy-pages.yml`.

How it works:

- every push to `main` deploys the contents of `src/`
- the workflow uses the official Pages actions
- `src/.nojekyll` disables Jekyll processing on the published site

To enable Pages in GitHub:

1. Open the repository on GitHub.
2. Go to Settings > Pages.
3. Set the source to `GitHub Actions`.
4. Push to `main` or run the workflow manually.

Note:

- the site has been adjusted to use portable relative paths so it can work on a standard GitHub Pages project URL
- `.htaccess` is ignored by GitHub Pages, so Apache-specific caching and header rules only apply on Apache hosting

## Maintenance Notes

Typical content changes:

- update copy directly in the HTML files under `src/`
- replace or add images under `src/assets/images/`
- adjust layout and visual styling in `src/css/styles.css`
- adjust breakpoints and mobile behavior in `src/css/responsive.css`

When editing navigation or footer links, keep all page templates in sync because the site is fully static.

## Known Follow-Up Items

- legal notice and privacy policy now use English filenames for consistency with the rest of the project
- the contact form still requires real EmailJS credentials before production use
- additional office/team photography can improve the presentation further

## Repository Standards

- `main` is the primary branch
- `node_modules/` is excluded from version control
- documentation is maintained in English

## License

This repository uses split licensing.

- Code is licensed under MIT. See `LICENSE`.
- Content, branding, logos, legal copy, business identity, and other non-code creative assets are reserved. See `NOTICE`.

Public visibility on GitHub does not grant permission to reuse the Shehadeh Law Office name, branding, logo, or site copy.
