import React, { useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import Cookies from "js-cookie"

import { makeStyles, Theme } from "@material-ui/core/styles"

import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import PersonIcon from "@material-ui/icons/Person"
import SearchIcon from "@material-ui/icons/Search"
import ChatBubbleIcon from "@material-ui/icons/ChatBubble"
import ListAltIcon from '@mui/icons-material/ListAlt'

import { signOut } from "../../lib/api/auth"

import { AuthContext } from "../../App"

const useStyles =makeStyles((theme: Theme) => ({
  title: {
    flexGrow: 1,
    textDecoration: "none",
    color: "inherit"
  },
  linkBtn: {
    textTransform: "none",
    marginLeft: theme.spacing(1)
  }
}))

  const Header= () => {
    const { loading, isSignedIn, setIsSignedIn } = useContext(AuthContext)
    const classes = useStyles()
    const histroy = useNavigate()

    const handleSignOut = async (e) => {
      try {
        const res = await signOut()

        if (res.data.success === true) {
          // サインアウト時には各Cookieを削除
          Cookies.remove("_access_token")
          Cookies.remove("_client")
          Cookies.remove("_uid")

          setIsSignedIn(false)
          histroy.push("/signin")

          console.log("Succeeded in sign out")
        } else {
          console.log("Failed in sign out")
        }
      } catch (err) {
        console.log(err)
      }
    }

    const AuthButtons = () => {
      if (!loading) {
        if (isSignedIn) {
          return (
            <>
              <IconButton
                component={Link}
                to="/user/:id/list"
                edge="start"
                className={classes.linkBtn}
                color="inherit"
              >
                <ListAltIcon />
              </IconButton>
              <IconButton
                component={Link}
                to="/user/:id"
                edge="start"
                className={classes.linkBtn}
                color="inherit"
              >
                <PersonIcon />
              </IconButton>
            </>
          )
        } else {
          return (
            <>
              <IconButton
                component={Link}
                to="/signin"
                edge="start"
                className={classes.linkBtn}
                color="inherit"
              >
                <ExitToAppIcon />
              </IconButton>
            </>
          )
        }
      } else {
        return <></>
      }
    }


  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h5"
            className={classes.title}
          >
            Englishlist
          </Typography>
          <AuthButtons />
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header
