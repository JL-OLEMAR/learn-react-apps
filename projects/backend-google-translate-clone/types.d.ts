import type { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from './constants.js'

export type Language = keyof typeof SUPPORTED_LANGUAGES
export type AutoLanguage = typeof AUTO_LANGUAGE
export type FromLanguage = Language | AutoLanguage

// export enum RoleGPT {
//   System = 'system',
//   Assistant = 'assistant',
//   User = 'user'
// }
