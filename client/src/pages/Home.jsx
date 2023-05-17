import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import FolderList from "../components/FolderList";
import UserMenu from "../components/UserMenu";
import PushNotification from "../components/PushNotification";

export default function Home() {

  //sd Hook useLoaderData de lay dl ra tu router {folders} ky hieu viet tat object directoring
  // const data = useLoaderData();
  // console.log("🚀 ~ file: Home.jsx:12 ~ Home ~ data:", data)

  const {folders} = useLoaderData()
  console.log("🚀 ~ file: Home.jsx:12 ~ Home ~ data:", folders)
  

  return (
    <>
      <Typography variant="h4" sx={{ mb: "20px" }}>
        Note App
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "right", mb: "10px" }}>
        {/* Tao comp UserMenu trong folder components roi import vao */}
        <UserMenu />
        <PushNotification />
      </Box>

      <Grid
        container
        sx={{ height: "50vh", boxShadow: "0 0 15px 0 rgb(193 193 193 / 60%)" }}
      >
        {/* Chia lam 2 cot 3 va 9 */}
        <Grid item xs={3} sx={{ height: "100%" }}>
          {/* Tao comp FolderList trong folder components roi import vao */}
          <FolderList
          // lay tu api
          folders={folders}

          // hardcode
            // folders={[
            //   { id: '1', name: 'DATA MLG' },
            //   { id: '2', name: 'DATA RTVN' },
            // ]}
          />
          {/* <p>Folder List</p> */}
        </Grid>

        <Grid item xs={9} sx={{ height: "100%" }}>
          {/* Tao comp Outlet NoteList trong folder components roi import vao */}
          <Outlet />
          {/* <p>Note List</p> */}
        </Grid>
      </Grid>
    </>
  );
}
