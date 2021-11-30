<template>
  <div id="main" class="container block py-12 mx-auto h-full max-w-none text-center">
      <section class="block p-5 bg-gray-900 justify-center items-center">
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
        <div>
          <input>
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
                Solutions
              </th>
            </tr>
          </thead>
          <tbody>

            <!-- Load it up -->
            <tr v-for="exam in examPapers" :key="exam.title">
              <td class="px-5 py-1 border-b border-gray-200 bg-white text-sm">
                <div class="flex">
                  <div class="flex-shrink-0 w-10 h-10">
                    <i class="fas fa-book-open bg-gray-900 text-white px-2 py-1 text-lg rounded-full "></i>
                  </div>
                  <div class="ml-3">
                    <p class="text-gray-900 uppercase font-semibold">
                      {{ exam.title }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white">
                <button class="block md:inline-block bg-gray-900 w-14 md:w-auto px-2 m-2 rounded-2xl text-white uppercase hover:bg-gray-800 transition 0.1s"
                @click="downloadFile(exam.PDFLink)"
                v-if="exam.PDFLink != ''"> 
                  <i class="fas fa-file-pdf  text-white p-2 md:text-lg text-2xl"></i>
                  <span class="font-semibold hidden md:inline-block"> .pdf </span>
                </button>

                <button class="block md:inline-block bg-gray-900 w-14 md:w-auto px-2 m-2 rounded-2xl text-white uppercase hover:bg-gray-800 transition 0.1s"
                @click="downloadFile(exam.docLink)"
                v-if="exam.docLink != ''"> 
                  <i class="fas fa-file-word  text-white p-2 md:text-lg text-2xl"></i>
                  <span class="font-semibold hidden md:inline-block"> .doc </span>
                </button>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <button class="block md:inline-block bg-blue-900 w-14 md:w-auto px-2 m-2 rounded-2xl text-white uppercase hover:bg-blue-800 transition 0.1s"
                @click="downloadFile(exam.solLink)" 
                v-if="exam.solLink != ''"> 
                  <i class="fas fa-marker  text-white p-2 md:text-lg text-2xl"></i>
                  <span class="font-semibold hidden md:inline-block"> solutions </span>
                </button>

                <button class="block md:inline-block bg-green-900 w-14 md:w-auto px-2 m-2 rounded-2xl text-white uppercase hover:bg-green-800 transition 0.1s"
                @click="downloadFile(exam.MSLink)" 
                v-if="exam.MSLink != ''">
                  <i class="far fa-check-square  text-white p-2 md:text-lg text-2xl"></i>
                  <span class="font-semibold hidden md:inline-block"> mark scheme </span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
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
      examPapers: [],
    };
  },
  mounted() {
    this.getExamPapers();
  },
  methods: {
    async getExamPapers() {
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
        this.examPapers = response.data.papers;
        console.log(this.examPapers);
      });
    },
    downloadFile(url) {

      var fileURL = window.URL.createObjectURL(new Blob([url]));
      var fileLink = document.createElement('a');

      let fileNameSplit = url.split('/');
      let fileName = fileNameSplit[fileNameSplit.length - 1].toLowerCase();

      fileLink.href = fileURL;
      if (fileName.includes('.pdf')) {
        fileLink.setAttribute('target', '_blank');
        fileLink.setAttribute('download', fileName);
      } else {
        fileLink.setAttribute('download', fileName);
      }
      document.body.appendChild(fileLink);
   
      fileLink.click();
    },
    filterFiles() {
      
    },
  },
};
</script>