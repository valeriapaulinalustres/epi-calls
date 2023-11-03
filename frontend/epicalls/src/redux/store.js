
import { loginApi } from './services/loginServices'
import {configureStore} from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import loginReducer from './features/login/loginSlice'
import { sheetApi } from './services/sheetServices'

export const store = configureStore({
    reducer:{
    
      loginReducer,
    
   [loginApi.reducerPath]: loginApi.reducer,
   [sheetApi.reducerPath]: sheetApi.reducer
     
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(loginApi.middleware),

        middleware:
        (getdefaultMiddleware) =>
            getdefaultMiddleware()
            .concat([
                     loginApi.middleware, 
                     sheetApi.middleware
                   ])
       
})

setupListeners(store.dispatch)



