import express from 'express'
import mongoose from 'mongoose'
import { success, error } from 'consola'

import { DB, PORT, IN_PROD } from './config'
 
const app = express();

const startApp = async () => {
  try {
    
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })

    success({
      badge: true,
      message: "Successfully connected to mongodb"
    })

    app.listen(PORT, () => {
      success({
        badge: true,
        message: `Server running on http://localhost:${PORT}`
      })
    })
    
  } catch (err) {
    console.log(err)
    error({
      badge: true,
      message: err.message
    })
  }
}

startApp();