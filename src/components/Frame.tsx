import React from 'react'
import Paper from '@material-ui/core/Paper'
import { makeStyles, Theme, createStyles } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'grid',
      gridGap: '20px',
      gridTemplateRows: '1fr 3fr 3fr',
      height: '100vh'
    },
    searchBucket: {
      flexGrow: 1
    },
    definitionBucket: {
      flexGrow: 3
    },
    pronunciationBucket: {
      flexGrow: 3
    },
    paper: {
      width: '50%',
      margin: '0 auto 0 auto',
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height: '100%'
    }
  })
)

function Frame() {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <div>
        <Paper className={classes.paper}>a</Paper>
      </div>
      <div>
        <Paper className={classes.paper}>b</Paper>
      </div>
      <div>
        <Paper className={classes.paper}>c</Paper>
      </div>
    </div>
  )
}

export { Frame }
