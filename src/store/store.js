import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import bannerReducer from "./reducer/banner";

export const reducer = {
  banner: bannerReducer,
};

const store = configureStore({
  reducer,
  // middleware: [ // Because we define the middleware property here, we need to explictly add the defaults back in.
  //     ...getDefaultMiddleware(),
  // ]
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
