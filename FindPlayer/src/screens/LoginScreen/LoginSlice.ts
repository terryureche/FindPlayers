import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../store/Store";
import realmDB from "../../services/RealmDB";

interface LoginState {
  logged: boolean,
  userId: string,
  error: boolean,
  errorMessage: string | null,
  errorCode: any,
  details: RealmUserDetails,
}

interface LoginCredentials {
  username: string,
  password: string,
}

const initialState: LoginState = {
  logged: false,
  userId: '',
  details: {
    id: null,
    providerType: "anon-user",
    deviceId: null,
    state: "logged-out",
    accessToken: null,
    refreshToken: null,
    customData: {},
    profile: {},
    isLoggedIn: false
  },
  error: false,
  errorMessage: '',
  errorCode: null
};

interface  UserDetails {
  providerType: Realm.ProviderType,
  deviceId: string | null,
  state: string | null,
  accessToken: string | null,
  refreshToken: string | null,
  customData: SimpleObject,
  profile: Realm.DefaultUserProfileData,
}

interface RealmUserDetails extends UserDetails {
  id: string | null,
  isLoggedIn: boolean
}


export const loginUserByEmailPassword = createAsyncThunk(
  'users/loginByEmailPassword',
  async (loginCredentials: LoginCredentials, {rejectWithValue}) => {
    try {
      const credentials = Realm.Credentials.emailPassword(loginCredentials.username, loginCredentials.password);
      const realmUser: Realm.User = await realmDB.logIn(credentials);

      //realm use proxy to expose the user properties on logIn method
      //so this is confuse for redux because it can't serialize the object
      //so we have to create a simple object.
      const user: RealmUserDetails = {
        providerType: realmUser.providerType,
        deviceId: realmUser.deviceId,
        state: realmUser.state,
        accessToken: realmUser.accessToken,
        refreshToken: realmUser.refreshToken,
        customData: realmUser.customData,
        id: realmUser.id,
        profile: realmUser.profile,
        isLoggedIn: realmUser.isLoggedIn
      };

      return user;
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
    builder.addCase(loginUserByEmailPassword.fulfilled, (state, action) => {
      state.details = action.payload;
    });
    builder.addCase(loginUserByEmailPassword.rejected, (state, action) => {
      state.details = initialState.details;
      state.userId = '';
      state.logged = false;
      state.error = true
      // @ts-ignore
      state.errorMessage = action.payload.message;
      // @ts-ignore
      state.errorCode = action.payload.code;
    });
  }
});

export const {
  login,
} = loginSlice.actions;

export const isLogged = (state: RootState) => state.authentication.loginSlice.logged;
export const isError = (state: RootState) => state.authentication.loginSlice.error;
export const errorMessage = (state: RootState) => state.authentication.loginSlice.errorMessage;


export default loginSlice.reducer;
