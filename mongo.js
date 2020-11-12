const mongoose = require('mongoose')

if (process.argv.length < 3) console.log('Please provide correct arguments.')

const password = process.argv[2]
const connection = `mongodb+srv://dbUser:${password}@fso-back.tycve.mongodb.net/fso-back?retryWrites=true&w=majority`

mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true })

const numberSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Number = mongoose.model('Number', numberSchema, 'fso-back')

if (process.argv.length === 3) {
    Number.find({})
        .then(persons => {
            console.log('Phonebook:')
            for (const person of persons) {
                console.log(`${person.name} ${person.number}`)
            }
            
            mongoose.connection.close()
        })
} else {
    const number = new Number({
        name: process.argv[3],
        number: process.argv[4]
    })
    
    number.save()
        .then(res => {
            console.log(`Added ${process.argv[3]} number ${process.argv[4]} to phonebook!`)
            mongoose.connection.close()
        })
}