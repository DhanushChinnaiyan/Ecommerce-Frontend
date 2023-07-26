import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading:false,
    products:[],
}

const ProductSlice = createSlice({
    name:"products",
    initialState,
    reducers:{
        productRequest:(state)=>{
            state.loading = true;
            state.products = []
        },
        productFetchedSuccessfully:(state,action) => {
            state.loading = false;
            state.products = action.payload
        },
        productRequestFailed:(state) => {
            state.loading = false;
            state.products = []
        }
    }
})

export const {productRequest,productFetchedSuccessfully,productRequestFailed} = ProductSlice.actions

export const productReducer = ProductSlice.reducer