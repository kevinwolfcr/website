import { IconBrandGithub, IconCheck } from "@tabler/icons-react"
import Image from "next/image"

import { Hero } from "@/components/hero"
import { Main } from "@/components/main"
import { MDX } from "@/components/mdx"
import { Paper } from "@/components/paper"
import { Section } from "@/components/section"
import { about } from "@/data/about"
import { experience } from "@/data/experience"
import { projects } from "@/data/projects"
import { stack } from "@/data/stack"

import { ContactForm } from "./_components/contact-form"

export default function SiteHome() {
  return (
    <Main className="gap-9 sm:gap-10">
      <Hero isBig {...about.hero} />
      <Section id={about.id} title={about.title} subtitle={about.subtitle}>
        <MDX source={about.content} />
      </Section>
      <Section
        id={experience.id}
        title={experience.title}
        subtitle={experience.subtitle}
        contentClassName="gap-0 group/list"
      >
        {experience.items.map((item, i) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex gap-5 lg:group-hover/list:opacity-50 lg:hover:!opacity-100 lg:transition-opacity"
          >
            <div className="relative">
              <div className="w-4 h-4 rounded-full bg-accent-8 group-hover:bg-accent-9 lg:transition-colors" />
              {i < experience.items.length - 1 ? (
                <div className="absolute top-4 bottom-0 left-1/2 w-[1px] bg-base-6" />
              ) : null}
            </div>
            <div className="flex flex-col gap-4 pb-8">
              <div className="flex flex-col gap-1">
                <span className="h-4 flex items-center uppercase text-2 leading-[1] tracking-2 font-medium text-dimmed">
                  {item.startDate} - {item.endDate}
                </span>
                <h3 className="typography-3 font-medium group-hover:text-accent transition-colors">
                  {item.position} @ {item.company}
                </h3>
              </div>
              <MDX className="typography-2" source={item.description} />
            </div>
          </a>
        ))}
      </Section>
      <Section id={stack.id} title={stack.title} subtitle={stack.subtitle} contentClassName="gap-8">
        {stack.groups.map((group) => (
          <div key={group.id} className="flex flex-col gap-4">
            <h3 className="typography-5 font-medium">{group.title}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {group.items.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 typography-2 text-dimmed hover:text-accent transition-colors"
                >
                  <IconCheck className="w-4 h-4 text-accent" /> {item.title}
                </a>
              ))}
            </div>
          </div>
        ))}
      </Section>
      <Section id={projects.id} title={projects.title} subtitle={projects.subtitle}>
        {projects.groups.map((group) => (
          <div key={group.id} className="flex flex-col gap-6">
            <h3 className="typography-5 font-medium">{group.title}</h3>
            <div className="flex flex-col gap-4 lg:gap-6 group/list">
              {group.items.map((item) => (
                <div
                  key={item.id}
                  className="my-4 relative flex flex-col sm:flex-row items-start gap-3 md:gap-5 lg:group-hover/list:opacity-50 lg:hover:!opacity-100 lg:transition-opacity group"
                >
                  <Paper className="absolute -z-10 -inset-5 opacity-0 lg:group-hover:opacity-100 lg:transition-opacity" />
                  {item.imgSrc && item.imgAlt ? (
                    <div className="relative flex-shrink-0 rounded border-2 border-base-6 group-hover:border-accent-8 transition-colors overflow-hidden">
                      <Image
                        src={item.imgSrc}
                        alt={item.imgAlt}
                        width={150}
                        height={90}
                        className="group-hover:scale-110 transition-transform will-change-transform"
                      />
                    </div>
                  ) : null}
                  <div className="flex flex-col gap-3">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="typography-3 font-medium hover:text-accent transition-colors"
                    >
                      <div className="absolute -inset-5 bg-[red]/01" />
                      <h4>{item.title}</h4>
                    </a>
                    <p className="typography-2 text-dimmed">{item.description}</p>
                    {item.source ? (
                      <a
                        href={item.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative inline-flex items-center gap-2 typography-2 text-base hover:text-accent transition-colors"
                      >
                        <IconBrandGithub className="w-4 h-4" />
                        Source
                      </a>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Section>
      <ContactForm />
      <footer className="border-t border-base-6/50 flex flex-col gap-2 pt-8 sm:pt-9 typography-2 text-dimmed">
        <MDX
          source={[
            "Built with [Next.js](https://nextjs.org) and [TailwindCSS](https://tailwindcss.com), deployed in [Vercel](https://vercel.com).",
            "Copyright (c) 2023 Kevin Wolf. All rights reserved.",
          ].join("\n\n")}
        />
      </footer>
    </Main>
  )
}
