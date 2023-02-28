'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'

import styles from './page.module.css'

import gitSVG from '@/assets/Octicons-mark-github.svg'
import linkedinSVG from '@/assets/linkedin.svg'
import { ButtonStream } from '@/components/ButtonStream'
import { Header } from '@/components/Header'

interface MovieIDProps {
  id: number
}
interface MovieDescProps {
  original_title: string
  poster_path: string
  overview: string
  release_date: string
  vote_average: number
  imdb_id: string
  genres: [{ id: number; name: string }]
  runtime: number
  videos: {
    results: [
      {
        id: string
        key: string
        name: string
        site: string
        type: string
        official: boolean
      },
    ]
  }
}

interface MovieStreamProps {
  name: string
  type: string
  web_url: string
  format: string
}

export default function Home() {
  const [randomPage, setRandomPage] = useState(1)
  const [movieDesc, SetMovieDesc] = useState<MovieDescProps>()
  const [movieStream, SetMovieStream] = useState<MovieStreamProps[]>([])
  const [theme, setTheme] = useState('light')

  const KEY_MOVIE_DB = process.env.KEY_MOVIE_DB
  const KEY_STREAMING = process.env.KEY_STREAMS

  useEffect(() => {
    getMoviesID()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleButtonClick() {
    getMoviesID()
  }

  async function RandomNumberPage() {
    const randomNumber = Math.floor(Math.random() * 208)
    setRandomPage(randomNumber)
  }

  async function getMoviesID() {
    await RandomNumberPage()
    try {
      const params = {
        api_key: KEY_MOVIE_DB,
        language: 'en-US',
        sort_by: 'release_date.desc',
        page: randomPage,
        'release_date.gte': '1980-01-01',
        'release_date.lte': '2023-02-26',
        'vote_count.gte': 500,
        'vote_average.gte': 6,
        with_original_language: 'en',
      }

      const response = await axios.get(
        'https://api.themoviedb.org/3/discover/movie',
        { params },
      )

      const randomMovie =
        response.data.results[
          Math.floor(Math.random() * response.data.results.length)
        ]

      console.log(randomMovie)
      getMoviesDesc(randomMovie.id)
    } catch (error) {
      console.error(error)
    }
  }

  async function getMoviesDesc(movieID: MovieIDProps) {
    try {
      const params = {
        api_key: KEY_MOVIE_DB,
        append_to_response: 'videos',
      }

      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieID}?`,
        { params },
      )

      SetMovieDesc(response.data)
      getMovieStreamings(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  async function getMovieStreamings(movieDesc: MovieDescProps) {
    try {
      const params = {
        apiKey: KEY_STREAMING,
      }

      const response = await axios.get(
        `https://api.watchmode.com/v1/title/${movieDesc.imdb_id}/sources/?`,
        { params },
      )
      const filterStream = response.data.filter(
        (stream: { name: string; type: string; format: string }) => {
          return (
            stream.name === 'Netflix' ||
            stream.name === 'Amazon Prime' ||
            stream.name === 'HBO MAX' ||
            stream.name === 'Hulu' ||
            stream.name === 'Disney+' ||
            stream.name === 'Apple TV+' ||
            (stream.type !== 'subscription'
              ? (stream.name === 'Amazon' &&
                  stream.type === 'rent' &&
                  stream.format === 'HD') ||
                (stream.name === 'YouTube' &&
                  stream.type === 'rent' &&
                  stream.format === 'HD') ||
                (stream.name === 'Google Play' &&
                  stream.type === 'rent' &&
                  stream.format === 'HD') ||
                (stream.name === 'iTunes' &&
                  stream.type === 'rent' &&
                  stream.format === 'HD')
              : null)
          )
        },
      )

      SetMovieStream(filterStream)
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  function githuhRepo() {
    window.open('https://github.com/revogabe/Movie-Shuffle', '_blank')
  }

  function linkedinDaniel() {
    window.open(
      'https://www.linkedin.com/in/daniel-gabriel-70a565267/',
      '_blank',
    )
  }

  function linkedinArmitage() {
    window.open(
      'https://www.linkedin.com/in/kelvin-quid%C3%A1-44b563163/',
      '_blank',
    )
  }

  const linkYoutube = movieDesc?.videos.results.find(
    (video) =>
      video.type === 'Trailer' &&
      video.site === 'YouTube' &&
      video.official === true,
  )

  const rating = movieDesc?.vote_average.toFixed(1)

  function handleSwitchClick() {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  return (
    <main className={styles.main}>
      <Header switchTeste={theme} onClickTeste={handleSwitchClick} />
      <div className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.leftCol}>
            {movieDesc ? (
              <Image
                className={styles.banner}
                src={'https://image.tmdb.org/t/p/w500' + movieDesc.poster_path}
                alt={'Image of movie'}
                width={1024}
                height={1024}
              />
            ) : (
              <div>
                <div className={styles.skeletonBanner} />
              </div>
            )}
          </div>
          <div className={styles.rightContainer}>
            <div className={styles.rightCol}>
              <div className={styles.headerContent}>
                <div className={styles.titleContent}>
                  {movieDesc ? (
                    <h2 className={styles.title}>{movieDesc.original_title}</h2>
                  ) : (
                    <div className={styles.skeletonContent} />
                  )}
                  {movieDesc ? (
                    <p className={styles.subtitle}>{movieDesc.runtime}min</p>
                  ) : (
                    <div className={styles.skeletonSubtitle} />
                  )}
                </div>
                <div className={styles.contentStars}>
                  {movieDesc ? (
                    <h2 className={styles.rating}>{rating}</h2>
                  ) : (
                    <div className={styles.skeletonRating} />
                  )}
                </div>
              </div>
              <div className={styles.description}>
                {movieDesc ? (
                  <h2 className={styles.subtitleDescription}>
                    {movieDesc.overview}
                  </h2>
                ) : (
                  <div className={styles.skeletonDescription} />
                )}
              </div>
              <div className={styles.trailerContainer}>
                <div className={styles.trailerContainer2}>
                  {movieDesc ? (
                    <iframe
                      style={{ borderRadius: 6 }}
                      width="1000"
                      height="100"
                      className={styles.iframe}
                      src={`https://youtube.com/embed/` + linkYoutube?.key}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className={styles.skeletonTrailer} />
                  )}
                </div>
                <div className={styles.buttonContainer}>
                  {movieStream.map((stream, index) => (
                    <ButtonStream
                      key={index}
                      nameStream={stream.name}
                      urlStream={stream.web_url}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.buttonsSocial}>
              <button
                className={styles.shuffleButton}
                onClick={handleButtonClick}
              >
                SHUFFLE
              </button>
              <div className={styles.buttonsSocial2}>
                <button onClick={githuhRepo} className={styles.buttonGithub}>
                  <Image src={gitSVG} alt="" width={24} />
                </button>
                <button
                  onClick={linkedinDaniel}
                  className={styles.buttonLinkedin}
                >
                  <Image src={linkedinSVG} alt="" width={24} />
                </button>
                <button
                  onClick={linkedinArmitage}
                  className={styles.buttonLinkedin}
                >
                  <Image src={linkedinSVG} alt="" width={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
