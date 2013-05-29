"use strict";

// CPD csv row output format.
// =============================================================================
//
// 0 : number lines duplicated
// 1 : number of tokens
// 2 : ?? number of files matched
// 3 : starting at line of file [4]
// 4 : filename
// 5 : starting at line of file [6]
// 6 : filename
// repeat for subsequent files?
//

var csv = require('csv'),
    fs  = require('fs');

exports.process = function () {};

exports.processOverview = function(reportCsvFile, callback) {
  var pastes = [];

  csv()
  .from(fs.createReadStream(reportCsvFile))
  .on('record', function(row, index){
    var record, i;

    if (!index) { return; }

    record = {
      lines: row[0],
      tokens: row[1],
      files: []
    };

    for (i = 3; i < 3 + (2 * row[2]); i += 2) {
      record.files.push({
        line: row[i],
        filename: row[i+1]
      });
    }

    pastes.push(record);
  })
  .on('end', function() { callback(pastes); });
};


