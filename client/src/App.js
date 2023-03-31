import { useCallback, useEffect, useState } from 'react'
// import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Components
import Home from './components/Home'
import PageNavbar from './components/common/PageNavbar'
import PageNotFound from './components/common/PageNotFound'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import About from './components/main/About'
import Map from './components/main/Map'
import StageSingle from './components/main/StageSingle'
import Profile from './components/main/Profile'
import { loggedInUser, authenticated } from './components/helpers/auth'

const App = () => {

  const [ user, setUser ] = useState([])
  const [ userError, setUserError ] = useState('')

  const getUser = useCallback(async () => {
    try {
      const { data } = await authenticated.get(`/api/users/${loggedInUser()}`)
      setUser({ ...data })
    } catch (error) {
      console.log(error)
      setUserError(error.message)
    }
  }, [])

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div className='site-wrapper'>
      <BrowserRouter>
        <PageNavbar user={user} userError={userError} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login getUser={getUser} />} />
          <Route path="/about" element={<About />} />
          <Route path="/map" element={<Map />} />
          <Route path="/stages/:stageId" element={<StageSingle />} />
          <Route path='/users/:userId' element={<Profile getUser={getUser} user={user} userError={userError} setUserError={setUserError} />} />
          {/* Below route is rendered when nothing matches */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
