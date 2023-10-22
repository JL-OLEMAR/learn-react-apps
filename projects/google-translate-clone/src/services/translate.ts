/* eslint-disable @typescript-eslint/promise-function-async */
import { type FromLanguage, type Language } from '../types.d'

interface Props {
  fromLanguage: FromLanguage
  toLanguage: Language
  fromText: string
}

export async function translate({ fromLanguage, toLanguage, fromText }: Props) {
  return await fetch(`http://localhost:3001/api/translate?fromLanguage=${fromLanguage}&toLanguage=${toLanguage}&text=${fromText}`)
    .then(res => res.json())
    .then(({ text }) => { return text })
    .catch(() => { throw new Error('Error fetching text') })
}
