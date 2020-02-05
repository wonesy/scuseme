import DictionarySearcher from './api'
import Translations from './model'
import axios, { AxiosInstance } from 'axios'
import BeautifulDom from 'beautiful-dom'

export default class SEDictionarySearcher implements DictionarySearcher {
    private corsProxyURL: string = ''
    private baseURL: string = ''
    private endpoint: string = ''
    private client: AxiosInstance = axios.create()

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
        return undefined
    }
}
