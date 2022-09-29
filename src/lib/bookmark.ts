import { createSlice } from "@reduxjs/toolkit";

export interface BookmarkI {
  url: string;
  timestamp: number;
}

const initialState: BookmarkI[] = [];

export const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState: {
    list: initialState,
  },
  reducers: {
    addBookmark: (state, action) => {
      const { url } = action.payload;
      const timestamp = Date.now();
      state.list.push({ url, timestamp });
    },
    removeBookmark: (state, action) => {
      state.list = state.list.filter((bm) => bm.timestamp !== action.payload);
    },
    updateBookmark: (state, action) => {
      const { timestamp, url } = action.payload;
      let index = state.list.findIndex((bm) => bm.timestamp === timestamp);
      state.list[index].url = url;
    },
  },
});

export const { addBookmark, removeBookmark, updateBookmark } =
  bookmarkSlice.actions;

export default bookmarkSlice.reducer;
