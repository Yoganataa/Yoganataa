"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    console.log("[v0] Theme toggle mounted, theme:", theme, "resolvedTheme:", resolvedTheme)
  }, [theme, resolvedTheme])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <div className="h-4 w-4" />
      </Button>
    )
  }

  const handleThemeToggle = () => {
    const currentTheme = resolvedTheme || theme || "dark"
    console.log("[v0] Theme toggle clicked, currentTheme:", currentTheme)
    const newTheme = currentTheme === "light" ? "dark" : "light"
    console.log("[v0] Setting theme to:", newTheme)
    setTheme(newTheme)
  }

  const isDark = (resolvedTheme || theme) === "dark"

  return (
    <Button variant="ghost" size="icon" onClick={handleThemeToggle} className="h-9 w-9">
      {isDark ? <Sun className="h-4 w-4 transition-all" /> : <Moon className="h-4 w-4 transition-all" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
