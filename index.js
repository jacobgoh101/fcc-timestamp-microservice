const express = require('express');
const moment = require('moment');

const app = express();

app.get('/',(req,res) => {
  res.setHeader("Content-Type", "text/plain");
  let message = 'Based on https://www.freecodecamp.com/challenges/timestamp-microservice';

  message += '\n\n\n\nExample usage:';
  message += '\n\nhttps://jacobgoh101-fcc-timestamp-api.herokuapp.com/December%2015,%202015';
  message += '\n\nhttps://jacobgoh101-fcc-timestamp-api.herokuapp.com/1450137600';
  res.end(message);
});

app.get('/:timeStr', (req,res) => {
  res.setHeader("Content-Type", "application/json");

  let timeStr = req.params.timeStr;
  let date = moment(timeStr);
  if(!date.isValid()) {
    date = moment.unix(timeStr);
  }
  if(!date.isValid()) {
    let result = {
      unix: null,
      natural: null
    };
    result = JSON.stringify(result);
    res.end(result);
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
