import { useRouter } from 'next/router'
import { useEffect } from 'react'
import styles from './styles/page.module.css'


export default function Home() {
  const router = useRouter()
  useEffect(() => {
    router.push('/revenue')
  }, [])
  return (
    <section className={styles.main}>
      <div className={styles.description}>
      </div>
    </section>
  )
}
