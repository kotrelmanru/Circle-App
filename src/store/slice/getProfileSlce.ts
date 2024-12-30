import { createSlice } from "@reduxjs/toolkit";
import { IAuthor } from "../../types/app";
import { getProfileAsync } from "../Asyncthunks/GetProfileAsync";

const initialState: { detailProfile: IAuthor } = {
    detailProfile: {} as IAuthor,
};

export const getProfile = createSlice({
    name: "profile",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getProfileAsync.fulfilled, (state, action) => {
            state.detailProfile = action.payload;
        });
        builder.addCase(getProfileAsync.rejected, (_, action) => {
            console.log("rejected", action);
        });
        builder.addCase(getProfileAsync.pending, (_, action) => {
            console.log("pending", action);
        });
    },
});


export default getProfile.reducer;
