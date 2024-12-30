import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Avatar, IconButton, TextField, Typography } from "@mui/material";
import { AddPhotoAlternateOutlined } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import useEditThread from "../../components/common/ThreadCard/hooks/useEditThread";
import { IAuthor } from "../../types/app";
import { IReply } from "../../types/app";

interface IProps {
  reply: IReply;
  profile: IAuthor;
  replyId: string;
}

const ModalEditReply: React.FC<IProps> = ({ reply, profile, replyId }) => {
  console.log(replyId);

  const {
    open,
    handleOpen,
    handleClose,
    posting,
    threadEdit,
    setThreadEdit,
    editThread,
  } = useEditThread({
    threadId: reply.id!,
    initialState: { content: reply.content!, files: null },
    authorId: reply.author.id!,
    mainThreadId: replyId,
  });

  let oldImage: string[] = [];

  if (reply.images) {
    oldImage = reply.images.map((img) => img.imageUrl!);
  }

  async function urlToFile(
    url: string,
    filename: string,
    mimeType: string
  ): Promise<File> {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], filename, { type: mimeType });
  }

  // Fungsi untuk mengubah array imageUrl menjadi FileList
  async function imageUrlsToFileList(imageUrls: string[]): Promise<FileList> {
    const files: File[] = await Promise.all(
      imageUrls.map(async (url, index) => {
        const mimeType = "image/jpeg"; // Sesuaikan MIME type sesuai kebutuhan
        const filename = `image${index + 1}.jpg`; // Sesuaikan penamaan file sesuai kebutuhan
        return await urlToFile(url, filename, mimeType);
      })
    );

    // Gunakan DataTransfer untuk membuat FileList dari array File
    const dataTransfer = new DataTransfer();
    files.forEach((file) => dataTransfer.items.add(file));
    return dataTransfer.files;
  }
  React.useEffect(() => {
    imageUrlsToFileList(oldImage).then((fileList) => {
      setThreadEdit((prevState) => ({
        ...prevState,
        files: fileList,
      }));
    });
  }, []);

  // Function to handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Limit to maximum 4 files
      const selectedFiles = Array.from(files).slice(0, 4);
      const filesList = arrayToFileList(selectedFiles);
      setThreadEdit({ ...threadEdit, files: filesList });
    }
  };

  // Function to remove a selected file
  const handleRemoveFile = (index: number) => {
    if (threadEdit.files) {
      const newFiles = Array.from(threadEdit.files);
      newFiles.splice(index, 1);
      setThreadEdit({
        ...threadEdit,
        files: newFiles.length > 0 ? arrayToFileList(newFiles) : null,
      });
    }
  };

  // Function to convert File[] to FileList
  const arrayToFileList = (files: File[]): FileList => {
    const dataTransfer = new DataTransfer();
    files.forEach((file) => {
      dataTransfer.items.add(file);
    });
    return dataTransfer.files;
  };

  // Determine if there are selected files
  const hasSelectedFiles = threadEdit.files && threadEdit.files.length > 0;

  return (
    <Box>
      <IconButton onClick={handleOpen} sx={{ padding: 0 }}>
        <EditIcon />
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
            width: "500px",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingX: "10px",
              borderBottom: "1px solid grey",
            }}
          >
            <Typography variant="h6" color={"#04A51E"} fontWeight={700}>
              Edit Thread
            </Typography>
            <IconButton sx={{ color: "#04A51E" }} onClick={handleClose}>
              <CancelOutlinedIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              paddingX: 2,
              marginTop: 1,
              borderBottom: "1px solid grey",
            }}
          >
            <Avatar src={profile.profile?.photoProfile} />
            <TextField
              sx={{
                flex: 1,
                background: "#1d1d1d",
                color: "white",
                "& fieldset": { border: "none" },
              }}
              value={threadEdit.content}
              placeholder={reply.content}
              onChange={(e) =>
                setThreadEdit({ ...threadEdit, content: e.target.value })
              }
            />
            {/* Tombol edit disamping TextField */}
            <Button
              disabled={posting}
              onClick={editThread}
              sx={{
                bgcolor: "#04A51E",
                color: "white",
                borderRadius: "15px",
                fontWeight: 700,
              }}
            >
              Edit
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              paddingX: 2,
              marginTop: 2,
            }}
          >
            {/* Menampilkan gambar lama jika ada */}
            {threadEdit.oldImageUrl && (
              <Box
                sx={{
                  position: "relative",
                  maxWidth: "100px",
                  maxHeight: "100px",
                }}
              >
                <img
                  src={threadEdit.oldImageUrl}
                  alt="Old Thread Image"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    borderRadius: "5px",
                  }}
                />
                <IconButton
                  onClick={() =>
                    setThreadEdit({
                      ...threadEdit,
                      files: null,
                      oldImageUrl: "",
                    })
                  }
                  sx={{ position: "absolute", top: 0, right: 0 }}
                >
                  <CancelOutlinedIcon
                    fontSize="small"
                    sx={{ color: "#04A51E" }}
                  />
                </IconButton>
              </Box>
            )}

            {/* Menampilkan preview untuk file baru yang dipilih */}
            {threadEdit.files &&
              Array.from(threadEdit.files).map((file, index) => (
                <Box
                  key={index}
                  sx={{
                    position: "relative",
                    maxWidth: "100px",
                    maxHeight: "100px",
                  }}
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index}`}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      borderRadius: "5px",
                    }}
                  />
                  <IconButton
                    onClick={() => handleRemoveFile(index)}
                    sx={{ position: "absolute", top: 0, right: 0 }}
                  >
                    <CancelOutlinedIcon
                      fontSize="small"
                      sx={{ color: "#04A51E" }}
                    />
                  </IconButton>
                </Box>
              ))}

            {/* Tombol untuk menambah foto */}
            <label htmlFor="contained-file">
              {hasSelectedFiles ? (
                <IconButton
                  component="span"
                  sx={{
                    bgcolor: "#04A51E",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ControlPointIcon fontSize="large" sx={{ color: "white" }} />
                </IconButton>
              ) : (
                <AddPhotoAlternateOutlined
                  fontSize="large"
                  sx={{ color: "#04A51E", cursor: "pointer" }}
                />
              )}
              <input
                accept="image/*"
                id="contained-file"
                multiple
                type="file"
                hidden
                onChange={handleFileChange}
              />
            </label>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              paddingX: 3,
              marginTop: 2,
            }}
          >
            {/* Hapus tombol cancel */}
            <Button
              disabled={posting}
              onClick={handleClose}
              sx={{
                bgcolor: "#FF0000",
                color: "white",
                borderRadius: "20px",
                fontWeight: 500,
                px: 2,
                display: "none", // Sembunyikan tombol cancel
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ModalEditReply;
