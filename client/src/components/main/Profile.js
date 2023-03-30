import { useState, useEffect, Fragment } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'

// Custom imports
import { authenticated,isAuthenticated } from '../helpers/auth'

const Profile = () => {
  const { userId } = useParams()
  const navigate = useNavigate()

  const [ stages, setStages ] = useState([])
  const [user, setUser] = useState({})
  const [userComments, setUserComments] = useState([])

  // ! On Mount
  useEffect(() => {
    !isAuthenticated() && navigate('/')
    const getUser = async () => {
      try {
        const { data } = await authenticated.get(`/api/users/${userId}`)
        setUser({ ...data })
      } catch (error) {
        console.log(error)
      }
    }
    const getComments = async () => {
      try {
        const { data } = await axios.get('/api/stages')
        setStages(data)
        console.log('stages->', data)
        const comments = data.map(stage => stage.comments)
        console.log(comments)
        const userComments = comments.map(comments => comments.filter(comment => comment.owner._id === userId))
        console.log('user comments', userComments)
        setUserComments(userComments)
      } catch (error) {
        console.log(error)
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
            return stage.map(comment => {
              stages.map(stage => {
                const { name, _id } = stage
                return (
                  <h2 key={_id}>{name}</h2>
                )
              })
              const { text, _id } = comment
              return (
                <Fragment key={_id}>
                  <p>{text}</p>
                </Fragment>
              )
            })
          } else {
            return (
              <p key={i}>No Comment</p>
            )
          }
        })}
      </div>
    </>
  )
}

export default Profile