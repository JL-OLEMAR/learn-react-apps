/*
  Events routes
  host + /api/translate
*/

import { Router } from 'express';
import { translateByRapid } from '../controllers/translate';

const router = Router()
router.get('/', translateByRapid)

export { router };

