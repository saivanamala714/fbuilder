import axios from 'axios';
const getLatestOptionInfoApi = async ({ticker, callPut}) => {
  try{
    const url = `http://localhost:3001/optionInterestByTicker?ticker=${ticker}&callPut=${callPut}`;
    return await axios.get(url);
  }catch(err){
    throw new Error(err.message);
  }
}

const getHistoricalOptionInfoApi = async ({ticker, callPut}) => {
  try{
    const url = `http://localhost:3001/optionInterestByTickerHistoricalData?ticker=${ticker}&callPut=${callPut}`;
    return await axios.get(url);
  }catch(err){
    throw new Error(err.message);
  }
}

export  { getLatestOptionInfoApi, getHistoricalOptionInfoApi } ;
