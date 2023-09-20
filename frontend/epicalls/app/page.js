import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <main className={styles.main}>
     <p>EPI calls login</p>
     <Link href='/prueba'>
     <button>Ir a prueba</button>
     </Link>
    </main>
  )
}
