import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
} from "firebase/auth"
import { auth } from "../../firebase/firebase.config"
import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL

// Setup authentication providers
const googleProvider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()

// Register new user with email and password
export const registerWithEmailPassword = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  const response = await axios.post(`${API_BASE_URL}/register`, { email, password })
  localStorage.setItem("token", response.data.token)
  return userCredential
}

// Login user with email and password
export const loginWithEmailPassword = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  const response = await axios.post(`${API_BASE_URL}/login`, { email, password })
  localStorage.setItem("token", response.data.token)
  return userCredential
}

// Login with Google account
export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider)
  const response = await axios.post(`${API_BASE_URL}/login`, { email: result.user.email })
  localStorage.setItem("token", response.data.token)
  return result
}

// Login with GitHub account
export const loginWithGithub = async () => {
  const result = await signInWithPopup(auth, githubProvider)
  const response = await axios.post(`${API_BASE_URL}/login`, { email: result.user.email })
  localStorage.setItem("token", response.data.token)
  return result
}

// Logout user and clear token
export const logout = async () => {
  await signOut(auth)
  await axios.post(`${API_BASE_URL}/logout`)
  localStorage.removeItem("token")
}
