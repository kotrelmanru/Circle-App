import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Modal from "@mui/material/Modal";
import { Avatar, IconButton, TextField } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { AddPhotoAlternateOutlined } from "@mui/icons-material";
import usePostThread from "./hook/useCreatePost";

const CreatePost = () => {
  const {
    open,
    handleOpen,
    handleClose,
    threadPost,
    setThreadPost,
    profile,
    postThread,
    posting,
  } = usePostThread();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const selectedFiles = Array.from(files).slice(0, 4);
      const filesList = arrayToFileList(selectedFiles);
      setThreadPost({ ...threadPost, files: filesList });
    }
  };

  const handleRemoveFile = (index: number) => {
    if (threadPost.files) {
      const newFiles: File[] = Array.from(threadPost.files);
      newFiles.splice(index, 1);
      setThreadPost({
        ...threadPost,
        files: newFiles.length > 0 ? arrayToFileList(newFiles) : null,
      });
    }
  };

  const arrayToFileList = (files: File[]): FileList => {
    const dataTransfer = new DataTransfer();
    files.forEach((file) => {
      dataTransfer.items.add(file);
    });
    return dataTransfer.files;
  };

  const hasSelectedFiles = threadPost.files && threadPost.files.length > 0;

  return (
    <Box>
      <Button
        onClick={handleOpen}
        sx={{
          width: "100%",
          bgcolor: "#04A51E",
          color: "white",
          borderRadius: "20px",
          mt: 2,
          fontWeight: 500,
          px: 2,
        }}
      >
        Created Post
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            padding: "15px 0px",
            borderRadius: "5px",
            color: "white",
            bgcolor: "#1d1d1d",
            position: "absolute" as "absolute",
            top: "25%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "500px",
            maxHeight: "80vh",
          }}
        >
          <Box textAlign={"end"}>
            <IconButton
              onClick={handleClose}
              color="inherit"
              sx={{ paddingX: "20px" }}
            >
              <CancelOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "start",
              justifyContent: "center",
            }}
            marginTop={1}
            paddingX={2}
          >
            <Box marginLeft={1}>
              <Avatar src={profile.profile.profile?.photoProfile} />
            </Box>
            <Box width={"100%"}>
              <TextField
                sx={{
                  width: "100%",
                  background: "#1d1d1d",
                  color: "white",
                  "& fieldset": { border: "none" },
                }}
                value={threadPost.content}
                placeholder="What is happening..."
                onChange={(e) =>
                  setThreadPost({ ...threadPost, content: e.target.value })
                }
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              margin: "auto",
              justifyContent: "space-between",
              borderTop: "1px solid rgba(255, 255, 255, 0.6)",
              alignItems: "center",
            }}
            paddingY={2}
            paddingX={3}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              {/* Menampilkan preview untuk file baru yang dipilih */}
              {threadPost.files &&
                Array.from(threadPost.files).map((file: any, index) => (
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
                    <ControlPointIcon
                      fontSize="large"
                      sx={{ color: "white" }}
                    />
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
            <Box>
              <Button
                disabled={posting}
                onClick={postThread}
                sx={{
                  bgcolor: "#04A51E",
                  color: "white",
                  borderRadius: "20px",
                  fontWeight: 500,
                  px: 2,
                }}
              >
                Post
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default CreatePost;
