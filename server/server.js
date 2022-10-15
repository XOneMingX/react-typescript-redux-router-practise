const admin = require("firebase-admin")
const serviceAccount = require("./linderhk-firebase-adminsdk-ad0cq-ed6dcdc7d2.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})
const db = admin.firestore()

const express = require("express")

const dotenv = require("dotenv")
dotenv.config() // here after main imports

// const fileUpload = require('express-fileupload');
const cors = require("cors")
const morgan = require("morgan")
const _ = require("lodash")

const app = express()

//add other middleware
app.use(cors())
app.use(require("body-parser").text())
app.use(require("body-parser").json())
app.use(require("body-parser").urlencoded({ extended: true }))
app.use(morgan("dev"))

app.get("/setAdmin", async (req, res) => {
  admin
    .auth()
    .setCustomUserClaims("HiYvqxlGfHRA99BgcWXqLTVkxsl1", {
      type: "administrator",
    })
    .then(() => console.log("done"))
    .catch((err) => console.log(err))
})

app.listen(1024, () => console.log("Listening on port 1024"))
