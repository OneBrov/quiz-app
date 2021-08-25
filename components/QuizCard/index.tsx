import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'
import styles from './QuizCard.module.scss'

interface QuizCardProps {
    imgURL?: string
    title: string
    viewCount: number
    size: number
    tags: string[]
    className?: string,
    onClick?
}

export const QuizCard:React.FC<QuizCardProps> = (
    {imgURL, title, viewCount, size, tags, className, onClick}) => {
    return (
        <div className={clsx(styles.card, className) }
            onClick={onClick}
        >
            <div 
                className={`${styles.myImg} d-flex flex-column h-100 justify-content-between`}
                style={{backgroundImage: `url(${imgURL})`,}}
            >
                <div className={styles.titleBlock}>
                    {title}
                </div>
                <div className="d-flex flex-column">
                    <div className="ms-auto d-flex">
                        <div className={`d-flex justify-content-center ${styles.countBlock}`}>
                            <Image  width={32} height={32} src='/static/size.svg' alt='' />
                            <span className="ms-2">{size}</span>
                        </div>
                        <div className={`d-flex justify-content-center ${styles.countBlock}`}>
                            <Image width={32} height={32} src='/static/viewCount.svg' alt='' />
                            <span className="ms-2">{viewCount}</span>
                        </div>
                    </div>
                    <div className={`p-2 ${styles.tagsBlock}`}>
                        Теги: {tags.join(' ')}
                    </div>
                </div>
            </div>
        </div>
    )
}
