import { NoteAddOutlined } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  List,
  Tooltip,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Link, Outlet, useParams, useLoaderData, useSubmit, useNavigate } from "react-router-dom";

export default function NoteList() {
  const {noteId, folderId} = useParams();
  const [activeNoteId, setActiveNoteId] = useState(noteId);

  //sd Hook useLoaderData de lay dl ra tu router {folders}
  const { folder } = useLoaderData();
  console.log("🚀 ~ file: NoteList.jsx:12 ~ NoteList Frontend ~ folder:", {
    folder
  });

  const navigate = useNavigate()

  //Tu dong chon note dau tien
  useEffect(() => {
    if(noteId) {
      setActiveNoteId(noteId)
      return
    }
    //ko co dl note trong folder
    if(folder?.notes?.[0]) {
      navigate(`note/${folder.notes[0].id}`)
    }

  },[noteId, folder.notes])


  const submit = useSubmit()

  const handleAddNewNote = () => {
    //tinh nang moi React Router Dom-- thay doi dl trong router sd action
    submit({
      content: '', folderId
    }, {method: 'post', action: `/folders/${folderId}`})
  }

  // const folder = { notes: [{ id: "1", content: "<p>Data is fun</p>" }] };
  return (
    // <div>
    //   NoteList
    // </div>
    // Co 2 cot
    <Grid container height="100%">
      <Grid
        item
        xs={4}
        sx={{
          width: "100%",
          maxWidth: "360",
          bgcolor: "#f0eBe3",
          height: "100%",
          overflowY: "auto",
          padding: "10px",
          textAlign: "left"
        }}
      >
        {/* Nhan vao ds */}
        <List
          subheader={
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'space-between'}}>
              <Typography sx={{ fontWeight: "bold" }}>Nội Dung</Typography>
              <Tooltip title="Add Note" onClick={handleAddNewNote}>
                <IconButton size="small">
                  <NoteAddOutlined />
                </IconButton>
              </Tooltip>
            </Box>
          }
        >
          {/* lay dl ra */}
          {folder.notes.map(({ id, content, updatedAt }) => {
            return (
              <Link
                key={id}
                to={`note/${id}`}
                style={{ textDecoration: "none" }}
                onClick={() => setActiveNoteId(id)}
              >
                <Card
                  sx={{
                    mb: "5px",
                    backgroundColor:
                      id === activeNoteId ? "rgb(255 211 140)" : null
                  }}
                >
                  <CardContent
                    sx={{ "&:last-child": { pd: "10px" }, padding: "10px"}}
                  >
                    <div
                      style={{ fontSize: '14px', fontWeight: "bold" }}
                      dangerouslySetInnerHTML={{
                        __html: `${content.substring(0, 30) || "Empty"}`
                      }}
                    />
                    {/* Them updatedAt vao */}
                    <Typography sx={{ fontSize: '10px'}}>{moment(updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </List>
      </Grid>
      <Grid item xs={8}>
        {/* Note Details */}
        <Outlet />
      </Grid>
    </Grid>
  );
}
