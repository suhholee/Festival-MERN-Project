import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

// Custom Components
import Spinner from '../common/Spinner'
import Error from '../common/Error'
import { isAuthenticated } from '../helpers/auth'


const Map = () => {

  // ! State
  const [stages, setStages] = useState([])
  const [error, setError] = useState('')
  const navigate = useNavigate()


  // ! On Mount
  useEffect(() => {
    !isAuthenticated() && navigate('/')
    const getStages = async () => {
      try {
        const { data } = await axios.get('/api/stages')
        setStages(data)
      } catch (err) {
        console.log(err)
        setError(err.message)
      }
    }
    getStages()
  }, [])


  return (
    <>
      <div className='mapButton'>
        {stages.length > 0 ?
          stages.map(stage => {
            const { _id, name } = stage
            const buttonName = name.replace(' ', '-').toLowerCase()
            return (
              <Button key={_id} as={Link} to={`/stages/${_id}`} className={`btn-${buttonName}`}>{name}</Button>
            )
          })
          :
          <>
            {error ?
              <Error error={error} />
              :
              <Spinner />}
          </>
        }
      </div>
    </>
  )
}

export default Map