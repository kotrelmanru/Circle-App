import {
  Avatar,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import React, { useEffect, useState } from "react";
import { API } from "../../lib/api";
import { IAuthor } from "../../types/app";
import { SearchRounded } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { myProfileAsync } from "../../store/Asyncthunks/profileAsync";
import { Link } from "react-router-dom";

const Search = () => {
  const profile = useAppSelector((state) => state.profile.profile);
  const [keyword, setKeyword] = React.useState("");
  const [user, setUser] = React.useState<IAuthor[]>([] as IAuthor[]);
  const [result, setResult] = React.useState("");
  const dispatch = useAppDispatch();
  const [followingIds, setFollowingIds] = useState<string[]>([]);

  useEffect(() => {
    dispatch(myProfileAsync());
  }, [dispatch]);

  useEffect(() => {
    // Set followingIds after profile.following is loaded
    if (profile.following) {
      setFollowingIds(profile.following.map((obj) => obj.followerId));
    }
  }, []);

  const findUser = async () => {
    try {
      const res = await API.get(`/user/name/${keyword}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.length === 0) setUser([]);
      setResult(keyword);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const findFollow = (followingId: string) => {
    return followingIds.includes(followingId);
  };

  

  const handleFollow = async (userId: string) => {
    try {
      const res = await API.post(
        `follow/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data);

      dispatch(myProfileAsync());

      setFollowingIds((prevIds) => {
        if (prevIds.includes(userId)) {
          return prevIds.filter((id) => id !== userId);
        } else {
          return [...prevIds, userId];
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      display={"flex"}
      sx={{
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
      }}
    >
      <TextField
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder="Seach"
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderRadius: "20px",
            },
            "&:hover fieldset": {
              borderColor: "grey",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
          width: "95%",
          paddingY: "5px",
          marginTop: "10px",
        }}
        InputProps={{
          startAdornment: (
            <PersonSearchIcon sx={{ color: "grey", marginRight: "8px" }} />
          ),
          endAdornment: (
            <IconButton onClick={findUser}>
              <SearchRounded />
            </IconButton>
          ),
        }}
        variant="outlined"
      />
      {user.length === 0 ? (
        result !== "" ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              padding:"30px"
            }}
          >
            <Typography
              variant="h6"
              color={"white"}
              sx={{ textAlign: "center" }}
            >
              No result for "{result}"
            </Typography>
            <Typography variant="body1" color={"grey"} textAlign={"center"}>
              Try searching something else or check the
              <br />
              spelling of what you typed
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              padding:"30px"
            }}
          >
            <Typography variant="h6" color={"white"} sx={{ textAlign: "center" }}>
              Find your friend
            </Typography>
          </Box>
        )
      ) : (
        <Box
          width={"100%"}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {user.map((obj, index) => (
            <Box
              key={index}
              sx={{
                width: "100%",
                display: "flex",
                padding: "20px",
                alignItems: "start",
                justifyContent: "space-between",
                borderRadius: "10px",
              }}
            >
              <Box
                
              >
                <Link style={{
                  display: "flex",
                  alignItems: "start",
                  overflowX: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  marginRight: "10px",
                  textDecoration:"none",
                  color:"white"
                }} 
                to={`/profile/${obj.id}`}>
                <Avatar src={obj.profile?.photoProfile} />
                <Box
                  sx={{
                    marginLeft: "20px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="body1" fontWeight={700}>
                    {obj.fullname}
                  </Typography>
                  <Typography variant="body2" color="grey" fontWeight={300}>
                    @{obj.profile?.username}
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {obj.profile?.bio}
                  </Typography>
                </Box>
                </Link>
              </Box>
              <Button
                onClick={() => handleFollow(obj.id!)}
                sx={{
                  borderRadius: "20px",
                  border: "2px solid white",
                  color: "white",
                }}
              >
                {findFollow(obj.id!) ? "Unfollow" : "Follow"}
              </Button>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Search;
