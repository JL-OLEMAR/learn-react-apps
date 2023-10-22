import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Col, Container, Row, Stack } from 'react-bootstrap'

import { useEffect } from 'react'
import './App.css'
import { ArrowsIcon, ClipboardIcon, LanguageSelector, SpeakerIcon, TextArea } from './components'
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE } from './constants'
import { useDebounce, useStore } from './hooks'
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

  const debounceFromText = useDebounce(fromText, 300)

  useEffect(() => {
    if (debounceFromText === '') return

    translate({ fromLanguage, toLanguage, fromText: debounceFromText })
      .then((result) => {
        if (result == null) return
        setResult(result)
      })
      .catch(() => { setResult('Error') })
  }, [debounceFromText, fromLanguage, toLanguage])

  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch(() => { })
  }

  const handleSpeaker = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = VOICE_FOR_LANGUAGE[toLanguage]
    utterance.rate = 0.9
    speechSynthesis.speak(utterance)
  }

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
            <div style={{ position: 'relative' }}>
              <TextArea
                type={SectionType.To}
                value={result}
                isLoading={isLoading}
                onChange={setResult}
              />
              <div style={{ position: 'absolute', bottom: 0, left: 0, display: 'flex' }}>
                <Button
                  variant='link'
                  onClick={handleClipboard}
                >
                  <ClipboardIcon />
                </Button>

                <Button
                  variant='link'
                  onClick={handleSpeaker}
                >
                  <SpeakerIcon />
                </Button>
              </div>
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}
