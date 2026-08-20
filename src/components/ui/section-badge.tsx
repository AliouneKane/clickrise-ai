import React from 'react'

/**
 * Elevated pill used as a section eyebrow/label — reserved for Why Us only.
 * Plain floating chip with a soft layered shadow, no ping/pulse dot.
 */
export const SectionBadge = ({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) => (
  <span
    className={`inline-flex items-center rounded-full bg-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-black/55 ring-1 ring-black/[0.06] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_6px_18px_-12px_rgba(0,0,0,0.18)] ${className}`}
  >
    {children}
  </span>
)

/**
 * Minimal text-only eyebrow — no pill, no leading rule, just a small bold
 * uppercase label. Default section label across the site; SectionBadge
 * (pill) is reserved for the Why Us section only.
 */
export const SectionEyebrow = ({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) => (
  <div
    className={`text-[11px] font-bold uppercase tracking-[0.22em] text-black/40 ${className}`}
  >
    {children}
  </div>
)
