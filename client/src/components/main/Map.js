import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

// Custom Components
import Spinner from '../common/Spinner'
import Error from '../common/Error'
import { isAuthenticated } from '../../helpers/auth'

// Images
import Nebula from '../../images/nebula.png'
import Jungle from '../../images/jungle.png'
import Chaos from '../../images/chaos.png'

const Map = () => {

  // ! Variables
  const navigate = useNavigate()

  // ! State
  const [ stages, setStages ] = useState([])
  const [ error, setError ] = useState('')

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
    <section>
      <div className='map-container'>
        <div className='stage-btn'>
          {stages.length > 0 ?
            stages.sort((a, b) => a.name > b.name ? 1 : -1).map(stage => {
              const { _id, name } = stage
              const buttonName = name.replace(' ', '-').toLowerCase()
              return (
                <Button key={_id} as={Link} to={`/stages/${_id}`} 
                  className={`btn-${buttonName}`}>{name}</Button>
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
        <div className='stage-image'>
          <img className='Nebula' src={Nebula} alt="" />
          <img className='Chaos' src={Chaos} alt="" />
          <img className='Jungle' src={Jungle} alt="" />
        </div>
      </div>
    </section>
  )
}

export default Map