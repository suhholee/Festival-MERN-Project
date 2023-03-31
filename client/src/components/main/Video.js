import ModalVideo from 'react-modal-video'
import { useState } from 'react'

const Video = ({ embedUrl }) => {

  const [ isOpen, setOpen ] = useState(false)

  return (
    <>
      <ModalVideo channel='youtube' isOpen={isOpen} videoId={embedUrl} onClose={() => setOpen(false)} />
      <button className="youtube-btn" onClick={()=> setOpen(true)}>CHECK YOUTUBE</button>
    </>
  )
}

export default Video