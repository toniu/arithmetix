const fs = require('fs');
const csv = require('csvtojson');
/**
 * Class for quizzes
 */
class Quiz {
  constructor() {
    this.pools = [];
    this.quizData = [];
  }

  /**
   * Returns the all of the pools of questions of the quizzes
   * @returns the complete pools of quiz questions
   */
  getPools() {
    return this.pools;
  }

  async chooseQuestions(URL) {
    var min = 1;
    var max = quizData.length();

    /* Read text file, shuffle lines and select 10 lines (questions) */
    var questions = [];
    /* Convert from CSV format to objects */
    var pool = [];

    const csvFilePath = 'app-backend/src/resources/quizzes/core/Core-A.csv';

    /* Convert CSV to JSON array */
    csv()
    .fromFile(csvFilePath)
    .then((pool)=>{
        console.log(pool);
    })
    
    /* Randomly select 10 questions from pool */

  }

  /**
   * Includes a recursive function that searches
   * for quiz data which has the pool of questions
   * @param {String} chosenDirectory - the directory URL to begin the file search from
   */
  createPools(chosenDirectory) {
    try {
      let quizPools = [];
      var searchPath = chosenDirectory;

      /**
       * Recursive function which walks through the
       * given directory to retrieve all files inside it and
       * its sub-directories
       * @param {*} directory - the URL of the directory to start from
       * @param {*} finished - the state of the search being finished
       */
      var search = function (directory, finished) {
        /* Initial search for the new text-file's questions pool and getting its title */

        let quizModule = '';
        let quizURL = '';

        /* Indicates if a textfile of questions has been is found 
                (CONDITION: .txt file is found) */
        let poolFound = false;

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

            /* String manipulation to retrieve title for quizzes using the file's name */
            let quizTitle = nextFile.substring(0, nextFile.length - 4);
            quizTitle = quizTitle.replaceAll('-', ' ');

            if (quizTitle.toLowerCase().includes('core')) { quizModule = 'Core'; }
            if (quizTitle.toLowerCase().includes('mechanics')) { quizModule = 'Mechanics'; }
            if (quizTitle.toLowerCase().includes('statistics')) { quizModule = 'Statistics'; }

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
                console.log(nextFile);
                if (nextFile.includes('.txt')) {
                  quizURL = nextFile;
                  poolFound = true;
                }

                next();
              }
              /* Add new pool of quiz questions into array */
              if (poolFound) {
                quizPools.push({
                  title: quizTitle,
                  module: quizModule,
                  poolURL: quizURL,
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

        console.log(quizPools);
      });

      this.pools = quizPools;
    } catch (err) {
      console.log(err);
    }
  }
}

const quiz = new Quiz();
quiz.createPools('/Users/neka/CS3821Repo/app-backend/src/resources/quizzes');

module.exports = Quiz;
