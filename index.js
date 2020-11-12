const express = require('express')
const app = express()
const port = 3001
const db = require('./db.json')
const fs = require('fs')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const persons = require('./routes/persons')

morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors())

app.use('/api', persons)

/*app.delete('/api/persons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const users = db.filter(person => person.id !== id)
    fs.writeFileSync('db.json', JSON.stringify(users))
    return res.status(202).json({success: true})
})*/

app.get('/info', (req, res) => {
    return res.send(`<p>Phonebook has info for ${db.length} people.</p><p>${Date()}</p>`)
})

app.use(express.static('build'))


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => {
        console.log('MongoDB connection succesful.')
    })
    .catch(err => {
        console.log('Error connecting to MongoDB: ', err.message)
    })
    
app.listen(process.env.PORT || port, () => console.log(`App listening on port ${port}`))