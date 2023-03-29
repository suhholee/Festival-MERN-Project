import { useState } from 'react'

import { authenticated } from '../helpers/auth'

const Likes = ({ likes, getStage, stageId, _id }) => {

  console.log(likes)

  // ! State
  const [ liked, setLiked ] = useState(false)

  // ! Execution
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

  return (
    <div className='like-button'>
      <p>{likes.length}</p>
      <button onClick={(e) => handleLike(e, _id)} style={{ marginLeft: 20 }}>{liked ? 'Liked!' : 'ʚ♥ɞ' }</button>
    </div>
  )
}

export default Likes