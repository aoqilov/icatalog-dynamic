import { Link } from 'react-router'
import { NAV_LINKS } from '@/config/navigation'
import { SITE } from '@/config/site'
import { Logo } from './Logo'

const headingClass = 'mb-3 text-sm font-bold uppercase tracking-wider text-text'
const linkClass = 'text-sm text-muted transition-colors hover:text-accent'

export function Footer() {
  return (
    <footer>
      <div className="gline" />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 md:grid-cols-3">
        <div className="flex flex-col gap-3 sm:col-span-2 md:col-span-1">
          <Logo />
          <p className="max-w-xs text-sm text-muted">{SITE.description}</p>
        </div>

        <div>
          <h2 className={headingClass}>Sahifalar</h2>
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={headingClass}>Aloqa</h2>
          <ul className="flex flex-col gap-2">
            <li>
              <a href={SITE.phone.href} className={linkClass}>
                {SITE.phone.label}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className={linkClass}>
                {SITE.email}
              </a>
            </li>
            {SITE.socials.map((social) => (
              <li key={social.label}>
                <a href={social.url} target="_blank" rel="noreferrer" className={linkClass}>
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="gline" />
      <div>
        <p className="mx-auto max-w-6xl px-4 py-4 text-center text-xs text-muted sm:text-left">
          © {new Date().getFullYear()} {SITE.name}. Barcha huquqlar himoyalangan.
        </p>
      </div>
    </footer>
  )
}
