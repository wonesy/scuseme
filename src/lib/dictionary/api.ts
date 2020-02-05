import Translations from './model'

export default interface DictionarySearcher {
    suggest: (word: string) => Promise<string[]>
    search: (word: string) => Promise<Translations | undefined>
}
