import { initializeApp } from "firebase/app"
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"
import { getAuth, connectAuthEmulator } from "firebase/auth"
import { getFunctions, connectFunctionsEmulator } from "firebase/functions"

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
const functions = getFunctions(app)

// initializeApp(firebaseConfig)
connectFirestoreEmulator(db, "localhost", 8080)
connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true })
connectFunctionsEmulator(functions, "localhost", 5001)

export { db, auth }
