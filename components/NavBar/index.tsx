import React from 'react'
import styles from './NavBar.module.scss'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'

export const NavBar:React.FC = () => {
    return (
        <div className={`d-flex  justify-content-between ${styles.nav}`}>
            <div className="d-flex ms-5 align-items-center">
                <Link href={process.env.SOUND_URL}>
                    <a>
                        <h2 
                            className={styles.navLink}
                        >
                            АудиоКвиз
                        </h2>
                    </a>
                </Link>
            </div>
            <div className="d-flex me-5 align-items-center">
            <Link href={process.env.HOME_URL}>
                <a>
                    <h1 className={styles.navLink}>
                        Quizelny
                    </h1>
                </a>
                </Link>
            </div>
        </div>
    )
}
