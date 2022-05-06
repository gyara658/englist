import React, { useState, useEffect, useContext } from "react"

import { makeStyles, Theme } from "@material-ui/core/styles"
import { Grid, Typography } from "@material-ui/core"

import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"

import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import Divider from "@material-ui/core/Divider"
import FavoriteIcon from "@material-ui/icons/Favorite"
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"

import  AlertMessage  from "../utils/AlertMessage"

import { getUsers } from "../../lib/api/auth"
import { AuthContext } from "../../App"

const Users = () => {
  const { currentUser } = useContext(AuthContext)
  const classes = useStyles()

  const initialUserState = {
    id: 0,
    uid: "",
    provider: "",
    email: "",
    name: "",
  }


  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [user, setUser] = useState(initialUserState)
  const [userDetailOpen, setUserDetailOpen] = useState(false)
  const [alertMessageOpen, setAlertMessageOpen] = useState(false)


  const handleGetUsers = async () => {
    try {
      const res = await getUsers()
      console.log(res)

      if (res?.status === 200) {
        setUsers(res?.data.users)
      } else {
        console.log("No users")
      }
    } catch (err) {
      console.log(err)
    }

    setLoading(false)
  }

  return (
    <>
      {
        !loading ? (
          users?.length > 0 ? (
            <Grid container justify="center">
              {
                users?.map((user: User, index: number) => {
                  return (
                    <div key={index} onClick={() => {
                      setUser(user)
                      setUserDetailOpen(true)
                    }}>
                      <Grid item style={{ margin: "0.5rem", cursor: "pointer" }}>
                        <Typography
                          variant="body2"
                          component="p"
                          gutterBottom
                          style={{ marginTop: "0.5rem", textAlign: "center" }}
                        >
                          {user.name}
                        </Typography>
                      </Grid>
                    </div>
                  )
                })
              }
            </Grid>
          ) : (
            <Typography
              component="p"
              variant="body2"
              color="textSecondary"
            >
              まだ1人もユーザーがいません。
            </Typography>
          )
        ) : (
          <></>
        )
      }
      <Dialog
        open={userDetailOpen}
        keepMounted
        onClose={() => setUserDetailOpen(false)}
      >
        <DialogContent>
          <Grid container justify="center">
            <Grid item>
              <Avatar
                alt="avatar"
                src={user?.image.url}
              />
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item style={{ marginTop: "1rem" }}>
              <Typography variant="body1" component="p" gutterBottom style={{ textAlign: "center" }}>
                {user.name})
              </Typography>
              <Divider />
              <Typography
                variant="body2"
                component="p"
                gutterBottom
                style={{ marginTop: "0.5rem", fontWeight: "bold" }}
              >
                自己紹介
              </Typography>
              <Typography variant="body2" component="p" color="textSecondary" style={{ marginTop: "0.5rem" }}>
                {user.profile ? user.profile : "よろしくお願いします。" }
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Users
