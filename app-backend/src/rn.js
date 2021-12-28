const fs = require('fs');
/**
 * Class for revision notes list
 */
class RN {
  /**
   * Singleton instance:
   * Instance of revision notes list
   * Only one list of reviison notes is required for
   * the whole application to access
   */
  constructor() {
    if (RN.instance) {
      return RN.instance;
    }

    this.notes = [];
    RN.instance = this;
    return RN.instance;
  }

  /**
   * Get instance of revision notes list
   * @return - the instance of the revision notes
   */
  static getInstance() {
    if (!RN.instance) {
        RN.instance = new RN();
    }
    return RN.instance;
  }

  /**
   * Returns the list of files of revisionnotes
   * @returns the complete list of files
   */
  getNotes() {
    return this.notes;
  }

  /**
   * Includes a recursive function that searches
   * for revision notes based on
   * @param {String} RNDirectory - the directory URL to begin the file search from
   */
  loadNotes(RNDirectory) {
    try {
      let revisionNotes = [];
      var searchPath = RNDirectory;

      /**
       * Recursive function which walks through the
       * given directory to retrieve all files inside it and
       * its sub-directories
       * @param {*} directory - the URL of the directory to start from
       * @param {*} finished - the state of the search being finished
       */
      var search = function (directory, finished) {
        /* Initial search for the new file's revision sheet notes and getting its title */
        let title = '';
        let rURL = '';

        /* Indicates if a revision notes sheet is found 
                (CONDITION: PDF file is found) */
        let notesFound = false;

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

            /* String manipulation to retrieve title for revision notes using the file's name */
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
                if (nextFile.includes('.pdf')) {
                    rURL = nextFile;
                    notesFound = true;
                }

                next();
              }
              /* Add new revision notes sheet into array */
              if (notesFound) {
                revisionNotes.push({
                    title: npTitle,
                    URL: rURL,
                });
              }
              
            });
          })();
        });
      };

      search(searchPath, function (error) {
        if (error) {
          console.log(error);
          throw 'Error: invalid directory/file; not found';
        }
      });

      this.notes = revisionNotes;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = RN;
