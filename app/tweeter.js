var request = require("request");
var Twit = require("twit");

var isProduction = JSON.parse(process.env.IS_PRODUCTION);
if (isProduction == false) {
  require('dotenv').load(); // Load .env for testing
}

var T = new Twit({
  consumer_key: process.env.PSB_API_KEY,
  consumer_secret: process.env.PSB_API_SECRET,
  access_token: process.env.PSB_TOKEN_KEY,
  access_token_secret: process.env.PSB_TOKEN_SECRET
});

var postTweet = function(tweet) {
  console.log("Posting Tweet");
  T.post("statuses/update", { status: tweet }, function(err, reply) {
    if (err) {
        console.dir(err);
    } else {
        console.dir(reply);
    }
  });
};

var composeTweet = function(lineCount) {
  if (lineCount && lineCount == 1) {
    var tweet = lineCount + ' more person.';
  } else {
    var tweet = lineCount + ' more people.';
  }
  if (isProduction == true) {
    postTweet(tweet);
  } else {
    console.log('Tweet:');
    console.log(tweet);
  }
}

exports.postTweet = postTweet;
exports.composeTweet = composeTweet;
