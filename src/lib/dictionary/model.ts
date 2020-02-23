// generic model for dictionary

export default interface Translations {
    originalEntry: DictionaryEntry
    translations: DictionaryEntry[]
}

export interface DictionaryEntry {
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

export const getPartOfSpeech = (desc: string): number => {
    switch (desc.toLowerCase()) {
        case 'noun':
            return PartOfSpeech.Noun
        case 'pronoun':
            return PartOfSpeech.Pronoun
        case 'verb':
            return PartOfSpeech.Verb
        case 'adjective':
            return PartOfSpeech.Adjective
        case 'adverb':
            return PartOfSpeech.Adverb
        case 'preposition':
            return PartOfSpeech.Preposition
        case 'conjuction':
            return PartOfSpeech.Conjunction
        case 'interjection':
            return PartOfSpeech.Interjection
    }
    return 0
}

export const printPartOfSpeech = (pos: PartOfSpeech): string => {
    switch (pos) {
        case PartOfSpeech.Noun:
            return 'noun'
        case PartOfSpeech.Pronoun:
            return 'pronoun'
        case PartOfSpeech.Verb:
            return 'verb'
        case PartOfSpeech.Adjective:
            return 'adjective'
        case PartOfSpeech.Adverb:
            return 'adverb'
        case PartOfSpeech.Preposition:
            return 'preposition'
        case PartOfSpeech.Conjunction:
            return 'conjuction'
        case PartOfSpeech.Interjection:
            return 'interjection'
        default:
            return 'unknown'
    }
}
