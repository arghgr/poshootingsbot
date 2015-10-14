require('dotenv').load();
var request = require('request');

var csvd = require('./csvdiffer');
var fw = require('./filewriter');
var tw = require('./tweeter');

var csv = 'https://raw.githubusercontent.com/washingtonpost/data-police-shootings/master/fatal-police-shootings-data.csv';

// File paths to write to
var oldFile = "./tmp/old-csv.txt";
var currentFile = "./tmp/current-csv.txt";

var runApp = function() {
  request.get(csv, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var rawList = body;
      fw.renameFile(currentFile, oldFile, function() {
        fw.writeToFile(rawList, currentFile, function() {
          csvd.checkForNewLines(oldFile, currentFile, function(lineCheck) {
            if (lineCheck && lineCheck > 0) {
              tw.composeTweet(lineCheck);
            }
          });
        });
      });
    } else {
      console.log(error);
    }
  });
}

// Check if on production server using .env var
var isProduction = JSON.parse(process.env.IS_PRODUCTION);

if (isProduction == true) {
  // RUN WITH PRODUCTION DATA AND HEROKU SCHEDULER
  runApp();
} else if (isProduction == false) {
  // RUN WITH TEST DATA AND SCRAPE SPEEDS
  // var scrapeFrequency = 1000 * 60 * 60 * 3; // Scrape every three hours
  var scrapeFrequency = 1000 * 5; // Scrape every five seconds
  console.log("isProduction? " + isProduction);
  console.log("scrapeFrequency: " + scrapeFrequency);
  var test = setInterval(function() {
    runApp();
  }, scrapeFrequency);
} else {
  console.log('No isProduction');
}
