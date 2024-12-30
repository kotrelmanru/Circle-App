import { createSlice } from "@reduxjs/toolkit";
import { IThread } from "../../types/app";
import { getThreadsAsync } from "../Asyncthunks/threadAsync";

const initialState: { thread: IThread[] } = {
   thread: [],
};

export const threadSlice = createSlice({
   name: "thread",
   initialState,
   reducers: {},
   extraReducers(builder) {
      builder.addCase(getThreadsAsync.fulfilled, (state, action) => {
         state.thread = action.payload;
      });
      builder.addCase(getThreadsAsync.rejected, (_, action) => {
         console.log("rejected", action);
      });
      builder.addCase(getThreadsAsync.pending, (_, action) => {
         console.log("pending", action);
      });
   },
});

export default threadSlice.reducer;