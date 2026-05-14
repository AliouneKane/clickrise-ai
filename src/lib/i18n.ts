import { createContext, useContext } from 'react'

export type Lang = 'en' | 'fr'

interface LangCtx { lang: Lang; setLang: (l: Lang) => void }

export const LangContext = createContext<LangCtx>({ lang: 'en', setLang: () => {} })
export const useLang = () => useContext(LangContext)
