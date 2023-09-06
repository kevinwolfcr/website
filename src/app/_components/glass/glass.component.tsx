"use client"

import { useEffect, useRef } from "react"

export function Glass() {
  const spotlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const spotlightElem = spotlightRef.current
      if (!spotlightElem) return
      const offsetX = spotlightElem.offsetWidth / 2
      const offsetY = spotlightElem.offsetHeight / 2
      spotlightElem.style.top = e.clientY - offsetY + "px"
      spotlightElem.style.left = e.clientX - offsetX + "px"
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 z-10 flex pointer-events-none">
      <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-full w-[250px] sm:w-[500px] aspect-square bg-base-5" />
      <div className="absolute bottom-0 translate-y-1/2 left-0 -translate-x-1/2 rounded-full w-[250px] sm:w-[500px] aspect-square bg-base-5" />
      <div className="absolute bottom-0 translate-y-1/2 right-0 translate-x-1/2 rounded-full w-[250px] sm:w-[500px] aspect-square bg-base-5" />
      <div ref={spotlightRef} className="hidden lg:block absolute rounded-full w-[100px] aspect-square bg-base-8" />
      <div className="absolute inset-0 bg-base-1/50 backdrop-blur-[100px] backdrop-saturate-200" />
    </div>
  )
}
