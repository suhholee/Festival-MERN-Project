
// Custom components
import { authenticated, includesUserId } from '../helpers/auth'

const Likes = ({ likes, getStage, stageId, _id }) => {

  // ! Execution
  const handleLike = async (e, id) => {
    e.preventDefault()
    try {
      await authenticated.put(`/api/stages/${stageId}/comments/${id}/likes`)
      getStage()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='like-button'>
      <p>{likes.length}</p>
      <button onClick={(e) => handleLike(e, _id)} style={{ marginLeft: 20 }}>{includesUserId(likes) ? 'Liked!' : 'ʚ♥ɞ' }</button>
    </div>
  )
}

export default Likes