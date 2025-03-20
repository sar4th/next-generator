'use client';
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import rootReducer from './rootReducer';

export const RESET_STATE = 'RESET_STATE';

// Define a type-safe action for resetting the state
interface ResetStateAction {
  type: typeof RESET_STATE;
}

type AppAction = ResetStateAction | ReturnType<typeof rootReducer>;

const resettableRootReducer = (
  state: RootState | undefined,
  action: AppAction
) => {
  if (action.type === RESET_STATE) {
    return rootReducer(undefined, action);
  }
  return rootReducer(state, action);
};

export const store = configureStore({
  reducer: resettableRootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Type-safe resetState action creator
export const resetState = (): ResetStateAction => ({ type: RESET_STATE });
