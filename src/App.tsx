/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';
import { Navbar1 } from './components/ui/navbar-1';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import {
  Activity,
  ArrowRight,
  Bot,
  Code2,
  Cpu,
  Database,
  Globe,
  Layers,
  Mail,
  Plus,
  Quote,
  Sparkles,
  Terminal,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import { LangContext, useLang, type Lang } from './lib/i18n';
import { translations } from './content/translations';

// --- Components ---

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
      <motion.div
        className="flex gap-24 items-center whitespace-nowrap"
        animate={{ x: [0, -1200] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      >
        {[...tools, ...tools, ...tools].map((tool, i) => (
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
      </motion.div>
    </div>
  );
};

const BackgroundEffects = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <div className="absolute inset-0 grid-pattern" />
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-black/[0.03] blur-[150px]" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-black/[0.02] blur-[150px]" />
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-black/[0.06] to-transparent" />
  </div>
);

const Hero = () => {
  const { lang } = useLang();
  const t = translations[lang].hero;
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section className="relative pt-32 pb-20 px-6 min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{ opacity: [0.04, 0.1, 0.04], scale: [1, 1.05, 1] }}
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-black/55 text-xs font-bold mb-6 uppercase tracking-widest">
            <Sparkles className="w-3 h-3" />
            {t.badge}
          </div>

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

        {/* Hours saved chart */}
        <motion.div
          style={{ y }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative flex items-center justify-center"
        >
          <svg className="w-full" viewBox="0 0 500 255" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0A0A0A" stopOpacity="0.09" />
                <stop offset="100%" stopColor="#0A0A0A" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Chart title */}
            <text x="263" y="17" textAnchor="middle" fill="rgba(0,0,0,0.28)" fontSize="9" fontFamily="DM Sans, sans-serif" letterSpacing="1">
              {lang === 'fr' ? 'HEURES GAGNÉES / SEMAINE' : 'HOURS SAVED / WEEK · AVG.'}
            </text>

            {/* Horizontal grid lines + Y labels */}
            {([20, 15, 10, 5] as const).map((h) => {
              const yp = 220 - h * 9.25
              return (
                <React.Fragment key={h}>
                  <line x1="48" y1={yp} x2="482" y2={yp} stroke="rgba(0,0,0,0.045)" strokeWidth="1" strokeDasharray="3 3" />
                  <text x="40" y={yp + 3.5} textAnchor="end" fill="rgba(0,0,0,0.22)" fontSize="8" fontFamily="DM Sans, sans-serif">{h}</text>
                </React.Fragment>
              )
            })}
            <text x="40" y="223" textAnchor="end" fill="rgba(0,0,0,0.22)" fontSize="8" fontFamily="DM Sans, sans-serif">0</text>

            {/* X axis */}
            <line x1="48" y1="220" x2="482" y2="220" stroke="rgba(0,0,0,0.09)" strokeWidth="1" />

            {/* X labels: W1–W8 */}
            {[0,1,2,3,4,5,6,7].map((i) => (
              <text key={i} x={48 + i * 61.4} y="234" textAnchor="middle" fill="rgba(0,0,0,0.22)" fontSize="8" fontFamily="DM Sans, sans-serif">
                {lang === 'fr' ? `S${i+1}` : `W${i+1}`}
              </text>
            ))}

            {/* Gradient fill */}
            <motion.path
              d="M48,202 C68,196 89,191 109,183 C129,175 150,164 170,155 C191,146 212,136 232,128 C253,120 273,115 293,109 C313,103 334,97 354,91 C375,85 395,77 416,72 C437,67 457,66 478,63 L478,220 L48,220 Z"
              fill="url(#chartGrad)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 1 }}
            />

            {/* Curve — 2h → 4h → 7h → 10h → 12h → 14h → 16h → 17h */}
            <motion.path
              d="M48,202 C68,196 89,191 109,183 C129,175 150,164 170,155 C191,146 212,136 232,128 C253,120 273,115 293,109 C313,103 334,97 354,91 C375,85 395,77 416,72 C437,67 457,66 478,63"
              fill="none"
              stroke="#0A0A0A"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2.4, ease: "easeInOut" }}
            />

            {/* Data dots W1–W7 (staggered with the curve draw) */}
            {([[48,202],[109,183],[170,155],[232,128],[293,109],[354,91],[416,72]] as [number,number][]).map(([cx, cy], i) => (
              <motion.circle
                key={i}
                cx={cx}
                cy={cy}
                r={2.5}
                fill="#0A0A0A"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.35 }}
                transition={{ delay: 0.3 + i * 0.3, duration: 0.25 }}
              />
            ))}

            {/* Start annotation: 2h */}
            <motion.text
              x={48} y={192}
              textAnchor="middle"
              fill="rgba(0,0,0,0.32)"
              fontSize="8.5"
              fontFamily="DM Sans, sans-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              2h
            </motion.text>

            {/* Peak annotation: 17h */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.6, duration: 0.5 }}
            >
              <circle cx={478} cy={63} r={5} fill="#0A0A0A" />
              <text x={478} y={51} textAnchor="middle" fill="#0A0A0A" fontSize="13" fontWeight="700" fontFamily="DM Sans, sans-serif">17h</text>
            </motion.g>
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

const SectionHeader = ({ title, subtitle, badge }: { title: string; subtitle: string; badge?: string }) => (
  <div className="text-center mb-16">
    {badge && (
      <div className="inline-block px-3 py-1 rounded-full bg-black/5 border border-black/10 text-black/50 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
        {badge}
      </div>
    )}
    <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-black">{title}</h2>
    <p className="text-black/40 max-w-2xl mx-auto">{subtitle}</p>
  </div>
);

const Services = () => {
  const { lang } = useLang();
  const t = translations[lang].services;

  const icons = [
    <Mail className="w-5 h-5" />,
    <TrendingUp className="w-5 h-5" />,
    <Code2 className="w-5 h-5" />,
    <Globe className="w-5 h-5" />,
  ];

  return (
    <section id="services" className="py-24 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-black/5 border border-black/10 text-black/50 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
              {t.badge}
            </div>
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

                <motion.div
                  variants={{
                    rest:    { x: 0, color: 'rgba(10,10,10,0.2)' },
                    hovered: { x: 5, color: '#ffffff' },
                  }}
                  transition={{ duration: 0.28 }}
                  className="shrink-0"
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
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

  return (
    <section id="how-it-works" className="py-24 px-6 bg-[#F7F7F5] border-y border-black/[0.06]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader badge={t.badge} title={t.heading} subtitle={t.sub} />

        <div className="grid md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-8 left-0 w-full h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

          {t.steps.map((step, i) => (
            <div key={i} className="relative z-10 text-center">
              <div className="w-16 h-16 bg-white border border-black/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm relative">
                <span className="text-black font-display font-bold text-xl">{step.number}</span>
                <div className="absolute inset-0 rounded-full border border-black/20 animate-ping opacity-15" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-black">{step.title}</h3>
              <p className="text-black/40 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyUs = () => {
  const { lang } = useLang();
  const t = translations[lang].whyUs;

  const icons = [
    <Sparkles className="w-5 h-5" />,
    <Code2 className="w-5 h-5" />,
    <Users className="w-5 h-5" />,
    <Globe className="w-5 h-5" />,
  ];

  return (
    <section id="why-us" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="border border-black/[0.07] rounded-[40px] p-12 relative overflow-hidden bg-[#F7F7F5]">
          <div className="absolute inset-0 grid-pattern opacity-60" />
          <div className="relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 rounded-full bg-black/5 border border-black/10 text-black/50 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                {t.badge}
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-black">
                {t.heading[0]}<br />{t.heading[1]}
              </h2>
              <p className="text-black/40 max-w-2xl mx-auto">
                {t.body}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {t.reasons.map((r, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-6 bg-white rounded-2xl border border-black/[0.07] hover:border-black/15 hover:shadow-sm transition-all"
                >
                  <div className="w-10 h-10 bg-black/5 rounded-xl flex items-center justify-center text-black shrink-0 border border-black/[0.08]">
                    {icons[i]}
                  </div>
                  <div>
                    <h3 className="font-bold mb-2 text-black">{r.title}</h3>
                    <p className="text-black/40 text-sm leading-relaxed">{r.desc}</p>
                  </div>
                </div>
              ))}
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

  const icons = [
    <Activity className="w-5 h-5" />,
    <Users className="w-5 h-5" />,
    <Mail className="w-5 h-5" />,
  ];

  return (
    <section id="work" className="py-24 px-8 bg-[#F7F7F5]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-black/5 border border-black/10 text-black/50 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
              {t.badge}
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-black leading-tight">
              {t.heading}
            </h2>
          </div>
          <p className="text-black/40 max-w-xs md:text-right text-sm leading-relaxed">
            {t.sub}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {t.items.map((c, i) => (
            <motion.div
              key={i}
              className="bg-white border border-black/[0.08] rounded-3xl p-8 hover:border-black/20 hover:shadow-sm transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-11 h-11 border border-black/[0.08] rounded-xl flex items-center justify-center text-black">
                  {icons[i]}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${c.status === 'live' ? 'bg-black text-white' : 'bg-black/5 text-black/50 border border-black/10'}`}>
                  {c.statusDisplay}
                </span>
              </div>

              <div className="text-[10px] text-black/35 uppercase tracking-widest mb-1">{c.sector}</div>
              <h3 className="text-xl font-display font-bold text-black mb-6">{c.title}</h3>

              <div className="space-y-4">
                {([
                  { label: lang === 'fr' ? 'Problème'  : 'Problem',  text: c.problem,  bold: false },
                  { label: lang === 'fr' ? 'Solution'  : 'Solution', text: c.solution, bold: false },
                  { label: lang === 'fr' ? 'Résultat'  : 'Result',   text: c.result,   bold: true  },
                ] as const).map((block) => (
                  <div key={block.label}>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-black/30 mb-1">{block.label}</div>
                    <p className={`text-sm leading-relaxed ${block.bold ? 'text-black font-medium' : 'text-black/50'}`}>
                      {block.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mt-6">
                {c.stack.map((tech) => (
                  <span key={tech} className="text-[10px] bg-black/5 border border-black/[0.07] px-2.5 py-1 rounded-full text-black/50">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
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
          <div className="inline-block px-3 py-1 rounded-full bg-black/5 border border-black/[0.08] text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 mb-4">
            {t.badge}
          </div>
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

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader badge={t.badge} title={t.heading} subtitle={t.sub} />

        <div className="max-w-2xl mx-auto">
          <div className="border border-black/[0.08] bg-[#F7F7F5] rounded-3xl p-10 relative">
            <Quote className="w-8 h-8 text-black/10 mb-6" />
            <p className="text-xl text-black font-medium leading-relaxed mb-8">
              "{t.quote}"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-black/10 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-black/40" />
              </div>
              <div>
                <div className="text-sm font-bold text-black">{t.author}</div>
                <div className="text-xs text-black/35 italic">{t.note}</div>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <button
              data-cal-namespace="15min"
              data-cal-link="alioune-kane-1qdw6v/15min"
              data-cal-config='{"layout":"month_view"}'
              className="inline-flex items-center gap-2 bg-black text-white font-bold px-8 py-4 rounded-xl hover:bg-black/80 transition-colors cursor-pointer"
            >
              {t.cta} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
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
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6 text-black/50 text-sm leading-relaxed">{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
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

  return (
    <section id="book" className="py-24 px-6 bg-black text-white relative overflow-hidden">
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

        <div className="rounded-2xl overflow-hidden bg-white">
          <Cal
            namespace="15min"
            calLink="alioune-kane-1qdw6v/15min"
            style={{ width: "100%", height: "600px", overflow: "scroll" }}
            config={{ layout: "month_view" }}
          />
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
            <p className="text-white/20 text-xs">
              {t.founded}
            </p>
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

export default function App() {
  const [lang, setLang] = useState<Lang>(() =>
    navigator.language.toLowerCase().startsWith('fr') ? 'fr' : 'en'
  );

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "15min" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <div className="relative min-h-screen font-sans bg-white selection:bg-black/15">
        <BackgroundEffects />
        <Navbar1 />
        <main>
          <Hero />
          <InfiniteMarquee />
          <Services />
          <HowItWorks />
          <WhyUs />
          <CaseStudies />
          <About />
          <Testimonials />
          <FAQ />
          <CTA />
        </main>
        <Footer />
        <elevenlabs-convai agent-id="agent_3601kjqppkvafmra74f6ph2v55vq"></elevenlabs-convai>
      </div>
    </LangContext.Provider>
  );
}
