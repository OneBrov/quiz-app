
import React from 'react'

import Image from 'next/image'
import styles from './Footer.module.scss'
import Link from 'next/link'

export const Footer:React.FC = () => {
    return (
        <div className={`mt-auto d-flex  justify-content-between ${styles.nav}`}>
            <div className="d-flex ms-5 align-items-center">
                <h2  className={styles.stroke}>
                </h2> 
            </div>
            <div className={`d-flex me-5 align-items-center ${styles.mainFont}`}>
                <div className="d-flex flex-column me-5">
                    <p className="mb-2"> Социальные сети </p>
                    <div className="d-flex justify-content-between px-5">
                        <Link href="https://vk.com/danilevdokimov">
                            <a>
                                <Image className={styles.footLink} width={32} height={32} src="/static/vk.svg" alt="vk" />
                            </a>
                        </Link>
                        <Link href="https://github.com/OneBrov/quiz-app">
                            <a>
                                <Image className={styles.footLink}  width={32} height={32} src="/static/github.svg" alt="github" />
                            </a>
                        </Link>
      
                       
                    </div>
                </div>
                <div className='d-flex flex-column'>
                    <p className="mb-2">Связаться с автором</p>
                    <p className="m-0 text-center">uueuuuu@yandex.ru</p>
                </div>
            </div>
        </div>
    )
}
