import { Box, Container } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Index from "../components/rightBar";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useEffect } from "react";
import { myProfileAsync } from "../store/Asyncthunks/profileAsync";

const RootLayout = () => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");
  const isLogin = useAppSelector((state) => state.auth.isLogin);

  useEffect(() => {
    if (token) {
      dispatch(myProfileAsync());
    }
  }, [dispatch, token]);

  if (!isLogin) {
    return <Navigate to={"/auth/login"} />;
  }

  return (
    <Box className="container">
      <Container
        className="container"
        sx={{
          margin: "auto",
          display: "flex",
          height: "100vh",
          width: "100%",
          color: "#fff",
        }}
      >
        <Box flex={1}>
          <Sidebar />
        </Box>
        <Box
          flex={2.5}
          className="thread-container"
          sx={{
            borderLeft: "3px solid #3f3f3f",
            borderRight: "3px solid #3f3f3f",
            overflowY: "auto",
          }}
        >
          <Outlet />
        </Box>
        <Box
          flex={1.5}
          className="thread-container"
          sx={{
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            marginLeft: "15px",
            paddingY: "20px",
            width: "100%",
          }}
        >
          <Index />
        </Box>
      </Container>
    </Box>
  );
};

export default RootLayout;
