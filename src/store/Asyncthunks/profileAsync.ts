import { createAsyncThunk } from "@reduxjs/toolkit";
import {API} from "../../lib/api/index"
import { IAuthor } from "../../types/app";

export const myProfileAsync = createAsyncThunk<
IAuthor,
void,
{rejectValue:string}>(
    "profile/myProfile",async (_, { rejectWithValue }) => {
        try {
            const {data} = await API.get("/user/login",{
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