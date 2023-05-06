import { createSlice } from '@reduxjs/toolkit'

const imagesSlice = createSlice({
    name: 'imageReducer',
    initialState: {
        images: [],
        imagesTopics: [],
        isDataLoading: false,
        areTopicsLoading: false,
        areSearchResults: true,
        selectedTopicType: {
            title: 'Mixed',
            id: null,
        },
        globalError: {
            errorMessage: '',
            status: null,
        }
    },
    reducers: {
        setImages: (state, action) => {
            state.images = action.payload;
        },
        clearImagesState: (state) => {
            state.images = [];
        },
        setImagesTopics: (state, action) => {
            state.imagesTopics = action.payload;
        },
        toggleIsDataLoading: (state, action) => {
            state.isDataLoading = action.payload; 
        },
        toggleAreTopicsLoading: (state, action) => {
            state.areTopicsLoading = action.payload; 
        },
        changeCategoryFilter: (state, action) => {
            state.categoryFilter = action.category;
        },
        setSearchResults: (state, action) => {
            state.images = action.payload;
        },
        setNoSearchResults: (state, action) => {
            state.areSearchResults = action.payload;
        },
        setSelectedTopicType: (state, action) => {
            state.selectedTopicType = action.payload;
        },
        setGlobalError: (state, action) => {
            state.globalError = action.payload;
        },
        restoreAppState: (state, action) => {
            state.isDataLoading = false;
        }


    }

})


export const { 
    setImages, 
    changeCategoryFilter, 
    toggleIsDataLoading,
    setImagesTopics,
    toggleAreTopicsLoading,
    clearImagesState,
    setSearchResults,
    setNoSearchResults,
    setSelectedTopicType,
    setGlobalError,
    restoreAppState

} = imagesSlice.actions;

export default imagesSlice.reducer;