import { Experience } from '@/sections/Experience'
import { Hero } from '@/sections/Hero'
import { Projects } from '@/sections/Projects'
import { Skills } from '@/sections/Skills'

// El orden debe coincidir con SECTION_IDS (content/navigation.ts)
export function Home() {
  return (
    <>
      <Hero />
      <Experience />
      <Skills />
      <Projects />
    </>
  )
}
