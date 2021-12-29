const fs = require('fs');
const csv = require('csvtojson');
/**
 * Class for quizzes
 */
class Quiz {
  /**
   * Singleton instance:
   * Instance of quizzes list
   * Only one list of quizzes is required for
   * the whole application to access
   */
   constructor() {
    if (Quiz.instance) {
      return Quiz.instance;
    }

    this.pools = [];
    this.quizData = [];
    Quiz.instance = this;
    return Quiz.instance;
  }

  /**
   * Get instance of quizzes list
   * @return - the instance of the quizzes
   */
  static getInstance() {
    if (!Quiz.instance) {
      Quiz.instance = new Quiz();
    }
    return Quiz.instance;
  }

  /**
   * Returns the all of the pools of questions of the quizzes
   * @returns the complete pools of quiz questions
   */
  getPools() {
    return this.pools;
  }

  /**
   * Returns the generated list of questions from pool
   * @returns data of questions to send
   */
   getQuizData() {
    return this.quizData;
  }

  async chooseQuestions(pathURL) {
    try {
        /* Convert from CSV format to objects */
        var pool = [];

        const csvFilePath = pathURL;

        /* Convert CSV to JSON array */
        csv()
        .fromFile(csvFilePath)
        .then((pool)=>{
        
            /** Randomly shuffle questions **/
            function shuffleArray(question) {
                var shuffled = question.sort(function () {
                    return .5 - Math.random();
                });
                return shuffled;
            }

            function shuffle(a) {
                for (var i = a.length; i; i--) {
                    var j = Math.floor(Math.random() * i);
                    var _ref = [a[j], a[i - 1]];
                    a[i - 1] = _ref[0];
                    a[j] = _ref[1];
                }
            }
            
            var quizData = [];
            /* Shuffle pool of questions */
            pool = shuffleArray(pool);

            /* Select 10 questions from shuffled pool */
            for (let i = 0; i < 10; i++) {
                quizData.push(pool[i]);
            }

            /* Convert answer options into array as well
            e.g. "[a|b|c|d]" --> ['a','b','c','d'] */
            for (const i in quizData) {
                if (quizData[i]) {
                    quizData[i].options = quizData[i].options.split('|');
                }
            }

            console.log('Generated Quiz Data from CSV file: ', pathURL, quizData);
            
            this.quizData = quizData; 

            return quizData;
        })
    } catch(e) {
        console.log('Unable to generate quiz questions.')
        return;
    }
  }

  /**
   * Includes a recursive function that searches
   * for quiz data which has the pool of questions
   * @param {String} chosenDirectory - the directory URL to begin the file search from
   */
  loadPools(chosenDirectory) {
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

            if (quizTitle.toLowerCase().includes('core')) { quizModule = 'core'; }
            if (quizTitle.toLowerCase().includes('mechanics')) { quizModule = 'mechanics'; }
            if (quizTitle.toLowerCase().includes('statistics')) { quizModule = 'statistics'; }


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
                /* Otherwise, access the next file in the current directory 
                Add new pool of quiz questions into array */
                if (nextFile.includes('.csv')) {
                  quizPools.push({
                    title: quizTitle,
                    module: quizModule,
                    poolURL: nextFile,
                  });
                }
                next();
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

      this.pools = quizPools;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Quiz;
