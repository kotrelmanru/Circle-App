import { createSlice } from "@reduxjs/toolkit";
import { IThread } from "../../types/app";
import { getDetailThreadAsync } from "../Asyncthunks/getDetailThreadAsync";


const initialState: { thread: IThread } = {
  thread:{} as IThread
};

export const getDetailThread = createSlice({
  name: "thread",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getDetailThreadAsync.fulfilled, (state, action) => {
      state.thread = action.payload;
    });
    builder.addCase(getDetailThreadAsync.rejected, (_, action) => {
      console.log("rejected", action);
    });
    builder.addCase(getDetailThreadAsync.pending, (_, action) => {
      console.log("pending", action);
    });
  },
});

export default getDetailThread.reducer;
