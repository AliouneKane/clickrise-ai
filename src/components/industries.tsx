import React, { useRef, useState } from 'react'
import { m as motion } from 'motion/react'
import {
  ArrowLeft,
  ArrowRight,
  Boxes,
  Check,
  Droplet,
  Dumbbell,
  Gavel,
  HardHat,
  Home,
  LineChart,
  Megaphone,
  MessageCircle,
  Palette,
  Repeat,
  Shield,
  ShoppingCart,
  Stethoscope,
  Truck,
  Users,
  Wrench,
  Zap,
} from 'lucide-react'
import { useLang } from '../lib/i18n'
import { translations } from '../content/translations'
import { Link, useRoute } from '../lib/router'
import { SectionEyebrow } from './ui/section-badge'
import { useDocumentSeo, SEO } from '../lib/seo'

// Icons keyed by the `icon` string set on each industry item in translations.ts —
// robust to reordering/length changes between EN and FR, unlike a positional array.
const iconMap: Record<string, React.ReactNode> = {
  megaphone:       <Megaphone className="w-5 h-5" />,
  wrench:          <Wrench className="w-5 h-5" />,
  home:            <Home className="w-5 h-5" />,
  droplet:         <Droplet className="w-5 h-5" />,
  truck:           <Truck className="w-5 h-5" />,
  hardhat:         <HardHat className="w-5 h-5" />,
  gavel:           <Gavel className="w-5 h-5" />,
  shield:          <Shield className="w-5 h-5" />,
  'message-circle': <MessageCircle className="w-5 h-5" />,
  users:           <Users className="w-5 h-5" />,
  palette:         <Palette className="w-5 h-5" />,
  dumbbell:        <Dumbbell className="w-5 h-5" />,
  stethoscope:     <Stethoscope className="w-5 h-5" />,
  boxes:           <Boxes className="w-5 h-5" />,
  'shopping-cart': <ShoppingCart className="w-5 h-5" />,
  repeat:          <Repeat className="w-5 h-5" />,
  'line-chart':    <LineChart className="w-5 h-5" />,
}

const getIcon = (key: string) => iconMap[key] ?? <Boxes className="w-5 h-5" />

/* ──────────────────────────────────────────────────────────────
   Home teaser — one card per service, showing exactly who it's for
   ────────────────────────────────────────────────────────────── */
export const IndustriesTeaser = () => {
  const { lang } = useLang()
  const t = translations[lang].industries

  return (
    <section id="industries" className="py-24 px-6 bg-white border-t border-black/[0.06]">
      <div className="max-w-5xl mx-auto text-center">
        <SectionEyebrow className="mb-4 justify-center">{t.badge}</SectionEyebrow>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 text-black leading-[1.1]">
          {t.heading[0]}<br />{t.heading[1]}
        </h2>
        <p className="text-black/45 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-10">
          {t.sub}
        </p>

        {/* One card per service */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6 text-left">
          {t.groups.map((group) => (
            <Link
              key={group.service}
              to="/industries"
              className="group flex flex-col gap-3 p-5 bg-white rounded-2xl border border-black/[0.07] hover:border-black/25 hover:shadow-[0_4px_18px_rgba(0,0,0,0.06)] transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 shrink-0 rounded-lg bg-black/[0.04] border border-black/[0.06] flex items-center justify-center text-black/70 group-hover:bg-black group-hover:text-white transition-colors">
                  {getIcon(group.items[0].icon)}
                </span>
                <span className="text-sm font-bold text-black leading-tight">{group.service}</span>
              </div>
              <p className="text-black/45 text-xs leading-relaxed">{group.serviceTagline}</p>
              <p className="text-black/60 text-xs leading-relaxed">
                {group.items.map((i) => i.name).join(' · ')}
              </p>
            </Link>
          ))}
        </div>

        {/* Universal service note */}
        <div className="flex items-center justify-center gap-3 p-4 mb-10 bg-[#F7F7F5] rounded-xl border border-dashed border-black/15 text-left">
          <span className="w-9 h-9 shrink-0 rounded-lg bg-black/[0.04] border border-black/[0.06] flex items-center justify-center text-black/70">
            {getIcon(t.universal.icon)}
          </span>
          <p className="text-black/55 text-xs leading-relaxed">
            <span className="font-bold text-black">{t.universal.service}</span> · {t.universal.note}
          </p>
        </div>

        <Link
          to="/industries"
          className="inline-flex items-center gap-2 bg-black text-white font-bold px-7 py-3.5 rounded-full hover:bg-black/80 transition-colors text-sm"
        >
          {t.teaserCta} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────────────────────
   Dedicated /industries page — grouped by service, grid + sticky detail
   ────────────────────────────────────────────────────────────── */
export const IndustriesPage = () => {
  const { lang, setLang } = useLang()
  const t = translations[lang].industries
  const [selected, setSelected] = useState<{ group: number; item: number }>({ group: 0, item: 0 })
  const detailRef = useRef<HTMLDivElement>(null)

  useDocumentSeo(SEO.industries)

  const activeGroup = t.groups[selected.group]
  const active = activeGroup.items[selected.item]

  const handleSelect = (group: number, item: number) => {
    setSelected({ group, item })
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      requestAnimationFrame(() =>
        detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      )
    }
  }

  return (
    <div className="relative min-h-screen bg-white">
      {/* Compact header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full py-5 px-4">
        <div className="flex items-center justify-between px-5 py-3 bg-white rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.08)] w-full max-w-3xl border border-black/[0.06]">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="w-8 h-8 bg-black flex items-center justify-center">
              <Zap className="text-white w-4 h-4" />
            </span>
            <span className="font-display font-bold text-lg tracking-tight text-black">Clickrise</span>
          </Link>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm text-black/55 hover:text-black transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" /> {t.backHome}
            </Link>
            <button
              onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
              className="text-xs font-bold uppercase tracking-widest text-black/35 hover:text-black transition-colors px-1"
              title={lang === 'en' ? 'Passer en français' : 'Switch to English'}
            >
              {lang === 'en' ? 'FR' : 'EN'}
            </button>
            <button
              data-cal-namespace="15min"
              data-cal-link="alioune-kane-1qdw6v/15min"
              data-cal-config='{"layout":"month_view"}'
              className="inline-flex items-center gap-1.5 px-5 py-2 text-sm font-bold text-white bg-black rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
            >
              {translations[lang].nav.cta} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Page intro */}
          <div className="mb-12 max-w-2xl">
            <SectionEyebrow className="mb-4">{t.badge}</SectionEyebrow>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-black leading-[1.1] mb-4">
              {t.heading[0]} {t.heading[1]}
            </h1>
            <p className="text-black/45 leading-relaxed">{t.sub}</p>
          </div>

          {/* Grouped by service + detail */}
          <div className="lg:grid lg:grid-cols-[1fr_400px] lg:gap-10 lg:items-start">
            {/* Service groups */}
            <div className="space-y-10 mb-8 lg:mb-0">
              {t.groups.map((group, gi) => (
                <div key={group.service}>
                  <div className="mb-3">
                    <h3 className="text-lg font-display font-bold text-black leading-tight">{group.service}</h3>
                    <p className="text-black/45 text-sm leading-relaxed">{group.serviceTagline}</p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {group.items.map((item, ii) => {
                      const isActive = gi === selected.group && ii === selected.item
                      return (
                        <button
                          key={item.name}
                          onClick={() => handleSelect(gi, ii)}
                          aria-pressed={isActive}
                          className={`group flex flex-col gap-3 p-4 rounded-2xl border text-left transition-all ${
                            isActive
                              ? 'bg-black border-black shadow-[0_8px_30px_rgba(0,0,0,0.12)]'
                              : 'bg-white border-black/[0.07] hover:border-black/25 hover:shadow-[0_4px_18px_rgba(0,0,0,0.06)]'
                          }`}
                        >
                          <span
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                              isActive
                                ? 'bg-white text-black'
                                : 'bg-black/[0.04] border border-black/[0.06] text-black/70 group-hover:bg-black group-hover:text-white'
                            }`}
                          >
                            {getIcon(item.icon)}
                          </span>
                          <span
                            className={`text-sm font-bold leading-tight ${
                              isActive ? 'text-white' : 'text-black'
                            }`}
                          >
                            {item.name}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}

              {/* Universal service card */}
              <div className="rounded-2xl border border-dashed border-black/15 bg-[#F7F7F5] p-5 flex items-start gap-4">
                <span className="w-10 h-10 shrink-0 rounded-xl bg-black text-white flex items-center justify-center">
                  {getIcon(t.universal.icon)}
                </span>
                <div>
                  <div className="text-sm font-bold text-black mb-1">{t.universal.service}</div>
                  <p className="text-black/55 text-sm leading-relaxed">{t.universal.note}</p>
                </div>
              </div>
            </div>

            {/* Sticky detail panel */}
            <div ref={detailRef} className="lg:sticky lg:top-28 scroll-mt-28">
              <motion.div
                key={`${selected.group}-${selected.item}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="rounded-3xl border border-black/[0.08] bg-[#F7F7F5] p-7 sm:p-8"
              >
                <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center mb-5">
                  {getIcon(active.icon)}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/35 mb-2">
                  {activeGroup.service}
                </div>
                <h2 className="text-2xl font-display font-bold text-black leading-tight mb-2">
                  {active.name}
                </h2>
                <p className="text-black/55 text-sm leading-relaxed mb-6">{active.tagline}</p>

                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/35 mb-3">
                  {t.modalKicker}
                </div>
                <ul className="space-y-3 mb-7">
                  {active.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span className="mt-0.5 w-5 h-5 shrink-0 rounded-full bg-black flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </span>
                      <span className="text-sm text-black/70 leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>

                <button
                  data-cal-namespace="15min"
                  data-cal-link="alioune-kane-1qdw6v/15min"
                  data-cal-config='{"layout":"month_view"}'
                  className="inline-flex w-full items-center justify-center gap-2 bg-black text-white font-bold px-6 py-3.5 rounded-xl hover:bg-black/80 transition-colors cursor-pointer text-sm"
                >
                  {t.modalCta} <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </div>
          </div>

          {/* Closing note */}
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 sm:p-8 bg-black text-white rounded-3xl">
            <p className="text-white/70 text-sm leading-relaxed max-w-md text-center sm:text-left">
              {t.footerNote}
            </p>
            <button
              data-cal-namespace="15min"
              data-cal-link="alioune-kane-1qdw6v/15min"
              data-cal-config='{"layout":"month_view"}'
              className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 py-3.5 rounded-xl hover:bg-white/90 transition-colors whitespace-nowrap shrink-0 cursor-pointer text-sm"
            >
              {t.footerCta} <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Back link (mobile) */}
          <div className="mt-10 text-center sm:hidden">
            <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-bold text-black/55 hover:text-black transition-colors">
              <ArrowLeft className="w-4 h-4" /> {t.backHome}
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
