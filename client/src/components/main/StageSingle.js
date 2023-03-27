import axios from 'axios'
import { React, useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Col, Card, Button } from 'react-bootstrap'
import ModalVideo from 'react-modal-video'

// Custom Components
import Error from '../common/Error'
import Spinner from '../common/Spinner'
import { isAuthenticated } from '../helpers/auth'


const StageSingle = () => {
  
  // ! Variables
  const { stageId } = useParams()
  const navigate = useNavigate()
  
  // ! State
  const [stage, setStage] = useState([])
  const [artists, setArtists] = useState([])
  const [stageError, setStageError] = useState('')
  const [artistsError, setArtistsError] = useState('')
  const [isOpen, setOpen] = useState(false)

  // ! On Mount
  useEffect(() => {

    !isAuthenticated() && navigate('/')

    const getStage = async () => {
      try {
        const { data } = await axios.get(`/api/stages/${stageId}`)
        setStage(data)
      } catch (err) {
        console.log(err)
        setStageError(err.message)
      }
    }

    const getArtists = async () => {
      try {
        const { data } = await axios.get('/api/artists')
        console.log('data -> ', data)
        setArtists(data)
      } catch (err) {
        console.log(err)
        setArtistsError(err.message)
      }
    }
    getStage()
    getArtists()
  }, [stageId])

  return (
    <>
      <main>
        {stage.name ? 
          <h1>{stage.name}</h1>
          :
          <>
            {stageError ?
              <Error error={stageError} />
              :
              <h1>...</h1>}
          </>
        }
        <div className='artists-container'>
          {artists.length > 0 ?
            artists.map(artist => {
              const { _id, name, url, stage, image } = artist
              if (stageId === stage) {
                return (
                  <Col key={_id} lg="4" md="6" sm="12" className='artists'>
                    <Card style={{ backgroundImage: `url('${image}')` }}>
                      <Card.Body>
                        <Card.Text>{name}</Card.Text>

                        <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={url.split('=').splice(1)} onClose={() => setOpen(false)} />
                        <button className="btn-primary" onClick={()=> setOpen(true)}>VIEW DEMO</button>

                        {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/btocybienAY" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
                      </Card.Body>
                    </Card>
                  </Col>
                )
              }
            })
            :
            <>
              {artistsError ?
                <Error error={artistsError} />
                :
                <Spinner />}
            </>
          }
        </div>
        {/* Add comments section here */}
      </main>

    </>
  )

}

export default StageSingle