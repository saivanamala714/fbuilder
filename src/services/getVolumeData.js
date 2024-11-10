import axios from 'axios';
const getVolumeData = async ({ticker, callPut}) => {
  try{
    const url = `http://localhost:3001/optionInterestByTicker?ticker=${ticker}&callPut=${callPut}`;
    return await axios.get(url);
  }catch(err){
    throw new Error(err.message);
  }
}

export default getVolumeData;
