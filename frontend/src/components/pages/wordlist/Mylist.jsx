import React, { useState, useEffect, useContext } from 'react'
import { Link } from "react-router-dom"

import { getLists } from "../../../lib/api/mylists"
import { AuthContext } from "../../../App"

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { makeStyles, Theme } from "@material-ui/core/styles"

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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const listMemo = [
  {
    link: "/ngsl",
    description: "NGSLとは、約2800語の単語リストです。一般的な英文の9割をカバーする英単語を学習することができます。",
    title: "NGSL (基礎英単語)"
  },
  {
    link: "/nawl",
    description: "NAWLとは、学術的な英文に含まれる単語の９割を学べる英単語リストです。NAWLは、NGSLと合わせて覚えることで、学術的な英単語の92%をカバーすることができます。",
    title: "NAWL (学術英単語)"
  },
  {
    link: "/tsl",
    description: "TSLとは、TOEICの頻出英単語です。NGSL(基礎英単語)と合わせて学習することでTOEICに含まれる単語の９割を学べる英単語帳です。",
    title: "TSL (TOEIC英単語)"
  },
]

const tableheader = [
  "単語", "意味", "例文", "例文訳"
]

const Mylist = () => {
  const { currentUser } = useContext(AuthContext)
  const classes = useStyles()

  const [isMyList, setIsMyList] = useState([])


  const getMylists = async () => {

    try {
      const res = await getLists()
      console.log(res)

      let result = res.lists.filter((element, index, self) =>
          self.findIndex(e =>
            e.englishlistId === element.englishlistId &&
            e.example === element.example &&
            e.exampleMeaning === element.exampleMeaning &&
            e.meaning === element.meaning &&
            e.word === element.word &&
            e.userId === currentUser.id) === index);
      setIsMyList(result)
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getMylists()
  }, [])


  console.log(currentUser.id)
  console.log(isMyList)
  console.log(isMyList.length)

  return (
    <>
      {
        isMyList.length === 0 ?
          listMemo.map((memo) => (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                  m: 1,
                  p: 3,
                  width: 550,
                  minheight: 90,
                },
              }}
            >
              <Paper>
                {memo.description}
                <br />
                <Link to={memo.link}>
                  {memo.title}ページへ移動
                </Link>
              </Paper>
            </Box>
          )) :
          <>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer sx={{ maxHeight: 700 }}>
                <Table sx={{ minWidth: 700 }} stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {
                        tableheader.map((header) => (
                          <TableCell className={classes.styledCell} align="left">{header}</TableCell>
                        ) )
                      }
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {isMyList.map((mylist) => (
                      <StyledTableRow key={mylist.word}>
                        <StyledTableCell component="th" scope="row">
                          {mylist.word}
                        </StyledTableCell>
                        <StyledTableCell align="left">{mylist.meaning}</StyledTableCell>
                        <StyledTableCell align="left">{mylist.example}</StyledTableCell>
                        <StyledTableCell align="left">{mylist.exampleMeaning}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </>
      }
    </>
  )
}

export default Mylist
