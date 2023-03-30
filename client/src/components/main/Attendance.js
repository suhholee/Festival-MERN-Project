import { useState } from 'react'

// Custom components
import { authenticated, includesUserId } from '../helpers/auth'

const Attendance = ({ attendance, getStage, stageId }) => {

  // ! State
  const [ attending, setAttending ] = useState(false)

  // ! Execution
  const handleAttendance = async (e) => {
    e.preventDefault()
    try {
      await authenticated.put(`/api/stages/${stageId}/attendance`)
      getStage()
      setAttending(!attending)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <button onClick={(e) => handleAttendance(e)}>{includesUserId(attendance) ? 'Attending!' : 'Are you attending?' }</button>
      <p>{attendance.length}</p>
    </div>
  )
}

export default Attendance