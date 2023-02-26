'use client'

import { useState } from 'react'
import axios from 'axios'
import Image from 'next/image'

import { Header } from '@/components/Header'
import styles from './page.module.css'

import gitSVG from '@/assets/Octicons-mark-github.svg'
import linkedinSVG from '@/assets/linkedin.svg'
import { ButtonStream } from '@/components/ButtonStream'

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

export default function Home() {
  const [randomPage, setRandomPage] = useState(1)
  const [movieID, SetMovieID] = useState<MovieIDProps[]>([])
  const [movieDesc, SetMovieDesc] = useState<MovieDescProps>()

  async function RandomNumberPage() {
    const randomNumber = Math.floor(Math.random() * 194)
    setRandomPage(randomNumber)
  }

  async function getMoviesID() {
    await RandomNumberPage()
    try {
      const params = {
        api_key: '70f8af9fa4e1b9b6de11684d32a1d02c',
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
      SetMovieID([randomMovie.id])
      getMoviesDesc()
    } catch (error) {
      console.error(error)
    }
  }

  async function getMoviesDesc() {
    try {
      const params = {
        api_key: '70f8af9fa4e1b9b6de11684d32a1d02c',
        append_to_response: 'videos',
      }

      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieID}?`,
        { params },
      )

      SetMovieDesc(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  function handleButtonClick() {
    getMoviesID()
  }

  function githuhRepo() {
    window.open('https://github.com/revogabe/Movie-Shuffle', '_blank')
  }

  function projectWeek() {
    window.open('https://github.com/revogabe', '_blank')
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

  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.leftCol}>
            {movieDesc ? (
              <Image
                className={styles.banner}
                src={'https://image.tmdb.org/t/p/w500' + movieDesc.poster_path}
                alt={'Image of movie'}
                width={380}
                height={562}
              />
            ) : (
              <div className={styles.skeletonBanner} />
            )}

            <button
              className={styles.shuffleButton}
              onClick={handleButtonClick}
            >
              SHUFFLE
            </button>
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
                    <p className={styles.subtitle}>{movieDesc.release_date}</p>
                  ) : (
                    <div className={styles.skeletonSubtitle} />
                  )}
                </div>
                <div className={styles.contentStars}>
                  {movieDesc ? (
                    <h2 className={styles.rating}>{movieDesc.vote_average}</h2>
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
                {movieDesc ? (
                  <iframe
                    style={{ borderRadius: 6 }}
                    width="560"
                    height="315"
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
                <div className={styles.buttonContainer}>
                  <ButtonStream />
                </div>
              </div>
            </div>
            <div className={styles.buttonsSocial}>
              <button onClick={projectWeek} className={styles.buttonProject}>
                📆 ONE WEEK PROJECT
              </button>
              <button onClick={githuhRepo} className={styles.buttonGithub}>
                <Image src={gitSVG} alt="" width={24} />
                Repository
              </button>
              <button
                onClick={linkedinDaniel}
                className={styles.buttonLinkedin}
              >
                <Image src={linkedinSVG} alt="" width={24} />
                Daniel Gabriel
              </button>
              <button
                onClick={linkedinArmitage}
                className={styles.buttonLinkedin}
              >
                <Image src={linkedinSVG} alt="" width={24} />
                Kelvin Quida
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
