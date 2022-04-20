import Cookies from "js-cookie"
import React, { useContext, useState } from "react"
import { useNavigate, Link } from "react-router-dom"

import { makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import Button from "@material-ui/core/Button"

import { signUp } from "../../lib/api/auth"
import { AuthContext } from "../../App"
import  AlertMessage  from "../utils/AlertMessage"


const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(6)
  },
  submitBtn: {
    marginTop: theme.spacing(2),
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

export const SignUp = () => {
  const classes = useStyles()
  const history = useNavigate()

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [alertMessageOpen, setAlertMessageOpen] = useState(false)
  // const confirmSuccessUrl = "http://localhost:3000";

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const params: SignUpParams = {
      name: name,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation
    }

    try {
      const res = await signUp(params)
      console.log(res)

      if (res.status === 200) {
        // アカウント作成と同時にログインさせてしまう
        // 本来であればメール確認などを挟むべきだが、今回はサンプルなので
        Cookies.set("_access_token", res.headers["access-token"])
        Cookies.set("_client", res.headers["client"])
        Cookies.set("_uid", res.headers["uid"])

        setIsSignedIn(true)
        setCurrentUser(res.data.data)

        history.push("/")

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
        </CardContent>
      </Card>
    </form>
    <AlertMessage // エラーが発生した場合はアラートを表示
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="Invalid emai or password"
      />
        <Link to="/signin">サインインへ</Link>



    </>
  )
}

// <label htmlFor="email">メールアドレス</label>
// <input
//   type="email"
//   id="email"
//   name="email"
//   value={email}
//   onChange={(e) => setEmail(e.target.value)}
// />

// <div>
//   <label htmlFor="password">パスワード</label>
//   <input
//     type="password"
//     id="password"
//     name="password"
//     value={password}
//     onChange={(e) => setPassword(e.target.value)}
//   />
// </div>
// <div>
//   <label htmlFor="password_confirmation">パスワード確認</label>
//   <input
//     type="password"
//     id="password_confirmation"
//     name="password_confirmation"
//     value={passwordConfirmation}
//     onChange={(e) => setPasswordConfirmation(e.target.value)}
//   />
// </div>
// <div>
//   <input
//     type="hidden"
//     id="confirm_success_url"
//     name="confirm_success_url"
//     value={confirmSuccessUrl}
//   />
// </div>
// <button type="submit" onClick={(e) => handleSignUpSubmit(e)}>
//   Submit
// </button>
