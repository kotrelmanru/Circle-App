import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "./slice/authSlice";
import threadReducer from "./slice/threadSlice";
import profileReducer from "./slice/profileSlice";
import suggestedReducer from"./slice/suggestedSlice";
import getProfileReducer from "./slice/getProfileSlce";
import getThreadProfileReducer from "./slice/getThreadProfileSlice";
import getDetailThreadReducer from "./slice/getDetailThreadSlice";
const store = configureStore({
   reducer: {
      auth:authReducer,
      threads:threadReducer,
      profile:profileReducer,
      getProfile:getProfileReducer,
      suggested:suggestedReducer,
      ThreadbyProfile:getThreadProfileReducer,
      getDetailThread:getDetailThreadReducer
   },
});

// static type untuk selector dan dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// hooks yang sudah diberi static type
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;