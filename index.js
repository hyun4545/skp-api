const express = require('express');
const axios=require('axios');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
// Use CORS middleware
app.use(cors());

const uri = "mongodb+srv://amy:amy0917@cluster0.yewt8nt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.post('/saveUserStockes', async (req, res) => {
  try {
    await client.connect();
    await client.db("skp")
          .collection("skp-user-stockes")
          .insertMany(req.body);
  } finally {
    await client.close();
  }
});

app.get('/getAllStock', (req, res) => {
  axios.get("https://openapi.twse.com.tw/v1/exchangeReport/TWTB4U")
      .then((response) => {
        res.send(response.data);
        //console.log(response.data)
       /* setAllStock(response.data);
        switch (selectKind) {
          case "stockCode":
            var arr = response.data.filter((d) => d.Code == keyword);
            setAllStock(arr);
            break;

          case "stockName":
            var arr = response.data.filter((d) => d.Name.includes(keyword));
            setAllStock(arr);
            break;
        }*/
      })
      .catch((error) => console.log(error));
})

app.get('/bye', (req, res) => {
  res.send('bye!')
})

app.listen(3000)