import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import Image from 'next/image'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useTypedSelector } from '../../components/hooks/useTypedSelector'
import { MainLayout } from '../../components/layouts/MainLayout'
import { QuizCard } from '../../components/QuizCard'
import { NextThunkDispatch, wrapper } from '../../store'
import { fetchQuizzes } from '../../store/actions-creators/audioQuizList'
import InfiniteScroll from 'react-infinite-scroller';
import React from 'react'
import styles from './Sound.module.scss'
import axios from 'axios'

export default function Sound() {
  
  const router = useRouter()
  const {audioQuizzes, error} = useTypedSelector(state => state.audioQuizList)
  const [infiniteScrollData, setInfiniteScrollData] = React.useState([...audioQuizzes])
  const [offset, setOffset] = React.useState<number>(10)
  const [hasMore, setHasMore] = React.useState<boolean>(true)
  if (error) {
    return <MainLayout>
      <h1>Error: {error}</h1>
    </MainLayout>
  }
  const handleLoadMore = async () => {
    try {
      const {data} = await axios.get(process.env.AUDIO_QUIZ_URL + `?offset=${offset}`)
      console.log(data)
      if (data.length === 0) {
        setHasMore(false)
      } else{ 
        setInfiniteScrollData(prev => [...prev, ...data])
      }
    } catch (err) {
      console.log(err)
      setHasMore(false)
    }
    
    setOffset(prev => prev + 10)
  }
  return (
    <MainLayout title="Quizelny — список АудиоКвизов" >
      <Container  fluid={true} className="mt-3">
        <Head>
          <title>Quizelny — АудиоКвизы</title>
        </Head>
        <Row>
            <Col xs={6} className="d-flex align-items-center">
            <h1 className="text-center d-inline col-9 ">Список АудиоКвизов </h1>
            </Col>
            <Col xs={6} className="d-flex">
              <Button 
                onClick={()=> router.push(process.env.SOUND_URL + '/create')}  
                className={`ms-auto ${styles.createButton}`} 
                variant="primary"
              >
                <div 
                  className="d-flex justify-content-center"
                >
                  <span className="me-2"> Создать свой квиз </span>
                  <Image className="d-block" width={30 } height={30} src="/static/add.svg" alt="" />
                </div>
              </Button>
            </Col>
            <Container fluid={true} className="mt-4 ">
              <InfiniteScroll
                loadMore={handleLoadMore}
                loader={<div className="loader" key={0}>Loading ...</div>}
                hasMore={hasMore}
              >
                <Row  className="max-width-100 justify-content-center">
                  {infiniteScrollData.map(quiz => 
                    <Col className="mx-1 " sm={6} md={4}  lg={4} xl={4} xxl={"auto"} key={quiz._id}>
                      <QuizCard 
                        onClick={()=> router.push(process.env.SOUND_URL + '/' + quiz._id)}
                        className="mb-3 cur-p"
                        title={quiz.name} 
                        tags={quiz.tags} 
                        viewCount={quiz.playCount}
                        size={quiz.content.length}
                        imgURL={process.env.SERVER_URL + quiz.imgURL}
                      />
                    </Col>
                  )}
                </Row>
              </InfiniteScroll>
              
            </Container>
        </Row>
      </Container>
    </MainLayout>
    
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  store => async () =>
  {
      const dispatch = store.dispatch as NextThunkDispatch;
      await dispatch(fetchQuizzes());

      return { props: {} }
  }
);

