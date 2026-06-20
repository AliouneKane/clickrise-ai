import React, { createContext, useContext, useEffect, useState } from 'react'

interface RouteCtx { path: string; navigate: (to: string) => void }

const RouteContext = createContext<RouteCtx>({ path: '/', navigate: () => {} })
export const useRoute = () => useContext(RouteContext)

export const RouteProvider = ({ children }: { children: React.ReactNode }) => {
  const [path, setPath] = useState(() =>
    typeof window !== 'undefined' ? window.location.pathname : '/'
  )

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = (to: string) => {
    if (to === window.location.pathname) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    window.history.pushState({}, '', to)
    setPath(to)
    window.scrollTo({ top: 0 })
  }

  return (
    <RouteContext.Provider value={{ path, navigate }}>
      {children}
    </RouteContext.Provider>
  )
}

/**
 * Anchor that navigates client-side but keeps a real href so crawlers
 * (and react-snap) can discover the route.
 */
export const Link = ({
  to,
  className,
  children,
  ...rest
}: {
  to: string
  className?: string
  children: React.ReactNode
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const { navigate } = useRoute()
  return (
    <a
      href={to}
      className={className}
      onClick={(e) => {
        // let modifier-clicks / new-tab behave natively
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
        e.preventDefault()
        navigate(to)
      }}
      {...rest}
    >
      {children}
    </a>
  )
}
