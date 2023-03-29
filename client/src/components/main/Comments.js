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

  // ! Edit state
  const [edit, setEdit] = useState({
    text: '',
  })
  const [editCheck, setEditCheck] = useState(false)

  // ! Error State
  const [postError, setPostError] = useState('')

  // ! On Mount and onSubmit
  useEffect(() => {
    getStage()
    console.log(stage)
  }, [])

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
  console.log(stage)

  const handleLike = async (e,id) => {
    try {
      await authenticated.put(`/api/stages/${stageId}/comments/${id}/likes`)
      getStage()
      console.log('like')
    } catch (error) {
      console.log(error)
    }
  }



  const handleEdit = async () => {
    try {
      console.log('edit')
      setEditCheck(!editCheck)
    } catch (error) {
      console.log(error)
    }
  }

  const handleEditInput = (e) => {
    setEdit({ ...edit, text: e.target.value })
  }

  const handleSubmitEdit = async(e, id) => {
    e.preventDefault()
    console.log(id)
    await authenticated.put(`/api/stages/${stageId}/comments/${id}`, edit)
    getStage()
  }

  const handleDelete = async (e,id) => {
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
              <div>
                <h4>{username}</h4>
                <p>{text}</p>
                <p>{likes.length}</p>
                { (userIsOwner(comment) && editCheck) &&
                  <Container>
                    <Col as='form' onSubmit={(e) => handleSubmitEdit(e, _id)}  >
                      <Row >
                        <label htmlFor='edit comment'>Edit</label>
                        <input type='text' name={_id} placeholder='Comment' onChange={handleEditInput} value={edit.text} />
                        <button >Edit</button>
                        {/* {postError && <Error error={postError} />} */}
                      </Row>
                    </Col>
                  </Container>
                }
              </div>
              <button onClick={(e) => handleLike(e,_id)}> Like</button>
              {userIsOwner(comment) &&
                <>
                  <button onClick={handleEdit} > Edit</button>
                  <button onClick={(e) => handleDelete(e,_id)} > Delete</button>
                </>
              }
            </Fragment>
          )
        })
      }
    </main>
  )

}

export default Comments