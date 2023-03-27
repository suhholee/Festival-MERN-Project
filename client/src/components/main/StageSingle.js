import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Col, Card, Button } from 'react-bootstrap'

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
  }, [])

  console.log(stage)

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
              <Spinner />}
          </>
        }
        {artists.length > 0 ?
          artists.map(artist => {
            const { _id, name, url, stage, image } = artist
            if (stageId === stage) {
              return (
                <Col key={_id} lg="4" md="6" sm="12">
                  <Card>
                    <div style={{ backgroundImage: `url('${image}')` }}></div>
                    <Card.Body>
                      <Card.Text>{name}</Card.Text>
                      <Button key={_id} as={Link} to={`${url}`}>Link to YouTube</Button>
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
        {/* Add comments section here */}
      </main>

    </>
  )

}

export default StageSingle