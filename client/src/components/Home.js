import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const Home = () => {
  return (
    <main className="home">
      <div className="hero">
        <h1 className='display-3'>WOOZU SOUNDS</h1>
        <p className='lead'>INFO INFO INFO</p>
        <Button to="/register" as={Link} className='btn-brown'>GET TICKETS</Button>
        <Button to="/login" as={Link} className='btn-brown'>LOG IN</Button>
      </div>
    </main>
  )
}

export default Home