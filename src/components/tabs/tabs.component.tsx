"use client"

import type { TabsProps as TabsRootProps } from "@radix-ui/react-tabs"
import type { ReactNode } from "react"

import * as TabsPrimitive from "@radix-ui/react-tabs"

export type TabsProps = Omit<TabsRootProps, "content"> & {
  content: Record<string, ReactNode>
}

export function Tabs({ className, content, ...props }: TabsProps) {
  return (
    <TabsPrimitive.Root className={className} {...props}>
      <TabsPrimitive.List className="flex gap-3">
        {Object.keys(content).map((value) => (
          <TabsPrimitive.Trigger
            key={value}
            value={value}
            className="rounded hover:bg-base-4 data-[state=active]:bg-base-5 px-4 py-2 typography-2 font-medium text-dimmed data-[state=active]:text-base"
          >
            {value}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
      {Object.entries(content).map(([tab, content]) => (
        <TabsPrimitive.Content key={tab} value={tab} className="mt-3">
          {content}
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  )
}
