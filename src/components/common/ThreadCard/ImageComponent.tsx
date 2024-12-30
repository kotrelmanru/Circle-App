import { Box } from "@mui/material";
import React from "react";
import { IThreadImage } from "../../../types/app";

interface IProps {
   image?: IThreadImage[];
}

const ImageComponent: React.FC<IProps> = ({ image }) => {


   return (
      <Box
         sx={{
            display: "flex",
            flexWrap: "wrap",
            
         }}
      >
         {image?.map((item) => (
            <Box flex="1 1" minWidth={"50%"} sx={{border: "1px solid rgba(255, 255, 255, 0.6)"}}>
               <img
                  src={item.imageUrl}
                  alt="image"
                  style={{
                     width: "100%",
                     height: "20rem",
                     objectFit: "cover",
                  }}
                  key={item.id}
               />
            </Box>
         ))}
      </Box>
   );
};

export default ImageComponent;
