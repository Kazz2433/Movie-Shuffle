import { ReactNode } from 'react'

import styles from './layout.module.css'
import './globals.css'

import { Poppins } from '@next/font/google'

const poppins = Poppins({
  subsets: ['devanagari'],
  weight: ['900'],
  adjustFontFallback: true,
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
