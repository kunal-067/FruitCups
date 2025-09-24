import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    products: [],
    addresses: [],
    usingAddress: null,
};

const checkOutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        addAddresses: (state, action) => {
            // const {_id,
            //     name,
            //     phone,
            //     houseNo,
            //     street,
            //     city = 'Kota',
            //     district = 'Kota',
            //     state: region = 'Rajasthan',
            //     postalCode = 843301,
            //     country = 'India',
            //     landMark
            // } = action.payload;

            state.addresses = action.payload || []
            // state.address.push({_id,
            //     name,
            //     phone,
            //     houseNo,
            //     street,
            //     city,
            //     district,
            //     state: region,
            //     postalCode,
            //     country,
            //     landMark
            // });
        },
        setUsingAddress: (state, action)=>{
            state.usingAddress = action.payload
        },
        addCheckoutProducts: (state, action) => {
            const {
                productId,
                quantity,
                priceAtPurchase,
                name,
                size,
                customizations
            } = action.payload;

            state.products.push({
                productId,
                quantity,
                size,
                priceAtPurchase,
                name,
                customizations
            });
        },

        clearCheckoutProducts: (state) => {
            state.products = [];
        },
        clearCheckout: (state) => {
            state.products = [];
            state.usingAddress = null;
        }
    }
});

export const {
    addAddresses,
    addCheckoutProducts,
    setUsingAddress,
    clearCheckout,
    clearCheckoutProducts
} = checkOutSlice.actions;
export default checkOutSlice.reducer;