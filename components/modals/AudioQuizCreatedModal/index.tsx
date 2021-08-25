import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React from 'react'
import { Button, Modal } from 'react-bootstrap'

interface ModalProps {
    show: boolean
    onHide
    successURL: string
}

export const AudioQuizCreatedModal:React.FC<ModalProps> = ({show, onHide, successURL}) => {
    const router = useRouter()
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
                Поздравляем! Квиз создан!
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <h4 className="text-center">Вы можете найти свой квиз по адресу</h4>
            <p className="text-center">
                <Link href={successURL}>
                    <a><span className="link">Перейти к созданному квизу</span></a>
                </Link>
            </p>
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={()=>router.push(process.env.SOUND_URL)}>Перейти к списку квизов</Button>
            </Modal.Footer>
      </Modal>
    )
}
