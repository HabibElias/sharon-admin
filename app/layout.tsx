import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sharon Admin Panel',
  description: 'Powered by Sabih Software Systems',
  generator: 'Sabih Software Systems',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className='font-[poppins]'>{children}</body>
    </html>
  )
}
