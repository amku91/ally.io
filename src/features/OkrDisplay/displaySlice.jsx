import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { applyFilterLogic, mapParentandChildOkrs } from "../../utils/helper";
import { fetchOkrAPI } from "./displayAPI";

const initialState = {
  okrData: [],
  updateAt: null,
  filter: "",
  filterArray: [],
  status: "pending",
  clickedData: null,
  isError: false,
  error: "",
};

/**
 * @name fetchDataAsync
 * @description Server OKR fetch API thunka async method
 */

export const fetchDataAsync = createAsyncThunk("okr/fetch", async (updateAt) => {
  let response = await fetchOkrAPI(updateAt);
  // The value we return becomes the `fulfilled` action payload
  return response;
});

/**
 * @name displaySlice
 * @description Reduc toolkit slice method to return action and reducers
 */
export const displaySlice = createSlice({
  name: "okr",
  initialState,
  reducers: {
    applyFilter: (state, action) => {
      state.filter = action.payload;
    },
    clickedRowData: (state, action) => {
      state.clickedData = action.payload;
    },
    resetRowData: (state, action) => {
      state.clickedData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // .addDefaultCase()
      .addCase(fetchDataAsync.pending, (state) => {
        state.status = "loading";
        state.isError = false;
        state.error = "";
      })
      .addCase(fetchDataAsync.rejected, (state, err) => {
        state.status = "idle";
        state.isError = true;
        state.error = err;
      })      
      .addCase(fetchDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        //assing parent child mapped data in store as we dont have any other operations to perform on that
        state.okrData = mapParentandChildOkrs(action.payload);
        state.filterArray = [...new Set(action.payload.map(item => item.category))];
        state.isError = false;
        state.error = "";
      });
  },
});

export const { applyFilter, clickedRowData, resetRowData } = displaySlice.actions;

/**
 * Define Selectors
 */
export const selectedFilter = (state) => state.okr.filter;

export const filterArray = (state) => state.okr.filterArray;

export const okrFetchData = (state) => applyFilterLogic(state.okr.okrData, state.okr.filter);;

export const okrIsLoading = (state) => state.okr.status;

export const clickedTitle = (state) => state.okr.clickedData === null ? {} : state.okr.clickedData;

export const isErrorLogged = (state) => state.okr.isError;
// createSelector(
//   (state) => {
//     return state.okrData
//   },
// );

// const okrFetchData = createSelector(
//   (state) => state.okrData,
//   (okr) => okr.map((okr) => mapParentandChildOkrs(action.payload))
// )

export default displaySlice.reducer;
