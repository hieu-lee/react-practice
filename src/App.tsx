import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";

function App() {
  const [LoggedState, setLoggedState] = useState(false);
  const [UsernameState, setUsernameState] = useState("");
  const GetSesstionInfos = () => {
    var oldLoggedState = localStorage.getItem("LoggedState");
    if (oldLoggedState === null || oldLoggedState === "false") {
      setLoggedState(false);
      localStorage.setItem("LoggedState", "false");
    } else {
      setLoggedState(true);
      var oldUsername = localStorage.getItem("UsernameState");
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
          LoggedState={LoggedState}
          setLoggedState={setLoggedState}
          UsernameState={UsernameState}
          setUsernameState={setUsernameState}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
