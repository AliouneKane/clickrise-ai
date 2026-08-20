import React from 'react'

/**
 * Elevated pill used as a section eyebrow/label.
 * Floating white chip + soft shadow + accent dot — replaces the old flat
 * grey "cardboard" pills for a more premium feel.
 */
export const SectionBadge = ({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) => (
  <span
    className={`inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-black/55 ring-1 ring-black/[0.06] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_6px_18px_-12px_rgba(0,0,0,0.18)] ${className}`}
  >
    <span className="relative flex h-1.5 w-1.5">
      <span className="absolute inline-flex h-full w-full rounded-full bg-black/30 animate-ping" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-black/70" />
    </span>
    {children}
  </span>
)

/**
 * Minimal text-only eyebrow — no pill/box chrome, just a short rule + label.
 * Default section label across the site; SectionBadge (pill+dot) is reserved
 * for the Why Us section only.
 */
export const SectionEyebrow = ({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) => (
  <div
    className={`inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.22em] text-black/40 ${className}`}
  >
    <span className="h-px w-5 bg-black/30" />
    {children}
  </div>
)
