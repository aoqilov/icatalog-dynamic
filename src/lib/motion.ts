import type { Variants } from 'framer-motion'

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

export const slideInRight: Variants = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: { type: 'tween', duration: 0.3, ease: 'easeOut' } },
  exit: { x: '100%', transition: { type: 'tween', duration: 0.25, ease: 'easeIn' } },
}

export const slideInUp: Variants = {
  hidden: { y: '100%' },
  visible: { y: 0, transition: { type: 'tween', duration: 0.3, ease: 'easeOut' } },
  exit: { y: '100%', transition: { type: 'tween', duration: 0.25, ease: 'easeIn' } },
}

// Ichkariga kirish / orqaga qaytish: custom = 1 (oldinga, o'ngdan kiradi) yoki -1 (orqaga, chapdan)
export const slideSwitch: Variants = {
  enter: (direction: number) => ({ x: direction * 48, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.22, ease: 'easeOut' } },
  exit: (direction: number) => ({
    x: direction * -48,
    opacity: 0,
    transition: { duration: 0.15, ease: 'easeIn' },
  }),
}

// Bir joydagi kontent almashishi (masalan, boshqa kategoriya tanlanganda)
export const fadeSwap: Variants = {
  enter: { opacity: 0, y: 8 },
  center: { opacity: 1, y: 0, transition: { duration: 0.18, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.12, ease: 'easeIn' } },
}
