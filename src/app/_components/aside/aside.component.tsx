import { IconBrandGithub, IconBrandLinkedin, IconBrandX, IconDownload, IconMail } from "@tabler/icons-react"
import Image from "next/image"

import { Button } from "@/components/button"
import { Paper } from "@/components/paper"
import { Tooltip } from "@/components/tooltip"
import { about } from "@/data/about"
import { contact } from "@/data/contact"

const SOCIAL_LINKS = [
  { href: `https://github.com/${contact.social.github}`, icon: IconBrandGithub, label: "GitHub" },
  { href: `https://x.com/${contact.social.x}`, icon: IconBrandX, label: "X" },
  { href: `https://linkedin.com/in/${contact.social.linkedIn}`, icon: IconBrandLinkedin, label: "LinkedIn" },
]

export function Aside() {
  return (
    <Paper
      asChild
      shape="square"
      className="[grid-area:aside] lg:sticky lg:top-0 lg:w-[320px] lg:h-[100dvh] lg:flex-shrink-0 border-x-0 border-b-0 lg:border-t-0 lg:border-r flex flex-col items-center gap-7 px-5 py-7 text-center"
    >
      <aside>
        <Image src={about.avatar} width={150} height={150} alt={`Picture of ${about.name}`} />
        <div className="flex flex-col">
          <div className="typography-4 font-semibold">{about.name}</div>
          <div className="typography-3 text-dimmed">{about.position}</div>
        </div>
        <div className="flex gap-6">
          {SOCIAL_LINKS.map((link) => (
            <Tooltip key={link.href} delay={0} side="bottom" content={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 text-extradimmed hover:text-base"
              >
                <link.icon strokeWidth={1} />
              </a>
            </Tooltip>
          ))}
        </div>
        <p className="typography-2 text-dimmed">{about.description}</p>
        <div className="flex-auto" />
        <div className="self-stretch flex flex-col gap-4">
          <Button variant="secondary">
            <IconDownload strokeWidth={1.5} className="h-[16px]" />
            Download Résumé
          </Button>
          <Button>
            <IconMail strokeWidth={1.5} className="h-[16px]" />
            Get In Touch
          </Button>
        </div>
      </aside>
    </Paper>
  )
}
