var fs = require('fs');

var countLines = function(file, callback) {
  var count = 0;
  fs.createReadStream(file)
    .on('data', function(chunk) {
      for (var i = 0; i < chunk.length; i++) {
        if (chunk[i] == 10) count++;
      }
    })
    .on('end', function() {
      callback(count - 1); // Removes first line because it's the csv header
    });
}

var checkForNewLines = function(file1, file2, callback) {
  countLines(file1, function(count1) {
    countLines(file2, function(count2) {
      var lines1 = count1;
      var lines2 = count2;
      console.log('file1 count: ' + lines1);
      console.log('file2 count: ' + lines2);
      var linesDiff = lines2 - lines1;
      if (lines1 > 0 && lines2 > 0 && linesDiff > 0) {
        callback(linesDiff);
      } else {
        callback(false);
      }
    });
  });
}

exports.checkForNewLines = checkForNewLines;
