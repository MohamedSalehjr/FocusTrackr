const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const api = require('./routes/api')
const app = express()
const port = 4000

app.use(bodyParser.json())

app.use('/api', api)

app.use((error, req, res, next) => {
  if (res.headerSent){
    return next(error)
  }

  res.status(error.code || 500)
  res.json({message: error.message || 'An unknown error occurred!'})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
