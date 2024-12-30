import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box, ImageList, ImageListItem, Tab, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getThreadbyProfile } from "../../../../store/Asyncthunks/getThreadProfileAsync";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import ThreadCard from "../../ThreadCard";

interface IProps {
  authorId: string;
}

const TabListProfile: React.FC<IProps> = ({ authorId }) => {
  const dispatch = useAppDispatch();
  const threads = useAppSelector(
    (state) => state.ThreadbyProfile.threads || []
  );

  const [value, setValue] = useState("1");
  const [imagesArray, setImagesArray] = useState<any[]>([]);
  const [_, setFilterReply] = useState<any[]>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    event.preventDefault()
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getThreadbyProfile(authorId));
  }, [dispatch, authorId]);

  useEffect(() => {
    if (threads) {
      const filteredThreads = threads.filter(
        (thread) => thread.threadId === null
      );
      setFilterReply(filteredThreads);

      const images = filteredThreads
        .filter((thread) => thread.images && thread.images.length > 0)
        .flatMap((thread) => thread.images);

      setImagesArray(images);
    }
  }, [threads]);

  useEffect(() => {
    console.log(imagesArray);
  }, [imagesArray]);

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: "3px solid #04A51E",
            borderColor: "ActiveCaption",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TabList
            onChange={handleChange}
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
              label="All Post"
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
              label="Media"
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
        <TabPanel value="1" sx={{ width: "100%", padding: 0 }}>
          {Array.isArray(threads) && threads.length > 0 ? (
            threads.map((item) => (
              <ThreadCard key={item.id} thread={item} profileId={authorId} />
            ))
          ) : (
            <Box
              sx={{
                padding: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                textAlign: "center",
              }}
            >
              <Typography variant="h5">No thread post yet</Typography>
            </Box>
          )}
        </TabPanel>
        <TabPanel value="2" sx={{ padding: 0 }}>
          {imagesArray.length === 0 ? (
            <Box
              sx={{
                padding: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                textAlign: "center",
              }}
            >
              <Typography variant="h5">No media post yet</Typography>
            </Box>
          ) : (
            <Box sx={{ padding: 0, display: "flex" }}>
              <ImageList sx={{ width: "100%" }}>
                {imagesArray.map((obj: any) => (
                  <ImageListItem
                    key={obj.id}
                    style={{ backgroundColor: "#262626" }}
                  >
                    <img
                      srcSet={`${obj.imageUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      src={`${obj.imageUrl}?w=164&h=164&fit=crop&auto=format`}
                      alt={obj.id?.toString()}
                      loading="lazy"
                      style={{
                        height: "100%",
                        overflow: "hidden",
                        width: "100%",
                      }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
          )}
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default TabListProfile;
