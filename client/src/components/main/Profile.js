import { useState, useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'

// Custom imports
import { authenticated,isAuthenticated } from '../helpers/auth'
import { Error } from '../common/Error'

const Profile = () => {
  const { userId } = useParams()
  const navigate = useNavigate()

  const [ user, setUser ] = useState({})
  const [ userComments, setUserComments ] = useState([])
  const [ stages,setStages ] = useState([])
  const [ error,setError ] = useState(null)

  // ! On Mount
  useEffect(() => {
    !isAuthenticated() && navigate('/')
    const getUser = async () => {
      try {
        const { data } = await authenticated.get(`/api/users/${userId}`)
        setUser({ ...data })
      } catch (error) {
        console.log(error)
        setError(error.response)
      }
    }
    const getComments = async () => {
      try {
        const { data } = await axios.get('/api/stages')
        setStages(data)
        const comments = data.map(stage => stage.comments)
        const userComments = comments.map(comments => comments.filter(comment => comment.owner._id === userId))
        setUserComments(userComments)
      } catch (error) {
        console.log(error)
        setError(error.response)
      }
    }
    getComments()
    getUser()
  }, [])
  return (
    <>
      <h1>Profile</h1>
      <div>
        <h2>username: {user.username}</h2>
        <h3>email: {user.email} </h3>
      </div>
      <div>
        {userComments.map((stage, i) => {
          if (stage.length > 0) {
            return (
              <div key={i}>
                <h2> {stages[i].name}</h2>
                <div>
                  <p>Your comments: </p>
                  {stage.map((comment,i) => {
                    return <p key={i}>{comment.text}</p>
                  } )}
                </div>
              </div>
            )
          } else {
            return (
              <div key={i}>
                <h2>{stages[i].name}</h2>
                <p key={i}>No Comment</p>
              </div>  
            )
          }
        })}
      </div>
    </>
  )
}

export default Profile