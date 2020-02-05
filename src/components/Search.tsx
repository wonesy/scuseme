import React, { useState, useEffect } from 'react'
import { TextField, makeStyles, Theme, createStyles } from '@material-ui/core'
import DictionarySearcher from '../lib/dictionary/api'
import { debounce } from '../util/debounce'

interface SearchProps {
    ds: DictionarySearcher
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

    const debouncedSuggest = debounce(props.ds.suggest, 1000)

    async function suggest() {
        try {
            const suggestions = await debouncedSuggest(word)
            console.log('-> ' + suggestions)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (word.length <= 2) {
            return
        }
        console.log(word)
        suggest()
    })

    return (
        <div className={classes.container}>
            <TextField
                id="search-word"
                label="Search"
                variant="outlined"
                style={{ width: '100%' }}
                onChange={e => setWord(e.target.value)}
            ></TextField>
        </div>
    )
}

export { Search }
