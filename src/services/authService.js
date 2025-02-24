import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase.config';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const registerWithEmailPassword = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const response = await axios.post(`${API_BASE_URL}/register`, { email, password });
  localStorage.setItem('token', response.data.token);
  return userCredential;
};

export const loginWithEmailPassword = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
  localStorage.setItem('token', response.data.token);
  return userCredential;
};

export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  const response = await axios.post(`${API_BASE_URL}/login`, { email: result.user.email });
  localStorage.setItem('token', response.data.token);
  return result;
};

export const loginWithGithub = async () => {
  const result = await signInWithPopup(auth, githubProvider);
  const response = await axios.post(`${API_BASE_URL}/login`, { email: result.user.email });
  localStorage.setItem('token', response.data.token);
  return result;
};

export const logout = async () => {
  await signOut(auth);
  await axios.post(`${API_BASE_URL}/logout`);
  localStorage.removeItem('token');
};