import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { IconButton, Typography } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import useEditThread from "./hooks/useEditThread";
import { IThread } from "../../../types/app";

interface IProps {
  thread: IThread;
  threadId:string
}

const ModalDeleteThread: React.FC<IProps> = ({ thread,threadId }) => {
  const { open, deleteThread, handleClose, handleOpen } = useEditThread({
    threadId: thread.id!,
    authorId: "",
    initialState: {
      content: "",
      files: null,
    },
    mainThreadId:threadId
  });

  return (
    <Box>
      <IconButton onClick={handleOpen} sx={{ padding:0 }}>
        <DeleteOutlineIcon />
      </IconButton>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            padding: "15px 10px",
            borderRadius: "5px",
            color: "white",
            bgcolor: "#1d1d1d",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "300px",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h6"
            color={"#04A51E"}
            fontWeight={700}
            sx={{ marginBottom: "15px" }}
          >
            Delete Thread
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "30px" }}>
            Are you sure you want to delete this thread?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <Button
              onClick={deleteThread}
              sx={{
                bgcolor: "#FF0000",
                color: "white",
                borderRadius: "20px",
                fontWeight: 500,
                px: 4,
              }}
            >
              Delete
            </Button>
            <Button
              onClick={handleClose}
              sx={{
                bgcolor: "#04A51E",
                color: "white",
                borderRadius: "20px",
                fontWeight: 500,
                px: 4,
              }}
            >
              Cancel
            </Button>
          </Box>
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: "5px",
              right: "5px",
              color: "#04A51E",
            }}
          >
            <CancelOutlinedIcon />
          </IconButton>
        </Box>
      </Modal>
    </Box>
  );
};

export default ModalDeleteThread;
