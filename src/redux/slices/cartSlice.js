import {
    createSlice
} from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addItem: (state, action) => {
            const itemExists = state.find((item) => item._id === action.payload._id);
            if (itemExists) {
                itemExists.quantity = Math.max(
                    1,
                    itemExists.quantity + (action.payload.quantity || 1)
                );
            } else {
                state.push({
                    ...action.payload,
                    quantity: action.payload.quantity || 1
                });
            }
        },

        removeItem: (state, action) => {
            const index = state.findIndex((item) => item._id === action.payload._id);
            if (index > -1) state.splice(index, 1);
        },

        changeQuantity:(state, action) => {
            const index = state.findIndex((item) => item._id === action.payload._id);
            state[index].quantity = action.payload.qty;
        },
        incrementDecrement: (state, action) =>{
            const index = state.findIndex((item) => item._id === action.payload._id);
            if(action.payload.act = -1){
                state[index].quantity = state[index].quantity === 0 ? 1 : state[index].quantity - 1
            }else{
                state[index].quantity = state[index].quantity + 1
            }
        },

        clearCart: (state) => {
            state.length = 0;
        },

        hydrateCart: (state, action) => {
            return action.payload || [];
        },
    },
});

export const { addItem, removeItem, changeQuantity, incrementDecrement, clearCart, hydrateCart } = cartSlice.actions;
export default cartSlice.reducer;
