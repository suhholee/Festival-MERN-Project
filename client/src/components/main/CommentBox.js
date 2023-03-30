import { useState } from 'react'

// Error imports
import Error from '../common/Error'

// Bootstrap imports
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'

// Custom components
import { authenticated } from '../helpers/auth'
import Likes from './Likes'

const CommentBox = ({ username, _id, text, likes, getStage, stageId }) => {

  // ! States
  const [ editedComment, setEditedComment ] = useState({
    text: '',
  })
  const [ editCheck, setEditCheck ]  = useState(false)
  const [ editError, setEditError ] = useState('')

  // ! Executions
  const handleEdit = () => {
    setEditCheck(!editCheck)
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
      setEditCheck(false)
    } catch (err) {
      console.log(err.response)
      setEditError(' •–• text required •–• ')
    }
  }

  const handleDelete = async (e, id) => {
    try {
      await authenticated.delete(`/api/stages/${stageId}/comments/${id}`)
      getStage()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='comment-section'>
      <h4 className='user-name'>@{username}
        <div className='top-buttons'>
          <button onClick={(e) => handleEdit(e)}>Edit</button>
          <button onClick={(e) => handleDelete(e, _id)}>Delete</button>
        </div>
      </h4>
      {editCheck ?
        <Container>
          <Col as='form' onSubmit={(e) => handleSubmitEdit(e, _id)}>
            <Col>
              <input type='text' name='edit-comment' onChange={handleChangeEdit} value={editedComment.text}/>
              <button>Save</button>
              {editError && <Error error={editError}/>}
            </Col>
          </Col>
        </Container>
        :
        <p className='posted-comments'>{text}</p>
      }
      <Likes likes={likes} getStage={getStage} stageId={stageId} _id={_id} />
    </div>
  )
}

export default CommentBox