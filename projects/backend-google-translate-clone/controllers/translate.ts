import type { Request, Response } from 'express'

export const getTranslate = async (_req: Request, res: Response) => {
  // const events = await EventModel.find().populate('user', 'name')

  return res.json({
    ok: 'hola'
  })
}
