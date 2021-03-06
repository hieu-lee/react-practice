import React, { useEffect, useState } from "react";
import { BrowserRouter, NavLink } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";
import { GetListsAsync, GetOneTodayItem } from "./apis/ListsService";
import { AlertTitle } from "@material-ui/lab";
import { Howl, Howler } from "howler";
import ToDoList from "./models/ToDoList";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App() {
  Howler.volume(0.8);
  const [LoadingState, setLoadingState] = useState(true);
  const [MyLists, setMyLists] = useState(new Array<ToDoList>());
  const [snackbarOpenState, setSnackbarOpenState] = useState(false);
  const [snackbarTimeState, setSnackbarTimeState] = useState("");
  const [snackbarTitleState, setSnackbarTitleState] = useState("");
  const [LoggedState, setLoggedState] = useState(false);
  const [UsernameState, setUsernameState] = useState("");
  useEffect(() => {
    const getMyLists = async () => {
      if (LoggedState) {
        var myLists = await GetListsAsync(UsernameState);
        setMyLists(myLists);
        setLoadingState(false);
        return myLists;
      }
    };
    getMyLists();
  }, [UsernameState]);
  useEffect(() => {
    const GetNotification = async () => {
      if (LoggedState) {
        var item = await GetOneTodayItem(UsernameState);
        if (item !== null && `${item}` !== "") {
          var date =
            item.timeRemind === null ? null : new Date(item.timeRemind);
          var time =
            date === null
              ? "Daily"
              : `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} at ${date.toLocaleTimeString()}`;
          setSnackbarTimeState(time);
          setSnackbarTitleState(item.title);
          const AudioSound = new Howl({
            src: "/react-practice/notification.mp3",
          });
          AudioSound.play();
          setSnackbarOpenState(true);
        }
      }
    };
    const interval = setInterval(GetNotification, 20000);
    return () => clearInterval(interval);
  });

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    if (event !== null) {
      event!.preventDefault();
    }
    setSnackbarOpenState(false);
  };
  const GetSesstionInfos = () => {
    var oldLoggedState = localStorage.getItem("ToDoListLoggedState");
    if (oldLoggedState === null || oldLoggedState === "false") {
      setLoggedState(false);
      localStorage.setItem("ToDoListLoggedState", "false");
    } else {
      setLoggedState(true);
      var oldUsername = localStorage.getItem("ToDoListUsernameState");
      if (oldUsername !== null) {
        setUsernameState(oldUsername);
      }
    }
  };
  useEffect(() => {
    GetSesstionInfos();
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Dashboard
          LoadingState={LoadingState}
          MyLists={MyLists}
          setMyLists={setMyLists}
          LoggedState={LoggedState}
          setLoggedState={setLoggedState}
          UsernameState={UsernameState}
          setUsernameState={setUsernameState}
        />
        <Snackbar
          open={snackbarOpenState}
          autoHideDuration={10000}
          onClose={handleClose}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
        >
          <NavLink
            to={"/react-practice/today-tasks"}
            style={{ textDecoration: "none" }}
          >
            <Alert
              onClose={handleClose}
              severity="info"
              style={{ background: "#6B79C6" }}
            >
              <AlertTitle>{snackbarTitleState}</AlertTitle>
              <small>Time: {snackbarTimeState}</small>
            </Alert>
          </NavLink>
        </Snackbar>
      </BrowserRouter>
    </div>
  );
}

export default App;
