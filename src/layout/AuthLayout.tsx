import { Box, Container } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/store";

const AuthLayout = () => {
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  if (isLogin) {
    return <Navigate to={"/"} />;
  }
  return (
    <Box className="container" sx={{ color: "white", height: "100vh" }}>
      <Container className="container">
        <Outlet />
      </Container>
    </Box>
  );
};

export default AuthLayout;
