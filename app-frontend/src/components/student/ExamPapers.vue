<template>
  <div id="main" class="container block py-12 w-full mx-auto h-full max-w-none text-center">
      <section class="block p-5 bg-gray-900 w-full justify-center items-center">
        <i
          class="
            fas fa-book-reader
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
          <span class="block text-3xl font-semibold"> exam papers </span>
          <span
            class="
              relative
              mt-2
              text-transparent text-3xl
              bg-clip-text bg-gradient-to-br
              from-blue-300
              to-gray-200
            "
          >
          </span>
        </h1>
        <span class="block p-2 m-2 text-gray-300 text-base "> Solutions from mathsgenie.com </span>
      </section>
      <!-- -->
      <section>
        <!-- Filter section -->
        <div class="p-3 m-3 h-14 flex align-center">
          <i class="fas fa-search m-3 text-gray-500"></i>
          <input class="block p-1 m-1 h-full border-b-2 hover:border-blue-400 focus:border-blue-400
          w-1/3 outline-none inset-0 text-gray-900 transition 0.2s" 
          v-model="filter"
          v-on:change="filterFiles(filter)"
          placeholder="search..."/>
        </div>
        <!-- -->
        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider"
              >
                Paper
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left md:text-center text-xs font-semibold text-gray-900 uppercase tracking-wider"
              >
                Download Paper
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left md:text-center text-xs font-semibold text-gray-900 uppercase tracking-wider"
              >
                Answers
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- Load it up -->
            <tr v-for="exam in filteredEP" :key="exam.title">
              <td class="px-5 py-1 border-b border-gray-200 bg-white text-sm">
                <div class="flex">
                  <div class="flex-shrink-0 w-10 h-10">
                    <i v-if="exam.title.includes('AQA')" class="fas fa-pencil-alt bg-pink-800 text-white px-2 py-1 text-base sm:text-lg rounded-full "></i>
                    <i v-if="exam.title.includes('Edexcel')" class="fas fa-pencil-alt bg-blue-500 text-white px-2 py-1 text-base sm:text-lg rounded-full "></i>
                    <i v-if="exam.title.includes('OCR')" class="fas fa-pencil-alt bg-indigo-900 text-white px-2 py-1 text-base sm:text-lg rounded-full "></i>
                  </div>
                  <div class="ml-3">
                    <p class="text-gray-900 text-left text-xs md:text-sm uppercase font-semibold">
                      {{ exam.title }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white">
                <button class="block md:inline-block bg-gray-900 w-14 md:w-auto px-2 m-2 rounded-2xl text-white uppercase hover:bg-gray-700 transition 0.1s"
                @click="downloadFile(exam.PDFLink)"
                v-if="exam.PDFLink != ''"> 
                  <i class="fas fa-file-pdf  text-white p-2 md:text-lg text-2xl"></i>
                  <span class="font-semibold hidden md:inline-block"> download pdf </span>
                </button>

                <button class="block md:inline-block bg-gray-900 w-14 md:w-auto px-2 m-2 rounded-2xl text-white uppercase hover:bg-gray-700 transition 0.1s"
                @click="downloadFile(exam.insertLink)"
                v-if="exam.insertLink != ''"> 
                  <i class="fas fa-question-circle text-white p-2 md:text-lg text-2xl"></i>
                  <span class="font-semibold hidden md:inline-block"> download insert </span>
                </button>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <button class="block md:inline-block bg-blue-900 w-14 md:w-auto px-2 m-2 rounded-2xl text-white uppercase hover:bg-blue-700 transition 0.1s"
                @click="downloadFile(exam.solLink)" 
                v-if="exam.solLink != ''"> 
                  <i class="fas fa-marker  text-white p-2 md:text-lg text-2xl"></i>
                  <span class="font-semibold hidden md:inline-block"> solutions </span>
                </button>

                <button class="block md:inline-block bg-green-900 w-14 md:w-auto px-2 m-2 rounded-2xl text-white uppercase hover:bg-green-700 transition 0.1s"
                @click="downloadFile(exam.MSLink)" 
                v-if="exam.MSLink != ''">
                  <i class="far fa-check-square  text-white p-2 md:text-lg text-2xl"></i>
                  <span class="font-semibold hidden md:inline-block"> mark scheme </span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="filteredEP.length == 0" class="p-5 text-gray-500 w-full items-center">
          <i class="block p-5 align-center fas fa-search text-6xl"></i>
          <span class="p-3 m-5 font-semibold"> No papers matching "{{ filter }}" available...</span>
        </div>
      </section>
  </div>
</template>

<style scoped>

</style>

<script>

export default {
  name: 'ExamPapers',
  data() {
    return {
      examBoard: '',
      filter: '',
      examPapers: [],
      filteredEP: [],
    };
  },
  mounted() {
    this.getExamPapers();
  },
  methods: {
    /**
     * Retrieves the exam papers from exam paper list model
     */
    async getExamPapers() {
      /* Fetch request to search for exam papers stored in local directory */
      try {
        fetch(
        `http://${process.env.VUE_APP_DOMAIN}:${process.env.VUE_APP_API_PORT}/get_exam_papers`,
        {
          method: 'GET',
          headers: {},
        },
      )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        /* List of exam papers finally set */
        this.examPapers = response.data;
        this.filteredEP = this.examPapers;
        console.log(this.examPapers);
      });
      } catch(e) {
        console.log(e);
      }
    },
    /**
     * Downloads the file clicked
     * @param url - The local directory file URL to download from
     */
    downloadFile(url) {
      /* Create anchor tag to direct page once clicked */
      var fileURL = window.URL.createObjectURL(new Blob([url], {type: "application/pdf"}));
      var fileLink = document.createElement('a');

      /* String manipulation to get file title in a specific format 
      e.g. folder1/folder2/exam-paper-2018 --> "exam-paper-2018" */
      let fileNameSplit = url.split('/');
      let fileName = fileNameSplit[fileNameSplit.length - 1].toLowerCase();

      /* Create reference for download URL */
      fileLink.href = fileURL;
      if (fileName.includes('.pdf')) {
        fileLink.setAttribute('target', '_blank');
        fileLink.setAttribute('download', fileName);
      } else {
        fileLink.setAttribute('download', fileName);
      }

      document.body.appendChild(fileLink);

      /* Activates the download */
      fileLink.click();
    },
    filterFiles(filter) {
      /* Filters the files displayed 
      By year, by exam board, by name
      */
     const filteredList = this.examPapers.filter(e => e.title.toLowerCase().includes(filter.toLowerCase()));
     this.filteredEP = filteredList;   
    },
  },
};
</script>