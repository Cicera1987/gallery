import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

type Cat = {
    id: number;
    name: string;
    breed: string;
    age: number;
    image: string;
};

type GalleryState = {
    cats: Cat[];
    loading: boolean;
};

const initialState: GalleryState = {
    cats: [],
    loading: false,
};

export const fetchCats = createAsyncThunk('gallery/fetchCats', async () => {
    const response = await fetch('/api/cats');
    return response.json();
});


export const gallerySlice = createSlice({
    name: 'gallery',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCats.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCats.fulfilled, (state, action) => {
                state.loading = false;
                state.cats = action.payload;
            });
    },
});

export default gallerySlice.reducer;