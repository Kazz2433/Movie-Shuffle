import styles from './button.module.css'
import Image from 'next/image'

import netflixSVG from '../../assets/netflix.svg'
import primeSVG from '../../assets/Amazon_Prime_Video_logo.svg'
import hboSVG from '../../assets/HBO_Max_Logo.svg'
import huluSVG from '../../assets/Hulu_logo_2017.svg'

export function ButtonStream() {
  return (
    <div className={styles.buttonContainer}>
      <button className={styles.buttonNetflix}>
        <Image src={netflixSVG} alt="Netflix Logo" width={64} />
      </button>
      <button className={styles.buttonPrime}>
        <Image src={primeSVG} alt="Netflix Logo" width={64} />
      </button>
      <button className={styles.buttonHbo}>
        <Image src={hboSVG} alt="Netflix Logo" width={64} />
      </button>
      <button className={styles.buttonHulu}>
        <Image src={huluSVG} alt="Netflix Logo" width={64} />
      </button>
    </div>
  )
}
