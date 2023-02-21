import { ReactNode } from 'react'

import styles from './layout.module.css'
import './globals.css'

import { Poppins } from '@next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
})

export const metadata = {
  title: {
    default: 'MovieS | Shuffle Movie',
  },
  description: 'random movie generator for you and your family',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={poppins.className}>
      <head />
      <body className={styles.body}>{children}</body>
    </html>
  )
}
