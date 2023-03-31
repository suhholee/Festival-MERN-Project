import { useState } from 'react'

// Custom components
import { authenticated, includesUserId } from '../../helpers/auth'

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
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='attendance'>
      <button className='attendance-button' onClick={(e) => handleAttendance(e)}>{includesUserId(attendance) ? 'Attended!' : 'Are you attending?' }</button>
      <p>Total Attendance: {attendance.length}</p>
    </div>
  )
}

export default Attendance