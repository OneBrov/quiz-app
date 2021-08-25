import axios from 'axios'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { AudioQuizCard } from '../../components/AudioQuizCard'
import { MainLayout } from '../../components/layouts/MainLayout'
import { audioQuizState } from '../../types/audioQuiz'

import styles from '../../styles/AudioQuizPage.module.scss'
import { AudioCompleteModal } from '../../components/modals/AudioCompleteModal'

 const AudioQuizPage = ({quiz}) => {
    const router = useRouter()
    const [audioQuiz, setAudioQuiz] = React.useState<audioQuizState>(quiz)
    const [completed, setCompleted] = React.useState<number>(0)
    const [showModal, setShowModal] = React.useState<boolean>(false)
    const [showRightAnswers, setShowRightAnswers] = React.useState<boolean>(false)

    return (
        <MainLayout title={`Quizelny — ${quiz.name}`}>
            <AudioCompleteModal 
               show={showModal} 
               completeCount={completed}
               size={quiz.content.length}
               onHide={() => setShowModal(false)}
            />
            <div className="d-flex mb-5 mt-3 justify-content-center">
                <h1 className={`text-center ${styles.title}`}>{audioQuiz.name}</h1>
                <div className={`p-2 d-flex flex-column  ${styles.score}`}> 
                    <h2 className="text-center">Score</h2>
                    <p className="text-center">{completed}/{quiz.content.length}</p>
                </div>
            </div>
            <Container fluid="lg">
                
                <Row >
                    {audioQuiz.content.map((val, ind) => 
                        <Col key={val._id} className="p-4" md={6} xxl={4}>
                            <AudioQuizCard
                                addComplete={setCompleted}
                                answer={val.answer} 
                                possibleAnswers={val.secondaryAnswers} 
                                audioURL={process.env.SERVER_URL + val.audioURL} 
                                id={ind} 
                                showAnswer={showRightAnswers}
                            />
                        </Col>
                    )}
                </Row>
                <div className="d-flex justify-content-center m-4">
                    <Button disabled={showRightAnswers} onClick={()=>{
                        setShowModal(true)
                        setShowRightAnswers(true)
                    } }  className={styles.completeButton} variant="primary" size="lg">Завершить квиз</Button>
                </div>
            </Container>
        </MainLayout>
    )
}

export default AudioQuizPage

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const response = await axios.get(process.env.AUDIO_QUIZ_URL + '/' + params.id)
    return {
        props: {
            quiz: response.data
        }
    }
}