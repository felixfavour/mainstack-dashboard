"use client"
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import styles from './styles/page.module.css'


export default function Home() {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => router.push('/revenue'), 50)
  }, [])

  return (
    <section className={styles.main}>
      <div className={styles.description}>
      </div>
    </section>
  )
}
