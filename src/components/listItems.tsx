import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import TodayIcon from "@material-ui/icons/Today";
import DateRangeIcon from "@material-ui/icons/DateRange";
import { NavLink } from "react-router-dom";

export default function ListItems() {
  return (
    <nav>
      <NavLink to={"/"} style={{ textDecoration: "none", color: "#202020" }}>
        <ListItem button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      </NavLink>
      <NavLink to={"/log"} style={{ textDecoration: "none", color: "#202020" }}>
        <ListItem button>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Log In" />
        </ListItem>
      </NavLink>
      <ListItem button>
        <ListItemIcon>
          <TodayIcon />
        </ListItemIcon>
        <ListItemText primary="Today Tasks" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <DateRangeIcon />
        </ListItemIcon>
        <ListItemText primary="Custom Day Tasks" />
      </ListItem>
    </nav>
  );
}
