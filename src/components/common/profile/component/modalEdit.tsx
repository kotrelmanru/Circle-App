import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Fade,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import useEditProfile from "../hooks/useEditProfile";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "#1c1c1c",
  borderRadius: "15px",
};

interface Iprops {
  userId: string;
  photoProfile: string;
  cover: string;
  fullname: string;
  username: string;
  bio: string;
}

const ModalEdit: React.FC<Iprops> = ({
  userId,
  photoProfile,
  cover,
  fullname,
  username,
  bio,
}) => {
  const initialData = {
    fullname,
    profile: {
      bio,
      username,
      cover: null,
      photoProfile: null,
    },
  };

  const {
    updateForm,
    setUpdateForm,
    editProfile,
    open,
    setOpen,
    handleClose,
    edit,
  } = useEditProfile({ userId, initialData });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setUpdateForm((prev) => ({
        ...prev,
        profile: {
          ...prev.profile,
          [name]: files[0],
        },
      }));
    }
  };

  return (
    <Box>
      <Button
        sx={{
          height: "45px",
          borderRadius: "20px",
          border: "2px solid white",
          color: "white",
          fontWeight: 500,
          px: 2,
        }}
        onClick={() => setOpen(true)}
      >
        Edit Profile
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: "20px",
              }}
            >
              <Typography
                id="transition-modal-title"
                variant="h5"
                fontWeight={700}
              >
                Edit Profile
              </Typography>
              <IconButton
                onClick={() => {
                  handleClose();
                }}
              >
                <HighlightOffRoundedIcon fontSize="large" />
              </IconButton>
            </Box>
            <Box>
              <Box width={"100%"} paddingX={"20px"}>
                <label htmlFor="cover-input">
                  <img
                    style={{ borderRadius: "10px", cursor: "pointer" }}
                    width="100%"
                    height="150px"
                    src={
                      updateForm.profile.cover
                        ? URL.createObjectURL(updateForm.profile.cover)
                        : cover || "../../../defaultCover.png"
                    }
                  />
                  <input
                    id="cover-input"
                    type="file"
                    name="cover"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </label>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <label htmlFor="photoProfile-input">
                    <Avatar
                      sx={{
                        width: "80px",
                        height: "80px",
                        top: "-30px",
                        left: "5px",
                        cursor: "pointer",
                      }}
                      src={
                        updateForm.profile.photoProfile
                          ? URL.createObjectURL(updateForm.profile.photoProfile)
                          : photoProfile
                      }
                    />
                    <input
                      id="photoProfile-input"
                      type="file"
                      name="photoProfile"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                  </label>
                </Box>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
                >
                  <TextField
                    label="Fullname"
                    name="fullname"
                    sx={{ width: "100%" }}
                    value={updateForm.fullname}
                    onChange={handleChange}
                    inputProps={{
                      style: {
                        height: "20px",
                      },
                    }}
                  />
                  <TextField
                    label="Username"
                    name="username"
                    value={updateForm.profile.username}
                    onChange={(e) =>
                      setUpdateForm((prev) => ({
                        ...prev,
                        profile: {
                          ...prev.profile,
                          username: e.target.value,
                        },
                      }))
                    }
                    sx={{ width: "100%" }}
                    inputProps={{
                      style: {
                        height: "20px",
                      },
                    }}
                  />
                  <TextField
                    label="Bio"
                    name="bio"
                    value={updateForm.profile.bio}
                    onChange={(e) =>
                      setUpdateForm((prev) => ({
                        ...prev,
                        profile: {
                          ...prev.profile,
                          bio: e.target.value,
                        },
                      }))
                    }
                    sx={{ width: "100%" }}
                    inputProps={{
                      style: {
                        height: "50px",
                      },
                    }}
                  />
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                borderTop: "2px solid grey",
                display: "flex",
                justifyContent: "flex-end",
                padding: "10px 20px",
                marginTop: "20px",
              }}
            >
              <Button
                disabled={edit}
                onClick={editProfile}
                sx={{
                  bgcolor: "#04A51E",
                  color: "white",
                  px: "20px",
                  borderRadius: "20px",
                }}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default ModalEdit;
