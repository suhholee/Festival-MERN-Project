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
  const [ liked, setLiked ] = useState()

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


  const handleLike = async (e, id) => {
    try {
      console.log(id)
      await authenticated.put(`/api/stages/${stageId}/comments/${id}/likes`)
      getStage()
      setLiked(!liked)
    } catch (error) {
      console.log(error)
    }
  }



  const handleEdit = async () => {
    try {
      console.log('edit')
    } catch (error) {
      console.log(error)
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
    <main className='comments-main'>
      <Container >
        <h1 style={{ margin: 50 }}>Comments</h1>
        <Col as='form' onSubmit={handleSubmit} >
          <Row className='post-container'>

            {/* New Comments section */}
            <label >Post A Comment</label>
            <div>
              <div className='post-comments'>
                <span style={{ padding: 10 }}> User Name </span>
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

              {/* Upload Comments section */}
              <div className='comment-section'>
                <h4 className='user-name'>{username}
                  {userIsOwner(comment) &&
                      <>
                        <div className='top-buttons'>
                          <button onClick={handleEdit}>Edit</button>
                          <button onClick={handleDelete}>Delete</button>
                        </div>
                      </>
                  }
                </h4>

                {/* Buttons section */}
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