import { useEffect, useState, Fragment } from 'react'
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
  // Post comment
  const [ newComment, setNewComment ] = useState({
    text: '',
  })
  // Edit comment
  // const [ editedComment, setEditedComment ] = useState({
  //   text: '',
  // })
  // const [ editedCommentId, setEditedCommentId ] = useState(null)
  // const [ editCheck, setEditCheck]  = useState(false)
  // Errors
  const [ postError, setPostError ] = useState('')
  // const [ editError, setEditError ] = useState('')
  // Like comment
  // const [ liked, setLiked ] = useState(false)
  // const [ likesId, setLikesId ] = useState(null)

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

  // Edit comment
  // const handleEdit = (e) => {
  //   // if (editCheck === false) {
  //   //   setEditCheck(true)
  //   //   setEditedCommentId(id)
  //   // } else {
  //   //   setEditCheck(false)
  //   //   setEditedCommentId(null)
  //   // }
  //   setEditCheck(!editCheck)
  // }

  // const handleClose = (e) => {
  //   setEditedCommentId(null)
  // }

  // const handleChangeEdit = (e) => {
  //   setEditedComment({ ...editedComment, text: e.target.value })
  //   setEditError('')
  // }

  // const handleSubmitEdit = async (e, id) => {
  //   e.preventDefault()
  //   try {
  //     await authenticated.put(`/api/stages/${stageId}/comments/${id}`, editedComment)
  //     setEditedComment({ text: '' })
  //     getStage()
  //     setEditCheck(false)
  //   } catch (err) {
  //     console.log(err.response)
  //     setEditError(' •–• text required •–• ')
  //   }
  // }

  // Delete comment
  // const handleDelete = async (e, id) => {
  //   try {
  //     await authenticated.delete(`/api/stages/${stageId}/comments/${id}`)
  //     getStage()
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // Like comment
  // const handleLike = async (e, id) => {
  //   e.preventDefault()
  //   try {
  //     await authenticated.put(`/api/stages/${stageId}/comments/${id}/likes`)
  //     getStage()
  //     setLiked(!liked)
  //     setLikesId(id)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

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
                // <div className='comment-section'>
                //   <h4 className='user-name'>{username}
                //     <div className='top-buttons'>
                //       <button onClick={(e) => handleEdit(e, _id)}>Edit</button>
                //       <button onClick={(e) => handleDelete(e, _id)}>Delete</button>
                //     </div>
                //   </h4>
                //   {editCheck ?
                //     <Container>
                //       <Col as='form' onSubmit={(e) => handleSubmitEdit(e, _id)}>
                //         <Col>
                //           <input type='text' name='edit-comment' onChange={handleChangeEdit} value={editedComment.text}/>
                //           <button>Save</button>
                //           {editError && <Error error={editError}/>}
                //         </Col>
                //       </Col>
                //     </Container>
                //     :
                //     <>
                //       <p className='posted-comments'>{text}</p>
                //     </>
                //   }
                //   <div className='like-button'>
                //     <p>{likes.length}</p>
                //     <button onClick={(e) => handleLike(e, _id)} style={{ marginLeft: 20 }}>{liked && likesId === _id ? 'Liked!' : 'ʚ♥ɞ' }</button>
                //   </div>
                // </div>
                :
                <div className='comment-section'>
                  <h4 className='user-name'>{username}
                    <p className='posted-comments'>{text}</p>
                  </h4>
                  <Likes likes={likes} getStage={getStage} stageId={stageId} _id={_id} />
                </div>
              }
            </Fragment>
          )
          // return (
          // <Fragment key={_id}>
          //   {/* Uploaded Comments */}
          //   <div className='comment-section'>
          //     <h4 className='user-name'>{username}
          //       {userIsOwner(comment) &&
          //         <>
          //           <div className='top-buttons'>
          //             {/* <button onClick={(e) => handleEdit(e, _id)}>Edit</button> */}
          //             <EditButton />
          //             <button onClick={(e) => handleDelete(e, _id)}>Delete</button>
          //           </div>
          //         </>
          //       }
          //     </h4>
          //     {userIsOwner(comment) && editCheck && editedCommentId !== null && editedCommentId === _id ?
          //       <Container>
          //         <Col as='form' onSubmit={(e) => handleSubmitEdit(e, _id)}>
          //           <Col>
          //             <input type='text' name='edit-comment' onChange={handleChangeEdit} value={editedComment.text}/>
          //             <button>Save</button>
          //             {editError && <Error error={editError}/>}
          //           </Col>
          //         </Col>
          //       </Container>
          //       :
          //       <>
          //         <p className='posted-comments'>{text}</p>
          //       </>
          //     }
          //     {/* Likes button */}
          //     <div className='like-button'>
          //       <p>{likes.length}</p>
          //       <button onClick={(e) => handleLike(e, _id)} style={{ marginLeft: 20 }}>{liked && likesId === _id ? 'Liked!' : 'ʚ♥ɞ' }</button>
          //     </div>
          //   </div>
          // </Fragment>
          // )
        })
      }
    </main>
  )

}

export default Comments