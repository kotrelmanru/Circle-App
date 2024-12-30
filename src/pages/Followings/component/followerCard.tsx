import { Avatar, Box, Typography, Button } from "@mui/material";
import React from "react";
import { Ifollower } from "../../../types/app";
import { useAppDispatch, useAppSelector } from "../../../store/store"; // Import useAppSelector
import { API } from "../../../lib/api";
import { myProfileAsync } from "../../../store/Asyncthunks/profileAsync";
import { Link } from "react-router-dom";

interface IProps {
  follower: Ifollower[];
}

const FollowerCard: React.FC<IProps> = ({ follower = [] }) => {
  const dispatch = useAppDispatch();
  const [followingIds, setFollowingIds] = React.useState<string[]>([]);
  // Select profile data from the Redux store
  const profile = useAppSelector((state) => state.profile.profile);

  // Check if the user is followed in the latest profile data
  const findFollow = (followingId: string) => {
    return followingIds.includes(followingId);
  };

  const handleFollow = async (followingId: string) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("Token not found in localStorage");
        return;
      }

      const response = await API.post(
        `follow/${followingId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Dispatch to update the profile data
      dispatch(myProfileAsync());

      // Update followingIds after dispatch
      setFollowingIds(profile.following.map((obj) => obj.followerId));

      console.log("Response status:", response.status);
      console.log("Response data:", response.data);
    } catch (error) {
      console.error("Error occurred while following:", error);
    }
  };

  React.useEffect(() => {
    if (profile.following) {
      setFollowingIds(profile.following.map((obj) => obj.followerId));
    }
  }, [profile.following]); // Update followingIds when profile.following changes

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {follower.length > 0 ? (
        follower.map((obj, index) => (
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
                to={`/profile/${obj.following.id!}`}
              >
                <Avatar src={obj.following.profile?.photoProfile} />
                <Box
                  sx={{
                    marginLeft: "20px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="body1" fontWeight={700}>
                    {obj.following.fullname}
                  </Typography>
                  <Typography variant="body2" color="grey" fontWeight={300}>
                    @{obj.following.profile?.username}
                  </Typography>
                </Box>
              </Link>
            </Box>
            <Button
              onClick={() => handleFollow(obj.following.id!)}
              sx={{
                borderRadius: "20px",
                border: "2px solid white",
                color: "white",
              }}
            >
              {findFollow(obj.following.id!) ? "Unfollow" : "Follow"}
            </Button>
          </Box>
        ))
      ) : (
        <Typography variant="body1" color="grey">
          No followers found.
        </Typography>
      )}
    </Box>
  );
};

export default FollowerCard;
