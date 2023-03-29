import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Col, Card } from 'react-bootstrap'

// Custom Components
import Error from '../common/Error'
import Spinner from '../common/Spinner'
import { isAuthenticated } from '../helpers/auth'
import Comments from './Comments'
import Video from './Video'


const StageSingle = () => {
  
  // ! Variables
  const { stageId } = useParams()
  const navigate = useNavigate()
  
  // ! State
  const [stage, setStage] = useState(null)
  const [artists, setArtists] = useState([])
  const [stageError, setStageError] = useState('')
  const [artistsError, setArtistsError] = useState('')

  // ! On Mount
  const getStage = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/stages/${stageId}`)
      setStage(data)
    } catch (err) {
      console.log(err)
      setStageError(err.message)
    }
  }, [stageId])

  useEffect(() => {
    !isAuthenticated() && navigate('/')
    const getArtists = async () => {
      try {
        const { data } = await axios.get('/api/artists')
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
      {stage &&
        <main>
          {stage.name ? 
            <h1 className='stage-name' >{stage.name}</h1>
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
                const embedUrl = url.split('=').splice(1, 1).join('')
                if (stageId === stage) {
                  return (
                    <Col key={_id} lg="4" md="6" sm="12" className='artists'>
                      <Card style={{ backgroundImage: `url('${image}')` }}>
                        <Card.Body>
                          <Card.Text style={{ fontSize: 50 }}>{name}</Card.Text>
                          <Video embedUrl={embedUrl} />
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
          <Comments stage={stage} getStage={getStage} />
        </main>

      }
    </>
  )

}

export default StageSingle