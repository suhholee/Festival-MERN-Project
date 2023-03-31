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
    } catch (err) {
      console.log(err.response)
      setPostError(' •–• text required •–• ')
    }
  }

  return (
    <main className='comments-main'>
      <Container >
        <h2 className='comments-title' >Comments</h2>
        <Col as='form' onSubmit={handleSubmit} >
          <div className='post-comments'>
            <textarea type='text' name='comment' placeholder='Comment' onChange={handleChange} value={newComment.text} rows='3' />
            <button>Post</button>
          </div>

          <div className='error'>
            {postError && <Error error={postError} />}
          </div>
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
                  <h4 className='user-name'>@{username}</h4>
                  <textarea>{text}</textarea>
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