import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productAxios from "../api/products";
import { RootState } from "../app/store";
import { RequestStatus } from "../context/AuthContext";


export type Product = {
    id: string,
    name: string,
    imageURL: string,
    description: string

}
type productsState = {
    status: RequestStatus,
    data: Product[]
}
const initialState: productsState = {
    status: 'idle',
    data: []
}
const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(fetchProductsData.fulfilled, (state, action) => {
                state.data = action.payload;
                state.status = 'success';
            })
            .addCase(fetchProductsData.rejected, (state) => {
                state.status = 'failure';
            })
            .addCase(fetchProductsData.pending, (state) => {
                state.status = 'pending'
            })
    }
})


export const fetchProductsData = createAsyncThunk('fetchProductsData', async ({ page, limit }: { page: number, limit: number }) => {
    const response = await productAxios.get('');
    const data: Product[] = response.data
    const pageNumber = Math.floor(data.length / limit) + 1;
    if (page > pageNumber) {
        page = 1;
    }
    const returnData = data.slice((page - 1) * limit, page * limit);
    return [...returnData];
})


export const getProducts = (state: RootState) => state.products.data;
export const getProductsStatus = (state: RootState) => state.products.status;

export default productsSlice.reducer;