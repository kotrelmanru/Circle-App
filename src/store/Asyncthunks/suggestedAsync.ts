import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAuthor } from "../../types/app";
import { API } from "../../lib/api";

export const getSuggestedAsync = createAsyncThunk<
  IAuthor[],
  void,
  { rejectValue: string }
>("suggest/getSuggested", async (_, { rejectWithValue }) => {
  try {
    const {data} = await API.get("/user/suggested", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    console.log(data);

    return data;
  } catch (error) {
    return rejectWithValue("error");
  }
});
