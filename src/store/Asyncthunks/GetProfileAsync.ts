import { createAsyncThunk } from "@reduxjs/toolkit";
import {API} from "../../lib/api/index"
import { IAuthor } from "../../types/app";

export const getProfileAsync = createAsyncThunk<
IAuthor,
string,
{rejectValue:string}>(
    "profile/getProfile",async (userId:string, { rejectWithValue }) => {
        try {
            const {data} = await API.get(`/user/${userId}`,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            })

            console.log(data);

            return data;
        } catch (error) {
            return rejectWithValue("error")
        }
    }
)