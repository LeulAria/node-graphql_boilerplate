import express from 'express'
import { success, error } from 'consola'

import { PORT, IN_PROD } from './config'
 
const app = express();

const startApp = async () => {
  try {
    
    app.listen(PORT, () => {
      success({
        badge: true,
        message: `Server running on http://localhost:${PORT}`
      })
    })
    
  } catch (err) {
    console.log(err)
  }
}

startApp();