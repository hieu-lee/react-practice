import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import GitHubIcon from "@material-ui/icons/GitHub";
import ListItems from "./listItems";
import ListsPage from "./ListsPage";
import { Route, Switch } from "react-router-dom";
import TasksPage from "./TasksPage";
import LogInPage from "./LogInPage";
import TodayTasksPage from "./TodayTasksPage";
import DayTasksPage from "./DayTasksPage";

type DashboardProps = {
  LoggedState: boolean;
  setLoggedState: React.Dispatch<React.SetStateAction<boolean>>;
  UsernameState: string;
  setUsernameState: React.Dispatch<React.SetStateAction<string>>;
};

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  newTitleTextField: {
    margin: "0 10px",
  },
}));

export default function Dashboard(props: DashboardProps) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            To Do
          </Typography>
          <a
            href="https://github.com/hieu-lee/react-practice"
            target="_blank"
            rel="noreferrer"
            style={{ color: "white", outline: "none" }}
          >
            <IconButton color="inherit">
              <GitHubIcon />
            </IconButton>
          </a>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItems />
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Switch>
            <Route exact path="/react-practice/">
              <ListsPage
                LoggedState={props.LoggedState}
                setLoggedState={props.setLoggedState}
                UsernameState={props.UsernameState}
                setUsernameState={props.setUsernameState}
              />
            </Route>
            <Route exact path="/react-practice/log">
              <LogInPage
                LoggedState={props.LoggedState}
                setLoggedState={props.setLoggedState}
                UsernameState={props.UsernameState}
                setUsernameState={props.setUsernameState}
              />
            </Route>
            <Route
              exact
              path="/react-practice/task/:listId/:listName"
              render={(routeProps) => (
                <TasksPage
                  listName={routeProps.match.params.listName}
                  listId={routeProps.match.params.listId}
                  LoggedState={props.LoggedState}
                  setLoggedState={props.setLoggedState}
                  UsernameState={props.UsernameState}
                  setUsernameState={props.setUsernameState}
                />
              )}
            />
            <Route exact path="/react-practice/today-tasks">
              <TodayTasksPage
                LoggedState={props.LoggedState}
                setLoggedState={props.setLoggedState}
                UsernameState={props.UsernameState}
                setUsernameState={props.setUsernameState}
              />
            </Route>
            <Route exact path="/react-practice/day-tasks">
              <DayTasksPage
                LoggedState={props.LoggedState}
                setLoggedState={props.setLoggedState}
                UsernameState={props.UsernameState}
                setUsernameState={props.setUsernameState}
              />
            </Route>
          </Switch>
        </Container>
      </main>
    </div>
  );
}
