import { ReactNode } from 'react'
import styles from './layout.module.css'
import './global.css'

import { Roboto } from '@next/font/google'

const roboto = Roboto({
  subsets: ['latin'],
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
    <html lang="en" className={roboto.className}>
      <head />
      <body className={styles.body}>{children}</body>
    </html>
  )
}
