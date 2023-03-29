import { Buffer } from 'buffer'
import axios from 'axios'

const tokenName = 'Festival-MERN-Project'

// ! Get token
export const getPayload = () => {
  const token = localStorage.getItem(tokenName)
  if (!token) return 
  const splitToken = token.split('.')
  const payloadString = splitToken[1]
  return JSON.parse(Buffer.from(payloadString, 'base64'))
}

// ! Check the validity of the token
export const isAuthenticated = () => {
  const payload = getPayload()
  if (!payload) return false
  const currentTime = Date.now() / 1000
  return currentTime < payload.exp
}

export const removeToken = () => {
  localStorage.removeItem(tokenName)
}

export const getToken = () => {
  return localStorage.getItem(tokenName)
}

export const authenticated = axios.create()
authenticated.interceptors.request.use(config => {
  // Updating config object to include an Authorization header
  config.headers['Authorization'] = `Bearer ${getToken()}`
  // Return updated config object
  return config
})

export const userIsOwner = (comment) => {
  const payload = getPayload()
  if (!payload) return
  if (comment){
    return payload.sub === comment.owner._id
  }
}