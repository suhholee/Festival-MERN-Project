import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { Col, Card } from 'react-bootstrap'
// import ModalVideo from 'react-modal-video'

// Custom Components
import Error from '../common/Error'
import Spinner from '../common/Spinner'
import { isAuthenticated } from '../helpers/auth'
import Comments from './Comments'


const StageSingle = () => {
  
  // ! Variables
  const { stageId } = useParams()
  const navigate = useNavigate()
  // const location = useLocation()
  
  // ! State
  const [stage, setStage] = useState([])
  const [artists, setArtists] = useState([])
  const [stageError, setStageError] = useState('')
  const [artistsError, setArtistsError] = useState('')
  // const [isOpen, setOpen] = useState(false)

  // ! On Mount
  // useEffect(() => {
  //   console.log(location)
  // }, [location])

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

  // // ! Executions
  // const showModal = (e) => {
  //   setOpen(true)
  // }
  
  // const hideModal = (e) => {
  //   setOpen(false)
  // }

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
            artists.sort((a, b) => a.name > b.name ? 1 : -1).map(artist => {
              const { _id, name, url, stage, image } = artist
              // const embedUrl = url.split('=').splice(1, 1).join('')
              const embedUrl = url.replace('watch?v=', 'embed/')
              if (stageId === stage) {
                return (
            
                  <Col key={_id} lg="4" md="6" sm="12" className='artists'>
                    <Card style={{ backgroundImage: `url('${image}')` }}>
                      <Card.Body>
                        <Card.Text>{name}</Card.Text>
                        {/* <ModalVideo channel='youtube' isOpen={isOpen} videoId={embedUrl} onClose={hideModal} />
                        <button className="btn-primary" onClick={showModal}>VIEW DEMO</button> */}
                        <iframe width="560" height="315" src={embedUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
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
        <Comments />
      </main>

    </>
  )

}

export default StageSingle