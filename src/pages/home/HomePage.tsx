import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/motion'

export function HomePage() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4">
      <motion.h1
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="text-5xl font-bold text-accent"
      >
        Hello World
      </motion.h1>
      <motion.p
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
        className="text-lg text-muted"
      >
        React + TypeScript + Tailwind + axios + framer-motion
      </motion.p>
    </section>
  )
}
