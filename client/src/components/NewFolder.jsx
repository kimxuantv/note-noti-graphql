import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  IconButton,
  TextField,
  Tooltip
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Create, CreateNewFolderOutlined } from "@mui/icons-material";
import { addNewFolder } from "../utils/folderUtils";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function NewFolder() {
  const [newFolderName, setNewFolderName] = useState();
  const [open, setOpen] = useState(false);
  const [ searchParams, setSearchParams] = useSearchParams()
  const handleOpenPopup = () => {
    // setOpen(true) //ko set truc tiep vi sẽ ko load dl ra
    setSearchParams({popup: 'add-folder'})
  };

  const navigate = useNavigate()

  const popupName = searchParams.get('popup')

  const handleClose = () => {
    // setOpen(false)
    setNewFolderName('')
    //back lai bo link popup ra
    navigate(-1)
  };

  const handleNewFolderNameChange = (e) => {
    setNewFolderName(e.target.value)
  };


  const handleAddNewFolder = async () => {
    //when press Ok
    const { addFolder } = await addNewFolder({name: newFolderName})
    console.log("🚀 ~ file: NewFolder.jsx:37 ~ handleAddNewFolder ~ addFolder:", addFolder)
    handleClose()
  };

  useEffect(() => {
    if(popupName === 'add-folder') {
      //cho show popup len
      setOpen(true)
      return
    }
    //nguoc lai dong popup
    setOpen(false)
  },[popupName])

  return (
    <div>
      <Tooltip title="Add Folder" onClick={handleOpenPopup}>
        <IconButton size="small">
          <CreateNewFolderOutlined sx={{ color: "white" }} />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Folder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Folder Name"
            fullWidth
            size="small"
            variant="standard"
            sx={{ witdth: "400px" }}
            autoComplete="off"
            value={newFolderName}
            onChange={handleNewFolderNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddNewFolder}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
