import { createSlice } from '@reduxjs/toolkit';

const itemSlice = createSlice({
  name: 'items',
  initialState: {
    items: [], // Array to hold items
    filter: '', // Search filter
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 5,
  },
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateItem: (state, action) => {
      const { id, title, body } = action.payload;
      const itemToUpdate = state.items.find((item) => item.id === id);
      if (itemToUpdate) {
        itemToUpdate.title = title;
        itemToUpdate.body = body;
      }
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
  },
});

export const { 
  setItems, 
  setFilter, 
  deleteItem, 
  updateItem, 
  setCurrentPage, 
  setTotalPages 
} = itemSlice.actions;
export default itemSlice.reducer;
