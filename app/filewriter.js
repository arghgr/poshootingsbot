var fs = require('fs');

var writeToFile = function(data, filename, callback) {
  console.log('writeToFile');
  var writeStream = fs.createWriteStream(filename);
  writeStream.on('open', function(filedescriptor) {
    console.log('Opened writeStream');
    writeStream.write(data);
    writeStream.end();
  }).on('finish', function() {
    console.log('Data written to ' + filename + '.');
    callback();
  });
  writeStream.on('error', function(error) {
    console.log('writeStream error');
    console.log(error);
  });
}

var renameFile = function(oldPath, newPath, callback) {
  console.log('renameFile');
  fs.rename(oldPath, newPath, function(error) {
    if (error) {
      console.log('renameFile error');
      console.log(error);
    } else {
      console.log('Renamed file ' + oldPath + ' to ' + newPath + '.');
      callback();
    }
  });
}

var copyToFile = function(file, copyLocation) {
  console.log(copyToFile);
  var readStream = fs.createReadStream(file);
  readStream(file)
    .on('open', function() {
      console.log('Copying file to ' + copyLocation);
      readStream.pipe(fs.createWriteStream(copyLocation));
    });
}

exports.writeToFile = writeToFile;
exports.copyToFile = copyToFile;
exports.renameFile = renameFile;
