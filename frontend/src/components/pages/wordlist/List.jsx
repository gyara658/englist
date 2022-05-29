import React from "react"
import { Link } from "react-router-dom"

import NGSL from "./image/NGSL.png"
import NAWL from "./image/NAWL.png"
import TSL from "./image/TSL.png"

import { makeStyles, Theme } from "@material-ui/core/styles"

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  grid: {
    height: 840,
  }
}))

const listMemo = [
  {
    link: "/ngsl",
    image: NGSL,
    description: "NGSLとは、約2800語の単語リストです。一般的な英文の9割をカバーする英単語を学習することができます。",
    title: "NGSL (基礎英単語)"
  },
  {
    link: "/nawl",
    image: NAWL,
    description: "NAWLとは、学術的な英文に含まれる単語の９割を学べる英単語リストです。NAWLは、NGSLと合わせて覚えることで、学術的な英単語の92%をカバーすることができます。",
    title: "NAWL (学術英単語)"
  },
  {
    link: "/tsl",
    image: TSL,
    description: "TSLとは、TOEICの頻出英単語です。NGSL(基礎英単語)と合わせて学習することでTOEICに含まれる単語の９割を学べる英単語帳です。",
    title: "TSL (TOEIC英単語)"
  },
]

const List = () => {
  const classes = useStyles()


  return (
    <>
      <Grid sx={{ flexGrow: 3 }} container spacing={2}>
        <Grid item xs={12} >
          <Grid container justifyContent="center" spacing={1}>
            {listMemo.map((list, index) => (
              <Grid item xs={4} key={index}>
                <Link to={list.link}>
                  <Card sx={{ maxWidth: 400 , height: 600}}>
                    <CardActionArea>
                      <CardMedia
                        p={1}
                        sx={{ width: 330, height: 420  }}
                        component="img"
                        image={list.image}
                        alt={list.title}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {list.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {list.description }
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default List
