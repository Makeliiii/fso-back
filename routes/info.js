const router = require("./persons")

const express = require('express')
const router = express.Router

router.get('/info', (req, res) => {
    return res.send(`<p>Phonebook has info for ${db.length} people.</p><p>${Date()}</p>`)
})

module.exports = router