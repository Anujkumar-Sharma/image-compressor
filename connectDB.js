const mongoose = require('mongoose')

const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://localhost:27017/imageProcessing'

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Db connected successfully')
  })
  .catch((err) => {
    console.error(`error in db connection due to : ${err}`)
  })
