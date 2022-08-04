const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  console.log('Provide new name and number to add a new person: node mongo.js <password> <name> <number>')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://persons:${password}@cluster0.sixk2pq.mongodb.net/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
const Person = mongoose.model('Person', personSchema)

// USER ASKED FOR LIST OF PERSONS
if(process.argv.length < 5) {
  mongoose
    .connect(url)
    .then(() => {
      console.log('printing all the people:')
      Person.find({}).then(personList =>
        personList.forEach(prs => {
          console.log(prs.name, prs.number)
          mongoose.connection.close()
        }))
    })
    .catch((err) => console.log(err))
// USER ASKED FOR ADDING NEW PERSON
} else {
  mongoose
    .connect(url)
    .then(() => {
      Person.create({ name: process.argv[3], number: process.argv[4] }, (error, newPerson) => {
        if(error)
          return console.log(error)
        console.log(`added ${newPerson.name} number ${newPerson.number} to phonebook`)
        mongoose.connection.close()
      })
    })
    .catch((err) => console.log(err))
}
