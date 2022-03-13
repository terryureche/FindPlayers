import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../store/Store";
import realmDB from "../../services/RealmDB";

interface RegisterUserStatus {
  created: boolean,
  message: string,
}

interface LoginState {
  logged: boolean,
  userId: string,
  register: RegisterUserStatus
}

interface LoginCredentials {
  username: string,
  password: string,
}

const initialState: LoginState = {
  logged: false,
  userId: '',
  register: {
    created: false,
    message: '',
  }
};

export const registerUserByEmailPassword = createAsyncThunk(
  'users/registerByEmailPassword',
  async (credentials: LoginCredentials, {rejectWithValue}) => {
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

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginCredentials>) => {

    },
    register: (state, action: PayloadAction<LoginCredentials>) => {

    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUserByEmailPassword.fulfilled, (state, action) => {
      state.register.created = true;

    });
    builder.addCase(registerUserByEmailPassword.rejected, (state, action) => {
      state.register.created = false;
      state.register.message = "already-registered-user";
    });
  }
});

export const {
  login,
} = loginSlice.actions;

export const isLogged = (state: RootState) => state.authentication.loginSlice.logged;
export const userRegisterCreated = (state: RootState) => state.authentication.loginSlice.register.created;
export const userRegisterMessage = (state: RootState) => state.authentication.loginSlice.register.message;

export default loginSlice.reducer;
