import Head from 'next/head'
import React from 'react'
import { Row } from 'react-bootstrap'
import { Footer } from '../../Footer'
import { NavBar } from '../../NavBar'
import styles from './MainLayout.module.scss'

interface MainLayoutProps {
    title?: string
    description?: string
    keywords?: string
}   

export const MainLayout:React.FC<MainLayoutProps> = (
    {
        children, 
        title = "Quizelny", 
        description = ''},
        keywords

    ) => {
    return (
        <> 
            <Head>
                <title>{title}</title>
                <meta name='description' content={'Quizelny. Здесь можно проходить уже готовые викторины или создать собственную.' + description}/>
                <meta name="robots" content="index, follow" />
                <meta name="keywords" content={keywords || "Квизы, викторины, аудиоквизы, аудиовикторины, квизельный"} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Row className={`m-0 d-flex flex-column ${styles.min100}`} >
                <NavBar />
                <main className={`bgLight  ${styles.flex1}`}>
                    {children}
                </main>
                <Footer />
            </Row>
        </>
    )
}
