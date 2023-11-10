import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  id: string;
  name: string;
  email: string;
  token: string;
  isAuthenticated: boolean;
}

interface SetCredentialsPayload extends Omit<UserState, 'isAuthenticated' | 'token'> {
  tokenData: { accessToken: string };
}

const initialState: UserState = {
  id: '',
  name: '',
  email: '',
  token: localStorage.getItem('accessToken') || '',
  isAuthenticated: !!localStorage.getItem('accessToken'),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (
      state,
      { payload: { id, name, email, tokenData } }: PayloadAction<SetCredentialsPayload>,
    ) => {
      state.id = id;
      state.name = name;
      state.email = email;
      state.isAuthenticated = true;
      state.token = tokenData.accessToken;
      localStorage.setItem('accessToken', tokenData.accessToken);
    },

    logout: () => {
      localStorage.removeItem('accessToken');
      const cleanState = { ...initialState, isAuthenticated: false, token: '' };
      return cleanState;
    },
  },
});

export const {
  reducer: userReducer,
  actions: { setCredentials, logout },
} = userSlice;
