import { Avatar, Box, Typography, Button } from "@mui/material";
import React from "react";
import { Ifollowing } from "../../../types/app";
import { useAppDispatch } from "../../../store/store";
import { API } from "../../../lib/api";
import { myProfileAsync } from "../../../store/Asyncthunks/profileAsync";
import { Link } from "react-router-dom";

interface IProps {
  following: Ifollowing[];
}

const FollowingCard: React.FC<IProps> = ({ following = [] }) => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (following.length > 0) {
    }
  }, [following]); // Add following as a dependency

  const handleFollow = async (followerId: string) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("Token not found in localStorage");
        return;
      }

      await API.post(
        `follow/${followerId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(myProfileAsync());
    } catch (error) {
      console.error("Error occurred while following:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {following.length > 0 ? (
        following.map((obj, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              padding: "20px",
              alignItems: "center",
              justifyContent: "space-between",
              bgcolor: "#262626",
              borderRadius: "10px",
            }}
          >
            <Box>
              <Link
                style={{
                  display: "flex",
                  textDecoration: "none",
                  alignItems: "center",
                  overflowX: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  marginRight: "10px",
                  cursor: "pointer",
                  color: "white",
                }}
                to={`/profile/${obj.follower.id!}`}
              >
                <Avatar src={obj.follower.profile?.photoProfile} />
                <Box
                  sx={{
                    marginLeft: "20px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="body1" fontWeight={700}>
                    {obj.follower.fullname}
                  </Typography>
                  <Typography variant="body2" color="grey" fontWeight={300}>
                    @{obj.follower.profile?.username}
                  </Typography>
                </Box>
              </Link>
            </Box>
            <Button
              onClick={() => handleFollow(obj.follower.id!)}
              sx={{
                borderRadius: "20px",
                border: "2px solid white",
                color: "white",
              }}
            >
              {obj.isFollow ? "UnFollow" : "Follow"}
            </Button>
          </Box>
        ))
      ) : (
        <Typography variant="body1" color="grey">
          No following found.
        </Typography>
      )}
    </Box>
  );
};

export default FollowingCard;
