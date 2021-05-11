import {
  Button,
  LinearProgress,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  GetTodayItemsAsync,
  UpdateTodayItemsAsync,
} from "../apis/ListsService";
import ToDoItem from "../models/ToDoItem";
import LogInPage from "./LogInPage";
import TaskItem from "./TaskItem";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

type TodayTasksPageProps = {
  LoggedState: boolean;
  setLoggedState: React.Dispatch<React.SetStateAction<boolean>>;
  UsernameState: string;
  setUsernameState: React.Dispatch<React.SetStateAction<string>>;
};

export default function TodayTasksPage(props: TodayTasksPageProps) {
  const [LoadingState, setLoadingState] = useState(true);
  const [TodayTasks, setTodayTasks] = useState(new Array<ToDoItem>());
  useEffect(() => {
    if (props.LoggedState) {
      const GetTodayTasks = async () => {
        var response = await GetTodayItemsAsync(props.UsernameState);
        setTodayTasks(response);
        setLoadingState(false);
        return response;
      };
      GetTodayTasks();
    }
  }, [props.UsernameState]);
  const classes = useStyles();
  const [FilteredTasks, setFilteredTasks] = useState(TodayTasks);
  const [value, setValue] = React.useState(0);
  useEffect(() => {
    const updateFilter = () => {
      switch (value) {
        case 0:
          setFilteredTasks(TodayTasks);
          return;
        case 1:
          setFilteredTasks(TodayTasks.filter((item) => !item.completed));
          return;
        case 2:
          setFilteredTasks(TodayTasks.filter((item) => item.important));
          return;
        case 3:
          setFilteredTasks(TodayTasks.filter((item) => item.completed));
          return;
        default:
          return;
      }
    };
    updateFilter();
  }, [value, TodayTasks]);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  const SaveListAsync = async () => {
    await UpdateTodayItemsAsync(TodayTasks);
    return;
  };
  if (props.LoggedState) {
    if (LoadingState) {
      return (
        <div>
          <LinearProgress />
          <Typography gutterBottom align="center" variant="h5">
            Getting your tasks...
          </Typography>
        </div>
      );
    } else {
      return (
        <div>
          <Typography variant="h3" gutterBottom align="center">
            Today Tasks
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "10px",
            }}
          >
            <Button onClick={SaveListAsync} variant="contained" color="primary">
              Save List
            </Button>
          </div>
          <Paper className={classes.root}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="All Tasks" />
              <Tab label="Uncompleted Tasks" />
              <Tab label="Important Tasks" />
              <Tab label="Completed Tasks" />
            </Tabs>
          </Paper>
          <ul>
            {FilteredTasks.map((item) => (
              <li key={item.itemId}>
                <TaskItem
                  UsernameState={props.UsernameState}
                  Item={item}
                  ListState={TodayTasks}
                  setListState={setTodayTasks}
                />
              </li>
            ))}
          </ul>
        </div>
      );
    }
  } else {
    return (
      <LogInPage
        LoggedState={props.LoggedState}
        setLoggedState={props.setLoggedState}
        UsernameState={props.UsernameState}
        setUsernameState={props.setUsernameState}
      />
    );
  }
}
