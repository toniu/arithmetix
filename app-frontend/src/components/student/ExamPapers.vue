<template>
  <div id="main" class="container block py-12 mx-auto h-full max-w-none text-center">
      <section class="p-5 bg-gray-900 flex justify-center items-center">
        <i
          class="
            fas fa-book-reader
            p-3
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
            py-2
            mx-5
            text-4xl
            inline
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
        <span class="block p-2 m-2 text-gray-200 text-base"> Solutions from mathsgenie.com </span>
      </section>
      <!-- -->
      <section>
        <!-- Filter section -->
        <div>
        </div>
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
            <tr>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div class="flex">
                  <div class="flex-shrink-0 w-10 h-10">
                    <i class="fas fa-book-open bg-gray-900 text-white px-2 py-1 text-lg rounded-full "></i>
                  </div>
                  <div class="ml-3">
                    <p class="text-gray-900 uppercase font-semibold">
                      June 2019
                    </p>
                    <p class="text-gray-600">Paper 1</p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white">
                <a class="block md:inline-block bg-gray-900 w-14 md:w-auto px-2 m-2 rounded-2xl text-white uppercase hover:bg-gray-800 transition 0.1s"> 
                  <i class="fas fa-file-pdf text-white p-2 md:text-lg text-2xl"></i>
                  <span class="font-semibold hidden md:inline-block"> .pdf </span>
                </a>

                <a class="block md:inline-block bg-gray-900 w-14 md:w-auto px-2 m-2 rounded-2xl text-white uppercase hover:bg-gray-800 transition 0.1s"> 
                  <i class="fas fa-file-word  text-white p-2 md:text-lg text-2xl"></i>
                  <span class="font-semibold hidden md:inline-block"> .doc </span>
                </a>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <a class="block md:inline-block bg-blue-900 w-14 md:w-auto px-2 m-2 rounded-2xl text-white uppercase hover:bg-blue-800 transition 0.1s"> 
                  <i class="fas fa-marker  text-white p-2 md:text-lg text-2xl"></i>
                  <span class="font-semibold hidden md:inline-block"> solutions </span>
                </a>

                <a class="block md:inline-block bg-green-900 w-14 md:w-auto px-2 m-2 rounded-2xl text-white uppercase hover:bg-green-800 transition 0.1s"> 
                  <i class="far fa-check-square  text-white p-2 md:text-lg text-2xl"></i>
                  <span class="font-semibold hidden md:inline-block"> mark scheme </span>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
  </div>
</template>

<script>
export default {
    name: 'ExamPapers',
    data() {
    return {
      examPapers: [
        {
          title: '',
          /* URL for download */
          pdfURL: '',
          docURL: '',
          /* MS for download */
          MSURL: '',
          ansURL: '',
        }
      ],
    };
  },
    methods: {
      populateTable() {
        let table;
        for (var board in this.examPaperss) {
          /* For every board - AQA, OCR or Edexcel */
          if (board[i]) {
            
          }
        }
      },
    },
}
</script>

<style>

</style>