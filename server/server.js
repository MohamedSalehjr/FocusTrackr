const express = require('express')
const bodyParser = require('body-parser')
const HttpError = require('./models/http-error')
const mongoose = require('mongoose')
require('dotenv').config();

const api = require('./routes/pomo-routes')
const usersRoutes = require('./routes/user-routes')
const app = express()
const port = 4000

app.use(bodyParser.json())

app.use('/api/pomo', api)
app.use("/api/users", usersRoutes)

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404 )
  throw error;
})

app.use((error, req, res, next) => {
  if (res.headerSent){
    return next(error)
  }

  res.status(error.code || 500)
  res.json({message: error.message || 'An unknown error occurred!'})
})

mongoose.connect(`mongodb+srv://mohamedsalehjr:${process.env.DATABASE_PASS}@pomoapi.l4tohfu.mongodb.net/?retryWrites=true&w=majority`).then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}).catch(err => {
  console.log(err)
})


