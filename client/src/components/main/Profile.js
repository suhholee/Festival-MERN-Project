import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

// Custom imports
import { authenticated } from '../helpers/auth'

const Profile = () => {
  console.log('running')
  const { userId } = useParams()

  const [user, setUser] = useState({})
  const [userComments, setUserComments] = useState([])

  // ! On Mount
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(`/api/users/${userId}`)
        // console.log(data)
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

  //   console.log(comments)
  //   console.log(user)
  return (
    <>
      <h1> Profile </h1>
      <div>
        <h2> username: {user.username}</h2>
        <h3> email: {user.email} </h3>
      </div>
      <div>
        {/* <p> {userComments[0][0].text}</p> */}
        {userComments.map((stage, i) => {
          if (stage.length > 0) {
            stage.map((comment,i) => {
              console.log(comment.text)
              return <p key={i}>hi</p>
            } )
            console.log(stage)
          } else {
            return (
              <p key={i}> no Comment</p>
            )
          }
        })}
      </div>
    </>
  )
}

export default Profile