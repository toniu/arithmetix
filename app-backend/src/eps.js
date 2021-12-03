const fs = require('fs');
/**
 * Class for exam paper list
 */
class EP {
  /**
   * Singleton instance:
   * Instance of exam paper list
   * Only one list of exam papers is required for
   * the whole application to access
   */
  constructor() {
    if (EP.instance) {
      return EP.instance;
    }

    this.papers = [];
    EP.instance = this;
    return EP.instance;
  }

  /**
   * Get instance of exam paper list
   * @return - the instance of the exam paper
   */
  static getInstance() {
    if (!EP.instance) {
      EP.instance = new EP();
    }
    return EP.instance;
  }

  /**
   * Returns the list of files of exam papers
   * (including mark scheme & solutions)
   * @returns the complete list of files
   */
  getPapers() {
    return this.papers;
  }

  /**
   * Includes a recursive function that searches
   * for exam papers based on
   * @param {String} EPDirectory - the directory URL to begin the file search from
   */
  loadPapers(EPDirectory) {
    try {
      let examPapers = [];
      var searchPath = EPDirectory;

      /**
       * Recursive function which walks through the
       * given directory to retrieve all files inside it and
       * its sub-directories
       * @param {*} directory - the URL of the directory to start from
       * @param {*} finished - the state of the search being finished
       */
      var search = function (directory, finished) {
        /* Initial search for the new file's question paper (in PDF format),
                its insert file (for OCR B papers only), its mark scheme and solutions */
        let npPDF = '';
        let npI = '';
        let npMS = '';
        let npSOL = '';

        /* Indicates if a paper is complete 
                (CONDITION: its question paper PDF and markscheme have been found) */
        let paperFound = false;

        /* Reads the directory */
        fs.readdir(directory, function (error, list) {
          /* Finish search if error found */
          if (error) {
            return finished(error);
          }

          var i = 0;

          /**
           * Searches for the next file in directory
           */
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

            /* Check if the file or directory actually exists */
            fs.stat(nextFile, function (error, stat) {
              /* If the next object is a directory, search into it */
              if (stat && stat.isDirectory()) {
                /* Recursive call into new directory found */
                search(nextFile, function (error) {
                  next();
                });
              } else if (nextFile) {
                /* Otherwise, access the next file in the current directory */

                /* Check the file has PDF extension */
                if (nextFile.includes('.pdf')) {
                  if (nextFile.includes('MS')) {
                    /* Mark Scheme PDF file of exam paper */
                    npMS = nextFile;
                  } else if (nextFile.includes('SOL')) {
                    /* Solutions PDF file of exam paper */
                    npSOL = nextFile;
                  } else if (nextFile.includes('Insert')) {
                    /* Insert PDF file of exam paper (OCR B papers only) */
                    npI = nextFile;
                  } else {
                    /* PDF file for question paper */
                    npPDF = nextFile;
                  }
                } else {
                  paperFound = false;
                }

                /* Paper is found once the file URL's for its the question paper and the mark scheme are found */
                if (npPDF != '' && npMS != '') {
                  paperFound = true;
                }

                next();
              }
              /* Add new exam paper into array */
              if (paperFound) {
                /* Change relative path for front-end */
                npPDF = npPDF.replace('./src', '../../../../app-backend/src');
                npI = npI.replace('./src', '../../../../app-backend/src');
                npMS = npMS.replace('./src', '../../../../app-backend/src');
                npSOL = npSOL.replace('./src', '../../../../app-backend/src');

                examPapers.push({
                  title: npTitle,
                  PDFLink: npPDF,
                  insertLink: npI,
                  MSLink: npMS,
                  solLink: npSOL,
                });
              }
            });
          })();
        });
      };

      console.log('Processing exam paper files... Starting from ', EPDirectory);

      search(searchPath, function (error) {
        if (error) {
          console.log(error);
          throw 'Error: invalid directory/file; not found';
        } else {
          console.log(examPapers);
        }
      });

      this.papers = examPapers;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = EP;
