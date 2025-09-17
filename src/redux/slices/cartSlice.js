import {
    createSlice
} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addItem: (state, action) => {
            const {
                _id,
                name,
                images,
                size,
                price,
                quantity = 1,
                toppings = [],
                fruits = [],
                finalPrice
            } = action.payload;

            const itemExists = state.find(
                (item) => item._id === _id && item.size?.value === size?.value
            );

            if (itemExists) {
                itemExists.finalPrice = (quantity + itemExists.quantity) * itemExists.finalPrice / itemExists.quantity;
                itemExists.quantity += quantity;
            } else {
                state.push({
                    _id,
                    name,
                    img: images[0]?.url || '',
                    size,
                    price,
                    quantity,
                    toppings,
                    fruits,
                    finalPrice: finalPrice || price * quantity,
                });
            }
        },

        removeItem: (state, action) => {
            const {
                _id,
                size
            } = action.payload;
            return state.filter(
                (item) => !(item._id === _id && item.size?.value === size?.value)
            );
        },


        // not applicable will work in future 
        changeQuantity: (state, action) => {
            const {
                _id,
                size,
                qty
            } = action.payload;
            const item = state.find(
                (item) => item._id === _id && item.size?.value === size?.value
            );
            if (item && qty > 0) {
                item.quantity = qty;
                item.finalPrice = item.price * qty;
            }
        },

        incrementDecrement: (state, action) => {
            const {
                _id,
                size,
                act
            } = action.payload;
            const item = state.find(
                (item) => item._id === _id && item.size?.value === size?.value
            );
            if (item) {
                if (act === -1 && item.quantity > 1) {
                    item.quantity -= 1;
                } else if (act === 1) {
                    item.quantity += 1;
                }
                item.finalPrice = item.price * item.quantity;
            }
        },

        clearCart: (state) => {state.length = 0},

        hydrateCart: (state, action) => {
            return action.payload || [];
        },
    },
});

export const {
    addItem,
    removeItem,
    changeQuantity,
    incrementDecrement,
    clearCart,
    hydrateCart,
} = cartSlice.actions;

export default cartSlice.reducer;