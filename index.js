const express = require('express')
const app = express()
const port = 3001
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

// morgan logging
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// cors and body parser
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// import routes
const persons = require('./routes/persons')
const info = require('./routes/info')

// serve routes
app.use('/api', persons)
app.use(info)

/*app.delete('/api/persons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const users = db.filter(person => person.id !== id)
    fs.writeFileSync('db.json', JSON.stringify(users))
    return res.status(202).json({success: true})
})*/

// serve react app
app.use(express.static('build'))

// connect to mongodb
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => {
        console.log('MongoDB connection succesful.')
    })
    .catch(err => {
        console.log('Error connecting to MongoDB: ', err.message)
    })
    
// server listener
app.listen(process.env.PORT || port, () => console.log(`App listening on port ${port}`))