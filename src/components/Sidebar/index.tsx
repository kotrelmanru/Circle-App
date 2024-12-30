import { Box, Button, Typography } from "@mui/material";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { logoutAsync } from "../../store/Asyncthunks/authAsync";
import { useAppDispatch } from "../../store/store";
import MenuItem from "./MenuItem";
import CreatePost from "./createPost";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();

    dispatch(logoutAsync());

    navigate("/auth/login");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        paddingX: 3,
        paddingY: 5,
        gap: 1,
      }}
    >
      <Typography variant="h4" fontWeight={800} color={"#04A51E"}>
        CIRCLE
      </Typography>
      <Box>
        <MenuItem />
      </Box>
      <Box>
        <CreatePost />
      </Box>
      <Button
        sx={{
          padding: "0",
          color: "white",
          display: "flex",
          alignItems: "center",
          gap: 1,
          marginTop: "auto",
          fontWeight: 500,
          justifyContent: "start",
        }}
        onClick={handleLogout}
      >
        <CiLogout />
        <Typography textAlign={"start"}>Logout</Typography>
      </Button>
    </Box>
  );
};

export default Sidebar;
