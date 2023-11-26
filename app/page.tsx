import MainstackLogo from './components/Icons/Logo'
import styles from './styles/page.module.css'


export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <MainstackLogo />
      </div>
    </main>
  )
}
