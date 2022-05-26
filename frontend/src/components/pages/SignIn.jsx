import Cookies from "js-cookie"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { makeStyles, Theme } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"
import TextField from "@material-ui/core/TextField"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import Button from "@material-ui/core/Button"
import Box from "@material-ui/core/Box"


import { signIn } from "../../lib/api/auth"
import { AuthContext } from "../../App"
import  AlertMessage  from "../utils/AlertMessage"

const useStyles = makeStyles((theme: Theme) => ({
  submitBtn: {
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
  },
  box: {
    marginTop: "2rem"
  },
  link: {
    textDecoration: "none"
  }
}))

const SignIn = () => {
  const classes = useStyles()
  const history = useNavigate()

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessageOpen, setAlertMessageOpen] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = {
      email: email,
      password: password
    }

    try {
      const res = await signIn(data);

      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        history("/");

        console.log("Signed in successfully!")
      } else {
        setAlertMessageOpen(true)
      }
    } catch (e) {
      console.log(e);
      setAlertMessageOpen(true)
    }
  };

  return (
    <>
      <form noValidate autoComplete="off">
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="サインイン" />
          <CardContent>
          <TextField
            variant="outlined"
            required
            fullWidth
            label="メールアドレス"
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
            placeholder="最低6文字以上"
            value={password}
            margin="dense"
            autoComplete="current-password"
            onChange={event => setPassword(event.target.value)}
          />
          <Box className={classes.submitBtn} >
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              disabled={!email || !password ? true : false}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
          <Box textAlign="center" className={classes.box}>
              <Typography variant="body2">
              まだアカウントをお持ちでない方は
                <Link to="/signup" className={classes.link}>
                  こちら
                </Link>
                から作成してください。
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </form>
      <AlertMessage // エラーが発生した場合はアラートを表示
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="メールアドレスかパスワードが間違っています"
      />
    </>
  );
}


export default SignIn
