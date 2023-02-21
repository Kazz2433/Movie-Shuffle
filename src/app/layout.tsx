import { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <head />
      <body>
        <h1>Header</h1>
        {children}
      </body>
    </html>
  )
}
