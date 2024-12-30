import { createSlice } from "@reduxjs/toolkit";
import { IAuthor } from "../../types/app";
import { myProfileAsync } from "../Asyncthunks/profileAsync";

const initialState: { profile: IAuthor } = {
    profile: {} as IAuthor,
};

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(myProfileAsync.fulfilled, (state, action) => {
            state.profile = action.payload;
        });
        builder.addCase(myProfileAsync.rejected, (_, action) => {
            console.log("rejected", action);
        });
        builder.addCase(myProfileAsync.pending, (_, action) => {
            console.log("pending", action);
        });
    },
});

export default profileSlice.reducer;
