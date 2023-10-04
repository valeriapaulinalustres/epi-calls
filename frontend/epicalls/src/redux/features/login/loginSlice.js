'use client'

import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'Login',
  initialState: {
    value: {
     name: 'prueba',
     mail: '',
     role: '',
     accessToken:'',
     refreshToken:''
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    
    },
    signOut: (state) => {
      state.value = {
      name:'',
      mail:'',
      role:'',
      accessToken:'',
      refreshToken:''
      };
    },
   
  },
});

export const { setUser, signOut } =
  loginSlice.actions;

export default loginSlice.reducer;
