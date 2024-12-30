import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { myProfileAsync } from "../../store/Asyncthunks/profileAsync";
import FollowingCard from "./component/followingCard";
import FollowerCard from "./component/followerCard";

const Followings = () => {
  const [value, setValue] = React.useState("1");

  const dispatch = useAppDispatch();

  const followProfile = useAppSelector((state) => state.profile.profile);

  React.useEffect(() => {
    dispatch(myProfileAsync());
  }, []);

  const handleChange = ( newValue: any) => {
    setValue(newValue);
  };

  console.log(followProfile);

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: "3px solid #04A51E",
            borderColor: "ActiveCaption",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            variant="fullWidth"
            sx={{ width: "100%" }}
            textColor="primary"
            TabIndicatorProps={{
              style: {
                backgroundColor: "#04A51E",
              },
            }}
          >
            <Tab
              label="Followers"
              value="1"
              sx={{
                padding: "20px",
                "&.Mui-selected": {
                  color: "white",
                },
                borderBottom: "2px solid transparent",
              }}
            />
            <Tab
              label="Following"
              value="2"
              sx={{
                padding: "20px",
                "&.Mui-selected": {
                  color: "white",
                },
                borderBottom: "2px solid transparent",
              }}
            />
          </TabList>
        </Box>
        <TabPanel value="1">
          <FollowerCard
            follower={followProfile.follower}
            key={followProfile.id}
          />
        </TabPanel>
        <TabPanel value="2">
          <FollowingCard
            following={followProfile.following}
            key={followProfile.id}
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default Followings;
