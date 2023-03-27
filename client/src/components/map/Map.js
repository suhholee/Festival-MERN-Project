import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

// Custom Components
import PageNavbar from '../common/PageNavbar'
import Spinner from '../common/Spinner'
import Error from '../common/Error'

import Col from 'react-bootstrap/Col'
import { isAuthenticated } from '../helpers/auth'


const Map = () => {

  // ! State
  const [ stage, setStage ] = useState([])
  const [ error, setError ] = useState('')
  // const navigate = useNavigate()


  // ! On Mount
  useEffect(() => {

    // (!isAuthenticated()) && navigate('err')

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
      <div className='mapButton'>
        <Button to='/stages/641dd178631b9fd37d63b4e5' as={Link} className='btn-Nebula'> Nebula-808 </Button>
        <Button to='/stages/641dd178631b9fd37d63b4e6' as={Link} className='btn-Chaos'> Chaos Cosmos </Button>
        <Button to='/stages/641dd178631b9fd37d63b4e7' as={Link} className='btn-Jungle'> Jungle Constellation </Button>
      </div>
    </>
  )
}

export default Map