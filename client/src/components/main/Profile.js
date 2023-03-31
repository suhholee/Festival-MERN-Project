import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

// Custom imports
import { includesUserId, isAuthenticated } from '../../helpers/auth'
import ProfileImage from './ProfileImage'
import Spinner from '../common/Spinner'
import Error from '../common/Error'

const Profile = ({ getUser, user, userError, setUserError }) => {

  // ! Variables
  const { userId } = useParams()
  const navigate = useNavigate()

  // ! State
  const [ stages, setStages ] = useState([])
  const [ userComments, setUserComments ] = useState([])
  const [ stagesError, setStagesError ] = useState('')

  // ! On Mount
  useEffect(() => {
    !isAuthenticated() && navigate('/')
    const getComments = async () => {
      try {
        const { data } = await axios.get('/api/stages')
        setStages(data)
        const comments = data.sort((a, b) => a.name > b.name ? 1 : -1).map(stage => stage.comments)
        const userComments = comments.map(comments => comments.filter(comment => comment.owner._id === userId))
        setUserComments(userComments)
      } catch (err) {
        console.log(err)
        setStagesError(err.message)
      }
    }
    getComments()
  }, [])

  return (
    <div className='profile-page'>
      <div className='profile-top'>
        <h1 className='profile-title'>Profile</h1>
        <div className='info'>
          {user ?
            <>
              <ProfileImage userId={userId} getUser={getUser} user={user} setUserError={setUserError} />
              <div className='info-username-email'>
                <h3>Username: @{user.username}</h3>
                <h3>Email: {user.email}</h3>
              </div>
            </>
            :
            <>
              {userError ?
                <Error error={userError} />
                :
                <Spinner />}
            </>
          }
        </div>
      </div>
      <div className='profile-bottom'>
        {stages.length > 0 ?
          <>
            <div>
              <h2 className='profile-bottom-title'>Attendance</h2>
              {stages &&
                stages.sort((a, b) => a.name > b.name ? 1 : -1).map(stage => {
                  console.log(stages)
                  const { attendance, _id, name } = stage
                  if (includesUserId(attendance)) {
                    return (
                      <div className='attendance-comments attendance' key={_id}>
                        <h2 className='attendance-comments-title'>{name}</h2>
                        <p className='attendance-comments-text attending'>Attended!</p>
                      </div>
                    )
                  } else {
                    return (
                      <div className='attendance-comments attendance' key={_id}>
                        <h2 className='attendance-comments-title'>{name}</h2>
                        <p className='attendance-comments-text not-attending'>Not Attending</p>
                      </div>
                    )
                  }
                })
              }
            </div>
            <div>
              <h2 className='profile-bottom-title'>Comments</h2>
              {userComments &&
                userComments.map((stage, i) => {
                  if (stage.length > 0) {
                    return (
                      <div className='attendance-comments comments' key={i}>
                        <h2 className='attendance-comments-title'>{stages[i].name}</h2>
                        <ul>
                          {stage.map((comment, i) => {
                            return <li key={i} className='attendance-comments-text'>{comment.text}</li>
                          })}
                        </ul>
                      </div>
                    )
                  } else {
                    return (
                      <div className='attendance-comments comments' key={i}>
                        <h2 className='attendance-comments-title'>{stages[i].name}</h2>
                        <p key={i} className='attendance-comments-text no-comment'>No Comment</p>
                      </div>
                    )
                  }
                })

              }
            </div>
          </>
          :
          <>
            {stagesError ?
              <Error error={stagesError} />
              :
              <Spinner />}
          </>
        }
      </div>
    </div>
  )
}

export default Profile