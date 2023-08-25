import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { bannerList, productList, categoryList, cardList } from "../../services/api";
import { API_STATUS } from "../../utils/constants";
import EncryptDecrypt from './../../utils/encrypt&decrypt';
import { secretKey } from "../../services/config";
import alertmessage from './../../utils/alert';
const namespace = "banner";

const initialState = {
    loading: "initial",
    categoryloading:"initial",
    errorMessage: null,
    bannerDatas: null,
    productDatas: null,
    reviewDatas:null,
    toprateDatas:null,
    bestsellDatas:null,
    allRatingsDatas:null,
    offerDatas:null,
    categoryDatas: null,
    bannerCount: 0,
    bannerDataById: null
};

export const bannerData = createAsyncThunk(
    `${namespace}/bannerData`,
    async ({ query = "", page = 0, limit = 0, sortby = "", order = "" }, { rejectWithValue, dispatch }) => {
        try {
            console.log("interdata");
            //let payload = EncryptDecrypt.encryptdata(postData, secretKey)
            const data = await bannerList(query, page, limit, sortby, order);
            console.log("getCount--> ", data);
            return data;
        } catch (error) {
            console.log("getCount error--->", error);
            return rejectWithValue(error.response);
        }
    }
);


export const productData = createAsyncThunk(
    `${namespace}/productData`,
    async ({ query = "", page = 0, limit = 0, sortby = "", order = "" }, { rejectWithValue, dispatch }) => {
        try {
            console.log("interdata");
            //let payload = EncryptDecrypt.encryptdata(postData, secretKey)
            const data = await productList(query, page, limit, sortby, order);
            console.log("getCount--> ", data);
            return data;
        } catch (error) {
            console.log("getCount error--->", error);
            return rejectWithValue(error.response);
        }
    }
);



export const categoryData = createAsyncThunk(
    `${namespace}/categoryData`,
    async ({ query = "", page = 0, limit = 0, sortby = "", order = "" }, { rejectWithValue, dispatch }) => {
        try {
            console.log("interdata");
            //let payload = EncryptDecrypt.encryptdata(postData, secretKey)
            const data = await categoryList(query, page, limit, sortby, order);
            console.log("getCount--> ", data);
            return data;
        } catch (error) {
            console.log("getCount error--->", error);
            return rejectWithValue(error.response);
        }
    }
);

export const cardData = createAsyncThunk(
    `${namespace}/cardData`,
    async ({ query = "", page = 0, limit = 0, sortby = "", order = "" }, { rejectWithValue, dispatch }) => {
        try {
            console.log("interdata");
            //let payload = EncryptDecrypt.encryptdata(postData, secretKey)
            const data = await cardList(query, page, limit, sortby, order);
            console.log("getCount--> ", data);
            return data;
        } catch (error) {
            console.log("getCount error--->", error);
            return rejectWithValue(error.response);
        }
    }
);

const bannerSlice = createSlice({
    name: namespace,
    initialState,
    reducers: {
        clearData: () => {
            return initialState;
        },
        clearBannLoadingDatas: (state) => {
            state.loading = "initial";
        },
        clearErrormsg: (state) => {
            state.errorMessage = null;
        }
    },
    extraReducers: {
        [bannerData.pending](state) {
            state.loading = API_STATUS.PENDING;
        },
        [bannerData.fulfilled](state, { payload }) {
            state.loading = API_STATUS.FULFILLED;
            //let payloaddatas = JSON.parse(EncryptDecrypt.decryptdata(payload?.data?.datas, secretKey));
            console.log(payload, "payload")
            state.bannerCount = payload?.data?.banner_count;
            state.bannerDatas = payload?.data?.data_banner;
        },
        [bannerData.rejected](state, action) {
            state.loading = API_STATUS.REJECTED;
            state.errorMessage = action?.payload?.data;
        },
        [productData.pending](state) {
            state.productloading = API_STATUS.PENDING;
        },
        [productData.fulfilled](state, { payload }) {
            state.productloading = API_STATUS.FULFILLED;
            //let payloaddatas = JSON.parse(EncryptDecrypt.decryptdata(payload?.data?.datas, secretKey));
            console.log(payload, "payload")
            state.productDatas = payload?.data?.data;
            state.reviewDatas = payload?.data?.reviews;
        },
        [productData.rejected](state, action) {
            state.productloading = API_STATUS.REJECTED;
            state.errorMessage = action?.payload?.data;
        },
        [categoryData.pending](state) {
            state.categoryloading = API_STATUS.PENDING;
        },
        [categoryData.fulfilled](state, { payload }) {
            state.categoryloading = API_STATUS.FULFILLED;
            //let payloaddatas = JSON.parse(EncryptDecrypt.decryptdata(payload?.data?.datas, secretKey));
            console.log(payload, "payload")
            state.categoryDatas = payload?.data?.data_category;
        },
        [categoryData.rejected](state, action) {
            state.categoryloading = API_STATUS.REJECTED;
            state.errorMessage = action?.payload?.data;
        },
        [cardData.pending](state) {
            state.categoryloading = API_STATUS.PENDING;
        },
        [cardData.fulfilled](state, { payload }) {
            state.categoryloading = API_STATUS.FULFILLED;
            //let payloaddatas = JSON.parse(EncryptDecrypt.decryptdata(payload?.data?.datas, secretKey));
            console.log(payload, "payload")
            state.offerDatas = payload?.data?.offer_data;
            state.bestsellDatas = payload?.data?.bestsell_data;
            state.toprateDatas = payload?.data?.toprated_data;
            state.allRatingsDatas = payload?.data?.ratings_data;
        },
        [cardData.rejected](state, action) {
            state.categoryloading = API_STATUS.REJECTED;
            state.errorMessage = action?.payload?.data;
        },
    },
});

export const { clearData, clearLoadingDatas, clearBannAddLoading, clearBannUpdateLoading, clearBannDeleteLoading, clearErrormsg } = bannerSlice.actions;

export const bannerSelector = (state) => state.banner;

export default bannerSlice.reducer;
