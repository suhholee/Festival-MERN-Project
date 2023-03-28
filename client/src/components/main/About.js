import AboutImg from '../images/aboutpage.jpeg'
import Wellness from '../images/wellness.jpeg'
import Community from '../images/community.jpg'
import RaveSafe from '../images/ravesafe.jpeg'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const About = () => {
  return (
    <main>
      <div className='about-hero'>
        <div className='about-text'>
          <img src={ AboutImg } width="100%" />
          <h1>ABOUT</h1>
          <p>“Woozu has always been a DIY project, a house
          that we continue to build brick by brick, from the
          roots up. Our drive & vision is clear; to create a
          home that welcomes all walks of life, celebrates
          committed artistic talent, provides sanctuary for
          those seeking it & never compromises on quality of
          sound & production.”</p>
        </div>
        <hr />
        <div className='wellness-text'>
          <img src={ Wellness } alt="" />
          <h1 className='about-title'>WELLNESS</h1>
          <p>Our passion is delivering life-changing musical experiences but we understand we have a 
            responsibility in minimising the festival’s impact on the environment. We are continuously 
            striving to explore and demonstrate new and innovative ways of living more sustainably.</p>
        </div>
        <div className='ravesafe-text'>
          <img src={ RaveSafe } alt="" />
          <h1 className='about-title'>RAVE SAFE</h1>
          <p>We understand that people like to get loose, but please look out for yourself, 
            your mates and those around you. Hydrate, eat, sleep. Let’s party responsibly.</p>
        </div>
        <div className='community-text'>
          <img src={ Community } alt="" />
          <h1 className='about-title'>COMMUNITY</h1>
          <p>In our house everyone is welcome. We embrace the eccentric, the curious and the expressive. 
            We have no time for judgmental behaviour, harassment or inequality. 
            We don’t believe in a VIP culture. We are one. </p>
        </div>
        <Button as={Link} to='/map'> CHECK THE LINE UP </Button>
      </div>
      
    </main>
  )
}

export default About