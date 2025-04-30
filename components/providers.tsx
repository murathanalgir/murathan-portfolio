'use client';
//eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ThemeProvider, useTheme } from "next-themes";

export default function Providers({children}: {children: React.ReactNode}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true} disableTransitionOnChange={true}>
      {children}
    </ThemeProvider>
  )
}


