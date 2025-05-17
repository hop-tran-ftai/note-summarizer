"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import "@workspace/ui/lib/i18n"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
      forcedTheme="system"
    >
      {children}
    </NextThemesProvider>
  )
}
