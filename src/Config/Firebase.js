import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAufcEpGQbWqGm_DzLnbubH14ETXkhU3kg",
  authDomain: "react-http-1420b.firebaseapp.com",
  databaseURL: "https://react-http-1420b-default-rtdb.firebaseio.com",
  projectId: "react-http-1420b",
  storageBucket: "react-http-1420b.appspot.com",
  messagingSenderId: "960977664430",
  appId: "1:960977664430:web:b01aa59cb435d4d9d1b03f",
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }
