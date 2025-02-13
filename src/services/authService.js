import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase.config'; 

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

/**
 * Register a new user with email and password.
 * @param {string} email 
 * @param {string} password 
 */
export const registerWithEmailPassword = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

/**
 * Log in a user with email and password.
 * @param {string} email 
 * @param {string} password 
 */
export const loginWithEmailPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};


export const loginWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};


export const loginWithGithub = () => {
  return signInWithPopup(auth, githubProvider);
};


export const logout = () => {
  return signOut(auth);
};
