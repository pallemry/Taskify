import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import firebaseConfig from './firebaseConfig';

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const User = collection(db, 'users');
const allowAccessWithoutSid = true;

export { db, User, allowAccessWithoutSid };