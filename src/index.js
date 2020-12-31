import express from 'express'
import mongoose from 'mongoose'
import { ApolloServer } from 'apollo-server-express'
import { success, error } from 'consola'

import { typeDefs, resolvers } from './graphql'
import { schemaDirectives } from './graphql/directives'
// config env vars
import { DB, PORT, IN_PROD } from './config'

// init express
const app = express();

// init appollo server configs
const server = new ApolloServer({
  typeDefs,
  schemaDirectives,
  resolvers,
  context: ({ req }) => {
    return req
  },
  playground: !IN_PROD && {
    endpoint: '/graphql',
    settings: {
      "editor.cursorShape": "block",
      "editor.theme": "dark"
    }
  }
})

const startApp = async () => {
  try {
    
    // connect to mongodb 
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })

    success({
      badge: true,
      message: "Successfully connected to mongodb"
    })

    // register express app on appolo server
    server.applyMiddleware({ app })

    // start listening to reqest on the PORT
    app.listen(PORT, () => {
      success({
        badge: true,
        message: `Server running on http://localhost:${PORT}`
      })
    })
    
  } catch (err) {
    error({
      badge: true,
      message: err
    })
  }
}

startApp();