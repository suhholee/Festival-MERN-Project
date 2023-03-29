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

  // ! State
  const [ click, setClick ] = useState(false)
  // Post comment
  const [ newComment, setNewComment ] = useState({
    text: '',
  })
  // Like comment
  const [ liked, setLiked ] = useState(false)
  // Edit comment
  const [ editedComment, setEditedComment ] = useState({
    text: '',
  })
  const [ editedCommentId, setEditedCommentId ] = useState(null)
  const [ editCheck, setEditCheck]  = useState(false)
  // Errors
  const [ postError, setPostError ] = useState('')
  const [ editError, setEditError ] = useState('')

  // ! On Click
  useEffect(() => {
    getStage()
    console.log('Clicked!')
  }, [click])

  // ! Executions
  // Post comment
  const handleChange = (e) => {
    setNewComment({ ...newComment, text: e.target.value })
    setPostError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await authenticated.post(`/api/stages/${stageId}/comments`, newComment)
      console.log(data)
      setNewComment({ text: '' })
      getStage()
    } catch (error) {
      console.log(error.response)
      setPostError(' •–• text required •–• ')
    }
  }

  // Like comment
  const handleLike = async (e, id) => {
    e.preventDefault()
    try {
      await authenticated.put(`/api/stages/${stageId}/comments/${id}/likes`)
      getStage()
      setLiked(!liked)
    } catch (error) {
      console.log(error)
    }
  }

  // Edit comment
  const handleEdit = (e, id) => {
    setEditCheck(!editCheck)
    setEditedCommentId(id)
  }

  const handleClose = (e) => {
    setEditedCommentId(null)
  }

  const handleChangeEdit = (e) => {
    setEditedComment({ ...editedComment, text: e.target.value })
    setEditError('')
  }

  const handleSubmitEdit = async (e, id) => {
    e.preventDefault()
    try {
      await authenticated.put(`/api/stages/${stageId}/comments/${id}`, editedComment)
      setEditedComment({ text: '' })
      getStage()
    } catch (err) {
      console.log(err.response)
      setEditError(' •–• text required •–• ')
    }
  }

  // Delete comment
  const handleDelete = async (e, id) => {
    try {
      await authenticated.delete(`/api/stages/${stageId}/comments/${id}`)
      getStage()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className='comments-main'>
      <Container >
        <h1 style={{ margin: 50 }}>Comments</h1>
        <Col as='form' onSubmit={handleSubmit} >
          <Row className='post-container'>
            {/* New Comments section */}
            <label >Post A Comment</label>
            <div>
              <div className='post-comments'>
                <span style={{ padding: 10 }}>User Name</span>
                <textarea type='text' name='comment' placeholder='Comment' onChange={handleChange} value={newComment.text} rows='3' />
              </div>
              <button>Post</button>
            </div>
            <div className='error'>
              {postError && <Error error={postError} />}
            </div>
          </Row>
        </Col>
      </Container>
      {stage.comments.length > 0 &&
        stage.comments.map(comment => {
          const { text, likes, owner: { username }, _id } = comment
          return (
            <Fragment key={_id}>
              {/* Uploaded Comments */}
              <div className='comment-section'>
                <h4 className='user-name'>{username}
                  {userIsOwner(comment) && editCheck && editedCommentId !== null && editedCommentId === _id &&
                  <Container>
                    <Col as='form' onSubmit={(e) => handleSubmitEdit(e, _id)}>
                      <Row>
                        <input type='text' name='edit-comment' placeholder='Edit Comment' onChange={handleChangeEdit} value={editedComment.text}/>
                        <button>Save</button>
                        {editError && <Error error={editError}/>}
                      </Row>
                    </Col>
                  </Container>
                  }
                  {userIsOwner(comment) &&
                    <>
                      <div className='top-buttons'>
                        <button onClick={(e) => handleEdit(e, _id)}>Edit</button>
                        <button onClick={(e) => handleDelete(e, _id)}>Delete</button>
                      </div>
                    </>
                  }
                </h4>
                {/* Likes button */}
                <p className='posted-comments'>{text}</p>
                <div className='like-button'>
                  <p>{likes.length}</p>
                  <button onClick={(e) => handleLike(e, _id)} style={{ marginLeft: 20 }}> {liked ? ' Like ' : 'ʚ♥ɞ' } </button>
                </div>
              </div>
            </Fragment>
          )
        })
      }
    </main>
  )

}

export default Comments