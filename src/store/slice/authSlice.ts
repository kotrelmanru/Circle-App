import { createSlice } from "@reduxjs/toolkit";
import { IAuthor } from "../../types/app";
import { authCheckAsync, loginAsync, logoutAsync } from "../Asyncthunks/authAsync";
import { IauthorState } from "../type/type";

const storedToken = localStorage.getItem('token');
const initialIsLogin = storedToken ? true : false;

const initialState: IauthorState = {
    isLogin: initialIsLogin,
    token: storedToken || "",
    profile: {} as IAuthor
};

export const authSlice = createSlice({
    name:"auth",
     initialState,
     reducers:{LOGIN: (state, action) => {
      console.log("FROM LOGIN ACTION", action.payload);

      state.isLogin = true;
        state.token = action.payload.token;
       state.profile = action.payload.profile;
   }  
     },
     extraReducers(builder) {
         builder.addCase(loginAsync.fulfilled,(state,action) => {            
            state.isLogin = true;
            state.token = action.payload;
            
         })
         builder.addCase(loginAsync.rejected,(_,action)=>{
            console.log(`rejected ${action}`);
         })
         builder.addCase(loginAsync.pending,(_,action)=>{
            console.log(`pending ${action}`);
         })
    
         builder.addCase(authCheckAsync.fulfilled,(state,action) => {
            state.isLogin = true;
            state.profile = action.payload;
         })
         builder.addCase(authCheckAsync.rejected,(_,action)=>{
            console.log(`rejected ${action}`);
         })
         builder.addCase(authCheckAsync.pending,(_,action)=>{
            console.log(`pending ${action}`);
         })
         builder.addCase(logoutAsync.fulfilled, (state) => {
            state.isLogin = false;
            state.token = "";
            state.profile = {} as IAuthor;
          });
          builder.addCase(logoutAsync.rejected, (_, action) => {
            console.log(`rejected ${action}`);
          });
        },
     })

export const {LOGIN}= authSlice.actions
export default authSlice.reducer;