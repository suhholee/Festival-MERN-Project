import { useState, Fragment } from 'react'
import { useParams } from 'react-router-dom'

// Error imports
import Error from '../common/Error'

// Bootstrap imports
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// Custom components
import { authenticated, userIsOwner } from '../helpers/auth'
// import EditComment from './EditComment'


const Comments = ({ stage, getStage }) => {

  // ! Variables
  const { stageId } = useParams()

  // ! State
  // Post comment
  const [newComment, setNewComment] = useState({
    text: '',
  })
  // Edit comment
  const [editedComment, setEditedComment] = useState({
    text: '',
  })
  const [editedCommentId, setEditedCommentId] = useState(null)
  const [editCheck, setEditCheck] = useState(false)
  // Errors
  const [postError, setPostError] = useState('')
  const [editError, setEditError] = useState('')

  // ! Executions
  // Post comment
  const handleChange = (e) => {
    setNewComment({ ...newComment, text: e.target.value })
    setPostError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await authenticated.post(`/api/stages/${stageId}/comments`, newComment)
      setNewComment({ text: '' })
      getStage()
    } catch (error) {
      console.log(error.response)
      setPostError(' •–• text required •–• ')
    }
  }

  // Likes button
  const handleLike = async () => {
    try {
      console.log('like')
    } catch (error) {
      console.log(error)
    }
  }

  // Edit comment
  const handleEdit = (e, id) => {
    e.preventDefault()
    setEditCheck(!editCheck)
    setEditedCommentId(id)
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
        <Col as='form' onSubmit={handleSubmit}>
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
              <button onClick={handleLike}>Like</button>
              {/* { userIsOwner(comment) && editCheck && 
                <EditComment _id={_id} handleSubmitEdit={handleSubmitEdit} handleChangeEdit={handleChangeEdit} editedComment={editedComment} editError={editError} />
              } */}
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
                  <button onClick={(e) => handleEdit(e, _id)}>Edit</button>
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