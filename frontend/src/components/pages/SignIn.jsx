import Cookies from "js-cookie";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { makeStyles, Theme } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"
import TextField from "@material-ui/core/TextField"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import Button from "@material-ui/core/Button"
import Box from "@material-ui/core/Box"


import { signIn } from "../../lib/api/auth";
import { AuthContext } from "../../App";
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
  },
  box: {
    marginTop: "2rem"
  },
  link: {
    textDecoration: "none"
  }
}))


export const SignIn = () => {
  const classes = useStyles()
  const history = useNavigate()

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessageOpen, setAlertMessageOpen] = useState(false)


  const generateParams = () => {
    const signInParams = {
      email: email,
      password: password,
    };
    return signInParams;
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault()

    const params = {
      email: email,
      password: password
    }
    
    try {
      const res = await signIn(params);
      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        history.push("/");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <p>サインインページです</p>
      <form noValidate autoComplete="off">
      <Card className={classes.card}>

        <CardHeader className={classes.header} title="Sign In" />
          <CardContent>
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
            placeholder="At least 6 characters"
            value={password}
            margin="dense"
            autoComplete="current-password"
            onChange={event => setPassword(event.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            color="default"
            disabled={!email || !password ? true : false} // 空欄があった場合はボタンを押せないように
            className={classes.submitBtn}
            onClick={handleSignInSubmit}
          >
            Submit
          </Button>
          <Box textAlign="center" className={classes.box}>
              <Typography variant="body2">
                Don't have an account? &nbsp;
                <Link to="/signup" className={classes.link}>
                  Sign Up now!
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </form>
      <AlertMessage // エラーが発生した場合はアラートを表示
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="Invalid emai or password"
      />
    </>
  );
}


export default SignIn


// <form>
//   <div>
//     <label htmlFor="email">メールアドレス</label>
//     <input
//       type="email"
//       id="email"
//       name="email"
//       value={email}
//       onChange={(e) => setEmail(e.target.value)}
//     />
//   </div>
//   <div>
//     <label htmlFor="password">パスワード</label>
//     <input
//       type="password"
//       id="password"
//       name="password"
//       value={password}
//       onChange={(e) => setPassword(e.target.value)}
//     />
//   </div>
//   <button type="submit" onClick={(e) => handleSignInSubmit(e)}>
//     Submit
//   </button>
// </form>
// <Link to="/signup">サインアップへ</Link>
