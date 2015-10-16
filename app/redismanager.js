var fs = require('fs');
var redis = require('redis');
var redisClient = redis.createClient(process.env.REDIS_URL); // Needs REDIS_URL as env var

var writeToRedis = function(key, value, callback) {
  redisClient.on('connect', function() {
    console.log('Connected to Redis server.');
    redisClient.set(key, value, function(error, reply) {
      if (error) { console.log(error); }
      console.log('Set ' + key + ' to ' + value + '.');
      console.log('Reply: ' + reply);
      redisClient.quit(function() {
        console.log('Disconnected from Redis server.');
      });
    });
  });
  redisClient.on('error', function(error) {
    console.log('Redis error');
    console.log(error);
  });
}

exports.writeToRedis = writeToRedis;
