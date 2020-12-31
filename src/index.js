import express from 'express'
import { success, error } from 'consola'
 
const app = express();

const startApp = async () => {
  try {
    
    app.listen(8000, () => {
      success({
        badge: true,
        message: `Server running on http://localhost:8000`
      })
    })
    
  } catch (err) {
    console.log(err)
  }
}

startApp();