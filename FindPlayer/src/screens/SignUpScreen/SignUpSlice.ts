import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import realmDB from "../../services/RealmDB";
import {RootState} from "../../store/Store";

interface RegisterUserStatus {
  created: boolean,
  message: string,
}

interface SignUpState {
  userId: string,
  register: RegisterUserStatus
}

interface SignUpCredentials {
  username: string,
  password: string,
}

const initialState: SignUpState = {
  userId: '',
  register: {
    created: false,
    message: '',
  }
};

export const registerUserByEmailPassword = createAsyncThunk(
  'users/registerByEmailPassword',
  async (credentials: SignUpCredentials, {rejectWithValue}) => {
    try {
      await realmDB.emailPasswordAuth.registerUser({
        email: credentials.username,
        password: credentials.password,
      });
    } catch(e) {
      return rejectWithValue(e);
    }
  }
);

export const signUpSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    signup: (state, action: PayloadAction<SignUpCredentials>) => {

    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUserByEmailPassword.fulfilled, (state, action) => {
      state.register.created = true;
      state.register.message = "success-registered";

    });
    builder.addCase(registerUserByEmailPassword.rejected, (state, action) => {
      state.register.created = false;
      state.register.message = "already-registered-user";
    });
  }
});

export const {
  signup
} = signUpSlice.actions;

export const isLogged = (state: RootState) => state.authentication.loginSlice.logged;
export const userRegisterCreated = (state: RootState) => state.authentication.signUpSlice.register.created;
export const userRegisterMessage = (state: RootState) => state.authentication.signUpSlice.register.message;

export default signUpSlice.reducer;