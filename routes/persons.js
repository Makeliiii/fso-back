const express = require('express')
const router = express.Router()
const Person = require('../models/Person')

router.get('/persons', async (req, res) => {
    await Person.find({})
        .then(persons => {
            res.status(200).json({
                persons
            })
        })
})

router.post('/persons', async (req, res) => {
    const { name, number } = req.body
    const person = new Person({
        name,
        number
    })

    person.save()
        .then(person => {
            return res.status(200).json({
                person
            })
        })
        .catch(err => {
            res.status(400).json({
                error: err
            })
        })
})

module.exports = router