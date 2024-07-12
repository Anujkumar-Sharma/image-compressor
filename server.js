// server.js
const express = require('express')
const imageRoutes = require('./routes/imageRoutes')
require('./connectDB')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static('uploads'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', imageRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
