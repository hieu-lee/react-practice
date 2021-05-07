import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import TodayIcon from "@material-ui/icons/Today";
import DateRangeIcon from "@material-ui/icons/DateRange";

export default function ListItems() {
  return (
    <div>
      <ListItem button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Log In" />
      </ListItem>
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
    </div>
  );
}
