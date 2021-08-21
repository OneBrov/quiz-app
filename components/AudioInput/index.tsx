import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'
import { Row } from 'react-bootstrap'
import { AudioQuizCard } from '../AudioQuizCard'
import { useActions } from '../hooks/useActions'
import { InputWithTitle } from '../InputWithTitle'

import styles from './AudioInput.module.scss'

// interface AudioInputProps {
//     answer: string
//     setAnswer: (e:React.ChangeEvent<HTMLInputElement>) => void
//     audio: string
//     setAudio: (e:React.ChangeEvent<HTMLInputElement>) => void
//     secondary: string[]
//     setSecondary: (e:React.ChangeEvent<HTMLInputElement>) => void
// }

export const AudioInput = ({
     id,
     answer, 
     secondaryAnswers, 
     audioURL,
     onRemove
    
}) => {
    const {setAnswer, setSecondaryAnswers, setAudio} = useActions() 
    //  const [answer, setAnswer] = React.useState('')
    //  const [audio, setAudio] = React.useState('')
    //  const [secondary, setSecondary] = React.useState<string[]>([])

    const handleAudioAdd = (e) => {
        const url = URL.createObjectURL(e.target.files[0])
        setAudio({id:id, value:url})
    }

    

    return (
        <> 
            <div className={clsx("d-flex", "fs-5", styles.h2Lower)} >
                <h3 className="m-auto pe-3">{id + 1}</h3>
                <div className="w-100">
                    <InputWithTitle 
                        className="w-100 mb-3"
                        value={answer}
                        title="Введите правильный ответ "
                        placeholder="Пример: Grand Theft Auto IV"
                        onChange={(e)=>setAnswer({id: id, value: e.target.value})}
                    />
                    <InputWithTitle 
                        className="w-100 mb-3"
                        value={secondaryAnswers}
                        title="Введите допольные правильные ответы через запятую"
                        placeholder="Пример: Grand Theft Auto, GTA "
                        onChange={(e)=>setSecondaryAnswers({id:id, value: e.target.value.split(',')})}
                    />
                     <InputWithTitle 

                        className="w-100 mb-3"
                        title="Аудиофайл"
                        type="file"
                        onChange={handleAudioAdd}
                    />
                </div>
                <div className="d-flex flex-column">
                    <div className="ms-auto mb-5">
                        <Image 
                            onClick={()=>onRemove(id)}
                            className="animatedButton" 
                            src="/static/delete.svg" 
                            width={50} 
                            height={50} 
                            alt="Delete"
                        />
                    </div>
                    <div>
                        <h2 className="text-center">Предпросмотр аудиоквиза</h2>
                        <AudioQuizCard answer={answer} possibleAnswers={secondaryAnswers.map(val=>val.trim().toLowerCase())} audioURL={audioURL} id={id} />
                    </div>

                </div>
                
            </div>
            <hr />

                
           
        </>
    )
}
