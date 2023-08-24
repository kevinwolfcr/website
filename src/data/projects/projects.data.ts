import type { Section } from "../data.props"

import { IconBriefcase } from "@tabler/icons-react"

type Projects = Section & {
  groups: {
    id: string
    title: string
    items: {
      id: string
      url: string
      source?: string
      imgSrc?: string
      imgAlt?: string
      title: string
      description: string
    }[]
  }[]
}

export const projects: Projects = {
  id: "projects",
  icon: IconBriefcase,
  label: "Projects",
  title: "From Ideas to Reality",
  subtitle: "A spectrum of projects: Some solo, some shared, all special.",
  groups: [
    {
      id: "work",
      title: "Featured Work Projects",
      items: [
        {
          id: "maven-analytics",
          url: "https://mavenanalytics.io",
          imgSrc: "/images/projects/maven-analytics.png",
          imgAlt: "Screenshot of the Maven Analytics website",
          title: "Maven Analytics",
          description:
            "A comprehensive e-learning environment offering courses tailored for data career enhancement. It enables users to earn credentials, immerse in data challenges, and gain recognition. The platform's public segment allows for showcasing projects and credentials, amplifying user engagement within the data community.",
        },
        {
          id: "modern-health",
          url: "https://modernhealth.com",
          imgSrc: "/images/projects/modern-health.png",
          imgAlt: "Screenshot of the Modern Health website",
          title: "Modern Health",
          description:
            "An inclusive mental health solution aiming to deliver the best outcomes for individuals and communities. The platform simplifies access to care, fostering global equity with a standardized experience for users regardless of their location. It also empowers workplaces with tools to foster a positive mental health culture and provides professionals with streamlined scheduling and patient evaluation features.",
        },
        {
          id: "voiceflow",
          url: "https://voiceflow.com",
          imgSrc: "/images/projects/voiceflow.png",
          imgAlt: "Screenshot of the Voiceflow website",
          title: "Voiceflow",
          description:
            "A real-time collaborative platform designed to streamline the design, prototyping, and building of conversational AI. The platform enables teams to efficiently create chat and voice assistants, fostering quicker adaptability to emerging conversational trends and demands. It offers a unified workspace where users can collaboratively and simultaneously build chat and voice applications at scale.",
        },
        {
          id: "twilio-signal",
          url: "http://web.archive.org/web/20200803085322/https://signal.twilio.com",
          imgSrc: "/images/projects/twilio-signal.png",
          imgAlt: "Screenshot of the Twilio Signal 2020 website",
          title: "Twilio Signal 2020",
          description:
            "A dynamic digital hub crafted for Twilio Signal 2020, capturing the essence of the premier communications event. The website showcases keynotes, breakout sessions, and interactive workshops, offering attendees and visitors a seamless navigation experience. Embodying the spirit of innovation inherent to Twilio, the platform ensures users remain engaged and informed about the event's highlights, agendas, and pivotal moments.",
        },
        {
          id: "the-wing",
          url: "http://web.archive.org/web/20180616091729/https://www.the-wing.com",
          imgSrc: "/images/projects/the-wing.png",
          imgAlt: "Screenshot of The Wing website",
          title: "The Wing",
          description:
            "A sophisticated digital space reflecting The Wing's dedication to the advancement of women through community. Serving as both a portal and a showcase, the website offers an immersive experience into The Wing’s ethos, events, and offerings. From detailed information on co-working spaces to community stories and membership details, the platform elegantly encapsulates the brand's mission to foster empowerment and collaboration among its members.",
        },
        {
          id: "wink",
          url: "https://holawink.com",
          imgSrc: "/images/projects/wink.png",
          imgAlt: "Screenshot of the Wink mobile application",
          title: "Wink",
          description:
            "A groundbreaking mobile application, Wink revolutionizes Costa Rica's financial landscape by enabling users to effortlessly open a bank account directly from their smartphones. Beyond traditional banking, the app fosters a seamless digital experience, allowing users to send and receive money with friends and family, all under a user-friendly interface that prioritizes convenience and financial empowerment.",
        },
      ],
    },
  ],
}
