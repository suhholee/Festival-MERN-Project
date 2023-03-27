// import { useEffect } from 'react'
// import axios from 'axios'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

// Components
import Home from './components/Home'
import PageNavbar from './components/common/PageNavbar'
import PageNotFound from './components/common/PageNotFound'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Map from './components/map/Map'
import StageSingle from './components/map/StageSingle'

const App = () => {


  return (
    <div className='site-wrapper'>
      <BrowserRouter>
        {/* {location.pathname !== '/' && <PageNavbar /> } */}
        <PageNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/map" element={<Map />} />
          {/* <PageNavbar /> */}
          {/* <Map />
          </Route> */}
          <Route path="/stages/:stageId" element={<StageSingle />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
