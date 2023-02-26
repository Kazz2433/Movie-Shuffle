'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'

import { Header } from '@/components/Header'
import styles from './page.module.css'

import gitSVG from '@/assets/Octicons-mark-github.svg'
import linkedinSVG from '@/assets/linkedin.svg'
import { ButtonStream } from '@/components/ButtonStream'

interface ShuffleProps {
  Poster: string
  Title: string
  Year: string
  Director: string
  Plot: string
  Metascore: string
  Genre: string
  imdbID: string
}

interface RandomMovieProps {
  title: string
  year: string
}

export default function Home() {
  useEffect(() => {
    getRandomMovie()
    requestApiShuffle()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const listMovies = [
    { title: 'The Godfather', year: '1972' },
    { title: 'The Shawshank Redemption', year: '1994' },
    { title: 'The Dark Knight', year: '2008' },
    { title: 'The Godfather: Part II', year: '1974' },
    { title: 'The Lord of the Rings: The Return of the King', year: '2003' },
    { title: 'Pulp Fiction', year: '1994' },
    { title: 'Schindler’s List', year: '1993' },
    { title: 'The Good, the Bad and the Ugly', year: '1966' },
  ]

  useEffect(() => {
    requestTrailer()
  }, [requestTrailer])

  const [randomMovie, setRandomMovie] = useState<RandomMovieProps>(
    listMovies[Math.floor(Math.random() * listMovies.length)],
  )
  const [shuffleMovie, setShuffleMovie] = useState<ShuffleProps>()
  const [trailer, setTrailer] = useState<string>()

  // REQUEST API SHUFFLE
  async function getRandomMovie() {
    await fetch('/api')
      .then((response) => response.json())
      .then((movies) => {
        const randomIndex = Math.floor(Math.random() * movies.length)
        const getRandomMovie = movies[randomIndex]
        setRandomMovie(getRandomMovie)
      })
      .catch((error) => console.error(error))
  }

  async function requestApiShuffle() {
    await axios
      .request({
        method: 'GET',
        url: 'https://www.omdbapi.com/',
        params: {
          t: randomMovie?.title,
          y: randomMovie?.year,
          apikey: 'c3efd167',
        },
      })
      .then(function (response) {
        console.log(response.data)
        setShuffleMovie(response.data)
      })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function requestTrailer() {
    await axios
      .request(optionsTrailer)
      .then(function (response) {
        setTrailer(response.data?.result?.youtubeTrailerVideoId)
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  const optionsTrailer = {
    method: 'GET',
    url: 'https://streaming-availability.p.rapidapi.com/v2/get/basic',
    params: { country: 'us', imdb_id: shuffleMovie?.imdbID },
    headers: {
      'X-RapidAPI-Key': '4a48ec8ffamsh287812e16b63278p1e53efjsnda9233c75af2',
      'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
    },
  }

  async function handleButtonClick() {
    getRandomMovie()
    requestApiShuffle()
    requestTrailer()
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
  // skeleton loading antes de carregar os dados
  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.leftCol}>
            {shuffleMovie ? (
              <Image
                className={styles.banner}
                src={shuffleMovie.Poster}
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
                  {shuffleMovie ? (
                    <h2 className={styles.title}>{shuffleMovie.Title}</h2>
                  ) : (
                    <div className={styles.skeletonContent} />
                  )}
                  {shuffleMovie ? (
                    <p className={styles.subtitle}>{shuffleMovie.Director}</p>
                  ) : (
                    <div className={styles.skeletonSubtitle} />
                  )}
                </div>
                <div className={styles.contentStars}>
                  {shuffleMovie ? (
                    <h2 className={styles.rating}>{shuffleMovie.Metascore}</h2>
                  ) : (
                    <div className={styles.skeletonRating} />
                  )}
                </div>
              </div>
              <div className={styles.description}>
                {shuffleMovie ? (
                  <h2 className={styles.subtitleDescription}>
                    {shuffleMovie.Plot}
                  </h2>
                ) : (
                  <div className={styles.skeletonDescription} />
                )}
              </div>
              <div className={styles.trailerContainer}>
                {shuffleMovie ? (
                  <iframe
                    style={{ borderRadius: 6 }}
                    width="560"
                    height="315"
                    className={styles.iframe}
                    src={`https://youtube.com/embed/${trailer}`}
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
