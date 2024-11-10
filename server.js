const axios = require('axios');

const express = require('express')
const app = express()
const port = 3001
const _ = require('lodash')
const cors = require('cors');
const { MongoClient } = require('mongodb')
const uri = 'mongodb://localhost:27017/test';
var moment = require('moment');
var currentDate = moment().format('yyyy-MM-DD:hh:mm:ss');


// Disable CORS for the entire app
app.use(cors());


const client = new MongoClient(uri);

app.get('/optionInterestByTicker', async (req, res) => {
  await client.connect()
  const databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
  const { ticker, callPut } = req.query;
  // console.log(ticker, callPut);
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://api.nasdaq.com/api/quote/${ticker}/option-chain?assetclass=stocks&limit=200&fromdate=2024-11-09&todate=2025-01-10&excode=oprac&callput=${callPut}&money=all&type=all`,
    headers: {
      'authority': 'query1.finance.yahoo.com',
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.9',
      'cookie': 'GUCS=AT_JV3XJ; GUC=AQEBCAFlYlZljEIgmwTU&s=AQAAAGFuOGBO&g=ZWESTQ; A1=d=AQABBJQj12MCEPtgGSJjDWr6x8_w3LM3RJoFEgEBCAFWYmWMZdwq0iMA_eMBAAcIlCPXY7M3RJo&S=AQAAAj3MWPkdqVNNA7MeLOzfasU; A3=d=AQABBJQj12MCEPtgGSJjDWr6x8_w3LM3RJoFEgEBCAFWYmWMZdwq0iMA_eMBAAcIlCPXY7M3RJo&S=AQAAAj3MWPkdqVNNA7MeLOzfasU; A1S=d=AQABBJQj12MCEPtgGSJjDWr6x8_w3LM3RJoFEgEBCAFWYmWMZdwq0iMA_eMBAAcIlCPXY7M3RJo&S=AQAAAj3MWPkdqVNNA7MeLOzfasU; cmp=t=1700860485&j=0&u=1YNN; gpp=DBAA; gpp_sid=-1; gam_id=y-Chqxg.RE2uItYeZAoOJdU_sl.zOQFJMg~A; axids=gam=y-Chqxg.RE2uItYeZAoOJdU_sl.zOQFJMg~A&dv360=eS16cWpraDN0RTJ1SEd2eDh1Z0guZXBvZTBpdDJVdEJueX5B; tbla_id=46d07313-029f-4a2b-8c25-780144f92dcb-tuctad0aa9e; __gpi=UID=00000cff5cb55dcf:T=1700860487:RT=1700860800:S=ALNI_MaE4tX1NvQcEl7TRfVZUzIMvlBKRg',
      'origin': 'https://finance.yahoo.com',
      'referer': 'https://finance.yahoo.com/trending-tickers;',
      'sec-ch-ua': '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
    }
  };

  // axios.request(config)
  //   .then((response) => {
  //     const openInterestData = response.data.data.table.rows

  //     let mappedData = [];
  //     let sortByVolume = [];
  //     let filteredData = [];
  //     if (callPut == 'call') {
  //       filteredData = _.filter(openInterestData, e => {
  //         const openInterestNumber = Number(e.c_Openinterest);
  //         return _.isNumber(openInterestNumber) && openInterestNumber > 0
  //       })
  //       mappedData = _.map(filteredData, (e, i) => { return { ...e, c_Openinterest: Number(e.c_Openinterest), id: e.c_Openinterest + i } })
  //       sortByVolume = _.orderBy(mappedData, 'c_Openinterest', 'desc')
  //     } else {
  //       filteredData = _.filter(openInterestData, e => {
  //         const openInterestNumber = Number(e.p_Openinterest);
  //         return _.isNumber(openInterestNumber) && openInterestNumber > 0
  //       })
  //       mappedData = _.map(filteredData, (e, i) => { return { ...e, p_Openinterest: Number(e.p_Openinterest), id: e.p_Openinterest + i } })
  //       sortByVolume = _.orderBy(mappedData, 'p_Openinterest', 'desc')
  //     }

  //     res.send(sortByVolume)
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  const response = await axios.request(config);
  console.log(response)
  const openInterestData = response.data.data.table.rows

  let mappedData = [];
  let sortByVolume = [];
  let filteredData = [];
  if (callPut == 'call') {
    filteredData = _.filter(openInterestData, e => {
      const openInterestNumber = Number(e.c_Openinterest);
      return _.isNumber(openInterestNumber) && openInterestNumber > 0
    })
    mappedData = _.map(filteredData, (e, i) => { return { ...e, c_Openinterest: Number(e.c_Openinterest), id: e.c_Openinterest + i } })
    sortByVolume = _.orderBy(mappedData, 'c_Openinterest', 'desc')
  } else {
    filteredData = _.filter(openInterestData, e => {
      const openInterestNumber = Number(e.p_Openinterest);
      return _.isNumber(openInterestNumber) && openInterestNumber > 0
    })
    mappedData = _.map(filteredData, (e, i) => { return { ...e, p_Openinterest: Number(e.p_Openinterest), id: e.p_Openinterest + i } })
    sortByVolume = _.orderBy(mappedData, 'p_Openinterest', 'desc')
  }


  const result = await client.db("local").collection("option_volume_history").insertOne({time: currentDate, data: sortByVolume.slice(0, 10), ticker, callPut});
  console.log(`New listing created with the following id: ${result.insertedId}`);
  res.send(sortByVolume)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
