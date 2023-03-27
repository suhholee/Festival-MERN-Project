import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

const PageNavbar = () => {
  return (
    <Navbar expand="md">
      <Container>
        {/* Brand logo */}
        {/* Navbar.Brand default element is an anchor tag which reloads the page as it follows the href */}
        {/* To render this as a Link component, import Link and pass it to the as prop */}
        {/* Finally, update the href to being a "to" prop */}
        <Navbar.Brand to="/" as={Link} className='LOGO'>WOOZU SOUNDS</Navbar.Brand>
        <Navbar.Toggle aria-controls="breadbored-nav" />
        <Navbar.Collapse id="breadbored-nav" className='justify-content-end'>
          <Nav>
            <Nav.Link to="/" as={Link} className={location.pathname === '/' ? 'active' : ''}>Home</Nav.Link>
            <Nav.Link to="/map" as={Link} className={location.pathname === '/map' ? 'active' : ''}>Map</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default PageNavbar