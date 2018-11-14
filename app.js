// Main starting point of the application
require('dotenv').config()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const path = require('path')
const express = require('express')
const app = express()
const cors = require('cors')

// App Setup
// app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// Routes Setup
app.use('/auth', require('./routes/auth'))
app.use('/products', require('./routes/products'))

// The only routes
app.use(express.static(path.join(__dirname + '/client/build/')))
app.get('*', (req, res) => {
  // res.sendFile('index.html')
  res.send('index page')
})

// Server Setup
const PORT = process.env.PORT || 3080
app.listen(PORT, () => {
  console.log('\n\n\n')
  console.log(`Server listening on port ${PORT}.`)
  console.log('\n\n\n')
})
