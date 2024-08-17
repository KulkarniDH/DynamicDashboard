import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  categories: [],
  status: 'idle',
  error: null,
};

// Fetch categories from json-server
export const fetchCategories = createAsyncThunk('widgets/fetchCategories', async () => {
  const response = await axios.get('http://localhost:3002/categories');
  return response.data;
});

// Add a widget to a category
export const addWidget = createAsyncThunk('widgets/addWidget', async ({ categoryId, widget }) => {
  const response = await axios.post(`http://localhost:3002/categories/${categoryId}/widgets`, widget);
  return { categoryId, widget: response.data };
});

// Remove a widget from a category
export const removeWidget = createAsyncThunk('widgets/removeWidget', async ({ categoryId, widgetId }) => {
  await axios.delete(`http://localhost:3002/categories/${categoryId}/widgets/${widgetId}`);
  return { categoryId, widgetId };
});

const widgetsSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addWidget.fulfilled, (state, action) => {
        const { categoryId, widget } = action.payload;
        const category = state.categories.find(cat => cat.id === categoryId);
        if (category) {
          category.widgets.push(widget);
        }
      })
      .addCase(removeWidget.fulfilled, (state, action) => {
        const { categoryId, widgetId } = action.payload;
        const category = state.categories.find(cat => cat.id === categoryId);
        if (category) {
          category.widgets = category.widgets.filter(widget => widget.id !== widgetId);
        }
      });
  }
});

export default widgetsSlice.reducer;
