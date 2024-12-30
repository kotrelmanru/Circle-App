import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../../lib/api";
import { getThreadbyProfile } from "../../../store/Asyncthunks/getThreadProfileAsync";
import { getThreadsAsync } from "../../../store/Asyncthunks/threadAsync";
import { useAppDispatch } from "../../../store/store";
import { IThread } from "../../../types/app";
import usePostThread from "../../Sidebar/hook/useCreatePost";
import AuthorComponent from "./AuthorComponent";
import ImageComponent from "./ImageComponent";
import ModalDeleteThread from "./modalDeleteThread";
import ModalEditThread from "./modalEditThread";

interface IProps {
  thread: IThread;
  profileId:string
}

const ThreadCard: FC<IProps> = ({ thread ,profileId}) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { profile } = usePostThread(thread.id);

  useEffect(() => {
    if (profile.profile?.id) {
      const userLike = thread.like.find(
        (like) => like.userId === profile.profile.id
      );
      setIsLiked(Boolean(userLike));
    }
  }, [thread.like]);

  const navigate = useNavigate();
  const handleLike = async () => {
    try {
      const { data } = await API.post(
        `/like/${thread.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      setIsLiked(data.like);
      dispatch(getThreadsAsync());
      dispatch(getThreadbyProfile(profileId))
    } catch (error) {
      console.log(error);
    }
  };

  if (thread.threadId != null) return null;
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        paddingX: 2,
        borderBottom: "1px solid rgba(255, 255, 255, 0.6)",
        py: 1
      }}
    >
      <Avatar alt="ava" src={thread.author?.profile?.photoProfile} />
      <Box
        sx={{
          width: "100%",
        }}
      >
        {profile?.profile?.id == thread.author?.id ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "start",
              justifyContent: "space-between",
            }}
          >
            <AuthorComponent
              author={thread.author}
              createdAt={thread.createdAt}
            />
            <Box display={"flex"} gap={1}>
              <ModalDeleteThread thread={thread} key={thread.id!}threadId={thread.id!} />
              <ModalEditThread
              threadId={thread.id!}
                profile={profile.profile}
                thread={thread}
                key={thread.id}
              />

            </Box>
          </Box>
        ) : (
          <AuthorComponent
            author={thread.author}
            createdAt={thread.createdAt}
          />
        )}
        <Box>
          <Typography>{thread.content}</Typography>
          {thread.images && thread.images.length > 0 && (
            <ImageComponent image={thread.images} />
          )}
        </Box>
        <Box
          sx={{ display: "flex", gap: "5px", alignItems: "center", mt: "10px" }}
        >
          <IconButton onClick={handleLike}>
            {isLiked ? (
              <FavoriteIcon fontSize="small" color="error" />
            ) : (
              <FavoriteBorderIcon fontSize="small" />
            )}
          </IconButton>
          <Typography>{thread.like?.length}</Typography>
          <IconButton onClick={() => navigate(`/thread/detail/${thread.id}`)}>
            <CommentOutlinedIcon />
          </IconButton>
          <Typography>{thread.reply?.length} reply</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ThreadCard;
