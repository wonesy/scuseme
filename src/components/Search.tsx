import React, { useState, useEffect } from 'react'
import { TextField, makeStyles, Theme, createStyles } from '@material-ui/core'
import DictionarySearcher from '../lib/dictionary/api'
import useDebounce from '../hooks/usedebounce'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Translations from '../lib/dictionary/model'

interface SearchProps {
    ds: DictionarySearcher
    onSearch?: (xls: Translations | undefined) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: '100%'
        }
    })
)

function Search(props: SearchProps) {
    const classes = useStyles()
    const [word, setWord] = useState('')
    const [suggestions, setSuggestions] = useState([''])

    const debouncedWord = useDebounce(word, 500)

    useEffect(() => {
        async function suggest(word: string) {
            try {
                const freshSuggestions = await props.ds.suggest(word)
                setSuggestions(freshSuggestions)

                const freshDefs = await props.ds.search(word)
                if (props.onSearch) {
                    props.onSearch(freshDefs)
                }
            } catch (e) {
                console.log(e)
            }
        }

        if (!debouncedWord || debouncedWord.length <= 2) {
            setSuggestions([])
            return
        }

        suggest(debouncedWord)
    }, [debouncedWord, props])

    return (
        <div className={classes.container}>
            <Autocomplete
                id="search-word"
                freeSolo={true}
                options={suggestions}
                renderInput={params => (
                    <div>
                        <TextField
                            {...params}
                            label="search"
                            margin="normal"
                            variant="outlined"
                            style={{ width: '100%' }}
                            onChange={e => setWord(e.target.value)}
                        />
                    </div>
                )}
            />
        </div>
    )
}

export { Search }
