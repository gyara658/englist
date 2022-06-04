import React, { useState, useEffect, useContext } from 'react'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { makeStyles, Theme } from "@material-ui/core/styles"
import Alert from '@mui/material/Alert';

import ReactCardFlip from 'react-card-flip';
import { createMyLists } from "../../../lib/api/mylists"
import { AuthContext } from "../../../App"

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
  const { currentUser, isSignedIn } = useContext(AuthContext)
  const [message, setMessage] = useState()
  const [isOpen, setIsOpen] = useState(false)
  const [isListIn, setIsListIn] = useState([])
  const [isAlert, setIsAlert] = useState()
  const [disable, setDisable] = useState(false)

  const [isFlipped, setIsFlipped] = useState(false);
  const [targetWord] = useState(words)
  const [lists, setLists] = useState([])

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  }

  useEffect(() => {
  }, [targetWord])


  const handleSubmit = async (e) => {
    e.stopPropagation()

    const data = {
      userId: currentUser?.id,
      englishlistId: targetWord[count].id,
      word: targetWord[count].word,
      example: targetWord[count].example,
      exampleMeaning: targetWord[count].exampleMeaning,
      meaning: targetWord[count].meaning
    }

    console.log(data)

    try {
      const res = await createMyLists(currentUser.id,data)
      console.log(res)
      console.log(res.data.list.englishlistId)

      console.log(lists)

      lists.map(list => (
        setIsListIn([...isListIn,list.englishlistId])
      ))

      console.log(isListIn)
      if (res.status === 200) {
        if(isListIn.includes(res.data.list.englishlistId)) {
          //もう追加されていることを知らせる処理
          setIsAlert("warning")
          setMessage("すでにマイリストに追加されています。")
          setIsOpen(true)
        } else {
          setIsAlert("success")
          setMessage("マイリストに追加しました。")
          setIsOpen(true)
          setLists([...lists,res.data.list])
          console.log(res.data.list)
        }
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
  }, [handleSubmit])

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

  setTimeout(() => {setIsOpen(false)}, 5000)

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
                  <Button size="small">Click to the meaning of the word!!!</Button>
                </CardActions>
              </Card>
            </div>
            <div className="back" onClick={flipCard}>
              <Card sx={{ minWidth: 300,  maxWidth: 780 }}>
                <CardContent>
                  <p>・意味</p>
                    {targetWord[count].meaning}
                  <p>・例文</p>
                    {targetWord[count].example}
                  <p>・例文訳</p>
                    {targetWord[count].exampleMeaning}
                  <CardActions>
                    <Button size="small">Click to Return !!!</Button>
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
          {
            isSignedIn?
            <ThemeProvider theme={theme}>
              <Button variant="contained" color="neutral" onClick={handleSubmit} >
                Add My List
              </Button>
            </ThemeProvider> : ""
          }
        </Stack>

        <Stack sx={{ width: '100%' }} direction="row" spacing={2} className={classes.stack}>
          {isOpen ?
            <Alert severity={isAlert}>{message}</Alert> : ""
          }
        </Stack>
        <div className={classes.count}>
          ・勉強した単語数 :
           {count + 1}/{targetWord.length}
        </div>
    </>
  )
}

export default FlipCard
