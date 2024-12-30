import React from "react";
import {
  Home,
  HomeOutlined,
  PersonSearch,
  PersonSearchOutlined,
  Favorite,
  FavoriteBorder,
  AccountCircle,
  AccountCircleOutlined,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/store";
import { myProfileAsync } from "../../store/Asyncthunks/profileAsync";

const MenuItem = () => {
  const profile = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(myProfileAsync());
  }, [dispatch]);

  const MENU = [
    {
      name: "Home",
      path: "/",
      icon: {
        active: <Home />,
        nonActive: <HomeOutlined />,
      },
    },
    {
      name: "Search",
      path: "/search",
      icon: {
        active: <PersonSearch />,
        nonActive: <PersonSearchOutlined />,
      },
    },
    {
      name: "Follows",
      path: "/follows",
      icon: {
        active: <Favorite />,
        nonActive: <FavoriteBorder />,
      },
    },
    {
      name: "Profile",
      path: profile.profile ? `/profile/${profile.profile.id}` : "/profile",
      icon: {
        active: <AccountCircle />,
        nonActive: <AccountCircleOutlined />,
      },
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {MENU.map((item) => (
        <NavLink
          to={item.path}
          style={{ textDecoration: "none" }}
          key={item.name}
        >
          {({ isActive }) => (
            <Box
              color={isActive ? "#fff" : "rgba(255, 255, 255, 0.6)"}
              display={"flex"}
              alignItems={"center"}
              sx={{ gap: 1 }}
            >
              {isActive ? item.icon.active : item.icon.nonActive}{" "}
              <Typography fontSize={20} my={1} fontWeight={500}>
                {item.name}
              </Typography>
            </Box>
          )}
        </NavLink>
      ))}
    </Box>
  );
};

export default MenuItem;
