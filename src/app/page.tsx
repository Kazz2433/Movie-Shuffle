'use client'
import styles from './page.module.css'
import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'

interface User {
  image: string
  title: string
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
    <main className={styles.bg}>
      {data ? (
        <Image
          src={data.image}
          alt={'Image of movie'}
          width={380}
          height={562}
        />
      ) : (
        <p>Carregando...</p>
      )}
      {data ? <h2>{data.title}</h2> : <p>Carregando...</p>}
      <button onClick={handleButtonClick}>Buscar</button>
    </main>
  )
}
