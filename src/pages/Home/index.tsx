import { AddPhotoAlternateOutlined } from "@mui/icons-material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import usePostThread from "../../components/Sidebar/hook/useCreatePost";
import ThreadCard from "../../components/common/ThreadCard";
import { getThreadsAsync } from "../../store/Asyncthunks/threadAsync";
import { useAppDispatch, useAppSelector } from "../../store/store";

const Home = () => {
  const dispatch = useAppDispatch();
  const { threadPost, setThreadPost, profile, postThread, posting } =
    usePostThread();
  const thread = useAppSelector((state) => state.threads.thread);

  useEffect(() => {
    dispatch(getThreadsAsync());
  }, [dispatch]);

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

  return (
    <Box>
      <Typography variant="h5" marginLeft={2} marginTop={2}>
        Home
      </Typography>
      <Box
        marginTop={1}
        marginBottom={2}
        sx={{
          px: "8px",
          py: "20px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.6)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              gap: 2,
              alignItems: "center",
            }}
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
            <Box>
              <label htmlFor="contained-button-file">
                {!threadPost.files?.length ? (
                  <AddPhotoAlternateOutlined
                    fontSize="large"
                    sx={{ color: "#04A51E" }}
                  />
                ) : (
                    <ControlPointIcon fontSize="large" sx={{ color: "#04A51E" }} />
                )}
              </label>
              <input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                hidden
                onChange={(e) =>
                  setThreadPost({ ...threadPost, files: e.target.files })
                }
              />
            </Box>
            <Box>
              <Button
                disabled={posting}
                sx={{
                  bgcolor: "#04A51E",
                  color: "white",
                  borderRadius: "20px",
                  fontWeight: 500,
                  px: 2,
                }}
                onClick={postThread}
              >
                Post
              </Button>
            </Box>
          </Box>

          {/* Menampilkan preview untuk file baru yang dipilih */}
          {threadPost.files && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginTop: 2,
                flexWrap: "wrap",
              }}
            >
              {Array.from(threadPost.files).map((file: any, index) => (
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
            </Box>
          )}
        </Box>
      </Box>
      {thread &&
        thread.map((item) => <ThreadCard key={item.id} thread={item} profileId={profile.profile.id}/>)}
    </Box>
  );
};

export default Home;
