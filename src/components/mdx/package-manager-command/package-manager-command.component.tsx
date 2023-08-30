"use client"

import type { PackageManager } from "./package-manager-command.context"
import type { TabsProps } from "@/components/tabs"

import { Tabs } from "@/components/tabs"

import { usePackageManager } from "./package-manager-command.context"

export type PackageManagerCommandProps = TabsProps

export function PackageManagerCommand({ content }: PackageManagerCommandProps) {
  const packageManager = usePackageManager()

  return (
    <Tabs
      className="mt-5"
      value={packageManager.value}
      onValueChange={(value) => packageManager.setValue(value as PackageManager)}
      content={content}
    />
  )
}
