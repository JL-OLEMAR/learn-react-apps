import { type ChangeEvent } from 'react'
import { Form } from 'react-bootstrap'

import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants'
import { SectionType, type FromLanguage, type Language } from '../types.d'

type Props =
  | { type: SectionType.From, value: FromLanguage, onChange: (lang: FromLanguage) => void }
  | { type: SectionType.To, value: Language, onChange: (lang: Language) => void }

export function LanguageSelector({ onChange, type, value }: Props) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as Language)
  }

  return (
    <Form.Select
      onChange={handleChange}
      value={value}
      aria-label='Select Language'
      style={{ width: 'auto' }}
    >
      {type === SectionType.From && <option value={AUTO_LANGUAGE}>Detect language</option>}
      {
        Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
          <option value={key} key={key}>
            {literal}
          </option>
        ))
      }
    </Form.Select>
  )
}
