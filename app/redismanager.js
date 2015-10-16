var fs = require('fs');
var redis = require('redis');

var writeToRedis = function(key, value, callback) {
  var redisClient = redis.createClient(process.env.REDIS_URL); // Needs REDIS_URL as env var
  console.log('writeToRedis');
  redisClient.on('connect', function(error) {
    if (error) { console.log(error); }
    console.log('Connected to Redis server.');
    redisClient.set(key, value, function(err, res) {
      if (err) {
        console.log('Redis SET error.');
        console.log(err);
      }
      console.log('Set ' + key + ': ' + res);
      redisClient.quit(function() {
        console.log('writeToRedis disconnected from Redis server.');
        callback(res);
      });
    });
  });
  redisClient.on('error', function(error) {
    console.log('Redis error');
    console.log(error);
  });
}

var readFromRedis = function(key, callback) {
  var redisClient = redis.createClient(process.env.REDIS_URL); // Needs REDIS_URL as env var
  console.log('readFromRedis');
  redisClient.on('connect', function(error) {
    if (error) { console.log(error); }
    console.log('Connected to Redis server.');
    redisClient.get(key, function(err, res) {
      if (err) { console.log(err); }
      console.log('Retrieved value from key ' + key + '.');
      redisClient.quit(function() {
        console.log('readFromRedis disconnected from Redis server.');
        callback(res);
      });
    });
  });
  redisClient.on('error', function(error) {
    console.log('Redis error');
    console.log(error);
  });
}

// readFromRedis('old', function(res) {
//   console.log('This old is: ' + res);
// });

exports.writeToRedis = writeToRedis;
exports.readFromRedis = readFromRedis;
