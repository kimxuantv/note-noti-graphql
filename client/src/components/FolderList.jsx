import { Card, CardContent, List, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import NewFolder from "./NewFolder";

// truyen comp cha {folders} vao de lay ds
export default function FolderList({folders}) {
  // const params = useParams()
  const folderId = useParams()
  console.log("🚀 ~ file: FolderList.jsx:10 ~ FolderList ~ folderId:", folderId)

  const [ activeFolderId, setActiveFolderId] = useState(folderId)
  
  // const { folder } = useLoaderData();
  // const navigate = useNavigate()
  
  // //set folder mac dinh dau tien
  // useEffect(() => {
  //   if(folderId) {
  //     setActiveFolderId(folderId)
  //   }
  //   if(folder?.[0]) {
  //     navigate(`/folder/${folder[0].id}`)
  //   }
  // }, [folderId, folder])

  return (
    <List sx={{
        width: '100%',
        bgcolor: '#7D9D9C',
        height: '100%',
        padding: '10px',
        textAlign: 'left',
        overflowY: 'auto' //neu vuot qua thi cho thanh scroll Y xuong
    }}
    subheader={
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Typography sx={{fontWeight: 'bold', color: 'white'}}>
                Tiêu Đề
            </Typography>

            <NewFolder />
        </Box>
    }
    >
      {folders.map(({ id, name }) => {
        return (
          <Link
            key={id}
            to={`folders/${id}`}
            style={{ textDecoration: "none" }}

            onClick={() => setActiveFolderId(id)}
          >

            <Card sx={{mb: '5px', backgroundColor: id === activeFolderId ? 'rgb(255 211 140)' : null}}>
                {/* default padding-bottom last child 24px - overrive giong !important &:last-child  */}
              <CardContent sx={{ '&:last-child': {pd: '10px'}, padding: '10px'}}> 
                <Typography sx={ {fontSize: 16, fontWeight: 'bold'}}>{name}</Typography>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </List>
  );
}
