import Image from 'next/image'
import logoSVG from '../../assets/logo.svg'
import styles from './header.module.css'

export function Header() {
  return (
    <header className={styles.container}>
      <Image src={logoSVG} alt="" width={160} />
      <button className={styles.switch}>
        <div className={styles.circle} />
      </button>
    </header>
  )
}
