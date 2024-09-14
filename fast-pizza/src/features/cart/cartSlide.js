import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: []
}

const cartSlide = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.cart.push(action.payload)
        },
        deleteItem: (state, action) => {
            state.cart = state.cart.filter(item => item.pizzaId !== action.payload)
        },

        increaseItemQuantity: (state, action) => {
            const item = state.cart.find(item => item.pizzaId === action.payload)
            item.quantity += 1
            item.totalPrice = item.quantity * item.unitPrice
        },

        decreaseItemQuantity: (state, action) => {
            const item = state.cart.find(item => item.pizzaId === action.payload)
            item.quantity -= 1
            item.totalPrice = item.quantity * item.unitPrice

            if (item.quantity === 0) cartSlide.caseReducers.deleteItem(state, action)
        },

        clearCart: (state) => {
            state.cart = []
        },
    }
})

export const { addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearCart } = cartSlide.actions

export default cartSlide.reducer

export const getCart = (state) => state.cart.cart

export const getTotalCartQuantity = (state) => state.cart.cart.reduce((sum, item) => sum += item.quantity, 0)

export const getTotalCartPrice = (state) => state.cart.cart.reduce((sum, item) => sum += item.totalPrice, 0)

export const getCurrentQuantityById = (id) => (state) => state.cart.cart.find(item => item.pizzaId === id)?.quantity ?? 0