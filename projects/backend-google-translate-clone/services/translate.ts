import type { FromLanguage, Language } from "../types"

const rapidApiKey = process.env.RAPID_API_KEY ?? ''
const rapidApiHost = process.env.RAPID_API_HOST ?? ''

interface Props {
  text: string
  fromLanguage: FromLanguage,
  toLanguage: Language,
}

export const getTranslate = async ({ text, fromLanguage, toLanguage }: Props) => {
  const url = `https://${rapidApiHost}/language/translate/v2`
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': `${rapidApiKey}`,
      'X-RapidAPI-Host': `${rapidApiHost}`
    },
    body: `q=${text}&target=${toLanguage}&source=${fromLanguage}`
  }

  try {
    const resp = await fetch(url, options)
    const data = await resp.json()
    if (!data) return null

    return data
  } catch (error) {
    console.error({ error });
    return { error: 'Something went wrong' }
  }
}