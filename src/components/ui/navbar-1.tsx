import * as React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X, Zap, ArrowRight } from "lucide-react"
import { useLang } from "../../lib/i18n"
import { translations } from "../../content/translations"

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { lang, setLang } = useLang()
  const t = translations[lang].nav

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full py-5 px-4">
      <div className="flex items-center justify-between px-6 py-3 bg-white rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.08)] w-full max-w-3xl relative z-10 border border-black/[0.06]">

        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5">
          <motion.div
            className="w-8 h-8 bg-black flex items-center justify-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            whileHover={{ rotate: 10 }}
            transition={{ duration: 0.3 }}
          >
            <Zap className="text-white w-4 h-4" />
          </motion.div>
          <span className="font-display font-bold text-lg tracking-tight text-black">
            Clickrise
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {t.items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              whileHover={{ scale: 1.05 }}
            >
              <a
                href={item.href}
                className="text-sm text-gray-900/60 hover:text-gray-900 transition-colors font-medium"
              >
                {item.label}
              </a>
            </motion.div>
          ))}
        </nav>

        {/* Desktop right: lang toggle + CTA */}
        <div className="hidden md:flex items-center gap-3">
          <motion.button
            onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
            className="text-xs font-bold uppercase tracking-widest text-black/35 hover:text-black transition-colors px-1"
            whileHover={{ scale: 1.05 }}
            title={lang === 'en' ? 'Passer en français' : 'Switch to English'}
          >
            {lang === 'en' ? 'FR' : 'EN'}
          </motion.button>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            whileHover={{ scale: 1.03 }}
          >
            <button
              data-cal-namespace="15min"
              data-cal-link="alioune-kane-1qdw6v/15min"
              data-cal-config='{"layout":"month_view"}'
              className="inline-flex items-center gap-1.5 px-5 py-2 text-sm font-bold text-white bg-black rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
            >
              {t.cta} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        </div>

        {/* Mobile hamburger */}
        <motion.button
          className="md:hidden flex items-center"
          onClick={toggleMenu}
          whileTap={{ scale: 0.9 }}
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6 text-gray-900" />
        </motion.button>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-50 pt-24 px-8 md:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <motion.button
              className="absolute top-6 right-6 p-2"
              onClick={toggleMenu}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              aria-label="Close menu"
            >
              <X className="h-6 w-6 text-gray-900" />
            </motion.button>

            {/* Mobile lang toggle */}
            <motion.button
              onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
              className="absolute top-7 left-8 text-xs font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {lang === 'en' ? 'FR' : 'EN'}
            </motion.button>

            <div className="flex flex-col space-y-7">
              {t.items.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: i * 0.08 + 0.1 }}
                >
                  <a
                    href={item.href}
                    className="text-2xl font-display font-bold text-gray-900"
                    onClick={toggleMenu}
                  >
                    {item.label}
                  </a>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.4 }}
                className="pt-4"
              >
                <button
                  data-cal-namespace="15min"
                  data-cal-link="alioune-kane-1qdw6v/15min"
                  data-cal-config='{"layout":"month_view"}'
                  className="inline-flex items-center justify-center w-full px-5 py-4 text-base font-bold text-white bg-black rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
                  onClick={toggleMenu}
                >
                  {t.cta} <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export { Navbar1 }
