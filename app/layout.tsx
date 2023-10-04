import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'


import { ThemeProvider } from '@/providers/theme-provider'

import './globals.css'
import { ToasterProvider } from '@/providers/toast-provider'
import { ModalProvider } from '@/providers/modal-providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Dashboard',
  description: 'E-Commerce Dashboard',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider 
            attribute="class" 
            defaultTheme="system" 
            enableSystem
          >
            <ToasterProvider />
            <ModalProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
