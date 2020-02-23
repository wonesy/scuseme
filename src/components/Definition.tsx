import { DictionaryEntry, printPartOfSpeech } from '../lib/dictionary/model'
import React from 'react'

interface DefinitionProps {
    de: DictionaryEntry
}

function Definition(props: DefinitionProps) {
    return (
        <div
            style={{
                display: 'flex',
                alignContent: 'flex-start',
                margin: '10px',
                textAlign: 'left'
            }}
        >
            <div style={{ width: '25%' }}>
                <span
                    style={{
                        fontWeight: 'bold'
                    }}
                >
                    {props.de.word}
                </span>{' '}
                ({printPartOfSpeech(props.de.partOfSpeech)})
            </div>
            <div style={{ paddingLeft: '10px' }}>{props.de.definition}</div>
        </div>
    )
}

export { Definition }
