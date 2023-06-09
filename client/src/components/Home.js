import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const Home = () => {
  return (
    <main className="home">
      <div className="hero">
        <video loop autoPlay muted className='bg-video'>
          <source src="video/moveout.mp4" type="video/mp4" />
        </video>
        <div className='home-container'>
          <h1 className='display-3'>WOOZU SOUNDS</h1>
          <p className='lead'>08.06 - 11.06.2023 
            <br />
            <br />Would you like to come to WOOZU?
            <br />Get your free ticket right now!
            <br />
            <br />Already have a ticket? Enter the festival below.
          </p>
          <div className='homeButton'>
            <Button to="/register" as={Link} className='btn'>GET TICKETS</Button>
            <Button to="/login" as={Link} className='btn'>ENTER THE FESTIVAL</Button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home