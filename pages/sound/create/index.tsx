import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { AudioInput } from '../../../components/AudioInput'
import { BackgroundBlock } from '../../../components/BackgroundBlock'
import { useActions } from '../../../components/hooks/useActions'
import { useTypedSelector } from '../../../components/hooks/useTypedSelector'
import { InputWithTitle } from '../../../components/InputWithTitle'
import { QuizCard } from '../../../components/QuizCard'
import { setSecondaryAnswers } from '../../../store/actions-creators/audioQuiz'

import styles from './Create.module.scss'



export default function CreateAudio() {
    const {name, tags, imgURL, content} = useTypedSelector(state => state.audioQuiz)
    const {setName, setTags, setImg, addContent, removeContent} = useActions()
    
    const [contentCount, setContentCount] = React.useState<number>(0)
    const handleAddContent = () => {
        setContentCount(contentCount + 1)
        addContent(contentCount)
    }
    const handleRemoveContent = (id) => {
        setContentCount(contentCount - 1)
        removeContent(id)
    }
    // const [name, setName] = React.useState<string>('')
    // const [tags, setTags] = React.useState<string>('')
    // const [img, setImg]   = React.useState<string>('')
    // const [content, setContent] = 
    //     React.useState<AudioQuizContent[]>([{id:1, answer:'', secondary:[], audioURL:""}])
  return (
    <Container className="mt-3">
        <Row >
            <Col md={6}>
            <h1 className="text-center mb-3">
                Создание АудиоКвиза
            </h1>
                <BackgroundBlock className="mb-3 d-flex flex-column mx-auto " width="400px">
                    <InputWithTitle 
                        className="mb-3"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        title='Название квиза'
                        description='Это название будет отображаться другим пользователям'
                        placeholder="Пример: Игра по Осту"
                   />
                    <InputWithTitle 
                        className="mb-3"
                        value={tags}
                        onChange={(e)=>setTags(e.target.value.split(','))}
                        title='Теги квиза'
                        description='Теги нужны для того, чтобы ваш квиз было легче найти. 
                        Перечисляйте теги через запятую'
                        placeholder="Пример: 00s pc nintendo  "
                   />
                    <InputWithTitle 
                        value=''
                        onChange={(e)=>setImg(URL.createObjectURL(e.target.files[0]))}
                        title='Изображение квиза'
                        description='Это изображение будет на заднем фоне вашего квиза. Подсказка: Используйте изображение какой-нибудь игры'
                        type="file"
                   />
                </BackgroundBlock>
            </Col>
            <Col md={6} className="d-flex flex-column  justify-content-center mb-3">
                <h2 className="text-center mb-2">Предпросмотр обложки</h2>
                <div className="d-flex flex-column">
                    <QuizCard 
                        // imgURL={URL.createObjectURL(e.target.files[0])}
                        imgURL={imgURL}
                        className="m-auto"
                        size={contentCount} 
                        title={name}
                        viewCount={2000} 
                        tags={tags}
                    />
                </div>
            </Col>
        </Row>
        <h2 className="my-4">Добавление контента для вашего квиза</h2>
        <BackgroundBlock className="mx-auto mb-3" width={"1000px"}>
            <h2 className="d-flex justify-content-end">Общее количество: {contentCount}</h2>
            {content.map(cont =>
                <AudioInput 
                    key={cont.id}
                    id={cont.id}
                    answer={cont.answer}
                    secondaryAnswers={cont.secondaryAnswers}
                    audioURL={cont.audioURL}
                    onRemove={handleRemoveContent}

                />
            )}
            <div className="d-flex mx-auto justify-content-center">
                <Image 
                    onClick={handleAddContent}
                    className="animatedButton"  
                    width={70} 
                    height={70} 
                    src="/static/create.svg" 
                    alt="Add"
                />
            </div>
               
      
        </BackgroundBlock>
    </Container>
    
  )
}
