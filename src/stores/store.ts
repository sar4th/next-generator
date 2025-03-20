'use client';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import rootReducer from './rootReducer';
export const RESET_STATE = 'RESET_STATE';

const resettableRootReducer = (state: RootState | undefined, action: any) => {
    if (action.type === RESET_STATE) {
        return rootReducer(undefined, action);
    }
    return rootReducer(state, action);
};

export const store = configureStore({
    reducer: resettableRootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false })
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const resetState = () => ({ type: RESET_STATE });
