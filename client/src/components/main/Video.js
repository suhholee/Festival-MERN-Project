import ModalVideo from 'react-modal-video'
import { useState } from 'react'

const Video = ({ embedUrl }) => {

  const [isOpen, setOpen] = useState(false)

  return (
    <>
      <ModalVideo channel='youtube' isOpen={isOpen} videoId={embedUrl} onClose={() => setOpen(false)} />
      <button className="btn-primary" onClick={()=> setOpen(true)}>VIEW DEMO</button>
    </>
  )
}

export default Video