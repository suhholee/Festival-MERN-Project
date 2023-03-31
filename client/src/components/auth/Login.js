import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Login = ({ getUser }) => {

  // ! Location variables
  const navigate = useNavigate()

  // ! State
  const [ formFields, setFormFields ] = useState({
    email: '',
    password: '',
  })
  const [ error, setError ] = useState('')

  // ! Executions
  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/login', formFields)
      localStorage.setItem('Festival-MERN-Project', data.token)
      console.log(data)
      navigate('/map')
      getUser()
    } catch (err) {
      console.log('error', err.message)
      setError('Invalid Email or Password. Try again.')
    }
  }

  return (
    <main className="form-page register-login text-center">
      <Container>
        <Row>
          <Col as="form" xs={{ span: 10, offset: 1 }} sm={{ span: 6, offset: 3 }} md={{ span: 4, offset: 4 }} onSubmit={handleSubmit}>
            <h1 className='display-6 text-center'>Please Login to Enter</h1>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder='Email' onChange={handleChange} value={formFields.email}/>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder='Password' onChange={handleChange} value={formFields.password} />
            <button className='btn btn-primary w-100'>Login</button>
            {error && <p className='text-danger text-center'>{error}</p>}
          </Col>
        </Row>
      </Container>
    </main>
  )
}

export default Login