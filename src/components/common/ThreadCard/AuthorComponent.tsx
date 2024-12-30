import React, { useEffect, useState } from "react";
import { IAuthor } from "../../../types/app";
import { Box, Typography } from "@mui/material";

interface IProps {
  author?: IAuthor;
  createdAt: string;
}

const AuthorComponent: React.FC<IProps> = ({ author, createdAt }) => {
  const [timeAgo, setTimeAgo] = useState<string>("");

  const calculateTimeAgo = (dateString: string) => {
    const createdAtDate = new Date(dateString);
    const now = new Date();
    
    const years = now.getFullYear() - createdAtDate.getFullYear();
    const months = now.getMonth() - createdAtDate.getMonth();
    const days = now.getDate() - createdAtDate.getDate();
    const hours = now.getHours() - createdAtDate.getHours();

    let result = "";
    if (years > 0) {
      result += `${years} y `;
    }
    if (months > 0) {
      result += `${months} m `;
    }
    if (days > 0) {
      result += `${days} d `;
    }
    if (hours > 0 || days > 0 || months > 0 || years > 0) {
      result += `${hours} h`;
    }

    return result.trim();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(calculateTimeAgo(createdAt));
    }, 1000);

    return () => clearInterval(interval);
  }, [createdAt]);

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "center",
      }}
    >
      <Typography
        fontWeight={700}
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {author?.fullname}{" "}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "rgba(255, 255, 255, 0.6)",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        @{author?.profile?.username} • {timeAgo}
      </Typography>
    </Box>
  );
};

export default AuthorComponent;
