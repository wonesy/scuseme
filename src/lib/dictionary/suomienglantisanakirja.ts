import DictionarySearcher from './api'
import Translations, { DictionaryEntry, getPartOfSpeech } from './model'
import axios, { AxiosInstance } from 'axios'
import BeautifulDom from 'beautiful-dom'

export default class SEDictionarySearcher implements DictionarySearcher {
    private corsProxyURL: string = ''
    private baseURL: string = ''
    private endpoint: string = ''
    private client: AxiosInstance = axios.create()
    private defRegExp: RegExp = /\(.*\)/

    // state
    private lastWord: string = ''
    private lastDOMResults: BeautifulDom | undefined = undefined

    constructor() {
        this.corsProxyURL = 'https://cors-anywhere.herokuapp.com/'
        this.baseURL = 'https://www.suomienglantisanakirja.fi'
        this.endpoint = '/WiktionaryLiveSearch.php'
        this.client = axios.create({
            baseURL: this.corsProxyURL + this.baseURL,
            timeout: 5000
        })
    }

    public suggest = async (word: string): Promise<string[]> => {
        this.lastWord = word

        // fetch the suggestions AND definitions from the source
        const resp = await this.client.get(this.endpoint, {
            params: { sana: word, english: true }
        })

        // convert to DOM for simple parsing
        const dom = new BeautifulDom(
            resp.data.replace('@Viimeisimmät haut: ', '')
        )

        // we save the dom because the definitions are also here and we can avoid a second call
        // when we want to "search"
        this.lastDOMResults = dom

        const results = dom.getElementById('left')
        if (!results) {
            return []
        }

        const suggestions: Array<string> = []

        results.getElementsByTagName('a').forEach(e => {
            const href = e.getAttribute('href')
            if (href === null) {
                return
            }
            suggestions.push(href.replace('/', ''))
        })

        return suggestions
    }

    public search = async (word: string): Promise<Translations | undefined> => {
        const translations = {
            originalEntry: {
                word: word
            } as DictionaryEntry,
            translations: [] as DictionaryEntry[]
        } as Translations

        if (!this.lastDOMResults) {
            return undefined
        }

        const results = this.lastDOMResults.getElementById('right')
        if (!results) {
            return undefined
        }

        let lang: string = 'FI'
        let transLang: string = 'EN'
        const langText = results.getElementsByTagName('h1')[0].innerText
        if (langText.includes('in Finnish')) {
            lang = 'EN'
            transLang = 'FI'
        }
        translations.originalEntry.language = lang

        results.getElementsByTagName('li').forEach(e => {
            const word = e.getElementsByTagName('a')
            if (!word || word.length === 0) {
                return
            }

            const xlation = word[0].innerText
            const defs = e.innerText

            const regexres = this.defRegExp.exec(defs)
            if (!regexres) {
                return
            }

            const de = this.extractDictEntry(xlation, transLang, regexres[0])
            translations.translations.push(de)
        })

        return translations
    }

    private extractDictEntry = (
        word: string,
        lang: string,
        composedDefinition: string
    ): DictionaryEntry => {
        let de = {
            word: word,
            language: lang
        } as DictionaryEntry

        const words = composedDefinition
            .replace('(', '')
            .replace(')', '')
            .split(' ')

        de.partOfSpeech = getPartOfSpeech(words[0].replace(':', ''))
        delete words[0]
        const defOnly = words.join(' ').trimStart()
        de.definition = defOnly
        return de
    }
}
