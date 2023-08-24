import type { Section } from "../data.props"

import { IconStack2 } from "@tabler/icons-react"

type Stack = Section & {
  groups: {
    id: string
    title: string
    items: {
      id: string
      title: string
      url: string
    }[]
  }[]
}

export const stack: Stack = {
  id: "stack",
  icon: IconStack2,
  label: "Stack",
  title: "Bits & Tools",
  subtitle: "From hardware to code: The complete toolkit that powers my work.",
  groups: [
    {
      id: "programming-languages",
      title: "Programming Languages",
      items: [
        { id: "javascript", title: "JavaScript", url: "https://www.javascript.com/" },
        { id: "typescript", title: "TypeScript", url: "https://www.typescriptlang.org/" },
        { id: "html5", title: "HTML5", url: "https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5" },
        { id: "css3", title: "CSS3", url: "https://developer.mozilla.org/en-US/docs/Archive/CSS3" },
        { id: "sass", title: "SASS", url: "https://sass-lang.com/" },
        { id: "python", title: "Python", url: "https://www.python.org/" },
        { id: "ruby", title: "Ruby", url: "https://www.ruby-lang.org/en/" },
        { id: "go", title: "Go", url: "https://golang.org/" },
        { id: "rust", title: "Rust", url: "https://www.rust-lang.org/" },
      ],
    },
    {
      id: "frameworks-and-libraries",
      title: "Frameworks & Libraries",
      items: [
        { id: "react-js", title: "React.js", url: "https://reactjs.org/" },
        { id: "react-native", title: "React Native", url: "https://reactnative.dev/" },
        { id: "next-js", title: "Next.js", url: "https://nextjs.org/" },
        { id: "remix", title: "Remix", url: "https://remix.run/" },
        { id: "gatsby", title: "Gatsby", url: "https://www.gatsbyjs.com/" },
        { id: "apollo-client", title: "Apollo Client", url: "https://www.apollographql.com/docs/react/" },
        { id: "tailwind-css", title: "Tailwind CSS", url: "https://tailwindcss.com/" },
        { id: "styled-components", title: "styled-components", url: "https://styled-components.com/" },
        { id: "emotion", title: "emotion", url: "https://emotion.sh/docs/introduction" },
        { id: "material-ui", title: "Material UI", url: "https://mui.com/" },
        { id: "mantine", title: "Mantine", url: "https://mantine.dev/" },
        { id: "framer-motion", title: "Framer Motion", url: "https://www.framer.com/api/motion/" },
        { id: "storybook", title: "Storybook", url: "https://storybook.js.org/" },
        { id: "graphql", title: "GraphQL", url: "https://graphql.org/" },
        { id: "apollo-server", title: "Apollo Server", url: "https://www.apollographql.com/docs/apollo-server/" },
        { id: "graphql-nexus", title: "GraphQL Nexus", url: "https://nexusjs.org/" },
        { id: "pothos-graphql", title: "Pothos GraphQL", url: "https://pothos-graphql.dev/" },
        { id: "prisma", title: "Prisma", url: "https://www.prisma.io/" },
        { id: "kysely", title: "Kysely", url: "https://kysely.dev/" },
      ],
    },
    {
      id: "software",
      title: "Software & Applications",
      items: [
        { id: "git", title: "Git", url: "https://git-scm.com/" },
        { id: "docker", title: "Docker", url: "https://www.docker.com/" },
        { id: "node-js", title: "Node.js", url: "https://nodejs.org/en/" },
        { id: "mysql", title: "MySQL", url: "https://www.mysql.com/" },
        { id: "postgresql", title: "PostgreSQL", url: "https://www.postgresql.org/" },
        { id: "mongodb", title: "MongoDB", url: "https://www.mongodb.com/" },
        { id: "vscode", title: "Visual Studio Code", url: "https://code.visualstudio.com/" },
        { id: "figma", title: "Figma", url: "https://www.figma.com/" },
        { id: "slack", title: "Slack", url: "https://slack.com/" },
        { id: "discord", title: "Discord", url: "https://discord.com/" },
        { id: "google-chrome", title: "Google Chrome", url: "https://www.google.com/chrome/" },
      ],
    },
    {
      id: "services",
      title: "Third Party Services",
      items: [
        { id: "aws", title: "Amazon Web Services", url: "https://aws.amazon.com/" },
        { id: "github", title: "GitHub", url: "https://github.com/" },
        { id: "gitlab", title: "GitLab", url: "https://about.gitlab.com/" },
        { id: "netlify", title: "Netlify", url: "https://www.netlify.com/" },
        { id: "vercel", title: "Vercel", url: "https://vercel.com/" },
        { id: "railway", title: "Railway", url: "https://railway.app/" },
        { id: "wordpress", title: "Wordpress", url: "https://wordpress.com/" },
      ],
    },
    {
      id: "hardware",
      title: "Hardware",
      items: [
        { id: "airpods-max", title: "AirPods Max", url: "https://www.apple.com/airpods-max/" },
        {
          id: "display",
          title: "Dell S2719H (x2)",
          url: "https://www.dell.com/en-us/shop/dell-27-monitor-s2719h/apd/210-arcj/monitors-monitor-accessories",
        },
        { id: "macbook", title: 'MacBook Pro 14" 2021', url: "https://www.apple.com/macbook-pro-14-and-16/" },
        {
          id: "magic-keyboard",
          title: "Magic Keyboard",
          url: "https://www.apple.com/shop/product/MLA22LL/A/magic-keyboard-us-english",
        },
        {
          id: "magic-trackpad",
          title: "Magic Trackpad",
          url: "https://www.apple.com/shop/product/MJ2R2LL/A/magic-trackpad-2-silver",
        },
        {
          id: "vertagear",
          title: "Vertagear SL1200SE",
          url: "https://www.vertagear.com/products/gaming-series-triigger-line-350-se",
        },
      ],
    },
  ],
}
