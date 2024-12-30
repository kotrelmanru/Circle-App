import { Box, Typography, Avatar } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { myProfileAsync } from "../../../store/Asyncthunks/profileAsync";
import ModalEdit from "../../common/profile/component/modalEdit";

const Profile = () => {
  const myProfile = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();

  const { profile } = myProfile;

  useEffect(() => {
    dispatch(myProfileAsync());
  }, [dispatch]);
  return (
    <Box
      width={"100%"}
      sx={{
        bgcolor: "#262626",
        display: "flex",
        flexDirection: "column",
        px: "20px",
        py: "10px",
        borderRadius: "10px",
      }}
    >
      <Box>
        <Typography variant="h6" fontWeight={"700"} padding={"10px"}>
          My Profile
        </Typography>
      </Box>
      <Box>
        <Box>
          <Box width={"100%"}>
            <img
              style={{ borderRadius: "10px" }}
              width="100%"
              height="100px"
              src={
                profile.profile?.cover
                  ? profile.profile?.cover
                  : "../../../defaultCover.png"
              }
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Avatar
                sx={{
                  width: "80px",
                  height: "80px",
                  top: "-30px",
                  left: "5px",
                }}
                src={profile.profile?.photoProfile}
              />
              <ModalEdit
                userId={profile.id!}
                bio={profile.profile?.bio!}
                cover={profile.profile?.cover!}
                fullname={profile.fullname!}
                photoProfile={profile.profile?.photoProfile!}
                username={profile.profile?.username!}
                key={profile.id!}
              />
            </Box>
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={700}>
              {profile.fullname}
            </Typography>
            <Typography
              marginTop={1}
              variant="body2"
              fontWeight={500}
              color="gray"
            >
              @{profile.profile?.username}
            </Typography>
            <Typography fontWeight={400}>{profile.profile?.bio}</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "10px", mt: "15px" }}>
            <Box sx={{ display: "flex", gap: "5px" }}>
              <Typography>{profile.following?.length || 0}</Typography>
              <Typography fontWeight={400} color="gray">
                Following
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: "5px" }}>
              <Typography>{profile.follower?.length || 0}</Typography>
              <Typography fontWeight={400} color="gray">
                Followers
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
