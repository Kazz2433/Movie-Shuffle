import Image from 'next/image'
import logoSVG from '../../assets/logo.svg'
import styles from './header.module.css'

type Props = {
  switchTeste: string
  onClickTeste: () => void
}

function getStreamClass(switchTeste: string) {
  switch (switchTeste) {
    case 'dark':
      return styles.switchDark
    case 'light':
      return styles.switch
    default:
      return styles.switch
  }
}

function getCircle(switchTeste: string) {
  switch (switchTeste) {
    case 'dark':
      return styles.circleDark
    case 'light':
      return styles.circle
    default:
      return styles.circle
  }
}

function getHeader(switchTeste: string) {
  switch (switchTeste) {
    case 'dark':
      return styles.containerDark
    case 'light':
      return styles.container
    default:
      return styles.container
  }
}
export function Header({ switchTeste, onClickTeste }: Props) {
  const switchButton = getStreamClass(switchTeste)
  const switchCircle = getCircle(switchTeste)
  const switchHeader = getHeader(switchTeste)

  return (
    <header className={switchHeader}>
      <Image src={logoSVG} alt="" width={160} />
      <button onClick={onClickTeste} className={switchButton}>
        <div className={switchCircle} />
      </button>
    </header>
  )
}
