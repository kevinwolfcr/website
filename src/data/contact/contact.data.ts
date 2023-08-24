import type { Section } from "../data.props"

import { IconMail } from "@tabler/icons-react"

type Contact = Section & {
  social: {
    github: string
    x: string
    xId: string
    linkedIn: string
    cal: string
    email: string
  }
}

export const contact: Contact = {
  id: "contact",
  icon: IconMail,
  label: "Contact",
  title: "Ready to Touch Base?",
  subtitle: "Let's make some magic together.",
  social: {
    github: "kevinwolfcr",
    x: "kevinwolfcr",
    xId: "561083727",
    linkedIn: "kevinwolfcr",
    cal: "kevinwolfcr",
    email: "hi@kevinwolf.cr",
  },
}
