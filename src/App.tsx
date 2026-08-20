/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';
import { Navbar1 } from './components/ui/navbar-1';
import { CaseStudiesGallery } from './components/ui/case-studies-gallery';
import { m as motion, LazyMotion, domAnimation, useScroll, useTransform, MotionConfig } from 'motion/react';
import {
  ArrowRight,
  BarChart3,
  Bot,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Code2,
  Cpu,
  Database,
  FileText,
  Globe,
  Layers,
  Mail,
  Plus,
  Quote,
  RefreshCw,
  Sparkles,
  Target,
  Terminal,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import { LangContext, useLang, type Lang } from './lib/i18n';
import { RouteProvider, useRoute } from './lib/router';
import { IndustriesTeaser, IndustriesPage } from './components/industries';
import { SectionBadge, SectionEyebrow } from './components/ui/section-badge';
import { useDocumentSeo, SEO } from './lib/seo';
import { translations } from './content/translations';

// --- Components ---

const LazySection = ({ children, minHeight = "600px" }: { children: React.ReactNode; minHeight?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { rootMargin: '400px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref}>{visible ? children : <div style={{ minHeight }} />}</div>;
};

const InfiniteMarquee = () => {
  const { lang } = useLang();
  const t = translations[lang];

  const tools = [
    { name: "Python",       icon: <Terminal className="w-5 h-5" /> },
    { name: "React",        icon: <Code2 className="w-5 h-5" /> },
    { name: "Next.js",      icon: <Globe className="w-5 h-5" /> },
    { name: "n8n",          icon: <Cpu className="w-5 h-5" /> },
    { name: "Claude AI",    icon: <Bot className="w-5 h-5" /> },
    { name: "Supabase",     icon: <Database className="w-5 h-5" /> },
    { name: "OpenAI",       icon: <Sparkles className="w-5 h-5" /> },
    { name: "Google Maps",  icon: <Layers className="w-5 h-5" /> },
  ];

  return (
    <div className="py-12 border-y border-black/[0.06] bg-black/[0.01] overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
      <div className="text-center text-black/25 text-xs font-bold uppercase tracking-[0.2em] mb-6">
        {t.marquee.label}
      </div>
      <div className="marquee-track flex gap-24 items-center whitespace-nowrap">
        {[...tools, ...tools].map((tool, i) => (
          <div
            key={i}
            className="flex items-center gap-3 text-black/30 hover:text-black/70 transition-colors cursor-default"
          >
            <div className="p-2 bg-black/5 rounded-lg border border-black/[0.08]">
              {tool.icon}
            </div>
            <span className="font-display font-bold text-xl tracking-tight">{tool.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const BackgroundEffects = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <div className="absolute inset-0 hidden md:block grid-pattern" />
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-black/[0.03] blur-[150px] hidden md:block" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-black/[0.02] blur-[150px] hidden md:block" />
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-black/[0.06] to-transparent" />
  </div>
);

const Hero = () => {
  const { lang } = useLang();
  const t = translations[lang].hero;
  const cta = translations[lang].cta;
  const howItWorks = translations[lang].howItWorks;
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section className="relative pt-32 pb-20 px-6 min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={window.innerWidth >= 768 ? { opacity: [0.04, 0.1, 0.04], scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-black/[0.05] blur-[130px] rounded-full"
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-screen bg-gradient-to-b from-black/20 via-black/5 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <SectionEyebrow className="mb-6">{t.badge}</SectionEyebrow>

          <h1 className="text-5xl md:text-6xl font-display font-bold leading-[1.05] mb-6 text-black">
            {t.h1[0]}<br />
            {t.h1[1]}<br />
            <span className="text-black/30">{t.h1dim[0]}<br />{t.h1dim[1]}</span>
          </h1>

          <p className="text-lg text-black/55 max-w-lg mb-10 leading-relaxed">
            {t.sub}
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              data-cal-namespace="15min"
              data-cal-link="alioune-kane-1qdw6v/15min"
              data-cal-config='{"layout":"month_view"}'
              className="bg-black text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-black/80 transition-all shadow-sm cursor-pointer"
            >
              {t.cta1} <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="#services"
              className="border border-black/15 text-black px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-black/5 transition-all"
            >
              {t.cta2}
            </a>
          </div>

          <div className="mt-10 flex items-center gap-3 text-sm text-black/35 pt-8 border-t border-black/[0.06]">
            <div className="w-2 h-2 rounded-full bg-black/30" />
            {t.tagline}
          </div>
        </motion.div>

        {/* Offer card — makes the actual offer (free diagnostic call) visible, not decorative */}
        <motion.div
          style={{ y }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="relative hidden lg:flex items-center justify-center"
        >
          <div className="w-full max-w-[380px] rounded-3xl border border-black/[0.08] bg-white shadow-[0_30px_80px_-25px_rgba(0,0,0,0.22)] overflow-hidden">
            <div className="p-7 sm:p-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-black/[0.05] border border-black/[0.07] px-3 py-1.5 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-black/50">
                  {howItWorks.steps[0].title}
                </span>
              </div>

              <div className="text-4xl font-display font-bold text-black mb-2">15–20 min</div>
              <p className="text-black/45 text-sm leading-relaxed mb-6">{cta.sub}</p>

              <div className="space-y-3 mb-7">
                {cta.steps.map((s) => (
                  <div key={s.num} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-black flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </span>
                    <span className="text-sm text-black/65 leading-snug">{s.text}</span>
                  </div>
                ))}
              </div>

              <button
                data-cal-namespace="15min"
                data-cal-link="alioune-kane-1qdw6v/15min"
                data-cal-config='{"layout":"month_view"}'
                className="w-full bg-black text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black/80 transition-all cursor-pointer"
              >
                {lang === 'fr' ? 'Choisir un créneau' : 'Pick a time'} <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-center text-[11px] text-black/35 mt-3">{cta.fine}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const SectionHeader = ({ title, subtitle, badge }: { title: string; subtitle: string; badge?: string }) => (
  <div className="text-center mb-16">
    {badge && <SectionEyebrow className="mb-4 justify-center">{badge}</SectionEyebrow>}
    <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-black">{title}</h2>
    <p className="text-black/40 max-w-2xl mx-auto">{subtitle}</p>
  </div>
);

const Services = () => {
  const { lang } = useLang();
  const t = translations[lang].services;

  const icons = [
    <Zap className="w-5 h-5" />,
    <FileText className="w-5 h-5" />,
    <RefreshCw className="w-5 h-5" />,
    <Database className="w-5 h-5" />,
    <BarChart3 className="w-5 h-5" />,
  ];

  return (
    <section id="services" className="py-24 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <SectionEyebrow className="mb-4">{t.badge}</SectionEyebrow>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-black leading-tight">
              {t.heading[0]}<br />{t.heading[1]}
            </h2>
          </div>
          <p className="text-black/40 max-w-xs md:text-right text-sm leading-relaxed">
            {t.sub}
          </p>
        </div>

        <div className="border-t border-black/[0.08]">
          {t.items.map((s, i) => (
            <motion.div
              key={i}
              className="group border-b border-black/[0.08] cursor-default"
              whileHover="hovered"
              initial="rest"
            >
              <motion.div
                variants={{
                  rest:    { backgroundColor: '#ffffff' },
                  hovered: { backgroundColor: '#0A0A0A' },
                }}
                transition={{ duration: 0.28, ease: 'easeInOut' }}
                className="flex items-center gap-6 md:gap-10 px-2 py-7"
              >
                <motion.span
                  variants={{ rest: { color: 'rgba(10,10,10,0.2)' }, hovered: { color: 'rgba(255,255,255,0.2)' } }}
                  transition={{ duration: 0.28 }}
                  className="text-xs font-bold tabular-nums w-7 shrink-0"
                >
                  {s.number}
                </motion.span>

                <motion.div
                  variants={{
                    rest:    { borderColor: 'rgba(10,10,10,0.08)', color: '#0A0A0A' },
                    hovered: { borderColor: 'rgba(255,255,255,0.12)', color: '#ffffff' },
                  }}
                  transition={{ duration: 0.28 }}
                  className="w-11 h-11 border rounded-xl flex items-center justify-center shrink-0"
                >
                  {icons[i]}
                </motion.div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <motion.h3
                      variants={{ rest: { color: '#0A0A0A' }, hovered: { color: '#ffffff' } }}
                      transition={{ duration: 0.28 }}
                      className="text-lg md:text-xl font-display font-bold"
                    >
                      {s.title}
                    </motion.h3>
                    <motion.span
                      variants={{ rest: { color: 'rgba(10,10,10,0.35)' }, hovered: { color: 'rgba(255,255,255,0.35)' } }}
                      transition={{ duration: 0.28 }}
                      className="text-sm italic hidden md:inline"
                    >
                      {s.subtitle}
                    </motion.span>
                  </div>
                  <motion.p
                    variants={{ rest: { color: 'rgba(10,10,10,0.42)' }, hovered: { color: 'rgba(255,255,255,0.42)' } }}
                    transition={{ duration: 0.28 }}
                    className="text-sm mt-0.5 leading-relaxed hidden lg:block max-w-2xl"
                  >
                    {s.desc}
                  </motion.p>
                </div>

                <motion.span
                  variants={{
                    rest:    { color: 'rgba(10,10,10,0.35)', borderColor: 'rgba(10,10,10,0.08)' },
                    hovered: { color: 'rgba(255,255,255,0.35)', borderColor: 'rgba(255,255,255,0.1)' },
                  }}
                  transition={{ duration: 0.28 }}
                  className="hidden lg:block text-xs font-medium border px-3 py-1 rounded-full shrink-0"
                >
                  {s.tag}
                </motion.span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const { lang } = useLang();
  const t = translations[lang].howItWorks;

  const icons = [
    <Target className="w-5 h-5" />,
    <FileText className="w-5 h-5" />,
    <Code2 className="w-5 h-5" />,
    <TrendingUp className="w-5 h-5" />,
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 bg-[#F7F7F5] border-y border-black/[0.06]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionEyebrow className="mb-4 justify-center">{t.badge}</SectionEyebrow>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-black leading-tight mb-5">
            {lang === 'fr' ? <>{t.steps.length} étapes.<br />Pas de détour.</> : <>{t.steps.length} steps.<br />No fluff.</>}
          </h2>
          <p className="text-black/40 text-sm leading-relaxed">
            {t.sub}
          </p>
        </div>

        {/* Step row — connecting line behind numbered nodes, card content below */}
        <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          <div className="absolute top-6 left-0 right-0 h-px bg-black/10 hidden lg:block" />

          {t.steps.map((step, i) => (
            <motion.div
              key={i}
              className="relative"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="relative z-10 shrink-0 w-12 h-12 bg-white border border-black/10 rounded-full flex items-center justify-center shadow-sm text-black">
                  {icons[i]}
                </div>
                <span className="lg:hidden text-black/25 font-display font-bold text-sm">{step.number}</span>
              </div>
              <div className="hidden lg:block text-black/20 font-display font-bold text-xs uppercase tracking-widest mb-2">
                {lang === 'fr' ? `Étape ${step.number}` : `Step ${step.number}`}
              </div>
              <h3 className="text-lg font-bold text-black mb-2">{step.title}</h3>
              <p className="text-black/40 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-14">
          <a
            href="#book"
            className="inline-flex items-center gap-2 border border-black/15 text-black text-sm font-bold px-6 py-3 rounded-full hover:bg-black/5 transition-all"
          >
            {lang === 'fr' ? 'Voir comment ça marche' : 'See how it works'} <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

const WhyUs = () => {
  const { lang } = useLang();
  const t = translations[lang].whyUs;

  const icons = [
    <Target className="w-5 h-5" />,
    <Code2 className="w-5 h-5" />,
    <Users className="w-5 h-5" />,
    <Globe className="w-5 h-5" />,
  ];

  const [lead, ...rest] = t.reasons;

  return (
    <section id="why-us" className="py-16 px-4 md:py-24 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="border border-black/[0.07] rounded-[28px] md:rounded-[40px] p-5 sm:p-8 md:p-12 relative overflow-hidden bg-[#F7F7F5]">
          <div className="absolute inset-0 grid-pattern opacity-60" />
          <div className="relative z-10">
            <div className="text-center mb-10 md:mb-16 max-w-2xl mx-auto">
              <SectionBadge className="mb-4">{t.badge}</SectionBadge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 md:mb-6 text-black leading-[1.1]">
                {t.heading[0]}<br />{t.heading[1]}
              </h2>
              <p className="text-black/50 text-sm sm:text-base leading-relaxed">
                {t.body}
              </p>
            </div>

            <div className="grid lg:grid-cols-[1fr_1.15fr] gap-4 sm:gap-5">
              {/* Lead pillar — inverted, the strongest differentiator gets visual weight */}
              <div className="flex flex-col justify-between gap-8 p-7 sm:p-9 bg-black rounded-2xl min-h-[280px]">
                <div className="w-11 h-11 bg-white text-black rounded-xl flex items-center justify-center shrink-0">
                  {icons[0]}
                </div>
                <div>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl mb-3 text-white leading-tight">{lead.title}</h3>
                  <p className="text-white/55 text-sm sm:text-[15px] leading-relaxed">{lead.desc}</p>
                </div>
              </div>

              {/* Remaining pillars — compact list, not repeated identical cards */}
              <div className="bg-white rounded-2xl border border-black/[0.07] divide-y divide-black/[0.06] overflow-hidden">
                {rest.map((r, i) => (
                  <div key={i} className="flex items-start gap-4 p-6 sm:p-7">
                    <div className="w-10 h-10 bg-black/[0.05] border border-black/[0.07] text-black/70 rounded-xl flex items-center justify-center shrink-0">
                      {icons[i + 1]}
                    </div>
                    <div>
                      <h3 className="font-bold text-[15px] sm:text-base mb-1 text-black leading-snug">{r.title}</h3>
                      <p className="text-black/55 text-sm leading-relaxed">{r.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CaseStudies = () => {
  const { lang } = useLang();
  const t = translations[lang].cases;

  const featured = t.items[2]; // Cold Outbound — most complete, live

  const featuredMetrics = lang === 'en'
    ? [
        { value: '100%', label: 'Automated' },
        { value: '0h',   label: 'Manual work/cycle' },
        { value: 'Live', label: 'In production' },
      ]
    : [
        { value: '100%', label: 'Automatisé' },
        { value: '0h',   label: 'Travail manuel/cycle' },
        { value: 'Actif', label: 'En production' },
      ];

  const globalMetrics = lang === 'en'
    ? [
        { value: '3',    label: 'Systems built' },
        { value: '100%', label: 'Automated workflows' },
        { value: '0h',   label: 'Manual work once live' },
        { value: '2+',   label: 'Live in production' },
      ]
    : [
        { value: '3',    label: 'Systèmes construits' },
        { value: '100%', label: 'Workflows automatisés' },
        { value: '0h',   label: 'Travail manuel une fois livré' },
        { value: '2+',   label: 'En production' },
      ];

  // Placeholder images — swap with real project screenshots when available
  const projectImages = [
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=1200&auto=format&fit=crop',
  ];

  return (
    <section id="work" className="py-24 px-8 bg-[#F7F7F5]">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="pb-12">
          <SectionEyebrow className="mb-3">{t.badge}</SectionEyebrow>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-black leading-tight max-w-xl">
              {t.heading}
            </h2>
            <p className="text-black/40 max-w-xs md:text-right text-sm leading-relaxed">
              {t.sub}
            </p>
          </div>
        </div>

        {/* Featured case study */}
        <div className="mb-6 overflow-hidden rounded-2xl border border-black/[0.08] bg-white">
          <div className="grid lg:grid-cols-2">
            {/* Visual side */}
            <div className="relative overflow-hidden bg-[#0A0A0F] min-h-[420px] lg:min-h-0">
              <img
                src="/images/case-study-illustration.png"
                alt={featured.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {/* Live badge */}
              <div className="absolute top-6 right-6 inline-flex items-center gap-1.5 rounded-full border border-white/[0.1] bg-white/[0.08] backdrop-blur-sm px-3 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] font-medium uppercase tracking-wider text-white/70">
                  {lang === 'fr' ? 'En direct' : 'Live'}
                </span>
              </div>

              {/* Metrics + stack, anchored to the bottom over the image */}
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-5 p-8">
                <div className="flex items-center gap-8">
                  {featuredMetrics.map((m) => (
                    <div key={m.label} className="flex flex-col gap-0.5">
                      <div className="text-2xl font-display font-bold text-white">{m.value}</div>
                      <div className="text-white/55 text-[11px] uppercase tracking-wider">{m.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {featured.stack.map((tech) => (
                    <span key={tech} className="text-[10px] border border-white/[0.15] bg-white/[0.08] backdrop-blur-sm px-2.5 py-1 rounded-full text-white/70">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Text side */}
            <div className="flex flex-col justify-center gap-5 p-8 lg:p-12">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-black/40">
                <span className="inline-flex items-center rounded-full bg-black/[0.06] border border-black/[0.08] px-3 py-1 text-black/55">
                  {lang === 'en' ? 'Past project' : 'Ancien projet'}
                </span>
                <span>{featured.sector}</span>
              </div>

              <h2 className="text-2xl font-display font-bold leading-tight text-black md:text-3xl">
                {featured.title}
              </h2>

              <div className="space-y-4">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-black/25 mb-1">
                    {lang === 'en' ? 'Problem' : 'Problème'}
                  </div>
                  <p className="text-sm leading-relaxed text-black/45">{featured.problem}</p>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-black/25 mb-1">
                    {lang === 'en' ? 'Result' : 'Résultat'}
                  </div>
                  <p className="text-sm leading-relaxed text-black font-medium">{featured.result}</p>
                </div>
              </div>

              <dl className="grid grid-cols-3 gap-4 border-t border-black/[0.07] pt-5">
                {featuredMetrics.map((m) => (
                  <div key={m.label} className="flex flex-col gap-1">
                    <dt className="order-2 text-[10px] text-black/35">{m.label}</dt>
                    <dd className="order-1 text-2xl font-display font-bold text-black md:text-3xl">{m.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <CaseStudiesGallery
          items={t.items.map((study, i) => ({
            title: study.title,
            description: `${study.problem} ${study.result}`,
            image: projectImages[i],
            ctaLabel: lang === 'fr' ? 'Voir comment ça marche' : 'See how it works',
            onCtaClick: () => document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' }),
          }))}
        />

        {/* Metrics band — inverted for visual rhythm against the light sections around it */}
        <div className="mt-6 rounded-2xl bg-black p-10 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:22px_22px] opacity-40 pointer-events-none" />
          <div className="relative z-10">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-display font-bold text-white md:text-3xl">
                {lang === 'en' ? 'Outcomes that move the needle' : 'Des résultats qui font la différence'}
              </h2>
              <p className="mt-2 text-sm text-white/40 leading-relaxed max-w-md mx-auto">
                {lang === 'en'
                  ? 'Every system runs automatically. Once deployed, zero manual hours required.'
                  : 'Chaque système tourne automatiquement. Une fois déployé, zéro heure manuelle requise.'}
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
              {globalMetrics.map((m, i) => {
                const metricIcons = [
                  <Layers className="w-4 h-4" />,
                  <Zap className="w-4 h-4" />,
                  <Clock className="w-4 h-4" />,
                  <TrendingUp className="w-4 h-4" />,
                ];
                return (
                  <div key={m.label} className="flex flex-col items-center gap-3 text-center">
                    <span className="w-9 h-9 rounded-lg bg-white/[0.08] border border-white/[0.1] flex items-center justify-center text-white/60">
                      {metricIcons[i]}
                    </span>
                    <dd className="text-4xl font-display font-bold tracking-tight text-white md:text-5xl">
                      {m.value}
                    </dd>
                    <dt className="text-sm text-white/40">{m.label}</dt>
                  </div>
                );
              })}
            </dl>
          </div>
        </div>

      </div>
    </section>
  );
};

const About = () => {
  const { lang } = useLang();
  const t = translations[lang].about;

  return (
    <section id="about" className="py-24 px-6 bg-white border-y border-black/[0.06]">
      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <SectionEyebrow className="mb-4 justify-center">{t.badge}</SectionEyebrow>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-black leading-tight">
            {t.headline}
          </h2>
        </motion.div>

        <div className="lg:grid lg:grid-cols-[340px_1fr] lg:gap-14 lg:items-start space-y-10 lg:space-y-0">

          {/* Left — profile card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="bg-[#EEEAE3] rounded-3xl overflow-hidden border border-black/[0.06]">
              {/* Photo — large, fills top */}
              <div className="h-80 overflow-hidden bg-[#EEEAE3]">
                <img
                  src="/Alioune.png"
                  alt="Alioune Abdou Salam Kane"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              {/* Name + role */}
              <div className="p-6 bg-white border-t border-black/[0.06]">
                <div className="text-lg font-display font-bold text-black leading-tight">{t.name}</div>
                <div className="text-sm text-black/45 mt-1">{t.role}</div>
                <div className="flex items-center gap-1.5 mt-2">
                  <Globe className="w-3 h-3 text-black/25" />
                  <span className="text-xs text-black/30">{t.origin}</span>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <a
                    href="https://www.linkedin.com/in/alioune-kane-a2a25a258/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-black/40 hover:text-black transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                  <span className="text-black/15">·</span>
                  <a
                    href="https://www.instagram.com/abdousalamkane_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-black/40 hover:text-black transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                    </svg>
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — story */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            {t.body.map((para: string, i: number) => (
              <p key={i} className="text-black/60 leading-relaxed text-[15px]">{para}</p>
            ))}

            {/* Conviction quote */}
            <blockquote className="border-l-2 border-black/15 pl-5 mt-6">
              <p className="text-sm text-black/50 leading-relaxed italic">{t.conviction}</p>
            </blockquote>

            <div className="pt-4">
              <button
                data-cal-namespace="15min"
                data-cal-link="alioune-kane-1qdw6v/15min"
                data-cal-config='{"layout":"month_view"}'
                className="inline-flex items-center gap-2 bg-black text-white font-bold px-7 py-3.5 rounded-full hover:bg-black/80 transition-colors cursor-pointer text-sm"
              >
                {t.cta} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const { lang } = useLang();
  const t = translations[lang].testimonials;
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const initials = (name: string) => name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();

  // Real quotes first, then an honest "join them" slide — keeps the carousel
  // functional today with one testimonial and ready to grow without fake entries.
  const slides = [
    ...t.items.map((item) => ({ kind: 'quote' as const, item })),
    { kind: 'cta' as const },
  ];

  const scrollToIndex = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(i, slides.length - 1));
    const card = track.children[clamped] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    setActive(clamped);
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let closestDist = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const dist = Math.abs(el.offsetLeft + el.offsetWidth / 2 - center);
      if (dist < closestDist) { closestDist = dist; closest = i; }
    });
    setActive(closest);
  };

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader badge={t.badge} title={t.heading} subtitle={t.sub} />

        {/* Swipeable card track — drag/swipe on touch, arrow buttons + dots on desktop */}
        <div className="relative">
          <div
            ref={trackRef}
            onScroll={handleScroll}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-6 px-6 sm:px-[calc(50%-220px)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {slides.map((slide, i) => (
              <div
                key={i}
                className="snap-center shrink-0 w-[85vw] sm:w-[440px] flex flex-col justify-between bg-[#F7F7F5] border border-black/[0.08] rounded-3xl p-8 sm:p-9"
              >
                {slide.kind === 'quote' ? (
                  <>
                    <div>
                      <Quote className="w-7 h-7 text-black/15 mb-5" />
                      <p className="text-lg text-black font-medium leading-relaxed mb-8">"{slide.item.quote}"</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                        {initials(slide.item.author)}
                      </div>
                      <div className="text-sm font-bold text-black">{slide.item.author}</div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-start justify-center h-full text-left">
                    <p className="text-lg text-black font-medium leading-relaxed mb-6">{t.note}</p>
                    <button data-cal-namespace="15min" data-cal-link="alioune-kane-1qdw6v/15min"
                      data-cal-config='{"layout":"month_view"}'
                      className="inline-flex items-center gap-2 bg-black text-white font-bold px-6 py-3 rounded-xl hover:bg-black/80 transition-colors cursor-pointer text-sm">
                      {t.cta} <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {slides.length > 1 && (
            <>
              <button
                onClick={() => scrollToIndex(active - 1)}
                aria-label="Previous"
                className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 w-10 h-10 rounded-full bg-white border border-black/10 items-center justify-center shadow-md hover:bg-black hover:text-white transition-colors disabled:opacity-30"
                disabled={active === 0}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollToIndex(active + 1)}
                aria-label="Next"
                className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 w-10 h-10 rounded-full bg-white border border-black/10 items-center justify-center shadow-md hover:bg-black hover:text-white transition-colors disabled:opacity-30"
                disabled={active === slides.length - 1}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {slides.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${active === i ? 'w-6 bg-black' : 'w-1.5 bg-black/15'}`}
              />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <button data-cal-namespace="15min" data-cal-link="alioune-kane-1qdw6v/15min"
            data-cal-config='{"layout":"month_view"}'
            className="inline-flex items-center gap-2 bg-black text-white font-bold px-8 py-4 rounded-xl hover:bg-black/80 transition-colors cursor-pointer">
            {t.cta} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { lang } = useLang();
  const t = translations[lang].faq;

  return (
    <section id="faq" className="py-24 px-6 bg-[#F7F7F5]">
      <div className="max-w-3xl mx-auto">
        <SectionHeader badge={t.badge} title={t.heading} subtitle={t.sub} />

        <div className="space-y-3">
          {t.items.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-black/[0.07]">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-black/[0.02] transition-colors"
              >
                <span className="font-bold text-black pr-4">{faq.q}</span>
                <Plus className={`w-5 h-5 text-black transition-transform duration-300 shrink-0 ${openIndex === i ? 'rotate-45' : ''}`} />
              </button>
              <div
                style={{ display: 'grid', gridTemplateRows: openIndex === i ? '1fr' : '0fr', transition: 'grid-template-rows 0.3s ease' }}
              >
                <div className="overflow-hidden">
                  <div className="px-8 pb-6 text-black/50 text-sm leading-relaxed">{faq.a}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-black/[0.07]">
          <p className="text-black/60 text-sm">{t.ctaText}</p>
          <button
            data-cal-namespace="15min"
            data-cal-link="alioune-kane-1qdw6v/15min"
            data-cal-config='{"layout":"month_view"}'
            className="inline-flex items-center gap-2 bg-black text-white text-sm font-bold px-6 py-3 rounded-xl hover:bg-black/80 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {t.ctaBtn} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  const { lang } = useLang();
  const t = translations[lang].cta;
  const sectionRef = useRef<HTMLElement>(null);
  const [showCal, setShowCal] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setShowCal(true); observer.disconnect(); } },
      { rootMargin: '300px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="book" className="py-24 px-6 bg-black text-white relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0)", backgroundSize: "40px 40px" }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 text-white">
            {t.heading[0]}<br />{t.heading[1]}
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            {t.sub}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {t.steps.map((item) => (
            <div key={item.num} className="border border-white/[0.08] rounded-2xl p-6 bg-white/[0.03]">
              <div className="text-xs font-bold text-white/25 mb-3">{item.num}</div>
              <p className="text-white/60 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl overflow-hidden bg-white" style={{ minHeight: "600px" }}>
          {showCal ? (
            <Cal
              namespace="15min"
              calLink="alioune-kane-1qdw6v/15min"
              style={{ width: "100%", height: "600px", overflow: "scroll" }}
              config={{ layout: "month_view" }}
            />
          ) : (
            <div style={{ width: "100%", height: "600px" }} className="bg-gray-100 animate-pulse rounded-2xl" />
          )}
        </div>
        <p className="text-center text-white/20 text-xs mt-4">{t.fine}</p>
      </div>
    </section>
  );
};

const Footer = () => {
  const { lang } = useLang();
  const t = translations[lang].footer;

  return (
    <footer className="py-12 px-6 bg-black text-white border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-7 h-7 bg-white flex items-center justify-center">
                <Zap className="text-black w-4 h-4" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">
                Click<span className="font-black">rise</span>
              </span>
            </div>
            <p className="text-white/35 max-w-sm text-sm leading-relaxed mb-4">
              {t.desc}
            </p>
            <p className="text-white/20 text-xs mb-6">
              {t.founded}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/alioune-kane-a2a25a258/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full border border-white/[0.12] flex items-center justify-center text-white/45 hover:text-white hover:border-white/30 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/abdousalamkane_/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-white/[0.12] flex items-center justify-center text-white/45 hover:text-white hover:border-white/30 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-white">{t.servicesLabel}</h4>
            <ul className="space-y-4 text-sm text-white/35">
              {translations[lang].services.items.map((s) => (
                <li key={s.title}><a href="#services" className="hover:text-white transition-colors">{s.title}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-white">{t.companyLabel}</h4>
            <ul className="space-y-4 text-sm text-white/35">
              {t.company.map((l) => (
                <li key={l.label}><a href={l.href} className="hover:text-white transition-colors">{l.label}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/20">
          <div>{t.copy}</div>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-white transition-colors">{t.privacy}</a>
            <a href="#" className="hover:text-white transition-colors">{t.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const HomePage = () => {
  useDocumentSeo(SEO.home);
  return (
  <>
    <Navbar1 />
    <main>
      <Hero />
      <InfiniteMarquee />
      <Services />
      <LazySection minHeight="500px"><IndustriesTeaser /></LazySection>
      <LazySection minHeight="700px"><HowItWorks /></LazySection>
      <LazySection minHeight="700px"><WhyUs /></LazySection>
      <LazySection minHeight="700px"><CaseStudies /></LazySection>
      <LazySection minHeight="600px"><About /></LazySection>
      <LazySection minHeight="500px"><Testimonials /></LazySection>
      <LazySection minHeight="400px"><FAQ /></LazySection>
      <LazySection minHeight="800px"><CTA /></LazySection>
    </main>
    <Footer />
  </>
  );
};

const Shell = () => {
  const { path } = useRoute();
  const isIndustries = path.replace(/\/+$/, '') === '/industries';

  return (
    <div className="relative min-h-screen font-sans bg-white selection:bg-black/15">
      <BackgroundEffects />
      {isIndustries ? <IndustriesPage /> : <HomePage />}
      <elevenlabs-convai agent-id="agent_3601kjqppkvafmra74f6ph2v55vq"></elevenlabs-convai>
    </div>
  );
};

export default function App() {
  const [lang, setLang] = useState<Lang>(() =>
    navigator.language.toLowerCase().startsWith('fr') ? 'fr' : 'en'
  );

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "15min" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();

    const loadElevenLabs = () => {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
      script.async = true;
      document.body.appendChild(script);
    };
    if ('requestIdleCallback' in window) {
      (window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(loadElevenLabs);
    } else {
      setTimeout(loadElevenLabs, 2000);
    }
  }, []);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <LazyMotion features={domAnimation}>
    <MotionConfig reducedMotion={isMobile ? "always" : "never"}>
    <LangContext.Provider value={{ lang, setLang }}>
      <RouteProvider>
        <Shell />
      </RouteProvider>
    </LangContext.Provider>
    </MotionConfig>
    </LazyMotion>
  );
}
