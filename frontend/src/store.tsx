import { configureStore,getDefaultMiddleware } from '@reduxjs/toolkit'
import loginSlice from './Features/loginSlice'
import todoSlice from './Features/todoSlice'

const store = configureStore({
    middleware: getDefaultMiddleware({
        serializableCheck: false,
      }),
    reducer : {
        login : loginSlice,
        todo : todoSlice,
    }
})


export default store
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;