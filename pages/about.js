import styles from '../styles/about/about.module.css'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'

export default function About() {
  return (
    <>
      <Head>
        <title>About | ValueHunt</title>
      </Head>

      <div className={styles.container}>
        <div className={styles.about}>
          <h2>About Us</h2>
          <p className={styles.para}>
            ValueHunt was founded by three friends - Abhishek Kumar, Ayush Kothiyal, and Ambrish Kumar - who shared a passion for leveraging technology to make online shopping more efficient and affordable.After experiencing the frustration of spending hours searching for the best deals on clothes online, the trio realized that there was a need for a platform that could simplify the process and provide users with accurate information about prices and availability.We decided to combine our expertise in artificial intelligence, data analytics, and e-commerce to create ValueHunt.
          </p>
        </div>
      </div>
    </>
  )
}
