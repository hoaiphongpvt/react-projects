import { configureStore, } from "@reduxjs/toolkit";
import userReducer from './features/user/userSlice'
import cartReducer from './features/cart/cartSlide'

const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export default store