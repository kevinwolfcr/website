import type { Section } from "../data.props"

import { IconBuilding } from "@tabler/icons-react"

type Experience = Section & {
  items: {
    id: string
    url: string
    position: string
    company: string
    startDate: string
    endDate: string
    description: string
  }[]
}

export const experience: Experience = {
  id: "experience",
  icon: IconBuilding,
  label: "Experience",
  title: "Adventures in Tech",
  subtitle: "The landmarks of my coding career, one role at a time.",
  items: [
    {
      id: "maven-analytics",
      url: "https://mavenanalytics.io",
      position: "Senior Product Engineer",
      company: "Maven Analytics",
      startDate: "Jun 2022",
      endDate: "Present",
      description:
        "At Maven Analytics, an industry-leading e-learning platform, I collaborated with the product team on platform maintenance and enhancements. Together, we introduced features empowering instructors to publish courses and interact with students more effectively. We also developed social tools, enabling students to curate public profiles, showcase their projects, and highlight participation in data challenges.",
    },
    {
      id: "modern-health",
      url: "https://modernhealth.com/",
      position: "Staff Front End Developer",
      company: "Modern Health",
      startDate: "Oct 2021",
      endDate: "Jun 2022",
      description:
        "At Modern Health, a pioneer in prioritizing mental health, I served as a Staff Front End Developer. Collaborating closely with the Product team, I played an instrumental role in shaping and maintaining a platform that not only enhances individuals' mental well-being but also equips healthcare professionals with the tools to manage appointments effectively. As a team lead, my responsibilities spanned conducting code reviews, project estimations, and mentoring fellow developers, ensuring we delivered on our vision of mental health empowerment.",
    },
    {
      id: "voiceflow",
      url: "https://voiceflow.com",
      position: "Senior Front End Developer",
      company: "Voiceflow",
      startDate: "Jan 2021",
      endDate: "Oct 2021",
      description:
        "At Voiceflow, the driving force behind revolutionizing the development of chat and voice assistants, I took on the challenge of constructing a platform tailored for crafting conversational bots. Teaming up with the Product unit, we not only birthed innovative features but also ensured a seamless platform experience. Beyond feature development, my role encompassed rigorous code reviews and knowledge-sharing, frequently contributing to our front-end guild to foster continuous learning and tech advancement.",
    },
    {
      id: "this-dot-inc",
      url: "https://thisdot.co",
      position: "Full Stack Developer",
      company: "This Dot, Inc",
      startDate: "Mar 2019",
      endDate: "Jan 2021",
      description:
        "At ThisDotLabs, a forefront web application consultancy, I collaborated on high-stake projects, notably with esteemed clients like Twilio and Vix. Working within a distributed team, we constantly explored the pinnacle of web technologies to meet business demands. While I championed web standards and cutting-edge methodologies, I also played a pivotal role in delivering solutions that had profound business implications.",
    },
    {
      id: "gopato",
      url: "https://gopato.com",
      position: "Technology Lead",
      company: "GoPato",
      startDate: "Sep 2018",
      endDate: "Mar 2019",
      description:
        "GoPato, a pioneering on-demand food and package delivery venture in Costa Rica, trusted me as their Technology Lead during a pivotal relaunch phase. Collaborating closely with the CTO, I spearheaded development tasks, established and enforced coding standards, and streamlined our Continuous Integration and Deployment processes. My role bridged technical oversight with strategic collaboration, ensuring both our internal teams were aligned towards a common vision for product excellence.",
    },
    {
      id: "the-hangar",
      url: "https://hangarworldwide.com",
      position: "Technology Lead",
      company: "Hangar Worldwide",
      startDate: "Jan 2018",
      endDate: "Sep 2018",
      description:
        "At Hangar Worldwide, a global nexus of tech and design expertise, I played an instrumental role in sculpting transformative digital experiences for illustrious brands, including Critical Mass, Nissan, and The Wing. In collaboration with both front-end and back-end teams, I ensured cohesive development flows, emphasized quality through rigorous code reviews, and navigated Continuous Integration and Delivery pathways. My tenure here was also marked by synergized efforts with Project Managers, envisioning and executing product roadmaps, and delivering captivating product demos to our esteemed clientele.",
    },
    {
      id: "wink",
      url: "https://holawink.com",
      position: "Lead Front End Developer",
      company: "Wink",
      startDate: "Nov 2016",
      endDate: "Jan 2018",
      description:
        "At Wink, Costa Rica's pioneering mobile financial app, I took the helm of the front-end development team, steering the product from its nascent planning stages to a triumphant launch. My role entailed overseeing every facet of the front-end operations, while closely collaborating with the CTO, ensuring our collective vision seamlessly translated into a platform that redefined banking convenience for Costa Ricans, enabling them to effortlessly open accounts and transfer funds.",
    },
    {
      id: "accenture",
      url: "https://accenture.com",
      position: "Senior Front End & Mobile Developer",
      company: "Accenture",
      startDate: "Jun 2012",
      endDate: "Nov 2016",
      description:
        "In Accenture, I embarked on my professional journey as a developer. Starting as a junior, I swiftly climbed the ranks to attain a senior position. Throughout my tenure, I had the privilege of collaborating with diverse clients, immersing myself in an array of technologies. Additionally, I played an instrumental role in the company's internal university, where I not only imparted front-end development knowledge to fellow developers but also trained aspiring entrants to the field.",
    },
  ],
}
