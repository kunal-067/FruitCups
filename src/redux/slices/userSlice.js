import {
    GET_PROFILE
} from "@/lib/ApiRoutes";
import axios from "axios";
import {
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";

const initialState = {
    data: null,
    loading: false,
    error: null,
};

export const fetchUser = createAsyncThunk(
    "user/fetch",
    async (_, thunkApi) => {
        try {
            const res = await axios.get(GET_PROFILE, {
                withCredentials: true
            });
            return res.data?.profile;
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data?.message || "Failed to fetch user profile"
            );
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.data = action.payload;
        },
        clearUser: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {
    setUser,
    clearUser
} = userSlice.actions;
export default userSlice.reducer;