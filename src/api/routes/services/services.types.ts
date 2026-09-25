// Frontend shu kalitga qarab ikonka tanlaydi
export type ServiceIcon = 'rent' | 'sale' | 'tailoring' | 'fitting'

export type Service = {
  id: number
  title: string
  icon: ServiceIcon
  description: string
}
