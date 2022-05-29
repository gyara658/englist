import React, { useState, useEffect } from 'react'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { makeStyles, Theme } from "@material-ui/core/styles"

import ReactCardFlip from 'react-card-flip';
import { createMyLists } from "../../../lib/api/mylists"

const useStyles = makeStyles((theme: Theme) => ({
  stack: {
    paddingTop: theme.spacing(2),
    alignItems:"center",
    justifyContent: "center",
  },
  count: {
    paddingTop: theme.spacing(1),
    textAlign: "center"
  }
}))

const theme = createTheme({
  palette: {
    neutral: {
      main: '#2196f3',
      contrastText: '#fff',
    },
  },
})

const FlipCard = (props) => {
  const {words} = props
  const classes = useStyles()
  const [count, setCount] = useState(0)

  const [isFlipped, setIsFlipped] = useState(false);
  const [targetWord, setTargetWord] = useState(words)
  const [lists, setLists] = useState([])

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  }

  useEffect(() => {
    setTargetWord(words)
  }, [targetWord])


  const handleSubmit = async (count) => {
    count.preventDefault()

    const res = await createMyLists(count)
    console.log(res)

    if (res.status === 200) {
      setLists([...lists,])
    }
  }

  const prevWord = () => {
    if (count > 0) {
      setCount(count - 1)
    }
  }

  const nextWord = () => {
    if ( targetWord.length > 0) {
      setCount(count + 1)
    }
  }

  return (
    <>
      { targetWord.length > 0 ?
        <div className="card">
          <ReactCardFlip isFlipped={isFlipped}  flipSpeedFrontToBack={1.0}
            flipSpeedBackToFront={1.0} flipDirection="vertical" infinite="true" width="300px">
            <div className="front" onClick={flipCard}>
              <Card sx={{ minWidth: 300 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {targetWord[count].word}
                  </Typography>
                  <Typography variant="body3">
                  <p>例文</p>
                    {targetWord[count].example}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Click Here!!!</Button>
                </CardActions>
              </Card>
            </div>
            <div className="back" onClick={flipCard}>
              <Card sx={{ minWidth: 300,  minWidth: 780 }}>
                <CardContent>
                  <p>・意味</p>
                    {targetWord[count].meaning}
                  <p>・例文</p>
                    {targetWord[count].example}
                  <p>・例文訳</p>
                    {targetWord[count].exampleMeaning}
                  <CardActions>
                    <Button size="small">Click Here Return !!!</Button>
                  </CardActions>
                </CardContent>
              </Card>
            </div>
          </ReactCardFlip>
        </div>
          : <div><p>Now Loading!</p></div>
        }
        <Stack direction="row" spacing={2} className={classes.stack}>
          <Button variant="outlined" onClick={() => prevWord(count)}>Prev Word!</Button>
          <Button variant="contained" onClick={() => nextWord(count)}>Next Word!</Button>
          <ThemeProvider theme={theme}>
            <Button variant="contained" color="neutral" onClick={() => handleSubmit(count)}>
              Add My List
            </Button>
          </ThemeProvider>
        </Stack>
        <div className={classes.count}>
          ・勉強した単語数 :
           {count + 1}/{targetWord.length}
        </div>
    </>
  )
}

export default FlipCard
