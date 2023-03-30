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
import CommentBox from './CommentBox'
import Likes from './Likes'


const Comments = ({ stage, getStage }) => {

  // ! Variables
  const { stageId } = useParams()

  // ! State
  const [ newComment, setNewComment ] = useState({
    text: '',
  })
  const [ postError, setPostError ] = useState('')

  // ! Executions
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

  return (
    <main className='comments-main'>
      <Container >
        <h1 style={{ margin: 50 }}>Comments</h1>
        <Col as='form' onSubmit={handleSubmit} >
          <Row className='post-container'>
            {/* New Comments section */}
            <label>Post A Comment</label>
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
              {userIsOwner(comment) ?
                <CommentBox username={username} _id={_id} text={text} getStage={getStage} stageId={stageId} likes={likes} />
                :
                <div className='comment-section'>
                  <h4 className='user-name'>{username}</h4>
                  <p className='posted-comments'>{text}</p>
                  <Likes likes={likes} getStage={getStage} stageId={stageId} _id={_id} />
                </div>
              }
            </Fragment>
          )
        })
      }
    </main>
  )

}

export default Comments