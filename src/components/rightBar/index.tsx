import React from "react";
import Profile from "./components/Profile";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { myProfileAsync } from "../../store/Asyncthunks/profileAsync";
import Suggested from "./components/suggested";
import Widget from "./components/widget";
import { useLocation } from "react-router-dom";

const Index = () => {
  const profile = useAppSelector((state) => state.profile);
  const dispath = useAppDispatch();
  const location = useLocation();

  React.useEffect(() => {
    dispath(myProfileAsync());
  }, []);
  const isProfileHidden =
    location.pathname === `/profile/${profile.profile.id}`;
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {!isProfileHidden && <Profile />}
      <Suggested profile={profile.profile} />
      <Widget />
    </Box>
  );
};

export default Index;
