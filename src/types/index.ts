import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';

export interface Painting {
  authorId: number;
  created: string;
  id: number;
  imageUrl: string;
  locationId: number;
  name: string;
}

export interface Author {
  id: number;
  name: string;
}

export interface Location {
  id: number;
  location: string;
}

export interface PaintingsWithDetails extends Painting {
  authorName: string;
  locationName: string;
}

export interface PaintingsParams {
  _page: number;
  _limit: number
}

export interface PaintingsResponse {
  paintings: PaintingsWithDetails[];
  totalCount: number;
}

export const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;