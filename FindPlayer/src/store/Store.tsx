import {combineReducers, configureStore} from '@reduxjs/toolkit'
import loginSlice from "../screens/LoginScreen/LoginSlice";
import signUpSlice from "../screens/SignUpScreen/SignUpSlice";

const authentication = combineReducers({
  loginSlice,
  signUpSlice
})

const store = configureStore({
  reducer: {
    authentication
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>