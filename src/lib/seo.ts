import { useEffect } from 'react'

interface Seo {
  title: string
  description: string
  canonical: string
}

const upsertMeta = (attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

const upsertCanonical = (href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Per-route document head management for the SPA. Runs on mount so react-snap
 * captures the correct title / description / canonical / OG tags per page,
 * instead of every route inheriting the home page's head.
 */
export function useDocumentSeo({ title, description, canonical }: Seo) {
  useEffect(() => {
    document.title = title
    upsertMeta('name', 'description', description)
    upsertCanonical(canonical)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', canonical)
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
  }, [title, description, canonical])
}

// FR-primary, matching index.html's language strategy.
export const SEO = {
  home: {
    title: 'ClickRise AI, Automatisation IA pour Agences Digitales',
    description:
      'Automatisation IA sur mesure pour agences digitales : cold outbound, onboarding et reporting automatisés. Gagnez du temps — réservez votre démo ClickRise AI.',
    canonical: 'https://www.clickriseai.com/',
  },
  industries: {
    title: 'Automatisation IA par secteur — ClickRise AI',
    description:
      "Comment l'IA s'applique à votre secteur : santé, e-commerce, finance, immobilier, SaaS, agences et plus. Voyez ce qu'on construirait et réservez un appel gratuit.",
    canonical: 'https://www.clickriseai.com/industries',
  },
} as const
