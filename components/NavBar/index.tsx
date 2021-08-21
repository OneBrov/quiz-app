import React from 'react'
import styles from './NavBar.module.scss'
import { useRouter } from 'next/dist/client/router'

export const NavBar:React.FC = () => {
    const router = useRouter()

    return (
        <div className={`d-flex  justify-content-between ${styles.nav}`}>
            <div className="d-flex ms-5 align-items-center">
                <h2 
                    onClick={()=> router.push(process.env.SOUND_URL)} 
                    className={process.env.SOUND_URL === router.asPath ? styles.stroke : ''}
                >
                    АудиоКвиз
                </h2>
            </div>
            <div className="d-flex me-5 align-items-center">
                <h1 >
                    Quizelny
                </h1>
            </div>
        </div>
    )
}
