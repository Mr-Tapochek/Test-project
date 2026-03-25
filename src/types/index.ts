
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
export interface Painting {
  authorId: number;
  created: string;
  id: number;
  imgUrl: string;
  locationId: number;
  name: string;
}

export interface Author {
  id: number;
  name: string;
}

export interface Location {
  id: number;
  name: string;
}

export const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;