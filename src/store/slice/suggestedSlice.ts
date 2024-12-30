import { createSlice } from "@reduxjs/toolkit";
import { IAuthor } from "../../types/app";
import { getSuggestedAsync } from "../Asyncthunks/suggestedAsync";

const initialState: { Author: IAuthor[] } = {
   Author: [],
};

export const suggestedSlice = createSlice({
   name: "suggested",
   initialState,
   reducers: {},
   extraReducers(builder) {
      builder.addCase(getSuggestedAsync.fulfilled, (state, action) => {
         state.Author = action.payload;
      });
      builder.addCase(getSuggestedAsync.rejected, (_, action) => {
         console.log("rejected", action);
      });
      builder.addCase(getSuggestedAsync.pending, (_, action) => {
         console.log("pending", action);
      });
   },
});

export default suggestedSlice.reducer;