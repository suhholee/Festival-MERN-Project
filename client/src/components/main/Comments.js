import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

// Error imports
import Error from '../common/Error'

// Bootstrap imports
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// Custom components
import { authenticated, userIsOwner } from '../helpers/auth'


const Comments = () => {

  // ! Variables
  const { stageId } = useParams()

  // ! Comment State
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState({
    text: '',
  })
  const [submit, setSubmit] = useState(true)

  // ! Error State
  const [postError, setPostError] = useState('')
  const [commentError, setCommentError] = useState('')



  // ! On Mount and onSubmit
  useEffect(() => {
    const getComments = async () => {
      try {
        const { data } = await axios.get(`/api/stages/${stageId}/comments`)
        setComments(data)
      } catch (error) {
        setCommentError(error.response.data.message)
      }
    }
    getComments()
  }, [submit])

  // ! Executions
  const handleChange = (e) => {
    setNewComment({ ...newComment, text: e.target.value })
    setPostError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await authenticated.post(`/api/stages/${stageId}/comments`, newComment)
      setSubmit(!submit)
    } catch (error) {
      console.log(error.response)
      setPostError(' •–• text required •–• ')
    }
  }

  const handleLike = async () => {
    try {
      console.log('like')
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = async () => {
    try {
      console.log('edit')
    } catch (error) {
      console.log('error')
    }
  }

  const handleDelete = async () => {
    try {
      console.log('delete')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h1> Comments </h1>
      <Container>
        <Col as='form' onSubmit={handleSubmit} >
          <Row>
            <label>Post A Comment</label>
            <input type='text' name='comment' placeholder='Comment' onChange={handleChange} value={newComment.text} />
            <button>Post</button>
            {postError && <Error error={postError} />}
          </Row>
        </Col>
      </Container>
      {comments.length > 0 ?
        comments.map((comment, i) => {
          const { text, likes, owner: { username } } = comment
          console.log(comment)
          return (
            <>
              <div key={i}>
                <h4> {username} </h4>
                <p> {text} </p>
                <p> {likes.length} </p>
              </div>
              <button onClick={handleLike}> Like</button>
              {userIsOwner(comment) &&
                <>
                  <button onClick={handleEdit}> Edit</button>
                  <button onClick={handleDelete}> Delete</button>
                </>
              }

            </>
          )
        })
        :
        <>
          {commentError ?
            <Error error={commentError} />
            :
            <p> No Comments Yet! </p>}
        </>
      }
    </>
  )

}

export default Comments