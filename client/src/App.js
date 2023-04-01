// import { useEffect } from 'react'
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

const App = () => {

  return (
    <div className='site-wrapper'>
      <BrowserRouter>
        <PageNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/map" element={<Map />} />
          <Route path="/stages/:stageId" element={<StageSingle />} />
          <Route path='/users/:userId' element={<Profile />} />
          {/* Below route is rendered when nothing matches */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <div className='footer'>Copyright 2023 &copy; All pictures cannot be copied without permission.
      Created by Suhho Lee, Tom Clegg, Eunyeong Jeong</div>
    </div>
  )
}

export default App
