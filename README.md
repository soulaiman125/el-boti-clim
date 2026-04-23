# EL BOTI CLIM React Website

A production-oriented single-page React and Vite website for `EL BOTI CLIM SARL AU`, focused on clear service communication, strong visual consistency, and a maintainable front-end structure.

## Features

- Responsive landing page for HVAC and air conditioning services
- Data-driven content for navigation, hero messaging, services, and contact details
- Reusable layout and section primitives
- Accessible navigation with skip link, semantic landmarks, and visible focus states
- Token-based CSS system for consistent spacing, colors, shadows, and radii
- Vite-based build pipeline for fast local development and static deployment

## Tech Stack

- React 18
- Vite 5
- Plain CSS with design tokens and component-oriented class structure

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Default local URL:

```text
http://localhost:5173/
```

## Build

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Environment Variables

This project currently does not require environment variables.

If a backend, CMS, or form endpoint is added later, document the variables in a `.env.example` file and keep all browser-exposed variables prefixed with `VITE_`.

## Project Structure

```text
.
|-- index.html
|-- package.json
|-- src
|   |-- App.jsx
|   |-- main.jsx
|   |-- components
|   |   |-- Contact.jsx
|   |   |-- Footer.jsx
|   |   |-- Hero.jsx
|   |   |-- Navbar.jsx
|   |   |-- Services.jsx
|   |   |-- layout
|   |   |   |-- Footer.jsx
|   |   |   `-- Navbar.jsx
|   |   |-- sections
|   |   |   |-- ContactSection.jsx
|   |   |   |-- HeroSection.jsx
|   |   |   `-- ServicesSection.jsx
|   |   `-- ui
|   |       `-- SectionIntro.jsx
|   |-- data
|   |   `-- siteContent.js
|   `-- styles
|       `-- style.css
`-- README.md
```

## Scripts

- `npm run dev`: Starts the Vite development server
- `npm run build`: Creates an optimized production build in `dist/`
- `npm run preview`: Serves the production build locally for verification

## Deployment

The project outputs static assets and can be deployed to:

- Vercel
- Netlify
- GitHub Pages
- Any static host that serves the `dist/` directory

Typical deployment flow:

```bash
npm install
npm run build
```

Then publish the generated `dist/` directory using your hosting provider.

## Recommended Next Steps

- Add ESLint and Prettier to enforce consistency
- Add a lightweight form handler or backend endpoint if the contact section needs submissions
- Add image assets, trust indicators, and project references if this site becomes a real marketing property
- Introduce tests for rendering and navigation behavior once the content model grows
