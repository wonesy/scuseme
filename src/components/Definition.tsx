import { DictionaryEntry } from '../lib/dictionary/model'
import React from 'react'

interface DefinitionProps {
    de: DictionaryEntry
}

function Definition(props: DefinitionProps) {
    return (
        <div>
            {props.de.word} ({props.de.partOfSpeech})
        </div>
    )
}

export { Definition }
