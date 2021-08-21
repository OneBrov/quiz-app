import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import Image from 'next/image'
import { Button, Col, Container, Row } from 'react-bootstrap'

import styles from './Sound.module.scss'

export default function Sound() {
  const router = useRouter()
  return (
    <Container className="mt-3">
      <Head>
        <title>Quizelny — АудиоКвизы</title>
      </Head>
      <Row>
          <Col xs={6} className="d-flex align-items-center">
          <h1 className="text-center d-inline col-9 ">Список квизов </h1>
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
                <Image className="d-block" width={30 } height={30} src="/static/create.svg" alt="" />
              </div>
            </Button>
          </Col>
      </Row>
    </Container>
    
  )
}
