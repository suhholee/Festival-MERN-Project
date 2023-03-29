import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

// Custom imports
import { authenticated } from '../helpers/auth'

const Profile = () => {
  const { userId } = useParams()
  
  const [ user,setUser ] = useState({})
  const [ comments,setComments ] = useState([])

  // ! On Mount
  useEffect(() => {
    const getUser = async() => {
      try {
        const { data } = await axios.get(`/api/users/${userId}`)
        console.log(data)
        setUser({ ...data })
      } catch (error) {
        console.log(error)
      }
    }
    const getComments = async() => {
      try {
        const { stages } = await axios.get('/api/stages')
        const comments = stages.map( stage => stage.comments)
        const userComments = comments.map( comments => comments.filter(comment => comment.owner.includes(userId) ) )
        // console.log(data)
        // setComments([ ...data ])
      } catch (error) {
        console.log(error)
      }
    }
    getComments()
    getUser()
  }, [])

  console.log(comments)
  console.log(user)
  return (
    <>
      <h1> Profile </h1>
      <div>
        <h2> username: {user.username}</h2>
        <h3> email: {user.email} </h3>
      </div>
      <div>
        {comments.map((comment,i) => {
          return (
            <>
              <p> hi </p>
              <p key={i}>{comment[0].text}</p>
            </>
          )
        })}
      </div>
    </>
  )
}

export default Profile