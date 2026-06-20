/**
 * Deterministic prerender for the /industries SPA route.
 *
 * react-snap is not running on this deploy, so the catch-all rewrite serves the
 * home index.html (home title, H1 and canonical=/) to crawlers on /industries.
 * This script clones the built index.html — keeping the hashed bundle script so
 * React still boots the interactive page — but swaps the <head> SEO tags and the
 * static #root fallback for industry-specific, crawlable content.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const DIST = 'dist'
const SITE = 'https://www.clickriseai.com'
const URL = `${SITE}/industries`

const TITLE = 'Automatisation IA par secteur — ClickRise AI'
const DESCRIPTION =
  "Comment l'IA s'applique à votre secteur : santé, e-commerce, finance, immobilier, SaaS, agences et plus. Voyez ce qu'on construirait et réservez un appel gratuit."

// FR-primary (matches index.html). Mirrors translations.fr.industries.items.
const SECTORS = [
  ['Cabinet Dentaire & Santé', "Remplissez votre agenda sans surcharger l'accueil."],
  ['E-commerce', 'Vendez plus sans recruter.'],
  ['Investissement & Finance', 'Moins de reporting, plus de décisions.'],
  ['Entreprises Locales', 'Transformez les appels manqués en chantiers réservés.'],
  ['Agences Marketing Digital', "Passez à l'échelle sans agrandir l'équipe."],
  ['Agence de Photographie', 'Du temps pour shooter, pas pour relancer.'],
  ['Social Media Copywriting', 'Publiez plus, plus vite, sans perdre votre voix.'],
  ['Agences IA & Automatisation', 'Revendez des systèmes au lieu de tout reconstruire.'],
  ['Agences PPC', 'De meilleurs résultats partout, moins de manuel.'],
  ['Agences Créatives', 'Livrez du créatif plus vite, sans burn-out.'],
  ['Agences Social Media (LinkedIn, Instagram, TikTok)', 'Faites grandir vos audiences en autopilote.'],
  ['Prestataires IT Managés (MSP)', 'Servez plus de clients avec la même équipe.'],
  ['Promotion Immobilière', 'Gardez les deals en mouvement, pas dans des tableurs.'],
  ['Courtiers & Services Financiers', 'Restez conforme tout en scalant votre prospection.'],
  ['Logiciels & SaaS', 'Convertissez et fidélisez sans recruter.'],
  ['Éducation', 'Engagez vos étudiants sans tâches répétitives.'],
  ['Entreprise & Corporate', "Une IA qui s'adapte à votre stack, pas l'inverse."],
  ['Hôtellerie & Marques de Luxe', 'Un service haut de gamme, à l’échelle.'],
  ['RH & Recrutement', 'Recrutez plus vite sans crouler sous les CV.'],
  ['Produits Digitaux', "Vendez et accompagnez plus d'élèves, sans les mains."],
]

const indexPath = join(DIST, 'index.html')
let html
try {
  html = readFileSync(indexPath, 'utf8')
} catch {
  console.warn('[prerender-industries] dist/index.html not found — skipping.')
  process.exit(0)
}

// --- Head swaps ---
html = html
  .replace(/<title>[\s\S]*?<\/title>/, `<title>${TITLE}</title>`)
  .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${DESCRIPTION}" />`)
  .replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${URL}" />`)
  .replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${URL}" />`)
  .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${TITLE}" />`)
  .replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${DESCRIPTION}" />`)
  .replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${TITLE}" />`)
  .replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${DESCRIPTION}" />`)

// --- Self-reference hreflang to this page (was inherited as "/") ---
html = html.replace(
  /(<link rel="alternate" hreflang="[^"]+" href=")https:\/\/www\.clickriseai\.com\/(" ?\/>)/g,
  `$1${URL}$2`
)

// --- Drop the home FAQPage schema (no FAQ on this page) ---
html = html.replace(
  /<script type="application\/ld\+json">(?:(?!<\/script>)[\s\S])*?"@type":\s*"FAQPage"[\s\S]*?<\/script>\s*/,
  ''
)

// --- Add a BreadcrumbList (Home > Secteurs) ---
const breadcrumb = `<script type="application/ld+json">
    {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Accueil","item":"${SITE}/"},{"@type":"ListItem","position":2,"name":"Secteurs","item":"${URL}"}]}
    </script>`
html = html.replace(/<\/head>/, `${breadcrumb}\n  </head>`)

// --- Crawlable static fallback (replaced by React on load) ---
const sectorsHtml = SECTORS.map(
  ([name, tag]) =>
    `<li style="margin-bottom:10px"><strong style="color:#0A0A0F">${name}</strong> — <span style="color:#444">${tag}</span></li>`
).join('')

const fallback = `<main style="max-width:960px;margin:0 auto;padding:48px 24px;font-family:system-ui,-apple-system,sans-serif;color:#0A0A0F">
        <p style="font-size:0.8rem;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#888;margin-bottom:12px">Automatisation IA par secteur</p>
        <h1 style="font-size:2.5rem;font-weight:700;line-height:1.1">Comment l'IA s'applique à votre secteur</h1>
        <p style="font-size:1.1rem;color:#444;margin-top:16px">Choisissez votre secteur et voyez précisément ce que ClickRise AI construirait pour vous faire gagner du temps et de l'argent. Approche problème d'abord, adaptée à votre façon de travailler.</p>
        <h2 style="font-size:1.5rem;font-weight:600;margin-top:32px">Secteurs accompagnés</h2>
        <ul style="font-size:1.05rem;line-height:1.7;margin-top:12px;padding-left:18px">${sectorsHtml}</ul>
        <p style="margin-top:24px"><a href="/#book" style="color:#0A0A0F;font-weight:600">Réservez votre appel découverte gratuit →</a></p>
      </main>`

html = html.replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">\n      ${fallback}\n    </div>`)

mkdirSync(join(DIST, 'industries'), { recursive: true })
writeFileSync(join(DIST, 'industries', 'index.html'), html, 'utf8')
console.log('[prerender-industries] wrote dist/industries/index.html')
