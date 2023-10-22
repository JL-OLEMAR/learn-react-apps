import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Col, Container, Row, Stack } from 'react-bootstrap'

import { useEffect } from 'react'
import './App.css'
import { ArrowsIcon, LanguageSelector, TextArea } from './components'
import { AUTO_LANGUAGE } from './constants'
import { useStore } from './hooks/useStore'
import { translate } from './services/translate'
import { SectionType } from './types.d'

export default function App() {
  const {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    isLoading,
    interChangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  } = useStore()

  useEffect(() => {
    if (fromText === '') return

    translate({ fromLanguage, toLanguage, fromText })
      .then((result) => {
        if (result == null) return
        setResult(result)
      })
      .catch(() => { setResult('Error') })
  }, [fromText, fromLanguage, toLanguage])

  return (
    <Container fluid>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Google translate</h2>

      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.From}
              value={fromLanguage}
              onChange={setFromLanguage}
            />
            <TextArea
              type={SectionType.From}
              value={fromText}
              isLoading={isLoading}
              onChange={setFromText}
            />
          </Stack>
        </Col>

        {/* Button to change languages */}
        <Col xs='auto'>
          <Button
            variant='link'
            onClick={interChangeLanguages}
            disabled={fromLanguage === AUTO_LANGUAGE}
            type='button'
          >
            <ArrowsIcon />
          </Button>
        </Col>

        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLanguage}
            />
            <TextArea
              type={SectionType.To}
              value={result}
              isLoading={isLoading}
              onChange={setResult}
            />
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}
