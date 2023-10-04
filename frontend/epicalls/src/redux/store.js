
import { loginApi } from './services/loginServices'
import {configureStore} from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import loginReducer from './features/login/loginSlice'

export const store = configureStore({
    reducer:{
    
      loginReducer,
    
   [loginApi.reducerPath]: loginApi.reducer,
       
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(loginApi.middleware),
})

setupListeners(store.dispatch)



