import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { NavLink } from 'react-router'
import { NAV_LINKS } from '@/config/navigation'
import { SITE } from '@/config/site'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { fadeIn, slideInRight } from '@/lib/motion'
import { CloseIcon } from '@/shared/ui/Icons'

// Tailwind'ning `md` breakpoint'i: undan kattada mobil menyu ko'rinmaydi
const DESKTOP_QUERY = '(min-width: 48rem)'

type MobileMenuProps = {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useLockBodyScroll(isOpen)

  useEffect(() => {
    if (!isOpen) return

    const desktop = window.matchMedia(DESKTOP_QUERY)
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    const handleDesktopChange = (event: MediaQueryListEvent) => {
      if (event.matches) onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    desktop.addEventListener('change', handleDesktopChange)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      desktop.removeEventListener('change', handleDesktopChange)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-menu"
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 md:hidden"
        >
          <motion.div
            variants={fadeIn}
            onClick={onClose}
            aria-hidden="true"
            className="absolute inset-0 bg-black/40"
          />

          <motion.nav
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menyu"
            variants={slideInRight}
            className="absolute inset-y-0 right-0 flex w-72 max-w-[80%] flex-col bg-bg shadow-xl"
          >
            <div className="flex h-16 items-center justify-end px-4">
              <button
                type="button"
                onClick={onClose}
                aria-label="Menyuni yopish"
                autoFocus
                className="-mr-2 flex size-11 items-center justify-center rounded-full text-text hover:text-accent"
              >
                <CloseIcon />
              </button>
            </div>

            <ul className="flex flex-col gap-1 px-4">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `block rounded-md px-3 py-3 text-lg ${
                        isActive ? 'glass-brand font-semibold' : 'font-medium text-text hover:bg-fill'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="gline mt-auto" />
            <div className="p-4">
              <a href={SITE.phone.href} className="block text-center font-semibold text-accent">
                {SITE.phone.label}
              </a>
            </div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
