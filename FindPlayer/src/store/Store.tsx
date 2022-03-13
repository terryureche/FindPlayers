import {combineReducers, configureStore} from '@reduxjs/toolkit'
import loginSlice from "../screens/LoginScreen/LoginSlice";

const authentication = combineReducers({
  loginSlice
})

const store = configureStore({
  reducer: {
    authentication
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>