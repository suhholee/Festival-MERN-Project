import { useCallback, useState, useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'

// Custom imports
import { authenticated, includesUserId, isAuthenticated } from '../helpers/auth'
import ProfileImage from './ProfileImage'
import { Error } from '../common/Error'

const Profile = () => {
  const { userId } = useParams()
  const navigate = useNavigate()

  const [ user, setUser ] = useState({})
  const [ userComments, setUserComments ] = useState([])
  const [ stages, setStages ] = useState([])
  const [ error, setError ] = useState(null)

  // ! On Mount
  const getUser = useCallback(async () => {
    try {
      const { data } = await authenticated.get(`/api/users/${userId}`)
      setUser({ ...data })
    } catch (error) {
      console.log(error)
      setError(error.response)
    }
  }, [userId])

  useEffect(() => {
    !isAuthenticated() && navigate('/')
    const getComments = async () => {
      try {
        const { data } = await axios.get('/api/stages')
        setStages(data)
        const comments = data.map(stage => stage.comments)
        const userComments = comments.map(comments => comments.filter(comment => comment.owner._id === userId))
        setUserComments(userComments)
      } catch (err) {
        console.log(err)
        setError(err.response)
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
        <h2>email: {user.email}</h2>
        <h2>You are attending:
          {stages &&
            stages.map(stage => {
              const { attendance, _id } = stage
              if (includesUserId(attendance)) {
                return (
                  <div key={_id}>
                    <h2>{stage.name}!</h2>
                  </div>
                )
              } else {
                return (
                  <div key={_id}>
                  </div>
                )
              }
            })
          }
        </h2>
        <ProfileImage userId={userId} getUser={getUser} user={user} />
      </div>
      <div>
        {userComments &&
          userComments.map((stage, i) => {
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
          })
        }
      </div>
      <div className='footer'>Copyright 2023 &copy; All pictures cannot be copied without permission.</div>
    </>
  )
}

export default Profile