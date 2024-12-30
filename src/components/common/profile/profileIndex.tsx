import {
  Box,
  Typography,
  Avatar,
  Button,
} from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { getProfileAsync } from "../../../store/Asyncthunks/GetProfileAsync";
import { useParams } from "react-router-dom";
import { myProfileAsync } from "../../../store/Asyncthunks/profileAsync";
import { getThreadbyProfile } from "../../../store/Asyncthunks/getThreadProfileAsync";
import ModalEdit from "./component/modalEdit";
import TabListProfile from "./component/tabList";


const Profile = () => {
  const dispatch = useAppDispatch();
  const { profileId } = useParams<{ profileId: string }>();

  useEffect(() => {
    dispatch(getProfileAsync(profileId!));
    dispatch(getThreadbyProfile(profileId!));
    dispatch(myProfileAsync());
  }, [dispatch, profileId]);

  const profile = useAppSelector((state) => state.getProfile);
  const profileLogin = useAppSelector((state) => state.profile);
  
  
  
  return (
    <Box
      width={"100%"}
      sx={{
        bgcolor: "#1d1d1d",
        display: "flex",
        flexDirection: "column",
        borderRadius: "10px",
        gap: "10px",
      }}
    >
      <Box>
        <Typography variant="h6" fontWeight={"700"} padding={"10px"}>
          My Profile
        </Typography>
      </Box>
      <Box>
        <Box paddingX={"20px"}>
          <Box width={"100%"}>
            <img
              style={{ borderRadius: "10px" }}
              width="100%"
              height="150px"
              src={
                profile.detailProfile.profile?.cover
                  ? profile.detailProfile.profile.cover
                  : "../../../public/defaultCover.png"
              }
              alt="Cover"
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Avatar
                src={profile.detailProfile.profile?.photoProfile}
                sx={{
                  width: "80px",
                  height: "80px",
                  top: "-30px",
                  left: "5px",
                }}
                alt="Avatar"
              />
              {profile.detailProfile.id === profileLogin.profile.id ? (
                <ModalEdit
                  userId={profile.detailProfile.id!}
                  photoProfile={profile.detailProfile.profile?.photoProfile!}
                  cover={profile.detailProfile.profile?.cover!}
                  bio={profile.detailProfile.profile?.bio!}
                  username={profile.detailProfile.profile?.username!}
                  fullname={profile.detailProfile.fullname!}
                  key={profile.detailProfile.id!}
                />
              ) : (
                <Button
                  sx={{
                    height: "45px",
                    borderRadius: "10px",
                    border: "2px solid white",
                    color: "white",
                    fontWeight: 500,
                    px: 2,
                  }}
                >
                  Follow
                </Button>
              )}
            </Box>
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={700}>
              {profile.detailProfile.fullname}
            </Typography>
            <Typography marginTop={1} variant="body2" fontWeight={500} color="gray">
              @{profile.detailProfile?.profile?.username}
            </Typography>
            <Typography fontWeight={400}>{profile.detailProfile.profile?.bio}</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "10px", mt: "15px" }}>
            <Box sx={{ display: "flex", gap: "5px" }}>
              <Typography>{profile.detailProfile.following?.length || 0}</Typography>
              <Typography fontWeight={400} color="gray">
                Following
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: "5px" }}>
              <Typography>{profile.detailProfile.follower?.length || 0}</Typography>
              <Typography fontWeight={400} color="gray">
                Followers
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <TabListProfile authorId={profileId!} key={profileId}/>
    </Box>
  );
};

export default Profile;