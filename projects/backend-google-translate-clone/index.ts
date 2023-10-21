import cors from 'cors';
import express, { type Request, type Response } from 'express';
import { router as translateRouter } from './routes/translate-router';

// Environment variables
const PORT = process.env.PORT ?? 4001

// Create express server
const app = express()

// Disable x-powered-by header
app.disable('x-powered-by')

// CORS
app.use(cors())

// Reading and parsing the body
app.use(express.json())

// Routes
app.use('/api/translate', translateRouter)

// Route 404
app.use((_req: Request, res: Response) => {
  return res.status(404).send(`
    <div style="display: flex; align-items: center; justify-content: center; height: 100vh;">
      <h1>404</h1>
    </div>
  `)
})

// Listen to requests
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
