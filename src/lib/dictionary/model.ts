// generic model for dictionary

export default interface Translations {
  originalEntry: DictionaryEntry
  translations: DictionaryEntry[]
}

interface DictionaryEntry {
  word: string
  language: string
  definition: string
  partOfSpeech: PartOfSpeech
  examples: string[]
}

enum PartOfSpeech {
  Noun = 1,
  Pronoun,
  Verb,
  Adjective,
  Adverb,
  Preposition,
  Conjunction,
  Interjection
}
