import Image from 'next/image'
import React from 'react'
import styles from './AudioQuizCard.module.scss'

interface AudioQuizCardProps {
    answer: string
    possibleAnswers: string[]
    audioURL: string
    id: number,
    addComplete?: any,
    showAnswer?: boolean
}

export const AudioQuizCard: React.FC<AudioQuizCardProps> = (
    {   answer, 
        possibleAnswers=[], 
        audioURL, 
        id,
        addComplete,
        showAnswer = false
    }) => {
    const [value, setValue] = React.useState<string>('')
    const [isSuccess, setIsSuccess] = React.useState<boolean>(false)
    const [audioPlayer, setAudioPlayer] = React.useState(null)
    const [isPlay, setIsPlay] = React.useState<boolean>(false)
    const [volume, setVolume] = React.useState<any>(0.5)


    React.useEffect(()=>{
        setIsSuccess(false)
        if ( value.toLocaleLowerCase() === answer.toLocaleLowerCase() || (value.length && possibleAnswers.indexOf(value.toLocaleLowerCase())!==-1 )) {
            addComplete && !isSuccess && addComplete(prev => prev + 1)
            setIsSuccess(true)
        }
    }, [value, answer, possibleAnswers, addComplete, showAnswer])

    React.useEffect(()=>{
        if (audioPlayer){
            audioPlayer.pause()
            setIsPlay(false)
        }
        setAudioPlayer(new Audio(audioURL))
    }, [audioURL])

    React.useEffect(()=>{
        audioPlayer&&audioPlayer.preload
    }, [audioPlayer])

    React.useEffect(()=>{
         audioPlayer && (audioPlayer.onended = () =>(setIsPlay(false)) )
    },[audioPlayer])

    React.useEffect(()=>{
        audioPlayer && (audioPlayer.volume = volume)
    },[volume, audioPlayer])
    
    const handleStop = () => {
        audioPlayer.pause()
        audioPlayer.currentTime = 0
    }
    const handlePlay = () => {
        try{
            if (!audioURL.length){
                throw "Аудиофайл не найден"
            }
            setIsPlay(!isPlay)
            isPlay ? handleStop() : audioPlayer.play()
        }
        catch(err){
            alert(err)
        }
    }

    return (
        <div 
            className={`d-flex  
            ${styles.card} ${isSuccess ? `${styles.success}` : ''} 
            ${(showAnswer && !isSuccess) ? styles.failed: '' } `}
        >
            <div className={`d-flex align-items-center ${styles.indexBox}`}>
                <span className="m-auto">{id + 1}</span>
            </div>
            <div className={`px-1 d-flex align-items-center ${styles.playBox}`}>
                <div className="d-flex flex-column ">
                <button 
                    className={`justify-content-center d-flex ${styles.mediaButton}`}   
                    onClick={()=>handlePlay()} 
                >   
                    <Image 
                        className={`${styles.audioControl}`}
                        width={60} 
                        height={60} 
                        src={isPlay ? '/static/pause.svg'  : '/static/play.svg' } 
                        alt="Play"
                    />
                </button>
                <div className={styles.range}>
                    <input value={volume}  min={0} max={1} step={0.1} onChange={(e)=> setVolume(e.target.value)}  className={``} type="range" />
                </div>
                
                </div>
            </div>
            <div className="w-100">
                <input 
                    className={`${styles.inputBox}`} 
                    value={isSuccess || showAnswer? answer : value }  type="text" 
                    placeholder="Ваш ответ"
                    disabled={isSuccess && value.length > 0 || showAnswer}
                    onChange={((e)=>setValue(e.target.value))}
                />
            </div>
        </div>
    )
}
