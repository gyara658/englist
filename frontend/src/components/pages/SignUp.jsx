import React, { useContext, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import Cookies from "js-cookie"

import { makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import Button from "@material-ui/core/Button"

import { AuthContext } from "../../App"
import  AlertMessage  from "../utils/AlertMessage"
import { signUp } from "../../lib/api/auth"



const useStyles = makeStyles((theme: Theme) => ({
  csubmitBtn: {
    paddingTop: theme.spacing(2),
    textAlign: "right",
    flexGrow: 1,
    textTransform: "none"
  },
  header: {
    textAlign: "center"
  },
  card: {
    padding: theme.spacing(2),
    maxWidth: 400
  }
}))

const SignUp = () => {
  const classes = useStyles()
  const history = useNavigate()

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [alertMessageOpen, setAlertMessageOpen] = useState(false)


  const handleSubmit = async (e) => {

    e.preventDefault()

    const data = {
      name: name,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation
    }

    try {
      const res = await signUp(data)
      console.log(res)

      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"])
        Cookies.set("_client", res.headers["client"])
        Cookies.set("_uid", res.headers["uid"])

        setIsSignedIn(true)
        setCurrentUser(res.data.data)

        history("/home")

        console.log("Signed in successfully!")
      } else {
        setAlertMessageOpen(true)
      }
    } catch (err) {
      console.log(err)
      setAlertMessageOpen(true)
    }
  }

  return (
    <>
      <h1>サインアップページです</h1>
      <form noValidate autoComplete="off">
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="Sign Up" />
        <CardContent>
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Name"
            value={name}
            margin="dense"
            onChange={event => setName(event.target.value)}
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Email"
            value={email}
            margin="dense"
            onChange={event => setEmail(event.target.value)}
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            margin="dense"
            autoComplete="current-password"
            onChange={event => setPassword(event.target.value)}
          />
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Password Confirmation"
            type="password"
            value={passwordConfirmation}
            margin="dense"
            autoComplete="current-password"
            onChange={event => setPasswordConfirmation(event.target.value)}
          />
          <div style={{ textAlign: "right"}} >
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              color="default"
              disabled={!name || !email || !password || !passwordConfirmation ? true : false}
              className={classes.submitBtn}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
    <AlertMessage // エラーが発生した場合はアラートを表示
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="Invalid email or password"
      />
        <Link to="/signin">サインインへ</Link>
    </>
  )
}

export default SignUp
