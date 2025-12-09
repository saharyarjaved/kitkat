"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      style={{
        "--normal-bg": "#4B0000",          // dark KitKat red background
        "--normal-text": "#FFD6B0",        // light chocolate text
        "--normal-border": "#FF6B6B",      // red accent border
        "--success-bg": "#A52A2A",         // optional: chocolate success bg
        "--success-text": "#FFF0E0",       // success text
        "--error-bg": "#B22222",           // error bg
        "--error-text": "#FFE5E0",         // error text
        "--warning-bg": "#FF6347",         // warning bg
        "--warning-text": "#FFF5F0",       // warning text
        "--info-bg": "#CD5C5C",            // info bg
        "--info-text": "#FFF8F5",          // info text
      }}
      {...props}
    />
  )
}

export { Toaster }
