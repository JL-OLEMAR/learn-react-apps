import { useReducer } from 'react'
import { AUTO_LANGUAGE } from '../constants'
import type { Action, FromLanguage, Language, State } from '../types.d'

// 1. Create a initialState
const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  isLoading: false
}

// 2. Create a reducer
const reducer = (state: State, action: Action) => {
  const { type } = action

  if (type === 'INTERCHANGE_LANGUAGES') {
    if (state.fromLanguage === AUTO_LANGUAGE) return state
    const isLoading = state.fromText !== ''

    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
      result: '',
      isLoading
    }
  }

  if (type === 'SET_FROM_LANGUAGE') {
    if (state.fromLanguage === action.payload) return state
    const isLoading = state.fromText !== ''

    return {
      ...state,
      fromLanguage: action.payload,
      result: '',
      isLoading
    }
  }

  if (type === 'SET_TO_LANGUAGE') {
    if (state.toLanguage === action.payload) return state
    const isLoading = state.fromText !== ''

    return {
      ...state,
      toLanguage: action.payload,
      result: '',
      isLoading
    }
  }

  if (type === 'SET_FROM_TEXT') {
    const isLoading = action.payload !== ''

    return {
      ...state,
      fromText: action.payload,
      result: '',
      isLoading
    }
  }

  if (type === 'SET_RESULT') {
    return {
      ...state,
      result: action.payload,
      isLoading: false
    }
  }

  return state
}

export function useStore() {
  // 3. Use the hook useReducer
  const [{
    fromLanguage,
    toLanguage,
    fromText,
    result,
    isLoading
  }, dispatch] = useReducer(reducer, initialState)

  const interChangeLanguages = () => {
    dispatch({ type: 'INTERCHANGE_LANGUAGES' })
  }

  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({ type: 'SET_FROM_LANGUAGE', payload })
  }

  const setToLanguage = (payload: Language) => {
    dispatch({ type: 'SET_TO_LANGUAGE', payload })
  }

  const setFromText = (payload: string) => {
    dispatch({ type: 'SET_FROM_TEXT', payload })
  }

  const setResult = (payload: string) => {
    dispatch({ type: 'SET_RESULT', payload })
  }

  return {
    fromLanguage,
    fromText,
    isLoading,
    result,
    toLanguage,
    interChangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  }
}
