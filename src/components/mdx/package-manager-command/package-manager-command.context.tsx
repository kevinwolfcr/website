"use client"

import type { Dispatch, ReactNode, SetStateAction } from "react"

import { createContext, useContext, useEffect, useRef, useState } from "react"

export type PackageManager = "pnpm" | "npm" | "yarn"

const PackageManagerCommandContext = createContext<{
  value: PackageManager
  setValue: Dispatch<SetStateAction<PackageManager>>
}>({ value: "pnpm", setValue: () => {} })

export type PackageManagerCommandProviderProps = {
  initialValue: PackageManager
  onValueChange: (newValue: PackageManager) => void
  children: ReactNode
}

export function PackageManagerCommandProvider({
  initialValue,
  onValueChange,
  children,
}: PackageManagerCommandProviderProps) {
  const prevValueRef = useRef<PackageManager>(initialValue)
  const [value, setValue] = useState<PackageManager>(initialValue)

  useEffect(() => {
    if (value !== prevValueRef.current) onValueChange(value)
    prevValueRef.current = value
  }, [onValueChange, value])

  return (
    <PackageManagerCommandContext.Provider value={{ value, setValue }}>
      {children}
    </PackageManagerCommandContext.Provider>
  )
}

export function usePackageManager() {
  return useContext(PackageManagerCommandContext)
}
