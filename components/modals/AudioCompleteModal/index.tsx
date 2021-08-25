import { useRouter } from 'next/dist/client/router'
import React from 'react'
import { Button, Modal } from 'react-bootstrap'

interface AudioCompleteModalProps {
    completeCount: number,
    size: number,
    show: boolean,
    onHide: () => void
}

export const AudioCompleteModal:React.FC<AudioCompleteModalProps> = 
({completeCount, size, show, onHide}) => {
    const router = useRouter()
    
    const returningMessage = (size, completeCount) =>{
        if(completeCount === 0 ){
          return `Вы ничего не отгадали! В следующий раз постарайтесь получше!!! `
        } else if (completeCount===size) {
          return `Вы набрали максимальный результат! Так держать!` 
        } else {
          return `Вы набрали ${Math.round(100/size*completeCount)}%!`
        }
      }
      console.log(size, completeCount)
    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={onHide}
        >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Поздравляем! Квиз пройден
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 className="text-center">Ваш результат</h4>
          <p className="text-center">
            {returningMessage(size, completeCount)}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={()=>router.push(process.env.SOUND_URL)}>Перейти к остальным квизам</Button>
        </Modal.Footer>
      </Modal>
    )
}
