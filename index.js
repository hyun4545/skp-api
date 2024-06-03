const express = require('express');
const axios=require('axios');
const app = express();

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