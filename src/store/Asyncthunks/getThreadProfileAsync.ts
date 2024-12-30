import { createAsyncThunk } from "@reduxjs/toolkit";
import {API} from "../../lib/api/index"
import { IThread } from "../../types/app";

export const getThreadbyProfile = createAsyncThunk<
IThread[],
string,
{rejectValue:string}>(
    "thread/getThreadbyProfile",async (userId:string, { rejectWithValue }) => {
        try {
            const {data} = await API.get(`/threads/user/${userId}`,{
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