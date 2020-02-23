import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import { makeStyles, Theme, createStyles } from '@material-ui/core'
import { Search } from './Search'
import SEDictionarySearcher from '../lib/dictionary/suomienglantisanakirja'
import Translations from '../lib/dictionary/model'
import { Definition } from './Definition'
import { SectionHeader } from './SectionHeader'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'grid',
            gridGap: '20px',
            gridTemplateRows: '0.5fr 3fr 3fr',
            height: 'calc(100vh - 20px)',
            width: '100%',
            marginTop: '10px',
            position: 'absolute'
        },
        paperSearch: {
            width: '50%',
            margin: '0 auto 0 auto',
            textAlign: 'center',
            color: theme.palette.text.secondary,
            height: '100%'
        },
        paper: {
            width: '50%',
            margin: '0 auto 0 auto',
            textAlign: 'center',
            color: theme.palette.text.secondary,
            height: '100%',
            backgroundColor: '#f2f2f2'
        },
        scrollable: {
            overflowY: 'scroll',
            height: '100%'
        },
        gridBlock: {
            margin: '0 auto 20 auto',
            overflowY: 'hidden',
            width: '100%'
        }
    })
)

function Frame() {
    const [xls, setXls] = useState({} as Translations)
    const classes = useStyles()
    const ds = new SEDictionarySearcher()

    return (
        <div className={classes.container}>
            <div className={classes.paperSearch}>
                <Search ds={ds} onSearch={onSearch} />
            </div>
            <div className={classes.gridBlock}>
                <div className={classes.paper}>
                    <SectionHeader title="Definitions" />
                    <div className={classes.scrollable}>
                        {(xls.translations || []).map((x, i) => (
                            <Definition de={x} key={i} />
                        ))}
                    </div>
                </div>
            </div>
            <div className={classes.gridBlock}>
                <div className={classes.paper}>
                    <SectionHeader title="Pronunciations" />
                    <div className={classes.scrollable}>c</div>
                </div>
            </div>
        </div>
    )

    function onSearch(xls: Translations | undefined) {
        if (xls === undefined) {
            return
        }
        setXls(xls)
    }
}

export { Frame }
