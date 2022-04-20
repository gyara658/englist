import React from "react"
import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert from "@material-ui/lab/Alert"

function Alert(props){
  return <MuiAlert elevation={6} variant="filled" {...props} />
}



// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

const AlertMessage = ({ open,setOpen, severity, message }: AlertMessageProps) => {
  const handleCloseAlertMessage = (e, reason) => {
    if (reason === "clickaway") return

    setOpen(false)
  }

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleCloseAlertMessage}
      >
        <Alert onClose={handleCloseAlertMessage} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default AlertMessage
