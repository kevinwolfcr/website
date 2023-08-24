import type { TablerIconsProps } from "@tabler/icons-react"
import type { ComponentType } from "react"

export type Section = {
  id: string
  icon: ComponentType<TablerIconsProps>
  label: string
  title: string
  subtitle: string
}
