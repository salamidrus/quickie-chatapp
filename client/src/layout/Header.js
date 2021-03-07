import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Link from "@material-ui/core/Link";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

import { authenticationService } from "../services/authenticationService";
import history from "../utilities/history";
import logo from "./logo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "30px",
  },
  userDropdown: {
    marginLeft: theme.spacing(2),
    padding: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      marginLeft: "auto",
    },
  },
  logo: {
    width: "10%",
  },
}));

function Header() {
  const [currentUser] = useState(authenticationService.currentUserValue);
  const [anchorEl, setAnchorEl] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropClose = () => {
    setDropdownOpen(false);
    setAnchorEl(null);
  };

  const handleDropOpen = (event) => {
    setDropdownOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    authenticationService.logout();
    history.push("/");
  };

  const arrowIcon = () => {
    if (dropdownOpen) {
      return <ArrowDropUpIcon />;
    }
    return <ArrowDropDownIcon />;
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.bgColor}>
        <Toolbar>
          <Link href="/" className={classes.title}>
            <img src={logo} alt="Logo" className={classes.logo} />
          </Link>
          <Button
            aria-owns={anchorEl ? "simple-menu" : undefined}
            aria-haspopup="true"
            onClick={handleDropOpen}
            className={classes.userDropdown}
            color="inherit"
          >
            {currentUser.name}
            {arrowIcon()}
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleDropClose}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
