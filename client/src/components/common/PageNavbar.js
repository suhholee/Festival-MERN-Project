import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'

// Custom Components
import Error from '../common/Error'
import { removeToken } from '../helpers/auth'
import { loggedInUser } from '../helpers/auth'

const PageNavbar = ({ user, userError }) => {

  // ! State
  const [ stages, setStages ] = useState([])
  const [ stagesError, setStagesError ] = useState('')
  const [ showStages, setShowStages ] = useState(false)
  const [ showProfile, setShowProfile ] = useState(false)

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
        setStagesError(err.message)
      }
    }
    getStages()
  }, [])

  // ! Executions
  const handleLogout = () => {
    removeToken()
  }

  const showStagesDropdown = (e) => {
    setShowStages(!showStages)
  }
  
  const hideStagesDropdown = (e) => {
    setShowStages(false)
  }

  const showProfileDropdown = (e) => {
    setShowProfile(!showProfile)
  }
  
  const hideProfileDropdown = (e) => {
    setShowProfile(false)
  }

  return (
    <>
      {!noNav.includes(location.pathname) &&
        <Navbar className='nav-bar' expand="md">
          <Container>
            <Navbar.Brand to="/map" as={Link} className='logo'>WOOZU SOUNDS</Navbar.Brand>
            <Navbar.Toggle aria-controls="woozu-nav" />
            <Navbar.Collapse id="woozu-nav" className='justify-content-end'>
              <Nav className='navbar-text'>
                <Nav.Link to="/about" as={Link} className={location.pathname === '/about' ? 'active navbar-link border-bottom' : 'navbar-link'}>About</Nav.Link>
                <NavDropdown
                  title="Stages" 
                  id="basic-nav-dropdown" 
                  show={showStages}
                  onMouseEnter={showStagesDropdown} 
                  onMouseLeave={hideStagesDropdown}
                  className={location.pathname.includes('/stages/') ? 'active navbar-link border-bottom stages-navbar' : 'navbar-link'}
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
                      {stagesError ?
                        <Error error={stagesError} />
                        :
                        <p>Loading...</p>}
                    </>
                  }
                </NavDropdown>
                <NavDropdown
                  title={ 
                    user.image ?
                      <div>
                        <img className={location.pathname === `/users/${loggedInUser()}` ? 'navbar-image-active' : 'navbar-image'} src={user.image} />
                      </div>
                      :
                      <>
                        {userError ?
                          <Error error={userError} />
                          :
                          <p className={location.pathname === `/users/${loggedInUser()}` ? 'navbar-username-active' : 'navbar-username'}>@{user.username}</p>
                        }
                      </>
                  }
                  id="basic-nav-dropdown" 
                  show={showProfile}
                  onMouseEnter={showProfileDropdown} 
                  onMouseLeave={hideProfileDropdown}
                  className={location.pathname === `/users/${loggedInUser()}` ? 'active navbar-link border-bottom' : 'navbar-link'}
                >
                  <NavDropdown.Item to={`/users/${loggedInUser()}`} as={Link}>Profile</NavDropdown.Item>
                  <NavDropdown.Item to="/" as={Link} onClick={handleLogout && hideProfileDropdown}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      }
    </>
  )
}

export default PageNavbar