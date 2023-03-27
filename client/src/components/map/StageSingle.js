import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Error from '../common/Error'
import Spinner from '../common/Spinner'


const StageSingle = () => {
  
  // ! Location variables
  const { stageId } = useParams()
  
  // ! State
  const [stage, setStage] = useState([])
  const [artists, setArtists] = useState([])
  const [stageError, setStageError] = useState('')
  const [artistsError, setArtistsError] = useState('')

  // ! On Mount
  useEffect(() => {

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
          console.log('haloooo')
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