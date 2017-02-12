const express = require('express');
const moment = require('moment');

const app = express();

app.get('/:timeStr', (req,res) => {
  res.setHeader("Content-Type", "application/json");

  let timeStr = req.params.timeStr;
  let date = moment(timeStr);
  if(!date.isValid()) {
    date = moment.unix(timeStr);
  }
  const monthsName = [ "January", "February", "March", "April", "May", "June",
               "July", "August", "September", "October", "November", "December" ];
  let natural = monthsName[date.months()] + ' ' + date.get('dates') + ', ' + date.get('years');
  let result = {
    unix: date.unix(),
    natural
  };
  result = JSON.stringify(result);
  res.end(result);
});

const port = process.env.PORT || 8080;
app.listen(port);
