import { createSlice } from "@reduxjs/toolkit";
import { IThread } from "../../types/app";
import { getThreadbyProfile } from "../Asyncthunks/getThreadProfileAsync";

const initialState: { threads: IThread[] } = {
  threads:[],
};

export const getThreadProfile = createSlice({
  name: "thread",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getThreadbyProfile.fulfilled, (state, action) => {
      state.threads = action.payload;
    });
    builder.addCase(getThreadbyProfile.rejected, (_, action) => {
      console.log("rejected", action);
    });
    builder.addCase(getThreadbyProfile.pending, (_, action) => {
      console.log("pending", action);
    });
  },
});

export default getThreadProfile.reducer;
