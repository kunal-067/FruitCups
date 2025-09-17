import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    fruits: [],
    toppings: [],
    nutrition: [],
    couponApplied: null,
    quantity: 1,
    size: {
        name: "Small (250g)",
        value: 2.5,
    },
    price: 0,
    finalPrice: 0,
};

// --- Utility: calculate total price ---
function calculateFinalPrice(state) {
    let finalPrice = state.price || 0;

    finalPrice += state.fruits.reduce((sum, f) => sum + (f.price || 0), 0);
    finalPrice += state.toppings.reduce((sum, t) => sum + (t.price || 0), 0);

    const discount = state.couponApplied?.discount || 0;
    finalPrice *= (100 - discount) / 100;

    finalPrice *= state.quantity * (state.size.value / 2.5);

    return Math.max(finalPrice, 0);
}

// --- Utility: toggle array items ---
function toggleItem(array, item) {
    return array.find((i) => i.id === item.id) ?
        array.filter((i) => i.id !== item.id) : [...array, item];
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        toggleFruits: (state, action) => {
            state.fruits = toggleItem(state.fruits, action.payload);
            state.finalPrice = calculateFinalPrice(state);
        },
        toggleToppings: (state, action) => {
            state.toppings = toggleItem(state.toppings, action.payload);
            state.finalPrice = calculateFinalPrice(state);
        },
        setCouponApplied: (state, action) => {
            state.couponApplied = action.payload;
            state.finalPrice = calculateFinalPrice(state);
        },
        setSize: (state, action) => {
            state.size = action.payload;
            state.finalPrice = calculateFinalPrice(state);
        },
        setQuantity: (state, action) => {
            state.quantity = action.payload;
            state.finalPrice = calculateFinalPrice(state);
        },
        setNutrition: (state, action) => {
            state.nutrition = action.payload || [];
        },
        setPrice: (state, action) => {
            state.price = action.payload;
            state.finalPrice = calculateFinalPrice(state);
        },
        setFinalPrice: (state, action) => {
            state.finalPrice = action.payload
        },
        clearProduct: () => initialState,
    },
});

export const {
    toggleFruits,
    toggleToppings,
    setCouponApplied,
    setSize,
    setQuantity,
    setNutrition,
    setPrice,
    clearProduct,
} = productSlice.actions;

export default productSlice.reducer;