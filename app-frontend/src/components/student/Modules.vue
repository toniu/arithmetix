<template>
  <div
    id="main"
    class="container block py-12 mx-auto h-full max-w-none text-center"
  >
    <section
      class="block p-5 bg-gray-900 justify-center items-center"
    >
    <i
          class="
            fas fa-book-open
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
        <span class="block text-3xl font-semibold"> modules </span>
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
    <section>
      <!-- Filter section -->
        <div class="p-3 m-3 h-14 flex align-center">
          <i class="fas fa-search m-3 text-gray-500"></i>
          <input class="block p-1 m-1 h-full border-b-2 hover:border-blue-400 focus:border-blue-400
          w-full md:w-1/3 outline-none inset-0 text-gray-900 transition 0.2s" 
          v-model="filter"
          v-on:change="filterFiles(filter)"
          placeholder="search..."/>
        </div>
        <!-- -->
      <div v-for="(type, typeIndex) in moduleTables" :key="typeIndex">
         <h1 class="p-5 bg-gray-900 text-white text-2xl font-semibold text-left">
              <i v-bind:class="type.icon"
              v-bind:style="{
                backgroundColor: type.modCol,
              }"/>
           {{ type.name }}
        </h1>
        <div v-for="(mod, modIndex) in type.modules" :key="modIndex">
          <div class="p-4 font-semibold text-lg text-left bg-gray-200">
            <div v-for="(rNotes, rnIndex) in revisionNotes" :key="rnIndex">
               <button class="block px-6 py-1 my-3 font-semibold bg-gray-900 text-white
                rounded-2xl w-full md:w-auto hover:bg-gray-700 transition 0.1s"
                v-if="rNotes.title.toUpperCase().includes(mod)"
                @click="openPDF(rNotes.URL)">
                View {{ mod }} Revision Notes
              </button>
            </div>
          </div>
          <table class="min-w-full leading-normal">
            <thead>
                <tr>
                  <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider"
                  >
                    Topic
                  </th>
                  <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left md:text-center text-xs font-semibold text-gray-900 uppercase tracking-wider"
                  >
                    Exam Practice
                  </th>
                  <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left md:text-center text-xs font-semibold text-gray-900 uppercase tracking-wider"
                  >
                    Solutions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(ws, wsIndex) in filteredWS" :key="wsIndex">
                  <td v-if="ws.module == mod" class="px-5 py-1 border-b border-gray-200 bg-white text-sm">
                  <div class="flex">
                    <div class="flex-shrink-0 w-10 h-10">
                      <i class="fas fa-pencil-alt text-white px-2 py-1 text-base sm:text-lg rounded-full "
                      v-bind:style="{
                        backgroundColor: type.modCol,
                      }"/>
                    </div>
                    <div class="ml-3">
                      <p class="text-gray-900 text-left text-xs md:text-sm uppercase font-semibold">
                        {{ ws.title }}
                      </p>
                    </div>
                  </div>
                  </td>
                  <td v-if="ws.module == mod" class="px-5 py-5 border-b border-gray-200 bg-white">
                    <button class="block md:inline-block bg-gray-900 w-14 md:w-auto px-2 m-2 rounded-2xl text-white uppercase hover:bg-gray-700 transition 0.1s"
                    @click="openPDF(ws.PDFLink)">
                      <i class="fas fa-file-pdf  text-white p-2 md:text-lg text-2xl"></i>
                      <span class="font-semibold hidden md:inline-block"> download pdf </span>
                    </button>
                  </td>
                  <td v-if="ws.module == mod" class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <button class="block md:inline-block bg-blue-900 w-14 md:w-auto px-2 m-2 rounded-2xl text-white uppercase hover:bg-blue-700 transition 0.1s"
                    @click="openPDF(ws.solLink)">
                      <i class="fas fa-marker  text-white p-2 md:text-lg text-2xl"></i>
                      <span class="font-semibold hidden md:inline-block"> solutions </span>
                    </button>
                  </td>
                </tr>
              </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>

</style>

<script>
export default {
  name: 'Modules',
  data() {
    return {
      revisionNotes: [],
      practiceWorksheets: [],
      filteredWS: [],
      filter: '',
      moduleTables: {
        coreModules: {
          name: 'Core Modules',
          modules: ['C1','C2','C3','C4'],
          modCol: '#F59E0B',
          icon: 'fas fa-list-ul mx-3 rounded-full p-3',
        },
        mechModules: {
          name: 'Mechanics Modules',
          modules: ['M1'],
          modCol: '#059669',
          icon: 'fas fa-wrench mx-3 rounded-full p-3',
        },
        statModules: {
          name: 'Statistics Modules',
          modules: ['S1'],
          modCol: '#2563EB',
          icon: 'fas fa-chart-bar mx-3 rounded-full p-3',
        },
      },
    };
  },
  mounted() {
    this.getRevisionNotes();
    this.getPracticeWorksheets();
  },
  methods: {
    /**
     * Retrieves the revision notes from revision notes list model
     */
    async getRevisionNotes() {
      /* Fetch request to search for revision notes stored in local directory */
      try {
        fetch(
        `http://${process.env.VUE_APP_DOMAIN}:${process.env.VUE_APP_API_PORT}/get_revision_notes`,
        {
          method: 'GET',
          headers: {},
        },
      )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        /* List of revision notes finally set */
        this.revisionNotes = response.data;
      });
      } catch(e) {
        console.log(e);
      }
    },
    /**
     * Retrieves the practice worksheets from practice worksheets list model
     */
    async getPracticeWorksheets() {
      /* Fetch request to search for practice worksheets stored in local directory */
      try {
        fetch(
        `http://${process.env.VUE_APP_DOMAIN}:${process.env.VUE_APP_API_PORT}/get_practice_worksheets`,
        {
          method: 'GET',
          headers: {},
        },
      )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        /* List of practice worksheets finally set */
        this.practiceWorksheets = response.data;
        this.filteredWS = this.practiceWorksheets;
      });
      } catch(e) {
        console.log(e);
      }
    },
    /**
     * Downloads the file clicked
     * @param fileURL - The local directory file URL to download from
     */
    async openPDF(fileURL) {
      try {
        /* Uses path of PDF as target */
        var target = `http://${process.env.VUE_APP_DOMAIN}:${process.env.VUE_APP_API_PORT}/open_pdf?file_path=${fileURL}`
        /* Opens new tab */
        window.open(target, '_blank');

      } catch (e) {
        console.log(e);
      }
    },
    /**
     * Filters the list of practice worksheets based on keyword input e.g. 
     * 'graph' --> only display practice papers including the title 'graph'
     * @param keyword - the keyword string to use for filtering
     */
    filterFiles(keyword) {
      /* Filters the files displayed by keyword */
      let KL = keyword.trim();
      if (KL.length > 0) {
        const filteredList = this.practiceWorksheets.filter(w => w.title.toLowerCase().includes(keyword.toLowerCase()));
        this.filteredWS = filteredList;   
      } else {
        /* Show whole list if keyword is empty */
        this.filteredWS = this.practiceWorksheets;   
      }
    },
  },
}
</script>