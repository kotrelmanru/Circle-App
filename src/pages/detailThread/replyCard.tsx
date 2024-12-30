import { FC, useEffect, useState } from "react";
import { IAuthor, IReply } from "../../types/app";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import AuthorComponent from "../../components/common/ThreadCard/AuthorComponent";
import ImageComponent from "../../components/common/ThreadCard/ImageComponent";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { API } from "../../lib/api";
import { useAppDispatch } from "../../store/store";
import { getDetailThreadAsync } from "../../store/Asyncthunks/getDetailThreadAsync";
import ModalDeleteReply from "./modalDeleteReply";
import ModalEditReply from "./modalEditReply";
import UsePostReply from "./hooks/useReply";

interface IProps {
  reply: IReply;
  profile: IAuthor;
  threadId: string;
  mainReply: boolean;
}

const ReplyCard: FC<IProps> = ({ reply, profile, threadId, mainReply }) => {
  const { replyPost, setReplyPost, postReply, posting } = UsePostReply({
    threadId: reply.id,
    authorId: profile.id!,
    detailThreadId: threadId,
  });
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [displayTextField, setDisplayTextfield] = useState<boolean>(false);

  useEffect(() => {
    if (profile.id) {
      const userLike = reply.like?.find((like) => like.userId === profile.id!);
      setIsLiked(Boolean(userLike));
    }
  }, [reply.like]);

  const handleLike = async () => {
    try {
      const { data } = await API.post(
        `/like/${reply.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setIsLiked(data.like);
      dispatch(getDetailThreadAsync(threadId!));
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        marginBottom: "20px",
      }}
    >
      <Box
        borderTop={mainReply ? "none" : "1px solid grey"}
        borderBottom={"1px solid grey"}
        paddingLeft={mainReply ? 2 : 7}
        paddingRight={2}
        sx={{
          display: "flex",
          gap: 1,
          py: 1,
        }}
      >
        <Avatar alt="ava" src={reply.author?.profile?.photoProfile} />
        <Box sx={{ width: "100%" }}>
          {profile?.id! === reply.author?.id ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "start",
                justifyContent: "space-between",
              }}
            >
              <AuthorComponent
                author={reply.author}
                createdAt={reply.createdAt}
              />
              <Box display={"flex"} gap={1}>
                <ModalDeleteReply
                  reply={reply}
                  key={threadId}
                  threadId={threadId}
                />
                <ModalEditReply
                  profile={profile}
                  reply={reply}
                  key={reply.id}
                  replyId={threadId}
                />
              </Box>
            </Box>
          ) : (
            <AuthorComponent
              author={reply.author}
              createdAt={reply.createdAt}
            />
          )}
          <Box
            sx={{
              width:
                reply.images && reply.images.length > 0
                  ? "calc(100% - 60px)"
                  : "100%",
            }}
          >
            <Typography>{reply.content}</Typography>
            {reply.images && reply.images.length > 0 && (
              <ImageComponent image={reply.images} />
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: "10px",
            }}
          >
            <IconButton onClick={handleLike}>
              {isLiked ? (
                <FavoriteIcon fontSize="small" color="error" />
              ) : (
                <FavoriteBorderIcon fontSize="small" />
              )}
            </IconButton>
            <Typography>{reply.like?.length}</Typography>
            {mainReply && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton
                  onClick={() => setDisplayTextfield(!displayTextField)}
                >
                  <CommentOutlinedIcon />
                </IconButton>
                <Typography>{reply.reply?.length} reply</Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      {displayTextField && (
        <Box
          display={"flex"}
          alignItems={"center"}
          sx={{
            padding: "10px 15px",
            gap: "20px",
            borderTop: "1px solid grey",
            borderBottom: "1px solid grey",
          }}
        >
          <Box marginLeft={1}>
            <Avatar src={profile?.profile?.photoProfile} />
          </Box>
          <Box width={"100%"}>
            <TextField
              sx={{
                width: "100%",
                color: "white",
                "& fieldset": { border: "none" },
              }}
              value={replyPost.content}
              onChange={(e) =>
                setReplyPost({ ...replyPost, content: e.target.value })
              }
              placeholder="Type Your Reply !"
            />
          </Box>
          <Button
            sx={{
              bgcolor: "#04A51E",
              color: "white",
              borderRadius: "20px",
              fontWeight: 500,
              px: 2,
            }}
            disabled={posting}
            onClick={postReply}
          >
            Reply
          </Button>
        </Box>
      )}
      {reply.reply && reply.reply.length > 0 && (
        <Box
          sx={{ borderTop: "1px solid grey", borderBottom: "1px solid grey" }}
        >
          {reply.reply.map((obj) => (
            <ReplyCard
              mainReply={false}
              key={obj.id}
              profile={profile}
              reply={obj}
              threadId={threadId}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ReplyCard;
