const fs = require('fs');
var path = require("path");

class ExamPaperList {
  constructor() {
    this.papers = this.loadExamPapers();
  };

  loadExamPapers() {
    let examPapers = [];
    var walkPath = path.resolve(__dirname, 'exam-papers');

    var walk = function (directory, finished) {
        /* Initial search for the new file's question paper (in docx. and pdf format), its mark scheme and solutions */
        let npDOC = '';
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
        
          /* File search is finished once no more files can be found */
          if (!nextFile) {
            return finished(null);
          }

          /* String manipulation to retrieve title for exam paper using the file's name */
          let npTitle = nextFile.substring(0, nextFile.length - 4);
          npTitle = npTitle.replaceAll('-', ' ');

          /* Append current directory to next file */
          nextFile = directory + '/' + nextFile;

          fs.stat(nextFile, function (error, stat) {
            /* If the next object is a directory, walk into it */
            if (stat && stat.isDirectory()) {
              /* Recursive call into new directory found */
              walk(nextFile, function (error) {
                next();
              });
            } else if (nextFile) {
              /* Otherwise, access the next file in the current directory */

              if (nextFile.includes('.pdf')) {
                if (nextFile.includes('MS')) {
                    /* Mark Scheme PDF file of exam paper */
                    npMS = nextFile;
                } else if (nextFile.includes('SOL')) {
                    /* Solutions PDF file of exam paper */
                    npSOL = nextFile;
                } else {
                    /* PDF file for question paper */
                    npPDF = nextFile;
                }
              } else if (nextFile.includes('.doc')) {
                /* DOCX. file of question exam paper */
                npDOC = nextFile;
              } else {
                paperFound = false;
              }

              /* Paper is found once the file URL's for its the question paper and the mark scheme are found */
              if (npPDF != '' && npDOC != '' && npMS != '') {
                paperFound = true;
              }

              next();
            }

            /* Add new exam paper into array */
            if (paperFound) {
              examPapers.push({title: npTitle,
                PDFlink: npPDF,
                docLink: npDOC,
                MSLink: npMS,
                solLink: npSOL});
            }
          });
        }
        )();
      });
    };

    console.log('Processing exam paper files...');

    walk(walkPath, function (error) {
      if (error) {
        throw error;
      } else {
        console.log('--- Exam papers:');
        console.log(examPapers);
        console.log('---');
      }
    });
    return examPapers;
  }
}

module.exports = ExamPaperList;