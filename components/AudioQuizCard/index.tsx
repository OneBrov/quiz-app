import Image from 'next/image'
import React from 'react'
import styles from './AudioQuizCard.module.scss'

interface AudioQuizCardProps {
    answer: string
    possibleAnswers: string[]
    audioURL: string
    id: number

}

export const AudioQuizCard = (
    {   answer, 
        possibleAnswers=[], 
        audioURL, 
        id
    }) => {
    const [value, setValue] = React.useState<string>('')
    const [isSuccess, setIsSuccess] = React.useState<boolean>(false)
    const [audioPlayer, setAudioPlayer] = React.useState(null)
    const [isPlay, setIsPlay] = React.useState<boolean>(false)

    React.useEffect(()=>{
        setIsSuccess(false)
        if (value.toLocaleLowerCase() === answer.toLocaleLowerCase() || (value.length && possibleAnswers.indexOf(value.toLocaleLowerCase())!==-1 )) {
            setIsSuccess(true)
        }
    }, [value, answer, possibleAnswers])

    React.useEffect(()=>{
        setAudioPlayer(new Audio(audioURL)) 
    }, [audioURL])

    React.useEffect(()=>{
         audioPlayer && (audioPlayer.onended = () =>(setIsPlay(false)) )
    },[audioPlayer])


    const handlePlay = () => {
        try{
            if (!audioURL.length){
                throw "Вы не добавили аудио файл"
            }
            setIsPlay(!isPlay)
            isPlay ? audioPlayer.pause() : audioPlayer.play()
        }
        catch(err){
            alert(err)
        }
    }

    return (
        <div className={`d-flex  ${styles.card} ${isSuccess ? `${styles.success}` : ''}  `}>
     
            <div className={`d-flex align-items-center ${styles.indexBox}`}>
                <span className="m-auto">{id + 1}</span>
            </div>
            <div className={`mx-1 d-flex align-items-center ${styles.playBox}`}>
                <button 
                    className={styles.mediaButton}   
                    onClick={()=>handlePlay()} 
                >
                    <Image 
                        className={styles.audioControl}
                        width={70} 
                        height={70} 
                        src={isPlay ? '/static/pause.svg'  : '/static/play.svg' } 
                        alt="Play"
                    />
                </button>
            </div>
            <div className="w-100">
                <input 
                    className={`${styles.inputBox}`} 
                    value={isSuccess? answer : value }  type="text" 
                    placeholder="Ваш ответ"
                    disabled={isSuccess}
                    onChange={((e)=>setValue(e.target.value))}
                />
            </div>
        </div>
    )
}
