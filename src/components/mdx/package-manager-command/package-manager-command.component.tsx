"use client"

import type { TabsProps } from "@/components/tabs"

import { useEffect, useState } from "react"
import { z } from "zod"

import { Tabs } from "@/components/tabs"

const packageManagerSchema = z.union([z.literal("pnpm"), z.literal("npm"), z.literal("yarn")]).catch("pnpm")

export type PackageManager = z.infer<typeof packageManagerSchema>
export type PackageManagerCommandProps = TabsProps

export function PackageManagerCommand({ content }: PackageManagerCommandProps) {
  const [packageManager, setPackageManager] = useState<PackageManager>("pnpm")

  useEffect(() => {
    const onPackageManagerChange = () => {
      const prevValue = packageManager
      const newValue = packageManagerSchema.parse(window.localStorage.getItem("packageManager"))
      if (prevValue !== newValue) setPackageManager(newValue)
    }

    onPackageManagerChange()

    window.addEventListener("packageManager:changed", onPackageManagerChange)
    window.addEventListener("storage", onPackageManagerChange)

    return () => {
      window.removeEventListener("packageManager:changed", onPackageManagerChange)
      window.removeEventListener("storage", onPackageManagerChange)
    }
  }, [packageManager])

  return (
    <Tabs
      className="mt-5"
      value={packageManager}
      onValueChange={(value) => {
        const newValue = packageManagerSchema.parse(value)
        setPackageManager(newValue)
        window.localStorage.setItem("packageManager", newValue)
        window.dispatchEvent(new Event("packageManager:changed"))
      }}
      content={content}
    />
  )
}
