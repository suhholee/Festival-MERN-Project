import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


// Bootstrap imports
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Register = () => {

  const navigate = useNavigate()

  const [ formFields,setFormFields ] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })
  const [ error,setError ] = useState('')

  const handleChange = (e) => {
    // console.log(e.target.name, e.target.value)
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/register', formFields)
      console.log(data)
      navigate('/login')
    } catch (error) {
      console.log('console', error)
      // if (error)
      setError(error.response.data.message)
    }
  }

  return (
    <Container className='text-center , register'>
      <Row>
        <Col as='form' onSubmit={handleSubmit} xs={{ span: 10, offset: 1 }} md={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }}>
          <h1>Register</h1>
          {/* Username */}
          <label htmlFor='username'>Username</label>
          <input type='text' name='username' placeholder='Username' onChange={handleChange} value= {formFields.username}/>
          {/* Email */}
          <label htmlFor='email'>Email</label>
          <input type='text' name='email' placeholder='Email' onChange={handleChange} value= {formFields.email}/>
          {/* Password */}
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' placeholder='Password' onChange={handleChange} value={formFields.password}/>
          {/* Password Confirmation */}
          <label htmlFor='passwordConfirmation'>Password Confirmation</label>
          <input type='password' name='passwordConfirmation' placeholder='Password Confirmation' onChange={handleChange} value={formFields.passwordConfirmation}/>
          <button className='btn btn-primary mb-2'>Register</button>
          {error && <p className='text-danger text-center'> {error}</p>}
        </Col>
      </Row>
    </Container>
  )
}

export default Register