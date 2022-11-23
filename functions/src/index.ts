import * as functions from "firebase-functions"
import * as admin from "firebase-admin"

try {
  admin.initializeApp(functions.config().firebase)
  // eslint-disable-next-line no-empty
} catch (e) {}

import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import { addUser } from "./helperFunction/userDBHelper"
import { userInit } from "./modal/User"

const app = express()

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", { structuredData: true });
//   response.send("Hello from Firebase!");
// });

exports.api = functions.region("asia-east2").https.onRequest(app)

// Automatically allow cross-origin requests
app.use(cors({ origin: true }))
app.use(bodyParser.text())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

exports.newUser = functions
  .region("asia-east2")
  .auth.user()
  .onCreate(async (user: any) => {
    try {
      const uid = user.uid

      addUser(uid, userInit)
        .then((result) => {
          return 0
        })
        .catch((err) => console.error(err))

      functions.logger.log("new member:" + uid)
      return null
    } catch (err: any) {
      console.log(err)
      return null
    }
  })
