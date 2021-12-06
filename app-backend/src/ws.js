const fs = require('fs');
/**
 * Class for practice worksheets list (by topic and module)
 */
class WS {
  /**
   * Singleton instance:
   * Instance of practice worksheets list
   * Only one list of practice worksheets is required for
   * the whole application to access
   */
  constructor() {
    if (WS.instance) {
      return WS.instance;
    }

    this.worksheets = [];
    WS.instance = this;
    return WS.instance;
  }

  /**
   * Get instance of practice worksheets list
   * @return - the (only) instance of the practice worksheets list
   */
  static getInstance() {
    if (!WS.instance) {
      WS.instance = new WS();
    }
    return WS.instance;
  }

  /**
   * Returns the list of files of practice worksheets
   * (including solutions)
   * @returns the complete list of files
   */
  getWorksheets() {
    return this.worksheets;
  }

  /**
   * Includes a recursive function that searches
   * for practice worksheets based on
   * @param {String} WSDirectory - the directory URL to begin the file search from
   */
  loadWorksheets(WSDirectory) {
    try {
      let workSheets = [];
      var searchPath = WSDirectory;

      /**
       * Recursive function which walks through the
       * given directory to retrieve all files inside it and
       * its sub-directories
       * @param {*} directory - the URL of the directory to start from
       * @param {*} finished - the state of the search being finished
       */
      var search = function (directory, finished) {
        /* Initial search for the new file's practice paper (in PDF format),
                and its solutions */
        let wsPDF = '';
        let wsSOL = '';
        let wsModule = '';

        /* Indicates if a paper is complete 
                (CONDITION: its question paper PDF and solutions have been found) */
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

            /* String manipulation to retrieve title for practice worksheet using the file's name */
            let wsTitle = nextFile.substring(0, nextFile.length - 4);
            wsTitle = wsTitle.replaceAll('-', ' ');
            wsTitle = wsTitle.toUpperCase();

            /* Find module of worksheet */
            if (wsTitle.toLowerCase().includes('c1')) { wsModule = 'C1'; }
            else if (wsTitle.toLowerCase().includes('c2')) { wsModule = 'C2'; }
            else if (wsTitle.toLowerCase().includes('c3')) { wsModule = 'C3'; }
            else if (wsTitle.toLowerCase().includes('c4')) { wsModule = 'C4'; }
            else if (wsTitle.toLowerCase().includes('m1')) { wsModule = 'M1'; }
            else if (wsTitle.toLowerCase().includes('s1')) { wsModule = 'S1'; }

            wsTitle = wsTitle.substring(3, wsTitle.length);

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
                  if (nextFile.includes('SOL')) {
                    /* Solutions PDF file of practice worksheet */
                    wsSOL = nextFile;
                  } else {
                    /* PDF file for practice practice worksheet */
                    wsPDF = nextFile;
                  }
                } else {
                  paperFound = false;
                }

                /* Paper is found once the file URL's for its the question paper, module and solution are found */
                if (wsPDF != '' && wsSOL != '' && wsModule != '') {
                  paperFound = true;
                }

                next();
              }
              /* Add new practice paper worksheet (by topic) into array */
              if (paperFound) {
                /* Change relative path for front-end */
                wsPDF = wsPDF.replace('./src', '../../../../app-backend/src');
                wsSOL = wsSOL.replace('./src', '../../../../app-backend/src');

                workSheets.push({
                  title: wsTitle,
                  PDFLink: wsPDF,
                  solLink: wsSOL,
                  module: wsModule,
                });
              }
            });
          })();
        });
      };

      console.log('Processing practice worksheet files... Starting from ', WSDirectory);

      search(searchPath, function (error) {
        if (error) {
          console.log(error);
          throw 'Error: invalid directory/file; not found';
        } else {
          console.log(workSheets);
        }
      });

      this.worksheets = workSheets;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = WS;
