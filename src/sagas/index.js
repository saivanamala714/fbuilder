import { put, takeLatest, all, call } from 'redux-saga/effects';
import { getLatestOptionInfoApi, getHistoricalOptionInfoApi } from '../services/getVolumeData';
import { GET_LATEST_OPTION_INFO, LATEST_OPTION_INFO, GET_HISTORICAL_OPTION_INFO, HISTORICAL_OPTION_INFO } from '../constants/actionTypes';
function* fetchLatestOptionInfo({ payload }) {
  const { ticker, callPut } = payload;
  const { data } = yield call(getLatestOptionInfoApi, { ticker, callPut });

  yield put({ type: LATEST_OPTION_INFO, payload: data });
}
function* fetchHistoricalOptionInfo({ payload }) {
  const { ticker, callPut } = payload;
  const { data } = yield call(getHistoricalOptionInfoApi, { ticker, callPut });

  yield put({ type: HISTORICAL_OPTION_INFO, payload: data });
}
function* actionWatcher() {
  yield takeLatest(GET_LATEST_OPTION_INFO, fetchLatestOptionInfo);
  yield takeLatest(GET_HISTORICAL_OPTION_INFO, fetchHistoricalOptionInfo );
}
export default function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}
