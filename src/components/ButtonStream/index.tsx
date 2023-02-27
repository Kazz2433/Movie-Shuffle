import styles from './button.module.css'
import Image from 'next/image'

import netflixSVG from '@/assets/netflix.svg'
import primeSVG from '@/assets/Amazon_Prime_Video_logo.svg'
import hboSVG from '@/assets/HBO_Max_Logo.svg'
import huluSVG from '@/assets/Hulu_logo_2017.svg'
import disneySVG from '@/assets/Disney+_logo.svg'
import GooglePlaySVG from '@/assets/Google_Play_Store_badge_EN.svg'
import YouTubeSVG from '@/assets/YouTube_Logo_2017.svg'
import AmazonSVG from '@/assets/Amazon_logo.svg'
import AppleTVSVG from '@/assets/Apple_TV_Plus_Logo.svg'

type Props = {
  nameStream: string
  urlStream: string
}

function getStreamClass(streamName: string) {
  switch (streamName) {
    case 'Amazon':
      return styles.Amazon
    case 'Amazon Prime':
      return styles.PrimeVideo
    case 'Netflix':
      return styles.Netflix
    case 'HBO':
      return styles.Hbo
    case 'YouTube':
      return styles.YouTube
    case 'Google Play':
      return styles.GooglePlay
    case 'iTunes':
      return styles.AppleTV
    case 'Hulu':
      return styles.Hulu
    case 'Disney+':
      return styles.Disney
    case 'AppleTV+':
      return styles.AppleTV
    default:
      return ''
  }
}

function getStreamSvg(streamName: string) {
  switch (streamName) {
    case 'Amazon':
      return AmazonSVG
    case 'Netflix':
      return netflixSVG
    case 'HBO':
      return hboSVG
    case 'Hulu':
      return huluSVG
    case 'Disney+':
      return disneySVG
    case 'Google Play':
      return GooglePlaySVG
    case 'iTunes':
      return AppleTVSVG
    case 'AppleTV+':
      return AppleTVSVG
    case 'YouTube':
      return YouTubeSVG
    case 'Amazon Prime':
      return primeSVG
    default:
      return undefined
  }
}

export function ButtonStream({ nameStream, urlStream }: Props) {
  const streamClass = getStreamClass(nameStream)
  const streamSVG = getStreamSvg(nameStream)

  return (
    <div className={styles.buttonView}>
      <button
        onClick={() => {
          window.open(urlStream, '_blank')
        }}
        className={streamClass}
      >
        {streamSVG !== undefined ? (
          <Image src={streamSVG} alt={nameStream + 'Logo'} height={28} />
        ) : null}
        {streamSVG === undefined ? (
          <h1 style={{ fontSize: 14, paddingTop: 14, paddingBottom: 14 }}>
            {nameStream}
          </h1>
        ) : null}
      </button>
    </div>
  )
}
