'use client'

import { useState } from 'react'
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
  // STATE SHUFFLE

  const [randomMovie, setRandomMovie] = useState<RandomMovieProps>()
  const [trailer, setTrailer] = useState<string>()
  const [shuffleMovie, setShuffleMovie] = useState<ShuffleProps>()

  const optionsTrailer = {
    method: 'GET',
    url: 'https://movies-tv-shows-database.p.rapidapi.com/',
    params: { movieid: shuffleMovie?.imdbID },
    headers: {
      Type: 'get-movie-details',
      'X-RapidAPI-Key': 'b5b64085famshd1a45bf01935c88p1c06cbjsn6458edcf15a2',
      'X-RapidAPI-Host': 'movies-tv-shows-database.p.rapidapi.com',
    },
  }

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
    await axios // https://www.omdbapi.com/?i=tt3896198&apikey=2b3d0c1c
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
        requestTrailer()
      })
  }

  function requestTrailer() {
    axios
      .request(optionsTrailer)
      .then(function (response) {
        console.log(response.data)
        setTrailer(response.data.youtube_trailer_key)
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  async function handleButtonClick() {
    await getRandomMovie()
    await requestApiShuffle()
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
