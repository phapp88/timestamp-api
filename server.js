var express = require('express');
var moment = require('moment');

var app = express();
var dateObj = {};

function containsUnixDate(paramString) {
  if (/^\d+$/.test(paramString)) {
    var dateMoment = moment(paramString, 'X');
    editDateObj(dateMoment);
    return true;
  };
  return false;
};

function containsNaturalDate(paramString) {
  var dateMoment = moment(paramString);
  if (dateMoment.isValid()) {
    editDateObj(dateMoment);
    return true;
  };
  return false;
};

function editDateObj(dateMoment) {
  dateObj.unix = dateMoment.format('X');
  dateObj.natural = dateMoment.format('MMMM D, YYYY');
};

app.get('/', function(req, res) {
  var html = '<h1>Free Code Camp Timestamp Microservice</h1>' +
              '<p>Enter a natural language date or a unix timestamp</p>' +
              '<h3>Example Usage:</h3>' +
              '<p>https://timestamp2.herokuapp.com/December 15, 2015<br />https://timestamp2.herokuapp.com/1450137600</p>' +
              '<h3>Example Output:</h3>' +
              '<p>{ "unix": 1450137600, "natural": "December 15, 2015" }</p>';
  res.send(html);
});

app.get('/:param', function (req, res) {
  var paramString = req.params.param;
  if (!containsUnixDate(paramString)) {
    if (!containsNaturalDate(paramString)) {
      dateObj.unix = 'null';
      dateObj.natural = 'null';
    };
  };
  res.send(JSON.stringify(dateObj));
});

app.listen(process.env.PORT || 8080);