import type { ReactElement } from "react"

declare module "html-to-react" {
  export class Parser {
    public parse(html: string): ReactElement
  }
}
