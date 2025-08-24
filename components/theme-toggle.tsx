"use client"

import { Moon, Sun, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
    } else if (theme === "dark") {
      setTheme("system")
    } else {
      setTheme("light")
    }
  }

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-5 w-5" />
      case "dark":
        return <Moon className="h-5 w-5" />
      default:
        return <Monitor className="h-5 w-5" />
    }
  }

  const getLabel = () => {
    switch (theme) {
      case "light":
        return "Switch to dark theme"
      case "dark":
        return "Switch to system theme"
      default:
        return "Switch to light theme"
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={cycleTheme}
      className="w-10 h-10 p-0 bg-white/10 backdrop-blur-md hover:bg-white/20 focus:bg-white/20 border border-white/20 hover:border-lime-400/50 focus:border-lime-400/50 transition-all duration-300 hover:scale-105 focus:scale-105 hover:shadow-lg focus:shadow-lg hover:shadow-lime-400/20 focus:shadow-lime-400/20 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2 focus:ring-offset-background"
      aria-label={getLabel()}
      title={getLabel()}
    >
      <div className="transition-transform duration-300 hover:rotate-12">{getIcon()}</div>
    </Button>
  )
}
