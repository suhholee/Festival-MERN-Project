import Wellness from '../../images/wellness.png'
import Community from '../../images/community.jpg'
import RaveSafe from '../../images/ravesafe.jpeg'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const About = () => {
  return (
    <main>
      <div className='about-hero'>
        
        <div className='wrap'>
          <div className='header-1'>
            <h1 className='title-1' >ABOUT <br /> WOOZU SOUNDS</h1>
          </div>
          <p className='text'>“Woozu has always been a DIY project, a house
          that we continue to build brick by brick, from the
          roots up. Our vision is clear; to create a
          home that welcomes all walks of life, celebrates
          committed artistic talent, provides a sanctuary for
          those seeking it & never compromises on quality of
          sound & production.”</p>
        </div>
        <div className='wrap'>
          <img src={ Wellness } className='wrap-img' />
          <h1 className='title'>WELLNESS</h1>
          <p> Woozu is about doing what you love with the people you love! We can do this at the heart of a mosh pit, or in total silence, so having a wellness centre is a vital part of the balance of our festival. It&apos;s a place to escape, relace, and restore. Quietly tucked away on the banks of the lke; discover wood-fired hot-tubs and finnish saunas, yoga, workshops, massage, holistic sound therapies, tarot readings and more...</p>
        </div>



        <div className='wrap'>
          <img src={ RaveSafe } className='wrap-img' />
          <h1 className='title'>RAVE SAFE</h1>
          <p>We understand that people like to get loose, but please look out for yourself, 
            your mates and those around you. Hydrate, eat, sleep. Let’s party responsibly.</p>
        </div>



        <div className='wrap'>
          <img src={ Community } className='wrap-img' />
          <h1 className='title'>COMMUNITY</h1>
          <p>In our house everyone is welcome. We embrace the eccentric, the curious and the expressive. 
            We have no time for judgmental behaviour, harassment or inequality. 
            We don’t believe in a VIP culture. We are one. </p>
        </div>


        <hr />
        
        <div className='about-btn'>
          <Button className='wrap-button' as={Link} to='/map'> CHECK THE LINE UP </Button>
        </div>
      </div>
    </main>
  )
}

export default About