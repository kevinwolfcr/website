import type { Section } from "../data.props"

import { IconUser } from "@tabler/icons-react"

type About = Section & {
  avatar: string
  name: string
  position: string
  description: string
  hero: {
    title: string
    subtitle: string
    imgSrc: string
    imgAlt: string
  }
  content: string
}

export const about: About = {
  avatar: "/images/about/avatar.png",
  name: "Kevin Wolf",
  position: "Senior Product Engineer",
  description:
    "An ardent explorer of Developer Experience, and a beacon for Open Source, Indie Hacking, and the infinite possibilities of Artificial Intelligence. My compass points towards leading passionate teams, uplifting developers, and crafting with a heart tuned to the user's beat.",
  hero: {
    title: "Hola! I'm **Kevin Wolf**.",
    subtitle: "Crafting **digital experiences**, one commit at a time, from **San José, Costa Rica**.",
    imgSrc: "/images/about/hero.png",
    imgAlt: "A wolf coding on a computer",
  },
  id: "about",
  icon: IconUser,
  label: "About",
  title: "A Bit About Me",
  subtitle: 'From "Hello World!" to complex projects: My journey in a nutshell.',
  content: `
    Delving deep as a **Senior Product Engineer**, I've navigated the vast oceans of the tech world for nearly two decades. My journey began **self-taught** at the early age of 12, and the adventure of learning continues every day.

    Passionate about **Developer Experience**, I believe coding isn't just about strings of logic but ensuring it's a joy for developers and resonates with users. Throughout my career, I've crafted **websites**, **mobile apps**, and tools specifically designed to **elevate productivity** and **streamline the development workflow**.

    Being a staunch advocate for **Open Source**, my curiosity often leads me to emerging technologies, especially **Artificial Intelligence**. The technological horizon is exhilarating, and I'm ecstatic to be at its forefront. Alongside, I've teamed up with incredible talents, **mentoring** the upcoming wave of **developers**. And the driving force behind every endeavor? **Empathy**. Each project, every line of code, revolves around the people it benefits.

    Beyond the screen, my world orbits around **cherished moments with my daughters**, embracing the thrill in the **boxing** ring, exploring the cosmos through my **telescope**, and indulging in unforgettable **game nights** with pals. Whether I'm at the **gym**, embarking on fresh **adventures**, or sketching out my next **tattoo**, there's always a new chapter awaiting.

    Life's a whirlwind, both inside and outside the **IDE**. Together, we can craft magnificence!
  `,
}
