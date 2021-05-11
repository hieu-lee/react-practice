import {
  Button,
  LinearProgress,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import DatePicker from "./DatePicker";
import React, { useEffect, useState } from "react";
import {
  GetItemsFromDateAsync,
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

type DayTasksPageProps = {
  LoggedState: boolean;
  setLoggedState: React.Dispatch<React.SetStateAction<boolean>>;
  UsernameState: string;
  setUsernameState: React.Dispatch<React.SetStateAction<string>>;
};

export default function DayTasksPage(props: DayTasksPageProps) {
  const [LoadingState, setLoadingState] = useState(true);
  const [DayTasks, setDayTasks] = useState(new Array<ToDoItem>());
  const [NewDate, setNewDate] = React.useState<Date | null>(new Date());
  useEffect(() => {
    if (props.LoggedState) {
      const GetDayTasks = async () => {
        var response = await GetItemsFromDateAsync(
          props.UsernameState,
          NewDate!.toISOString()
        );
        setDayTasks(response);
        setLoadingState(false);
        return response;
      };
      GetDayTasks();
    }
  }, [props.UsernameState, NewDate]);
  const classes = useStyles();
  const [FilteredTasks, setFilteredTasks] = useState(DayTasks);
  const [value, setValue] = React.useState(0);
  useEffect(() => {
    const updateFilter = () => {
      switch (value) {
        case 0:
          setFilteredTasks(DayTasks);
          return;
        case 1:
          setFilteredTasks(DayTasks.filter((item) => !item.completed));
          return;
        case 2:
          setFilteredTasks(DayTasks.filter((item) => item.important));
          return;
        case 3:
          setFilteredTasks(DayTasks.filter((item) => item.completed));
          return;
        default:
          return;
      }
    };
    updateFilter();
  }, [value, DayTasks]);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  const SaveListAsync = async () => {
    await UpdateTodayItemsAsync(DayTasks);
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
            Day Tasks
          </Typography>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={SaveListAsync} variant="contained" color="primary">
              Save List
            </Button>
          </div>
          <div style={{ marginTop: "10px" }}>
            <DatePicker
              label="Date"
              NewDate={NewDate}
              setNewDate={setNewDate}
            />
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
                  ListState={DayTasks}
                  setListState={setDayTasks}
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
