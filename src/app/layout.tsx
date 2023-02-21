import { ReactNode } from 'react'
import styles from './globals.module.css'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <head />
      <body className={styles.body}>{children}</body>
    </html>
  )
}
