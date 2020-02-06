import React, { useState, useEffect } from 'react'
import { TextField, makeStyles, Theme, createStyles } from '@material-ui/core'
import DictionarySearcher from '../lib/dictionary/api'
import useDebounce from '../hooks/usedebounce'

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

    const debouncedWord = useDebounce(word, 1000)

    useEffect(() => {
        async function suggest() {
            try {
                const suggestions = await props.ds.suggest(word)
                console.log('-> ' + suggestions)
            } catch (e) {
                console.log(e)
            }
        }

        if (!debouncedWord) {
            return
        }

        if (word.length <= 2) {
            return
        }

        suggest()
        // eslint-disable-next-line
    }, [debouncedWord])

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
