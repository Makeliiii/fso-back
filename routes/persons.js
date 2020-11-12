const express = require('express')
const personsRouter = express.Router()
const Person = require('../models/Person')

personsRouter.get('/persons', async (req, res) => {
    await Person.find({})
        .then(persons => {
            return res.status(200).json({
                persons
            })
        })
})

personsRouter.get('/persons/:id', async (req, res) => {
    await Person.find({ _id: req.params.id })
        .then(person => {
            if (!person.length) {
                return res.status(404).json({ error: 'Not found' })
            }

            return res.status(200).json({
                person
            })
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({
                error: err.reason.toString()
            })
        })
})

personsRouter.post('/persons', async (req, res) => {
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
            return res.status(400).json({
                error: err
            })
        })
})

personsRouter.put('/persons/:id', async (req, res) => {
    const { name, number } = req.body
    let person = await Person.findOne({ _id: req.params.id })
    person.name = name
    person.number = number

    await person.save()
        .then(person => {
            return res.status(200).json({
                person
            })
        })
        .catch(err => {
            return res.status(400).json({
                error: err
            })
        })
})

personsRouter.delete('/persons/:id', async (req, res) => {
    await Person.deleteOne({ _id: req.params.id })
        .then(person => {
            return res.status(200).json({
                status: 'deleted'
            })
        })
})

module.exports = personsRouter