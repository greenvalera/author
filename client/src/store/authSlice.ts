import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../models/IUser";
import {AuthResponse} from "../models/response/AuthResponse";
import AuthService from "../services/authService";
import axios from "axios";
import api from "../http";
import {API_URL} from "../http";

interface IAuthState {
    user: IUser,
    isAuth: boolean,
    loading: boolean,
}

interface ILoginParams {
    email: string,
    password: string
}

const initialState: IAuthState = {
    user: {} as IUser,
    isAuth: false,
    loading: true,
};

const setAuthData = (state: IAuthState, authData: AuthResponse | undefined): void => {
    if (!authData) {
        state.isAuth = false;
        state.user = {} as IUser;
        return;
    }

    const {accessToken, user} = authData;
    localStorage.setItem('token', accessToken);
    state.user = user;
    state.isAuth = true;
}


export const login = createAsyncThunk(
    'auth/login',
    async ({email, password}: ILoginParams): Promise<AuthResponse | undefined> => {
        try {
            const response = await AuthService.login(email, password);
            return response.data;
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                console.log(e.response?.data?.message)
            }
        }
    }
);

export const registration = createAsyncThunk(
    'auth/registration',
    async ({email, password}: ILoginParams): Promise<AuthResponse | undefined> => {
        try {
            const response = await AuthService.registration(email, password);
            return response.data;
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                console.log(e.response?.data?.message)
            }
        }
    }
);


export const logout = createAsyncThunk(
    'auth/logout',
    async (): Promise<boolean | undefined> => {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            return true;
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                console.log(e.response?.data?.message)
            }
        }
    }
);

export const checkAuth = createAsyncThunk(
    'auth/check',
    async (): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>(`${API_URL}/auth/refresh`, {}, {withCredentials: true});
        return response.data;
    }
);

const authSlice = createSlice({
   name: 'auth',
   initialState,
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                setAuthData(state, action.payload)
            })
            .addCase(registration.fulfilled, (state, action) => {
                setAuthData(state, action.payload)
            })
            .addCase(logout.fulfilled, (state) => {
                state.isAuth = false;
                state.user = {} as IUser;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
               setAuthData(state, action.payload)
               state.loading = false;
            });
    },
    reducers: {
        setIsAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload;
        },

        setUser(state, action: PayloadAction<IUser>) {
            state.user = action.payload;
        },

        setAuthData(state, action: PayloadAction<AuthResponse>) {
            setAuthData(state, action.payload);
        },
        setLoading(state, action: PayloadAction<boolean>) {
          state.loading = action.payload;
        }
    }
});

export const {setLoading} = authSlice.actions;

export default authSlice.reducer;