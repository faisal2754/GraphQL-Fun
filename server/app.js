const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
const cors = require('cors')

app.use(cors())

mongoose.connect(process.env.DB_CONNECT, {
   useUnifiedTopology: true,
   useNewUrlParser: true,
   useFindAndModify: false,
   useCreateIndex: true
})
mongoose.connection.once('open', () => {
   console.log('connected to db')
})

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }))

app.listen(5000, () => {
   console.log('Listening on port 5000')
})
