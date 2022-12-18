import { configureStore } from '@reduxjs/toolkit'
import productsReducer from '../features/ProductsSlice'

export const store = configureStore({
    reducer: {
        products: productsReducer

    }
})

export type RootState = ReturnType<typeof store.getState>
export type appDispatch = typeof store.dispatch;