import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import LanguageIcon from "@material-ui/icons/Language";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import socketIOClient from "socket.io-client";

import { useGetConversations } from "../../services/chatService";
import { authenticationService } from "../../services/authenticationService";
import commonUtilities from "../../utilities/common";

const useStyles = makeStyles((theme) => ({
  subheader: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  globe: {
    backgroundColor: theme.palette.primary.main,
  },
  subheaderText: {
    color: theme.palette.primary.main,
  },
  list: {
    height: "calc(100vh - 112px)",
    overflowY: "auto",
  },
}));

const Conversations = (props) => {
  const classes = useStyles();
  const [conversations, setConversations] = useState([]);
  const [newConversation, setNewConversation] = useState(null);
  const getConversations = useGetConversations();

  // handler to filter out names except current user
  const handleRecipient = (recipients) => {
    for (let i = 0; i < recipients.length; i++) {
      if (
        recipients[i].username !==
        authenticationService.currentUserValue.username
      ) {
        return recipients[i];
      }
    }

    return null;
  };

  useEffect(() => {
    getConversations().then((res) => {
      console.log(res);
      setConversations(res.data);
    });
  }, [newConversation]);

  useEffect(() => {
    let socket = socketIOClient("/", {
      transports: ["websocket"],
      path: "/socket", // added this line of code
    });
    socket.on("messages", (data) => setNewConversation(data));

    return () => {
      socket.removeListener("messages");
    };
  }, []);

  return (
    <List className={classes.list}>
      <ListItem
        classes={{ root: classes.subheader }}
        onClick={() => {
          props.setScope("Global Chat");
        }}
      >
        <ListItemAvatar>
          <Avatar className={classes.globe}>
            <LanguageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText className={classes.subheaderText} primary="Global Chat" />
      </ListItem>
      <Divider />
      {conversations && (
        <React.Fragment>
          {conversations.map((c) => (
            <ListItem
              className={classes.listItem}
              key={c._id}
              button
              onClick={() => {
                props.setUser(handleRecipient(c.recipients));
                props.setScope(handleRecipient(c.recipients).name);
              }}
            >
              <ListItemAvatar>
                <Avatar>
                  {commonUtilities.getInitialsFromName(
                    handleRecipient(c.recipients).name
                  )}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={handleRecipient(c.recipients).name}
                secondary={<React.Fragment>{c.lastMessage}</React.Fragment>}
              />
            </ListItem>
          ))}
        </React.Fragment>
      )}
    </List>
  );
};

export default Conversations;
