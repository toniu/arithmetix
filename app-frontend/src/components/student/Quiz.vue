<template>
  <div class="quizArea mx-auto py-14 relative text-center">
    <section
        class="block p-3 bg-gray-900 justify-center items-center"
      >
      <h1
        class="
          block
          py-2
          mx-5
          text-4xl
          font-extrabold
          text-gray-100
          md:text-center
          leading-none
        "
      >
      <i
        class="
          fas fa-stopwatch
          p-5
          m-2
          flex
          text-4xl text-white
          opacity-90
          justify-center
          text-center
          align-center
        "
      ></i>
      <span class="block text-3xl font-semibold"> {{ quizTitle }} </span>
      </h1>
    </section>
    <div class="multipleChoiceQues m-auto p-2">
      <div class="my-progress">
        <progress
          class="my-progress-bar"
          min="0"
          max="100"
          value="0"
          step="9"
          aria-labelledby="my-progress-completion"
        ></progress>
        <p
          id="my-progress-completion"
          class="js-my-progress-completion sr-only"
          aria-live="polite"
        >
          0% complete
        </p>
      </div>
      <div class="quizBox m-auto">
        <div class="question text-center text-sm text-gray-900"></div>
        <div
          class="answerOptions p-3 m-2 w-96 text-white rounded-xl bg-opacity-95"
        ></div>
        <div class="buttonArea inline">
          <button
            id="prev"
            class="
              float-left
              px-5
              py-2
              m-1
              rounded-3xl
              text-white
              bg-gray-900
              hover:bg-gray-800
              hidden
            "
          >
            previous question
          </button>
          <button
            id="next"
            class="
              float-right
              px-5
              py-2
              m-1
              rounded-3xl
              text-white
              bg-gray-900
              hover:bg-gray-800
            "
          >
            next question
          </button>
          <button
            id="submit"
            class="
              float-right
              px-5
              py-2
              m-1
              rounded-3xl
              text-white
              bg-gray-900
              hover:bg-gray-800
              hidden
            "
          >
            submit answers
          </button>
        </div>
      </div>
    </div>
    <div class="resultArea hidden md:m-auto p-2 w-full md:w-4/6">
      <div class="resultPage1 text-center">
        <div
          class="
            resultBox
            p-5
            rounded-t-2xl
            bg-gray-900 bg-opacity-95
            text-white
          "
        >
          <h1 class="text-gray-900 font-semibold">result summary</h1>
        </div>
        <div class="briefchart p-5 m-5 text-center align-center">
          <svg height="300" width="300" id="_cir_progress" class="block m-auto">
            <g class="p-3 m-3">
              <rect x="0" y="1" width="30" height="15" fill="#212121" />
              <text x="32" y="14" font-size="14" class="_text_incor">
                Incorrect : 10
              </text>
            </g>
            <g class="p-3 m-3">
              <rect x="160" y="1" width="30" height="15" fill="#2196f3" />
              <text x="192" y="14" font-size="14" class="_text_cor">
                Correct : 10
              </text>
            </g>
            <circle
              class="_cir_P_x"
              cx="150"
              cy="150"
              r="120"
              stroke="#212121"
              stroke-width="20"
              fill="none"
              onmouseover="evt.target.setAttribute('stroke', '#424242');"
              onmouseout="evt.target.setAttribute('stroke','#212121');"
            ></circle>

            <circle
              class="_cir_P_y"
              cx="150"
              cy="150"
              r="120"
              stroke="#2196f3"
              stroke-width="20"
              stroke-dasharray="0,1000"
              fill="none"
              onmouseover="evt.target.setAttribute('stroke', '#42a5f5');"
              onmouseout="evt.target.setAttribute('stroke','#2196f3');"
            ></circle>
            <text
              x="50%"
              y="50%"
              text-anchor="middle"
              stroke="none"
              stroke-width="1px"
              dy=".3em"
              class="_cir_Per"
            >
              0%
            </text>
          </svg>
        </div>

        <div
          class="
            resultBtns
            text-center
            block
            md:grid md:grid-cols-3
            space-y-3 space-x-0
            md:space-y-0 md:space-x-3
            p-5
            rounded-b-2xl
            bg-gray-900 bg-opacity-95
            text-white
          "
        >
          <button
            class="
              viewanswer
              w-full
              md:w-auto
              p-2
              m-1
              rounded-2xl
              text-black
              bg-gray-100
              hover:bg-gray-200
              transition
              0.1s
            "
          >
            <i class="far fa-check-circle mx-3 block text-lg"></i>
            <span class="md:block"> view answers </span>
          </button>
          <button
            class="
              viewchart
              w-full
              md:w-auto
              p-2
              m-1
              rounded-2xl
              text-black
              bg-gray-100
              hover:bg-gray-200
              transition
              0.1s
            "
          >
            <i class="fas fa-chart-pie mx-3 block text-lg"></i>
            <span class="md:block"> view chart </span>
          </button>
          <button
            class="
              replay
              w-full
              md:w-auto
              p-2
              m-1
              rounded-2xl
              text-black
              bg-gray-100
              hover:bg-gray-200
              transition
              0.1s
            "
          >
            <i class="fas fa-redo mx-3 block text-lg"></i>
            <span class="md:block"> replay quiz </span>
          </button>
        </div>
      </div>

      <div class="resultPage2 hidden text-center">
        <div
          class="
            resultBox
            p-5
            rounded-t-2xl
            bg-gray-900 bg-opacity-95
            text-white
          "
        >
          <h1 class="text-gray-900 font-semibold">your results by category</h1>
        </div>
        <div class="chartBox w-3/5 m-auto">
          <canvas id="myChart" width="400" height="400"></canvas>
        </div>
        <button
          class="
            backBtn
            px-5
            py-2
            mx-1
            my-5
            rounded-3xl
            text-white
            bg-gray-900
            hover:bg-gray-700
          "
        >
          back
        </button>
      </div>

      <div
        class="
          resultPage3
          hidden
          text-center
          p-5
          rounded-2xl
          bg-gray-900 bg-opacity-95
          text-white
        "
      >
        <div class="resultBox p-5 rounded-t-2xl text-white">
          <h1 class="font-semibold">your answers</h1>
        </div>
        <div
          class="
            allAnswerBox
            h-96
            overflow-y-auto
            w-full
            m-0
            relative
            block
            md:grid md:grid-cols-2
            space-y-2 space-x-0
            md:space-y-0 md:space-x-2
          "
        ></div>
        <button
          class="
            backBtn
            px-5
            py-2
            mx-1
            my-5
            rounded-3xl
            text-xl text-white
            bg-gray-900
            hover:bg-gray-700
          "
        >
          back
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/css/quiz';
</style>

<script>
export default {
  name: 'Quiz',
  props: ["quizTitle"],
  data() {
    return {
      progressValue: 0,
      resultList: [],
      quizData: [],
      presentIndex: 0,
      clicked: 0,
      questions: [],
      chartLabels: {
        names: [],
        colors: []
      },
      labelsSet: false, 
    };
  },
  mounted() {
    /* Initialise and get quiz data */
    let self = this;

    self.progressValue = 0;
    self.presentIndex = 0;
    self.questions = [];
    self.clicked = 0;
    self.chartLabels = {};
    self.labelsSet = false;

    self.regenerateQuizData();

    /* Clicking one of the answer options */
    $('.answerOptions ').on('click', '.myoptions>input', function (e) {
      self.clicked = $(this).val();

      /* Show submit if it is the last question */
      if (self.questions.length == self.presentIndex + 1) {
        $('#submit').removeClass('hidden');
        $('#next').addClass('hidden');
      } else {
        $('#next').removeClass('hidden');
      }
    });

    /* 'Previous Question' button clicked */
    $('#prev').on('click', function (e) {
      e.preventDefault();
      self.removePrevAnswer();

      $('#submit').addClass('hidden');
      $('#next').addClass('hidden');

      if (self.presentIndex == 1) {
        $(this).addClass('hidden');
      }

      self.presentIndex--;
      self.renderQuiz(self.questions, self.presentIndex);
      self.changeProgressValue('back');
    });

    /* 'Next Question' button clicked */
    $('#next').on('click', function (e) {
      e.preventDefault();
      self.addClickedAnswerToResult(self.questions, self.presentIndex, self.clicked);

      $(this).addClass('hidden');
      $('#prev').removeClass('hidden');

      self.presentIndex++;
      self.renderQuiz(self.questions, self.presentIndex);
      self.changeProgressValue('next');
    });

    /* 'Submit Question' button clicked */
    $('#submit').on('click', function (e) {
      self.addClickedAnswerToResult(self.questions, self.presentIndex, self.clicked);
      $('.multipleChoiceQues').hide();
      $('.resultArea').show();
      self.renderResult(self.resultList);
    });

    /* 'View Chart' button clicked */
    $('.resultArea').on('click', '.viewchart', function () {
      $('.resultPage2').show();
      $('.resultPage1').hide();
      $('.resultPage3').hide();
      self.renderChartResult();
    });

    /* 'Back Button' (to direct back to results area) clicked */
    $('.resultArea').on('click', '.backBtn', function () {
      $('.resultPage1').show();
      $('.resultPage2').hide();
      $('.resultPage3').hide();
      self.renderResult(self.resultList);
    });

    /* 'View Answers' button clicked */
    $('.resultArea').on('click', '.viewanswer', function () {
      $('.resultPage3').show();
      $('.resultPage2').hide();
      $('.resultPage1').hide();
      self.getAllAnswer(self.resultList);
    });

    /* 'Replay Quiz' button clicked */
    $('.resultArea').on('click', '.replay', function () {
      window.location.reload(true);
    });
  },
  methods: {
    /** 
      * Re-generates the quiz data of the given CSV file
      */
      async regenerateQuizData() {
        try {
          await this.$axios
          .post(
            `http://${process.env.VUE_APP_DOMAIN}:${process.env.VUE_APP_API_PORT}/generate_quiz`,
            { 
              responseType: 'json',
              file_path: ``,
              replay: true,
            },
          )
          .then((response) => {
            if (response) {
                /* Quiz data of randomly selected 10 questions from pool */
                var qData = response.data;
                console.log('Questions re-generated client-side: ', qData);
                
                this.getQuizData();
              }
          })
          .catch((error) => console.log(error));
        } catch (e) {
          console.log(e);
        }
      },
    /**
     * Gets all of the questions and its data from generated quiz
     */
    async getQuizData() {
      /* Fetch request to get generated quiz questions */
      try {
        fetch(
        `http://${process.env.VUE_APP_DOMAIN}:${process.env.VUE_APP_API_PORT}/get_quiz_data`,
        {
          method: 'GET',
          headers: {},
        },
      )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        /* Quiz data found */
        let quizFound = response.data;
        this.quizData = quizFound;

        this.questions = this.generateQuestions();
        this.renderQuiz(this.questions, this.presentIndex);
        this.getProgressindicator(this.questions.length);

      });
      } catch(e) {
        console.log(e);
      }
    },

    /** Shuffle order of questions and its answer options in its arrays
     * @param question - the question to shuffle
     */
    shuffleArray(array) {
      let currentIndex = array.length,  randomIndex;

      /* While there remain elements to shuffle... */
      while (currentIndex != 0) {

        /* Pick a remaining element */
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        /* ...And swap it with the current element */
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }
      return array;
    },

    /** Returns shuffled questions
     * @return The questions in shuffled order.
     */
    generateQuestions() {
      var questions = this.shuffleArray(this.quizData);
      /** Shuffle order of answer options **/
      for (const i in questions) {
        if (questions[i]) {
          questions[i].options = this.shuffleArray(questions[i].options);
        }
      }
      return questions;
    },

    /** Returns HTML of the list of answer options
     * @param opts - content of answer options
     * @param i - index of answer option
     * @return The HTML of answer option
     */
    returnOptionList(opts, i) {
      var optionHtml =
        '<li class="myoptions p-1 m-5 transition 0.1s ' +
        'h-12 w-full">' +
        '<input value="' +
        opts +
        '" name="optRdBtn" type="radio" id="rd_' +
        i +
        '">' +
        '<label class="optLabel px-5 h-auto w-96 text-left rounded-3xl border border-white" for="rd_' +
        i +
        '">' +
        opts +
        '</label>' +
        '</div>' +
        '</li>';

      return optionHtml;
    },

    /**
     * Render answer options for particular question
     * @param - the list of answer options of the question
     */
    renderOptions(optionList) {
      var ulContainer = $('<ul>').attr('id', 'optionList');
      for (var i = 0, len = optionList.length; i < len; i++) {
        var optionContainer = this.returnOptionList(optionList[i], i);
        ulContainer.append(optionContainer);
      }
      $('.answerOptions').html('').append(ulContainer);
    },

    /** Renders the particular question
     * @param question - the next question to render
     */
    renderQuestion(question, index) {
      $(".question").html('<h1 class="p-2 mt-5 bg-gray-900 font-bold text-white text-lg rounded-t-2xl">' +
        'Question ' + (index + 1) + ' </h1>' +
        '<h2 class="p-3 bg-gray-100 text-black rounded-b-2xl">' +
        question + '</h2>'
      );
    },

    /**
     * Renders the whole quiz
     * @param questions the list of questions to render
     * @param index - the index of the current question to render
     */
    renderQuiz(questions, index) {
      var currentQuest = questions[index];
      this.renderQuestion(currentQuest.question, index);
      this.renderOptions(currentQuest.options);
    },

    /**
     * Returns the correct answer of a questions
     * @param questions - the question to check
     * @param index - the index of the question
     * @return the question's correct answer
     */
    getCorrectAnswer(questions, index) {
      return questions[index].answer;
    },

    /**
     * Pushes the correct answers into an array
     * @param resultbyCat - the results by category
     * @return - array of answers organised in categories for chart
     */
    correctAnswerArray(resultByCat) {
      var arrayForChart = [];
      for (var i = 0; i < resultByCat.length; i++) {
        arrayForChart.push(resultByCat[i].correctanswer);
      }

      return arrayForChart;
    },

    /**
     * Randomises colour for the labels of category chart
     * @return The colour
     */
    randomiseLabelColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },

    /** Set labels for chart broken down in categories  
     * @param resultbyCat results by category
     * @return The label names and colours of the categories
    */
    setLabels(resultByCat) {

      var labelsForChart = [];
      var colorsForChart = [];

      /* Push all found categories from questions */
      for (var i = 0; i < resultByCat.length; i++) {
        labelsForChart.push(resultByCat[i].category);
        var newLabelColor = this.randomiseLabelColor();
        colorsForChart.push(newLabelColor);
      }

      /* Push Incorrect label */
      labelsForChart.push("Incorrect");
      colorsForChart.push('#ab0000');

      var labels = {names: labelsForChart, colors: colorsForChart};
      return labels;
    },

    /**
     * Generates array for percentage calculation
     * @param results - the results
     * @param wrong - the incorrect answers
     * @return The array for percentage chart
     */
    genResultArray(results, wrong) {
      var resultByCat = this.resultByCategory(results);
      var arrayForChart = this.correctAnswerArray(resultByCat);
      
      /* Only set the label names and colours once */
      if (!this.labelsSet) {
        var labels = this.setLabels(resultByCat);
        /* Labels for category chart */
        this.chartLabels = labels;
        this.labelsSet = true;
      }

      return arrayForChart;
    },

    /**
     * Percentage calculation using array of answers
     * @param array - the array to map
     * @param total - the total amount
     * @return The calculated percent
     */
    percentCalculation(array, total) {
      var percent = array.map(function (d, i) {
        return ((100 * d) / total).toFixed(2);
      });
      return percent;
    },

    /* ... */

    /**
     * Counts the correct and incorrect answers
     * @param results - array of results
     * @return Total for correct and incorrect answers
     */
    countAnswers(results) {
      var countCorrect = 0,
        countWrong = 0;

      for (var i = 0; i < results.length; i++) {
        if (results[i].iscorrect == true) countCorrect++;
        else countWrong++;
      }
      return [countCorrect, countWrong];
    },

    /**
     * Categorises the results
     * @param results - array of results
     * @return Count for the question categories
     */
    resultByCategory(results) {
      var categoryCount = [];
      var ctArray = results.reduce(function (res, value) {
        if (!res[value.category]) {
          res[value.category] = {
            category: value.category,
            correctanswer: 0,
          };
          categoryCount.push(res[value.category]);
        }
        var val = value.iscorrect == true ? 1 : 0;
        res[value.category].correctanswer += val;
        return res;
      }, {});

      categoryCount.sort(function (a, b) {
        return a.category - b.category;
      });

      return categoryCount;
    },

    /**
     * Display of the total pie chart of final quiz results,
     * including animation of circle
     * @param _upto Progress up to
     * @param _cir_progress_id The progress HTML element
     * @param _correct the correct answers
     * @param _incorrect the incorrect answers
     */
    totalPieChart(_upto, _cir_progress_id, _correct, _incorrect) {
      $('#' + _cir_progress_id)
        .find('._text_incor')
        .html('Incorrect : ' + _incorrect);
      $('#' + _cir_progress_id)
        .find('._text_cor')
        .html('Correct : ' + _correct);

      var unchnagedPer = _upto;

      _upto = _upto > 100 ? 100 : _upto < 0 ? 0 : _upto;

      var _progress = 0;

      var _cir_progress = $('#' + _cir_progress_id).find('._cir_P_y');
      var _text_percentage = $('#' + _cir_progress_id).find('._cir_Per');

      var _input_percentage;
      var _percentage;

      var _sleep = setInterval(_animateCircle, 25);

      /**
       * Transition animation of ring circle
       */
      function _animateCircle() {
        //2*pi*r == 753.6 +xxx=764
        _input_percentage = (_upto / 100) * 764;
        _percentage = (_progress / 100) * 764;

        _text_percentage.html(_progress + '%');

        if (_percentage >= _input_percentage) {
          _text_percentage.html(
            '<tspan x="50%" dy="0em">' +
              unchnagedPer +
              '% </tspan><tspan  x="50%" dy="1.9em">Final Score</tspan>',
          );
          clearInterval(_sleep);
        } else {
          _progress++;

          _cir_progress.attr('stroke-dasharray', _percentage + ',764');
        }
      }
    },

    /**
     * Renders the brief chart of final quiz results
     * @param correct - the correct answers
     * @param total - the total answers
     * @param incorrect - the incorrect answers
     */
    renderBriefChart(correct, total, incorrect) {
      var percent = (100 * correct) / total;
      if (Math.round(percent) !== percent) {
        percent = percent.toFixed(2);
      }

      this.totalPieChart(percent, '_cir_progress', correct, incorrect);
    },

    /** Render chart of correct and incorrect answers
     * sorted by category
     * @param data - Dataset used to render chart
     */
    renderChart(data) {
      var ctx = document.getElementById('myChart');
      var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: this.chartLabels.names,
          datasets: [
            {
              data: data,
              backgroundColor: this.chartLabels.colors,
              borderWidth: 1,
            },
          ],
        },
        options: {
          maintainAspectRatio: true,
          pieceLabel: {
            render: 'percentage',
            fontColor: 'black',
            precision: 2,
          },
        },
      });
    },

    /**
     * Gets all of the answers that are correct and incorrect
     * and renders it into HTML
     * @param results - the results from the quiz
     *
     */
    getAllAnswer(results) {
      var innerhtml = '';
      for (var i = 0; i < results.length; i++) {
        var _class = results[i].iscorrect ? 'item-correct' : 'item-incorrect';
        var _classH = results[i].iscorrect ? 'h-correct' : 'h-incorrect';
        var _headerTWCSS = ' p-2 ';

        var _border = '';
        if (_class == 'item-correct') {
          _border =
            '<div class="bg-gray-900 p-2 border-l-8 border-green-800"> ' +
            '<span class="font-semibold mx-5"> question ' +
            (i + 1) +
            '</span>' +
            '</div>';
        } else {
          _border =
            '<div class="bg-gray-900 p-2 border-l-8 border-red-800"> ' +
            '<span class="font-semibold mx-5"> question ' +
            (i + 1) +
            '</span>' +
            '</div>';
        }

        var _cor_icon =
          '<i class="far fa-check-circle px-2 py-1 mx-2 bg-green-800 text-2xl rounded-full text-white"/>';
        var _incor_icon =
          '<i class="far fa-times-circle px-2 py-1 mx-2 bg-red-800 text-2xl rounded-full text-white"/>';
        var _icon_to_show = results[i].iscorrect ? _cor_icon : _incor_icon;

        var _html =
          '<div class="_resultboard ' +
          _class +
          _headerTWCSS +
          '">' +
          _border +
          '<div class="_header p-2 font-light m-2">' +
          results[i].question +
          '</div>' +
          '<div class="_yourans text-left rounded-3xl m-2 p-2 text-black bg-gray-100 ' +
          _classH +
          '">' +
          _icon_to_show +
          results[i].clicked +
          '</div>';

        var html = '';
        if (!results[i].iscorrect)
          html =
            '<div class="_correct text-left rounded-3xl m-2 p-2 text-black bg-gray-100">' +
            _cor_icon +
            results[i].answer +
            '</div>';
        _html = _html + html + '</div>';
        innerhtml += _html;
      }

      $('.allAnswerBox').html('').append(innerhtml);
    },

    /**
     * Renders the brief result summary -
     * count of correct and incorrect answers
     * @param resultList - The list of results
     */
    renderResult(resultList) {
      var results = resultList;
      var countCorrect = this.countAnswers(results)[0],
        countWrong = this.countAnswers(results)[1];

      this.renderBriefChart(countCorrect, this.resultList.length, countWrong);
    },

    /**
     * Renders the results of the chart
     */
    renderChartResult() {
      var results = this.resultList;
      var countCorrect = this.countAnswers(results)[0],
        countWrong = this.countAnswers(results)[1];
      var dataForChart = this.genResultArray(this.resultList, countWrong);
      this.renderChart(dataForChart);
    },

    /**
     * Inserts  the progress bar into HTML
     * @param length - the current length of progress bar
     */
    getProgressindicator(length) {
      var progressbarhtml = ' ';
      for (var i = 0; i < length; i++) {
        progressbarhtml +=
          '<div class="my-progress-indicator progress_' +
          (i + 1) +
          ' ' +
          (i == 0 ? 'active' : '') +
          '"></div>';
      }
      $(progressbarhtml).insertAfter('.my-progress-bar');
    },

    /**
     * Updates the progress bar when user clicks for
     * next question or previous question
     * @param go - Whether the progress is going forwards or backwards.
     */
    changeProgressValue(go) {
      if (go == 'next') {
        this.progressValue += 11.1;
      } else {
        this.progressValue -= 11.1;
      }

      if (this.progressValue < 100) {
        if (this.progressValue == 99) this.progressValue = 100;
        if (go == 'next') {
          $('.my-progress')
            .find('.my-progress-indicator.active')
            .next('.my-progress-indicator')
            .addClass('active');
        } else {
          $('.my-progress')
            .find('.my-progress-indicator.active')
            .last()
            .removeClass('active');
        }
        $('progress').val(this.progressValue);
      }
      $('.js-my-progress-completion').html($('progress').val() + '% complete');
    },

    /**
     * Adds the selected answer to the results list
     * @param questions - the list of questions
     * @param presentIndex - the current index of the answer
     * @param clicked - the value that is clicked.
     */
    addClickedAnswerToResult(questions, presentIndex, clicked) {
      var correct = this.getCorrectAnswer(questions, presentIndex);
      var result = {
        index: presentIndex,
        question: questions[presentIndex].question,
        clicked: clicked,
        iscorrect: clicked == correct ? true : false,
        answer: correct,
        category: questions[presentIndex].category,
      };
      this.resultList.push(result);
    },

    /**
     * Removes the last saved answer when the user
     * clicks 'Previous Question'
     */
    removePrevAnswer() {
      this.resultList.pop();
    },
  },
};
</script>