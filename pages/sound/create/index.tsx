import axios from 'axios'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { AudioInput } from '../../../components/AudioInput'
import { BackgroundBlock } from '../../../components/BackgroundBlock'
import { useActions } from '../../../components/hooks/useActions'
import { useContentValidation } from '../../../components/hooks/useContentValidation'
import { useFieldValidation } from '../../../components/hooks/useFieldValidation'
import { useFileValidation } from '../../../components/hooks/useFileValidation'
import { useTypedSelector } from '../../../components/hooks/useTypedSelector'
import { InputWithTitle } from '../../../components/InputWithTitle'
import { MainLayout } from '../../../components/layouts/MainLayout'
import { AudioQuizCreatedModal } from '../../../components/modals/AudioQuizCreatedModal'
import { QuizCard } from '../../../components/QuizCard'
import { setSecondaryAnswers } from '../../../store/actions-creators/audioQuiz'

import styles from './Create.module.scss'



export default function CreateAudio() {
    const router = useRouter()
    const {name, tags, imgURL, content, imgFile} = useTypedSelector(state => state.audioQuiz)
    const { setName, 
            setTags, 
            setImg, 
            addContent, 
            removeContent, 
            setImgFile
        } = useActions()
    
    const [contentCount, setContentCount] = React.useState<number>(0)
    const [quizURL, setQuizURL] = React.useState<string>('')
    const [quizIsCreated, setQuizIsCreated] = React.useState<boolean>(false)
    const addButtonRef = React.useRef(null)
    const paramsValidated = [
        useFieldValidation({field: name}), 
        useFileValidation({file: imgFile, type: 'image'}),
        ...useContentValidation(content)
    ]

    console.log(paramsValidated)
    const handleAddContent = () => {
        setContentCount(contentCount + 1)
        addContent(contentCount)
        setTimeout(()=> addButtonRef.current.scrollIntoView({block: "end", inline: "nearest", behavior: "smooth"}), 0)
    }

    const handleRemoveContent = (id) => {
        setContentCount(contentCount - 1)
        removeContent(id)
    }
    const handleSetImage = (e) => {
        if (e.target.files.length > 0) {
            setImgFile(e.target.files[0])
            setImg(URL.createObjectURL(e.target.files[0]))
        }
    }

    const handleUploadQuiz = async () => {
        if (paramsValidated.map(val=> val.isValid).indexOf(false) >= 0 ) {
            alert(paramsValidated.map(val => !val.isValid ? ('\n' + val.message) : '' ))
            return
        } 
        try {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('tags', JSON.stringify(tags))
            formData.append('image', imgFile)
            const {data} = await axios.post(process.env.AUDIO_QUIZ_URL, formData);
            const {_id} = data
            setQuizURL(process.env.SOUND_URL + '/' + _id)
            const promises = []
            for (let value of content) {
                const contentData = new FormData()
                contentData.append('answer', value.answer)
                contentData.append('secondaryAnswers', JSON.stringify(value.secondaryAnswers.map(val=>val.trim())))
                contentData.append('audio', value.audioFile)
                contentData.append('audioQuizId', _id)
                const request =  axios.post(process.env.AUDIO_QUIZ_URL + '/content', contentData);
                promises.push(request)
            }
            Promise.all(promises).then(value => {
                console.log(value);
                setQuizIsCreated(true)
              }, reason => {
                console.log(reason)
                alert(reason)
              });
        } catch(err) {
            alert('При создании квиза произошла ошибка!!!' + err)
        }
       
    }

    
  return (
    <MainLayout  title={`Quizelny — создание квиза`}>
        <AudioQuizCreatedModal 
            show={quizIsCreated}
            onHide={()=> router.push(process.env.SOUND_URL)}
            successURL={quizURL}
        />
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
                            onChange={(e)=>setTags(e.target.value.split(',').map(val=>val.trim().toLowerCase()))}
                            title='Теги квиза'
                            description='Теги нужны для того, чтобы ваш квиз было легче найти. 
                            Перечисляйте теги через запятую'
                            placeholder="Пример: 00s pc nintendo  "
                        />
                        <InputWithTitle 
                            onChange={ (e) => handleSetImage(e) }
                            title='Изображение квиза'
                            fileType="image/*"
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
            <BackgroundBlock className="mx-auto mb-5" width={"1000px"}>
                <h2 className="d-flex justify-content-end">Общее количество: {contentCount}</h2>
                {content.map(cont =>
                    <AudioInput 
                        key={cont.id}
                        id={cont.id}
                        className={`${styles.contentEntered} ${styles.contentAppear}`}
                        answer={cont.answer}
                        secondaryAnswers={cont.secondaryAnswers}
                        audioURL={cont.audioURL}
                        onRemove={handleRemoveContent}
                    />
                )}
                <div 
                    ref={addButtonRef}
                    className="d-flex mx-auto justify-content-center"
                >
                    <Image 

                        onClick={handleAddContent}
                        className="animatedButton"  
                        width={70} 
                        height={70} 
                        src="/static/create.svg" 
                        alt="Add"
                    />
                </div>
                <div className="">

                    <Button  
                        onClick={handleUploadQuiz}
                        size="lg" 
                        className="d-flex ms-auto p-2"
                    >
                        Загрузть квиз на сервер
                    </Button>
                   
                </div>
            </BackgroundBlock>
        </Container>
    </MainLayout>
  )
}
