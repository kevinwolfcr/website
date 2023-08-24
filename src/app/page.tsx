import {
  IconAlertCircleFilled,
  IconBrandGithub,
  IconBrandX,
  IconCalendar,
  IconCheck,
  IconCircleCheckFilled,
  IconMail,
} from "@tabler/icons-react"
import { revalidatePath } from "next/cache"
import Image from "next/image"
import { Resend } from "resend"

import { Button } from "@/components/button"
import { Hero } from "@/components/hero"
import { Main } from "@/components/main"
import { MDX } from "@/components/mdx"
import { Paper } from "@/components/paper"
import { Section } from "@/components/section"
import { about } from "@/data/about"
import { contact } from "@/data/contact"
import { experience } from "@/data/experience"
import { projects } from "@/data/projects"
import { stack } from "@/data/stack"
import { FormHandler } from "@/utils/forms"
import { cn } from "@/utils/ui"

const contactForm = new FormHandler<string, string>()

async function submitContactForm(formData: FormData) {
  "use server"

  try {
    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) throw new Error("process.env.RESEND_API_KEY is not defined")

    const name = formData.get("name")
    if (!name || typeof name !== "string") throw new Error("name should be a string")

    const email = formData.get("email")
    if (!email || typeof email !== "string") throw new Error("email should be a string")

    const subject = formData.get("subject")
    if (!subject || typeof subject !== "string") throw new Error("subject should be a string")

    const message = formData.get("message")
    if (!message || typeof message !== "string") throw new Error("message should be a string")

    const resend = new Resend(resendApiKey)
    await resend.emails.send({
      from: "website@kevinwolf.cr",
      to: contact.social.email,
      cc: email,
      subject: `Message from website: ${subject}`,
      html: [
        "<strong>Subject:</strong>",
        subject,
        "",
        "<strong>From:</strong>",
        email,
        "",
        "<strong>Message:</strong>",
        message,
      ].join("<br />"),
    })

    contactForm.succeed("Message received! I'll get back to you as soon as possible.")
  } catch (err) {
    contactForm.fail(err instanceof Error ? err.message : "Unknown Error")
  } finally {
    revalidatePath("/")
  }
}

export default function Home() {
  const contactFormState = contactForm.getState()

  return (
    <Main>
      <Hero {...about.hero} />
      <Section id={about.id} title={about.title} subtitle={about.subtitle} contentClassName="gap-5 text-dimmed">
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
              <div className="bg-accent-7 group-hover:bg-accent-9 w-4 h-4 rounded-full lg:transition-colors" />
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
              <div className="typography-2 text-dimmed">
                <MDX source={item.description} />
              </div>
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
                    <Image
                      src={item.imgSrc}
                      alt={item.imgAlt}
                      width={150}
                      height={90}
                      className="flex-shrink-0 rounded-md border-2 border-base-6 group-hover:border-accent-8 transition-colors"
                    />
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
      <Section id={contact.id} title={contact.title} subtitle={contact.subtitle} contentClassName="gap-7">
        <div className="grid grid-cols-2 gap-4">
          <Button asChild variant="secondary">
            <a href={`https://cal.com/${contact.social.cal}`} target="_blank" rel="noopener noreferrer">
              <IconCalendar strokeWidth={1.5} className="h-[16px]" />
              Book a Call
            </a>
          </Button>
          <Button asChild variant="secondary">
            <a
              href={`https://twitter.com/messages/compose?recipient_id=${contact.social.xId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandX strokeWidth={1.5} className="h-[16px]" />
              DM Me
            </a>
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-full h-[1px] bg-base-6" />
          <span className="uppercase typography-2 font-medium text-extradimmed">or</span>
          <div className="w-full h-[1px] bg-base-6" />
        </div>
        {contactFormState.status === "success" || contactFormState.status === "error" ? (
          <div
            className={cn(
              "rounded-md border flex items-center gap-4 p-4 typography-2 font-medium",
              contactFormState.status === "error" && "bg-error-2 border-error-6 text-error-11",
              contactFormState.status === "success" && "bg-success-2 border-success-6 text-success-11",
            )}
          >
            {contactFormState.status === "success" ? (
              <IconCircleCheckFilled strokeWidth={1.5} className="w-5 h-5" />
            ) : (
              <IconAlertCircleFilled strokeWidth={1.5} className="w-5 h-5" />
            )}
            {contactFormState.data}
          </div>
        ) : null}
        <form
          action={submitContactForm}
          className="grid [grid-template-areas:'name'_'email'_'subject'_'message'_'button'] sm:[grid-template-areas:'name_email'_'subject_subject'_'message_message'_'button_button'] gap-5"
        >
          <div className="[grid-area:name] flex flex-col gap-2">
            <label htmlFor="name" className="typography-2 font-medium">
              Your Name
            </label>
            <input
              required
              type="text"
              id="name"
              name="name"
              className="form-input rounded-md border-none bg-accent-3 hover:bg-accent-4 focus:bg-accent-5 focus:ring-accent-7 transition-colors"
            />
          </div>
          <div className="[grid-area:email] flex flex-col gap-2">
            <label htmlFor="email" className="typography-2 font-medium">
              Your Email
            </label>
            <input
              required
              type="email"
              id="email"
              name="email"
              className="form-input rounded-md border-none bg-accent-3 hover:bg-accent-4 focus:bg-accent-5 focus:ring-accent-7 transition-colors"
            />
          </div>
          <div className="[grid-area:subject] flex flex-col gap-2">
            <label htmlFor="subject" className="typography-2 font-medium">
              Your Subject
            </label>
            <input
              required
              type="text"
              id="subject"
              name="subject"
              className="form-input rounded-md border-none bg-accent-3 hover:bg-accent-4 focus:bg-accent-5 focus:ring-accent-7 transition-colors"
            />
          </div>
          <div className="[grid-area:message] flex flex-col gap-2">
            <label htmlFor="message" className="typography-2 font-medium">
              Your Message
            </label>
            <textarea
              required
              id="message"
              name="message"
              rows={7}
              className="form-textarea rounded-md border-none bg-accent-3 hover:bg-accent-4 focus:bg-accent-5 focus:ring-accent-7 resize-none transition-colors"
            />
          </div>
          <Button className="[grid-area:button]">
            <IconMail strokeWidth={1.5} className="h-[16px]" />
            Send Me an Email
          </Button>
        </form>
      </Section>
      <footer className="border-t border-base-6/50 flex flex-col gap-1 pt-4 typography-2 text-dimmed">
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
