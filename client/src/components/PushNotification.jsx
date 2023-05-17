import React, { useEffect, useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { GRAPHQL_SUBSCRIPTION_ENDPOINT } from "../utils/constants";

import { createClient } from "graphql-ws";
import { Badge, Menu, MenuItem } from "@mui/material";

const client = createClient({
  url: GRAPHQL_SUBSCRIPTION_ENDPOINT
});

const query = `subscription PushNotification {

    notification {
      message
    }
  }`;

export default function PushNotification() {
  const [invisible, setInvisible] = useState(true);
  //hien ra thong bao moi nhat
  const [notification, setNotification] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);
  // const [open, setOpen ] = useState(false)
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
    setNotification('')
    setInvisible(true)
  };
  const handleClick = e => {
    if(notification) {
    setAnchorEl(e.currentTarget);
  }
  };


  // Lang nghe event
  useEffect(() => {
    // TAO PROMISE thuc thi client.subscribe
    // subscription
    (async () => {
      const onNext = data => {
        setInvisible(false);

        //lay ra message
        const message = data?.data?.notification?.message;
        setNotification(message);
        console.log("[PUSH NOTIFICATION]", { data });
        /* handle incoming values */
      };

      //   let unsubscribe = () => {
      //     /* complete the subscription */
      //   };

      await new Promise((resolve, reject) => {
        client.subscribe(
          //thuc thi
          {
            query
          },

          {
            next: onNext,
            error: reject,
            complete: resolve
          }
        );
      });

      //   expect(onNext).toBeCalledTimes(5); // we say "Hi" in 5 languages
    })();
  }, []);

  return (
  <>
    <Badge color="secondary" variant="dot" invisible={invisible}>
      {" "}
      <NotificationsIcon onClick={handleClick}/>
    </Badge>
    <Menu
      // id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose}>{notification}</MenuItem>
    </Menu>
  </>
  )
}
