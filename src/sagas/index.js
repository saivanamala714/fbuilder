import { put, takeLatest, all, call } from 'redux-saga/effects';
import getVolumeData from '../services/getVolumeData';
function* fetchNews({ payload}) {
  const { ticker, callPut } = payload;
    const { data } = yield call(getVolumeData, { ticker , callPut});

  console.log(data)

  yield put({ type: "NEWS_RECEIVED", payload: data });
}
function* actionWatcher() {
     yield takeLatest('GET_NEWS', fetchNews)
}
export default function* rootSaga() {
   yield all([
   actionWatcher(),
   ]);
}
