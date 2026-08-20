import React from 'react'

/**
 * Glass-pill eyebrow/label used above section headings across the site.
 * Non-interactive — same glassmorphic surface as the reference glass
 * button (blurred translucent white, soft layered shadow), just a span.
 */
const GlassPill = ({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) => (
  <span
    className={`glass-badge inline-flex items-center rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-black/55 ${className}`}
  >
    {children}
  </span>
)

export const SectionBadge = GlassPill
export const SectionEyebrow = GlassPill
