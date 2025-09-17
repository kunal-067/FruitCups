import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isVerified: false,
    verifiedAt: null, // timestamp when verified
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setVerified: (state) => {
            state.isVerified = true;
            state.verifiedAt = Date.now(); // fixed
        },
        clearVerified: (state) => {
            state.isVerified = false;
            state.verifiedAt = null;
        }
    }
});

export const { setVerified, clearVerified } = authSlice.actions;
export default authSlice.reducer;
