import React, { useContext, useState, useCallback } from "react"
import { useNavigate, Link } from "react-router-dom"
import Cookies from "js-cookie"

import { makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Grid from "@material-ui/core/Grid"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import Button from "@material-ui/core/Button"
import PhotoCamera from "@material-ui/icons/PhotoCamera"
import IconButton from "@material-ui/core/IconButton"
import Box from "@material-ui/core/Box"
import CancelIcon from "@material-ui/icons/Cancel"

import { AuthContext } from "../../App"
import  AlertMessage  from "../utils/AlertMessage"
import { signUp } from "../../lib/api/auth"



const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(6)
  },
  submitBtn: {
    marginTop: theme.spacing(1),
    flexGrow: 1,
    textTransform: "none"
  },
  header: {
    textAlign: "center"
  },
  card: {
    padding: theme.spacing(2),
    maxWidth: 340
  },
  inputFileButton: {
    textTransform: "none",
    color: theme.palette.primary.main
  },
  imageUploadBtn: {
    textAlign: "right"
  },
  input: {
    display: "none"
  },
  box: {
    marginBottom: "1.5rem"
  },
  preview: {
    width: "100%"
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

  const [image, setImage] = useState("")
  const [preview, setPreview] = useState("")

  // アップロードした画像のデータを取得
   const uploadImage = useCallback((e) => {
     const file = e.target.files[0]
     setImage(file)
   }, [])

   // 画像プレビューを表示
   const previewImage = useCallback((e) => {
     const file = e.target.files[0]
     setPreview(window.URL.createObjectURL(file))
   }, [])

  const handleSubmit = async (e) => {

    e.preventDefault()

    const data = {
      name: name,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation,
      image: image
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

        history("/")

        setName("")
        setEmail("")
        setPassword("")
        setPasswordConfirmation("")


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
      <h2>必要情報を入力してください</h2>
      <form noValidate autoComplete="off">
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="サインアップ"/>
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
          <div className={classes.imageUploadBtn}>
            <input
              accept="image/*"
              className={classes.input}
              id="icon-button-file"
              type="file"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                uploadImage(e)
                previewImage(e)
              }}
            />
            <label htmlFor="icon-button-file">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </div>
          {
              preview ? (
                <Box
                  className={classes.box}
                >
                  <IconButton
                    color="inherit"
                    onClick={() => setPreview("")}
                  >
                    <CancelIcon />
                  </IconButton>
                  <img
                    src={preview}
                    alt="preview img"
                    className={classes.preview}
                  />
                </Box>
              ) : null
            }
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
