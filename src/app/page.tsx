'use client'

import { Header } from '@/components/Header'
import styles from './page.module.css'
import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'

import netflixSVG from '../assets/netflix.svg'

interface User {
  image: string
  title: string
  director: string
  rating: string
  description: string
  trailer: string
}

export default function Home() {
  const [data, setData] = useState<User>()
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber())

  const options = {
    method: 'GET',
    url: `https://imdb-top-100-movies.p.rapidapi.com/top${randomNumber}`,
    headers: {
      'X-RapidAPI-Key': 'b5b64085famshd1a45bf01935c88p1c06cbjsn6458edcf15a2',
      'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com',
    },
  }

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1
  }

  function handleButtonClick() {
    setRandomNumber(generateRandomNumber())
    console.log(randomNumber, data)
    fetchData()
  }

  async function fetchData() {
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data)
        setData(response.data)
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.leftCol}>
            {data ? (
              <Image
                className={styles.banner}
                src={data.image}
                alt={'Image of movie'}
                width={380}
                height={562}
              />
            ) : (
              <p>Carregando...</p>
            )}

            <button
              className={styles.shuffleButton}
              onClick={handleButtonClick}
            >
              SHUFFLE
            </button>
          </div>
          <div className={styles.rightCol}>
            <div className={styles.headerContent}>
              <div className={styles.titleContent}>
                {data ? (
                  <h2 className={styles.title}>{data.title}</h2>
                ) : (
                  <p>Carregando...</p>
                )}
                {data ? (
                  <p className={styles.subtitle}>{data.director}</p>
                ) : (
                  <p>Carregando...</p>
                )}
              </div>
              <div className={styles.titleContent}>
                {data ? (
                  <h2 className={styles.rating}>{data.rating}</h2>
                ) : (
                  <p>Carregando...</p>
                )}
              </div>
            </div>
            <div className={styles.description}>
              {data ? (
                <h2 className={styles.subtitle}>{data.description}</h2>
              ) : (
                <p>Carregando...</p>
              )}
            </div>
            <div className={styles.trailerContainer}>
              {data ? (
                <iframe
                  style={{ borderRadius: 6 }}
                  width="560"
                  height="315"
                  src={data.trailer}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <p>Carregando...</p>
              )}
              <div className={styles.buttonContainer}>
                <button className={styles.buttonStream}>
                  <Image src={netflixSVG} alt="Netflix Logo" width={64} />
                </button>
                <button className={styles.buttonStream}>Prime</button>
                <button className={styles.buttonStream}>HBO Max</button>
                <button className={styles.buttonStream}>Hulu</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
