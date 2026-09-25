import { motion } from 'framer-motion'
import { useCallback, useState } from 'react'
import { NavLink, useLocation } from 'react-router'
import { NAV_LINKS } from '@/config/navigation'
import { ThemeToggle } from '@/shared/components/ThemeToggle'
import { MenuIcon } from '@/shared/ui/Icons'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'

export function Header() {
  const { pathname } = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [prevPathname, setPrevPathname] = useState(pathname)

  // Sahifa o'zgarganda (shu jumladan "orqaga" tugmasi bilan) menyu yopiladi
  if (pathname !== prevPathname) {
    setPrevPathname(pathname)
    setIsMenuOpen(false)
  }

  const closeMenu = useCallback(() => setIsMenuOpen(false), [])

  return (
    <>
      <header className="glass-bar sticky top-0 z-40">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Logo />

          <nav aria-label="Asosiy menyu" className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative py-1 transition-colors ${
                    isActive ? 'font-semibold text-accent' : 'font-medium text-muted hover:text-text'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-brand"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Menyuni ochish"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="-mr-2 flex size-11 items-center justify-center rounded-full text-text hover:text-accent md:hidden"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
        <div className="gline" />
      </header>

      {/* header'dan tashqarida: backdrop-blur ichidagi fixed element ekranni to'liq qoplamaydi */}
      <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  )
}
