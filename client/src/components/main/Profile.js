import { useState, useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'

// Custom imports
import { authenticated,isAuthenticated } from '../helpers/auth'
import ImageUploadField from '../main/ProfileImage'

const Profile = () => {
  const [ imagedata, setImagedata ] = useState({
    profileImage: '',
  })
  const { userId } = useParams()
  const navigate = useNavigate()

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
      <h1> Profile </h1>
      <div>
        <h2> username: {user.username}</h2>
        <h3> email: {user.email} </h3>
        <ImageUploadField setFormdata={setImagedata} formdata={imagedata} />
      </div>
      <div>
        {userComments.map((stage, i) => {
          if (stage.length > 0) {
            return stage.map((comment,i) => {
              console.log(comment.text)
              return <p key={i}>{comment.text}</p>
            } )
            // console.log(stage)
          } else {
            return (
              <p key={i}> No Comment</p>
            )
          }
        })}
      </div>
    </>
  )
}

export default Profile