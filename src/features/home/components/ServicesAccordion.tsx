import type { IconType } from 'react-icons'
import { LuCalendarCheck, LuScissors, LuTag } from 'react-icons/lu'
import { TbHanger } from 'react-icons/tb'
import type { Service, ServiceIcon } from '@/api/routes/services/services.types'
import { Accordion } from '@/shared/ui/Accordion'

type ServicesAccordionProps = {
  services: Service[]
  onMore: () => void
}

const SERVICE_ICONS: Record<ServiceIcon, IconType> = {
  rent: TbHanger,
  sale: LuTag,
  tailoring: LuScissors,
  fitting: LuCalendarCheck,
}

// Kartaning o'zi glass, ichidagi tugma blur'siz (blur ichida blur bo'lmaydi).
// "Batafsil" primary emas: ekranda bitta primary qoidasi, bu yerda esa har bir bandda bittadan chiqadi
export function ServicesAccordion({ services, onMore }: ServicesAccordionProps) {
  const items = services.map((service) => {
    const Icon = SERVICE_ICONS[service.icon]
    return {
      id: service.id,
      title: service.title,
      icon: <Icon aria-hidden className="size-5" />,
      content: (
        <div className="flex flex-col items-start gap-3">
          <p className="text-sm text-muted">{service.description}</p>
          <button
            type="button"
            onClick={onMore}
            aria-haspopup="dialog"
            className="inline-flex h-11 items-center rounded-md border border-line px-4 text-sm font-semibold text-accent hover:bg-fill focus-visible:outline-2 focus-visible:outline-brand"
          >
            Batafsil
          </button>
        </div>
      ),
    }
  })

  return (
    <section aria-labelledby="home-services" className="flex flex-col gap-3">
      <h2 id="home-services" className="text-[17px] font-bold text-text">
        Xizmatlar
      </h2>
      <div className="glass rounded-md">
        <Accordion items={items} defaultOpenId={services[0]?.id} />
      </div>
    </section>
  )
}
