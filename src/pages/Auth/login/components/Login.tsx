import { Box, Typography, Button, TextField, IconButton } from "@mui/material";
import useLoginValidate from "../../../../lib/validation/useLoginValidate";
import { Link } from "react-router-dom";
import { Controller } from "react-hook-form";
import { useAppSelector } from "../../../../store/store";
import { useLoginFunction } from "../hooks/useLogin";
import { useEffect, useState } from "react";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
const Login = () => {
  const authState = useAppSelector((state) => state.auth);

  const { control, reset, handleSubmit } = useLoginValidate();
  const { onErrorSubmit, onSubmit } = useLoginFunction({ reset });
  const [isShow, setIsShow] = useState(false);

  const togglePasswordVisibility = () => {
    setIsShow((prevState) => !prevState);
  };

  useEffect(() => {
    console.log(authState);
  }, [authState]);
  return (
    <Box>
      <Box
        sx={{
          Width: "100vh",
          display: "flex",
          justifyContent: "center",
          paddingTop: "150px",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box>
            <Typography variant="h3" fontWeight={700} color={"#04A51E"}>
              Circle
            </Typography>
          </Box>
          <Box>
            <Typography variant="h5" fontWeight={700}>
              Login To Circle
            </Typography>
          </Box>
          <form>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box sx={{ height: "30px" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginY: "20px",
                    gap: "10px",
                  }}
                >
                  <Controller
                    control={control}
                    name="email"
                    render={({ field, fieldState }) => (
                      <TextField
                        label="Email *"
                        color="success"
                        sx={{ borderColor: "white", color: "white" }}
                        {...field}
                        helperText={fieldState.error?.message}
                        error={Boolean(fieldState.error)}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="password"
                    render={({ field, fieldState }) => (
                      <>
                        <TextField
                          label="Password *"
                          color="success"
                          type={isShow ? "text" : "password"}
                          sx={{ borderColor: "white" }}
                          {...field}
                          helperText={fieldState.error?.message}
                          error={Boolean(fieldState.error)}
                          InputProps={{
                            endAdornment: (
                              <IconButton
                                onClick={togglePasswordVisibility}
                                edge="end"
                              >
                                {isShow ? (
                                  <VisibilityRoundedIcon />
                                ) : (
                                  <VisibilityOffRoundedIcon />
                                )}
                              </IconButton>
                            ),
                          }}
                        />
                      </>
                    )}
                  />
                </Box>
                <Box>
                  <Link
                    to={"#"}
                    style={{
                      textDecoration: "none",
                      color: "white",
                      textAlign: "right",
                    }}
                  >
                    <Typography>Forgot Password?</Typography>
                  </Link>
                </Box>
                <Button
                  sx={{
                    width: "400px",
                    mt: "20px",
                    mb: "10px",
                    bgcolor: "#04A51E",
                    borderRadius: "10px",
                  }}
                  onClick={handleSubmit(onSubmit, onErrorSubmit)}
                >
                  <Typography color={"white"}>Login</Typography>
                </Button>
                <Box>
                  <Typography>
                    Don't Have Account Yet ?
                    <Link
                      style={{
                        textDecoration: "none",
                        color: "#04A51E",
                        marginLeft: "10px",
                      }}
                      to={"/auth/register"}
                    >
                      Register
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
