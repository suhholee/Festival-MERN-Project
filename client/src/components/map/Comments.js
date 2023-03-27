import { useEffect, useState } from 'react'
import { useParams,useLocation } from 'react-router-dom'
import axios from 'axios'

// Error imports
import Error from '../common/Error'
import Spinner from '../common/Spinner'

// Bootstrap imports
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { authenticated } from '../helpers/auth'


const Comments = () => {

  const [comments, setComments] = useState([])
  const [error, setError] = useState('')
  const [newComment, setNewComment] = useState({
    text: '' ,
  })

  const { stageId } = useParams()
  const location = useLocation()
  console.log(location)
  
  const handleChange = (e) => {
    setNewComment({ ...newComment, text: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await authenticated.post(`/api/stages/${stageId}/comments`, newComment)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setNewComment(newComment)
  }, [newComment])


  console.log(newComment)


  useEffect(() => {
    const getComments = async () => {
      const { data } = await axios.get(`/api/stages/${stageId}/comments`)
      setComments(data)
    }
    getComments()

  }, [])

  console.log(comments)

  return (
    <>
      <h1> Comments </h1>
      <Container>
        <Col as='form' onSubmit={handleSubmit} >
          <Row>
            <label>Post A Comment</label>
            <input type='text' name='comment' placeholder='Comment' onChange={handleChange} value= {newComment.text}/>
            <button>Post</button>
          </Row>
        </Col>
      </Container>
      {comments.length > 0 ?
        comments.map((comment,i) => {
          const { text, likes, owner: { username } } = comment
          return (
            <div key={i}>
              <h4> {username} </h4>
              <p> {text} </p>
              <p> {likes.length} </p>
            </div>
          )
        })
        :
        <>
          {error ?
            <Error error={error} />
            :
            <p> No Comments Yet! </p>}
        </>
      }

    </>
  )

}

export default Comments