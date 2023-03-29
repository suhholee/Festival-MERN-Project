import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'

// Custom Components
import Error from '../common/Error'
import { removeToken } from '../helpers/auth'

const PageNavbar = () => {

  // ! State
  const [stages, setStages] = useState([])
  const [error, setError] = useState('')
  const [show, setShow] = useState(false)

  // ! Location variables
  const location = useLocation()
  const noNav = ['/', '/login', '/register']

  // ! On Mount
  useEffect(() => {
    const getStages = async () => {
      try {
        const { data } = await axios.get('/api/stages')
        setStages(data)
      } catch (err) {
        console.log(err)
        setError(err.message)
      }
    }
    getStages()
  }, [])

  // ! Executions
  const handleLogout = () => {
    removeToken()
  }

  const showDropdown = (e) => {
    setShow(!show)
  }
  
  const hideDropdown = (e) => {
    setShow(false)
  }

  return (
    <>
      {!noNav.includes(location.pathname) &&
        <Navbar expand="md">
          <Container>
            <Navbar.Brand to="/map" as={Link} className='logo'>WOOZU SOUNDS</Navbar.Brand>
            <Navbar.Toggle aria-controls="woozu-nav" />
            <Navbar.Collapse id="woozu-nav" className='justify-content-end'>
              <Nav>
                <Nav.Link to="/about" as={Link} className={location.pathname === '/about' ? 'active' : ''}>About</Nav.Link>
                <NavDropdown
                  title="Stages" 
                  id="basic-nav-dropdown" 
                  show={show}
                  onMouseEnter={showDropdown} 
                  onMouseLeave={hideDropdown}
                >
                  {stages.length > 0 ?
                    stages.sort((a, b) => a.name > b.name ? 1 : -1).map(stage => {
                      const { _id, name } = stage
                      return (
                        <NavDropdown.Item key={_id} as={Link} to={`/stages/${_id}`}>{name}</NavDropdown.Item>
                      )
                    })
                    :
                    <>
                      {error ?
                        <Error error={error} />
                        :
                        <p>Loading...</p>}
                    </>
                  }
                </NavDropdown>
                <Nav.Link to="/" as={Link} className={location.pathname === '/' ? 'active' : ''} onClick={handleLogout}>Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      }
    </>
  )
}

export default PageNavbar