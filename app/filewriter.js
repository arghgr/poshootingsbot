var fs = require('fs');

var writeToFile = function(data, filename, callback) {
  var stream = fs.createWriteStream(filename);
  stream.on('open', function(filedescriptor) {
    stream.write(data);
    stream.end();
  }).on('end', function() {
    console.log('File written to ' + filename + '.');
    callback();
  });
}

var renameFile = function(oldPath, newPath, callback) {
  fs.rename(oldPath, newPath, function(error) {
    if (error) {
      console.log('renameFile error');
      console.log(error);
    }
    callback();
  });
}

var copyToFile = function(file, copyLocation) {
  fs.createReadStream(file)
    .pipe(fs.createWriteStream(copyLocation));
}

exports.writeToFile = writeToFile;
exports.copyToFile = copyToFile;
exports.renameFile = renameFile;
