import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'
import App from './App'

test('My App world as expected', async () => {
  const user = userEvent.setup()
  const app = render(<App />)

  const textareaForm = app.getByPlaceholderText('Ingresar texto')

  await user.type(textareaForm, 'Hello')
  const result = await app.findByDisplayValue(/Hello/i, {}, { timeout: 2500 })

  expect(result).toBeTruthy()
})
