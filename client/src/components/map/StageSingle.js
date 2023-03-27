import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PageNavbar from '../common/PageNavbar'

import Error from '../common/Error'
import Spinner from '../common/Spinner'


const StageSingle = () => {
  // ! State
  const [ stage, setstage ] = useState([])
  const [ error, setError ] = useState('')

  

  // ! Location variables
  const { stageId } = useParams()
  
  // ! On Mount
  useEffect(() => {

    const getstage = async () => {
      try {
        const { data } = await axios.get(`/api/stages/${stageId}`)
        console.log(data.name)
        setstage(data)
      } catch (err) {
        console.log(err)
      }
    }
    getstage()
  }, [stageId])
  
  return (
    <>
      <PageNavbar />
      <main>
        <h1>{[stage.name]}</h1>
      </main>
    </>
  ) 

}

export default StageSingle