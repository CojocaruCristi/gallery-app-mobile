import { configureStore } from '@reduxjs/toolkit';
import imageReducer from './imagesReducerSlice';
import saga from '../Sagas/saga';
import createSagaMiddleware from 'redux-saga'


let sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]


export default configureStore({
    reducer: {
        imageReducer: imageReducer
    },
    middleware: (getDefaultMiddleware) => {
       return getDefaultMiddleware().concat(middleware);
    }
})

sagaMiddleware.run(saga)
