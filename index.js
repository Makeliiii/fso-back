const express = require('express')
const app = express()
const port = 3001
const path = require('path')
const db = require('./db.json')
const fs = require('fs')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/api/persons', (req, res) => {
    res.json(db)
})

app.get('/api/persons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const person = db.find(person => person.id === id)
    res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const users = db.filter(person => person.id !== id)
    fs.writeFileSync('db.json', JSON.stringify(users))
})

app.post('/api/persons', (req, res) => {
    const getRandomId = () => Math.floor(Math.random() * Math.floor(100))
    const id = getRandomId()

    if (db.find(person => person.id === id)) {
        id = getRandomId()
    }

    if (db.find(person => person.name === req.body.name)) { return res.status(400).json({error: 'Name must be unique'}) }
    if (!req.body.name || !req.body.number) { return res.status(400).json({error: 'Missing name or number'}) }

    fs.readFile('db.json', (err, data) => {
        const json = JSON.parse(data)
        json.push({
            id,
            name: req.body.name,
            number: req.body.number
        })

        fs.writeFileSync('db.json', JSON.stringify(json))
    })

    console.log(req.body)
})

app.get('/info', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/info.html'))
})

app.listen(port, () => console.log(`App listening on port ${port}`))