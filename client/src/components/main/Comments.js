import { useEffect, useState, Fragment } from 'react'
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


const Comments = ({ stage, getStage }) => {

  // ! Variables
  const { stageId } = useParams()

  // ! Comment State
  const [newComment, setNewComment] = useState({
    text: '',
  })

  // ! Error State
  const [postError, setPostError] = useState('')

  // ! On Mount and onSubmit

  // ! Executions
  const handleChange = (e) => {
    setNewComment({ ...newComment, text: e.target.value })
    setPostError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await authenticated.post(`/api/stages/${stageId}/comments`, newComment)
      getStage()
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
      <h1>Comments</h1>
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
      {stage.comments.length > 0 &&
        stage.comments.map(comment => {
          const { text, likes, owner: { username }, _id } = comment
          return (
            <Fragment key={_id}>
              <div>
                <h4>{username}</h4>
                <p>{text}</p>
                <p>{likes.length}</p>
              </div>
              <button onClick={handleLike}> Like</button>
              {userIsOwner(comment) &&
                <>
                  <button onClick={handleEdit}>Edit</button>
                  <button onClick={handleDelete}>Delete</button>
                </>
              }
            </Fragment>
          )
        })
      }
    </>
  )

}

export default Comments