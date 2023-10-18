/*
  Events routes
  host + /api/translate
*/

import { Router } from 'express'
import { getTranslate } from '../controllers/translate'

const router = Router()
router.get('/', getTranslate)

export { router }
