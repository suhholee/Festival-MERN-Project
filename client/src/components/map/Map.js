import axios from 'axios'
import { useEffect, useState } from 'react'

import PageNavbar from '../common/PageNavbar'

const Map = () => {

  // ! State
  const [ stage, setStage ] = useState([])
  const [ error, setError ] = useState('')

  // ! On Mount
  useEffect(() => {
    const getStage = async () => {
      try {
        const { data } = await axios.get('/api/stages')
        console.log(data)
        setStage(data)
      } catch (err) {
        console.log(err)
        setError(err.message)
      }
    }
    getStage()
  }, [])

  return (
    <>
      <PageNavbar />
      <h1>Map</h1>
    </>
  )
}

export default Map