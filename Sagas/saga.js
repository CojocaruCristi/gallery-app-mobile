import { call, takeEvery, put } from 'redux-saga/effects'
import { 
  setImages, 
  toggleIsDataLoading, 
  setImagesTopics, 
  toggleAreTopicsLoading, 
  setSearchResults, 
  setNoSearchResults, 
  setSelectedTopicType, 
  setGlobalError } from '../Store/imagesReducerSlice'
import { sagaActions } from './sagaActions'
import ImagesApi from '../Api/imagesApi'
import { validateAxiosResponse } from '../Api/validators'

export function* fetchImagesSaga() {
  try {
    let result = yield call(() =>
     ImagesApi.getImages()
    )
    const data = validateAxiosResponse(result);

    yield put(setImages(data))
    yield put(toggleIsDataLoading(false));
    yield put(setNoSearchResults(!!data.length));

  } catch (error) {
    yield put(setGlobalError({
      errorMessage: error.message,
      status: error.response.status
    }))
  }
}

export function* fetchTopicsSaga() {
  try {
    let result = yield call(() =>
     ImagesApi.getImagesTopics()
    )

    const data = validateAxiosResponse(result);

    yield put(setImagesTopics(data))
    yield put(toggleAreTopicsLoading(false));

  } catch (e) {
    yield put(setGlobalError({
      errorMessage: error.message,
      status: error.response.status
    }))
  }
}

export function* fetchImagesByTopicsSaga(payload) {
  try {
    let result = yield call(() =>
     ImagesApi.getImagesByTopic(payload.topicId)
    )
    const data = validateAxiosResponse(result);

    yield put(setImages(data))
    yield put(toggleIsDataLoading(false));

  } catch (e) {
    yield put(setGlobalError({
      errorMessage: error.message,
      status: error.response.status
    }))
  }
}

export function* fetchImagesSearchSaga(payload) {
  try {
    let result = yield call(() =>
     ImagesApi.searchImages(payload.query)
    )
    
    const data = validateAxiosResponse(result);

    yield put(setSearchResults(data.results))
    yield put(setSelectedTopicType({title: "Search", id: null}))
    yield put(toggleIsDataLoading(false));
    yield put(setNoSearchResults(!!data.results.length));



  } catch (e) {
    yield put(setGlobalError({
      errorMessage: error.message,
      status: error.response.status
    }))
  }
}


export default function* rootSaga() {
  yield takeEvery(sagaActions.FETCH_IMAGES, fetchImagesSaga);
  yield takeEvery(sagaActions.FETCH_TOPICS, fetchTopicsSaga);
  yield takeEvery(sagaActions.FETCH_IMAGES_BY_TOPIC, fetchImagesByTopicsSaga);
  yield takeEvery(sagaActions.FETCH_IMAGES_SEARCH, fetchImagesSearchSaga);
}