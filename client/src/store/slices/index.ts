import { combineReducers } from "@reduxjs/toolkit";
import { videosApi } from "../services/videos.api";
import { accountSlice } from "./account.slice";
import { videoInfoSlice } from "./videoInfo.slice";

const rootReducer = combineReducers({
  [videosApi.reducerPath]: videosApi.reducer,
  [accountSlice.name]: accountSlice.reducer,
  [videoInfoSlice.name]: videoInfoSlice.reducer,
});

export default rootReducer;
