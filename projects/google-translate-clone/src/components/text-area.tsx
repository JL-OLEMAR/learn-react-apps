import type { ChangeEvent, CSSProperties } from 'react'
import { Form } from 'react-bootstrap'
import { SectionType } from '../types.d'

interface TextAreaProps {
  type: SectionType
  value: string
  onChange: (value: string) => void
  isLoading?: boolean
}

type GetPlaceholder = Pick<TextAreaProps, 'type' | 'isLoading'>
const getPlaceholder = ({ type, isLoading }: GetPlaceholder) => {
  if (type === SectionType.From) return 'Ingresar texto'
  if (isLoading === true) return 'Cargando...'
  return 'Traducción'
}

const commonStyles: CSSProperties = {
  height: '200px',
  border: 0,
  resize: 'none',
  overflow: 'auto'
}

export function TextArea({ type, value, isLoading, onChange }: TextAreaProps) {
  const styles = (type === SectionType.From)
    ? commonStyles
    : { ...commonStyles, backgroundColor: '#f5f5f5' }

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  return (
    <Form.Control
      as='textarea'
      placeholder={getPlaceholder({ type, isLoading })}
      autoFocus={type === SectionType.From}
      disabled={type === SectionType.To}
      value={value}
      onChange={handleChange}
      style={styles}
    />
  )
}
