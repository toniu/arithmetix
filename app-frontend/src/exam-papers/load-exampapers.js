var fs = require('fs');

let examPapers = [];
var walkPath = 'app-frontend/src/exam-papers';

var walk = function (directory, finished) {
    console.log('-------Directory ', directory);
    let npDoc = '';
    let npPDF = '';
    let npMS = '';
    let npSOL = '';
    let paperFound = false;
  fs.readdir(directory, function (error, list) {
    if (error) {
      return finished(error);
    }

    var i = 0;

    (function next() {
      var nextFile = list[i++];
      console.log(i);
    
      /* File search is finished once no more files can be found */
      if (!nextFile) {
        return finished(null);
      }

      let npTitle = nextFile.substring(0, nextFile.length - 4);
      npTitle = npTitle.replaceAll('-', ' ');

      nextFile = directory + '/' + nextFile;

      fs.stat(nextFile, function (error, stat) {
        /* If the next object is a directory, walk into it */
        if (stat && stat.isDirectory()) {
          walk(nextFile, function (error) {
            next();
          });
        } else if (nextFile) {
          /* Otherwise, access the next file in the current directory */
          console.log(nextFile);

          if (nextFile.includes('.pdf')) {
            if (nextFile.includes('MS')) {
                /* Mark Scheme PDF of paper */
                console.log('MS found');
                npMS = nextFile;
                paperFound = true;
            } else if (nextFile.includes('SOL')) {
                /* Solutions PDF of paper */
                console.log('Solutions found');
                npSOL = nextFile;
                paperFound = true;
            } else {
                /* PDF file for question paper */
                console.log('PDF found');
                npPDF = nextFile;
                paperFound = true;
            }
          } else if (nextFile.includes('.doc')) {
            /* Doc file of question paper */
            console.log('Doc found');
            npDoc = nextFile;
            paperFound = true;
          } else {
            paperFound = false;
          }

          next();
        }
      });

      if (paperFound) {
        examPapers.push({title: npTitle, docURL: npDoc, pdfURL: npPDF, MSURL: npMS, solURL: npSOL});
      }
    }
    )();
  });
};

// optional command line params
//      source for walk path
process.argv.forEach(function (val, index, array) {
  if (val.indexOf('source') !== -1) {
    walkPath = val.split('=')[1];
  }
});

console.log('Processing exam paper files...');

walk(walkPath, function (error) {
  if (error) {
    throw error;
  } else {
    console.log(
      '-------------------------------------------------------------',
    );
    console.log('End of exam paper files');
    console.log(
      '-------------------------------------------------------------',
    );
    console.log('--- PAPER ARRAY');
    console.log(examPapers);
    console.log('---');
  }
});


