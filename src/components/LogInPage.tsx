import {
  Button,
  CircularProgress,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import MuiAlert, { AlertProps, Color } from "@material-ui/lab/Alert";
import React, { useState } from "react";
import { SignIn, SignUp } from "../apis/AccountsService";
import Account from "../models/Account";
import "./LogInPage.css";

type LogInPageProps = {
  LoggedState: boolean;
  setLoggedState: React.Dispatch<React.SetStateAction<boolean>>;
  UsernameState: string;
  setUsernameState: React.Dispatch<React.SetStateAction<string>>;
};

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

type LogButtonProps = {
  text: string;
  onClickHandler: () => Promise<void>;
  LoadingState: boolean;
};

function LogButton(props: LogButtonProps) {
  if (!props.LoadingState) {
    return (
      <Button
        onClick={props.onClickHandler}
        variant="contained"
        color="primary"
      >
        {props.text}
      </Button>
    );
  } else {
    return <CircularProgress />;
  }
}

export default function LogInPage(props: LogInPageProps) {
  const [LoadingState, setLoadingState] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [snackbarOpenState, setSnackbarOpenState] = useState(false);
  const [snackbarSeverityState, setSnackbarSeverityState] =
    useState<Color>("error");
  const [snackbarMessageState, setSnackbarMessageState] = useState("");
  const ChangeRegister = () => {
    setUsername("");
    setPassword("");
    setPasswordConfirm("");
    setRegister(!register);
  };
  const LogOut = () => {
    props.setLoggedState(false);
    props.setUsernameState("");
    localStorage.setItem("LoggedState", "false");
    localStorage.setItem("UsernameState", "");
  };
  const LogInAsync = async () => {
    if (username.trim() === "") {
      setSnackbarMessageState("You need to fill in your username");
      setSnackbarSeverityState("error");
      setSnackbarOpenState(true);
      return;
    } else if (password.trim().length < 6) {
      setSnackbarMessageState("Your password must be at least 6 characters");
      setSnackbarSeverityState("error");
      setSnackbarOpenState(true);
      return;
    } else {
      setLoadingState(true);
      const myAcc = new Account(username, password);
      try {
        await SignIn(myAcc);
        setLoadingState(false);
        setSnackbarMessageState("Successfully signed in");
        setSnackbarSeverityState("success");
        props.setLoggedState(true);
        props.setUsernameState(username);
        localStorage.setItem("LoggedState", "true");
        localStorage.setItem("UsernameState", username);
        setSnackbarOpenState(true);
      } catch (err) {
        setLoadingState(false);
        setSnackbarMessageState(err.response.data);
        setSnackbarSeverityState("error");
        setSnackbarOpenState(true);
      }
    }
  };
  const SignUpAsync = async () => {
    if (username.trim() === "") {
      setSnackbarMessageState("You need to fill in your username");
      setSnackbarSeverityState("error");
      setSnackbarOpenState(true);
      return;
    } else if (password.trim().length < 6) {
      setSnackbarMessageState("Your password must be at least 6 characters");
      setSnackbarSeverityState("error");
      setSnackbarOpenState(true);
      return;
    } else if (password.trim() !== passwordConfirm.trim()) {
      setSnackbarMessageState("You haven't correctly confirm your password");
      setSnackbarSeverityState("error");
      setSnackbarOpenState(true);
    } else {
      setLoadingState(true);
      setUsername(username.trim());
      setPassword(password.trim());
      const myAcc = new Account(username, password);
      try {
        await SignUp(myAcc);
        setLoadingState(false);
        setSnackbarMessageState("Successfully signed up with your new account");
        setSnackbarSeverityState("success");
        props.setLoggedState(true);
        props.setUsernameState(username);
        localStorage.setItem("LoggedState", "true");
        localStorage.setItem("UsernameState", username);
        setSnackbarOpenState(true);
      } catch (err) {
        setLoadingState(false);
        setSnackbarMessageState(err.response.data);
        setSnackbarSeverityState("error");
        setSnackbarOpenState(true);
      }
    }
  };
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpenState(false);
  };
  if (!props.LoggedState) {
    if (!register) {
      return (
        <div className="wrapper">
          <Paper
            elevation={3}
            style={{ textAlign: "center", padding: "20px 40px" }}
          >
            <div className="form">
              <Typography variant="h4">Sign In</Typography>
              <TextField
                label="Username"
                required={true}
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setUsername(e.target.value);
                }}
              />
              <br />
              <br />
              <TextField
                label="Password"
                type="password"
                required={true}
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value);
                }}
              />
              <br />
              <br />
              <Typography variant="caption">
                Don't have an account yet?{" "}
                <span
                  className="span-link"
                  onClick={ChangeRegister}
                  style={{ color: "#3F51B5", cursor: "pointer" }}
                >
                  Register
                </span>
              </Typography>
              <br />
              <br />
              <LogButton
                text={"Login"}
                onClickHandler={LogInAsync}
                LoadingState={LoadingState}
              />
            </div>
          </Paper>
          <Snackbar
            open={snackbarOpenState}
            autoHideDuration={5000}
            onClose={handleClose}
            anchorOrigin={{ horizontal: "right", vertical: "top" }}
          >
            <Alert onClose={handleClose} severity={snackbarSeverityState}>
              {snackbarMessageState}
            </Alert>
          </Snackbar>
        </div>
      );
    } else {
      return (
        <div className="wrapper">
          <Paper
            elevation={3}
            style={{ textAlign: "center", padding: "20px 40px" }}
          >
            <div className="form">
              <Typography variant="h4">Sign Up</Typography>
              <TextField
                label="Username"
                required={true}
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setUsername(e.target.value);
                }}
              />
              <br />
              <br />
              <TextField
                label="Password"
                type="password"
                required={true}
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value);
                }}
              />
              <br />
              <br />
              <TextField
                label="Confirm Password"
                type="password"
                required={true}
                value={passwordConfirm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPasswordConfirm(e.target.value);
                }}
              />
              <br />
              <br />
              <Typography variant="caption">
                Already had an account?{" "}
                <span
                  className="span-link"
                  onClick={ChangeRegister}
                  style={{ color: "#3F51B5", cursor: "pointer" }}
                >
                  Sign In
                </span>
              </Typography>
              <br />
              <br />
              <LogButton
                text={"Sign Up"}
                onClickHandler={SignUpAsync}
                LoadingState={LoadingState}
              />
            </div>
          </Paper>
          <Snackbar
            open={snackbarOpenState}
            autoHideDuration={5000}
            onClose={handleClose}
            anchorOrigin={{ horizontal: "right", vertical: "top" }}
          >
            <Alert onClose={handleClose} severity={snackbarSeverityState}>
              {snackbarMessageState}
            </Alert>
          </Snackbar>
        </div>
      );
    }
  } else {
    return (
      <div className="wrapper">
        <Paper
          elevation={3}
          style={{ textAlign: "center", padding: "20px 40px" }}
        >
          <Typography variant="h4">
            You have already logged in as {props.UsernameState}
          </Typography>
          <br />
          <br />
          <Button onClick={LogOut} color="primary" variant="contained">
            Log Out
          </Button>
        </Paper>
        <Snackbar
          open={snackbarOpenState}
          autoHideDuration={5000}
          onClose={handleClose}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
        >
          <Alert onClose={handleClose} severity={snackbarSeverityState}>
            {snackbarMessageState}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}
