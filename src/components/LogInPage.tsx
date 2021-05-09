import { Button, Paper, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import "./LogInPage.css";

type LogInPageProps = {
  LoggedState: boolean;
  setLoggedState: React.Dispatch<React.SetStateAction<boolean>>;
  UsernameState: string;
  setUsernameState: React.Dispatch<React.SetStateAction<string>>;
};

export default function LogInPage(props: LogInPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
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
  const LogIn = () => {
    props.setLoggedState(true);
    props.setUsernameState(username);
    localStorage.setItem("LoggedState", "true");
    localStorage.setItem("UsernameState", username);
  };
  const SignUp = () => {
    props.setLoggedState(true);
    props.setUsernameState(username);
    localStorage.setItem("LoggedState", "true");
    localStorage.setItem("UsernameState", username);
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
              <Button variant="contained" color="primary">
                Login
              </Button>
            </div>
          </Paper>
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
              <Button variant="contained" color="primary">
                Sign Up
              </Button>
            </div>
          </Paper>
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
          <Button color="primary" variant="contained">
            Log Out
          </Button>
        </Paper>
      </div>
    );
  }
}
