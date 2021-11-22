<template>
<div class="relative z-50">
      <header
        class="fixed w-full flex bg-gray-800 h-16 text-white items-center px-3"
      >
        <button
          class="p-2 hover:text-blue-200 rounded-md"
          @click="
            sidebarOpen = !sidebarOpen;
            notifOpen = false;
            profileOpen = false;
          "
        >
          <i
            class="
              fas
              fa-bars
              w-6
              h-6
              text-white text-xl
              md:text-2xl
              hover:text-blue-200
              transition
              0.1s
            "
            x-show="!sidebarOpen"
            x-cloak=""
          ></i>
          <i
            class="
              fas
              fa-times
              w-6
              h-6
              text-white text-2xl
              hover:text-blue-200
              transition
              0.1s
            "
            x-show="sidebarOpen"
          ></i>
        </button>
        <span class="flex-auto text-base md:text-2xl font-bold p-4">
          <i
            class="fas fa-calculator mx-2 text-lg md:text-xl text-blue-300"
          ></i>
          arith<span class="font-light">metix.</span>
        </span>
        <div
          id="navbar-buttons"
          class="flex flex-wrap justify-between w-auto items-center"
        >
          <div id="notifications" class="mx-3" x-data="{ tooltip: false }">
            <button
              class="hover:text-blue-200 transition 0.1s"
              x-on:mouseover="tooltip = true"
              x-on:mouseleave="tooltip = false"
              @click="
                notifOpen = !notifOpen;
                profileOpen = false;
                sidebarOpen = false;
              "
            >
              <i class="far fa-bell text-2xl md:text-3xl" v-if="!notifOpen"></i>
              <i class="fas fa-bell text-2xl md:text-3xl" v-if="notifOpen"></i>
              <!-- Only show when notifications available -->
              <span
                id="notifcations-badge"
                class="hidden absolute bg-red-800 w-5 h-5 rounded-full text-sm"
              >
                5
              </span>
            </button>
            <div
              class="relative"
              x-cloak
              x-show.transition.origin.left="tooltip"
            >
              <div
                class="
                  p-2
                  m-2
                  fixed
                  -translate-x-28 -translate-y-10
                  bg-black bg-opacity-80
                  text-sm
                  leading-tight
                  text-white
                  transform
                  rounded-lg
                "
              >
                notifications
              </div>
            </div>
          </div>
          <div id="profile" class="mx-5 flex">
            <button
              class="
                hover:bg-gray-700
                px-2
                py-1
                rounded-full
                bg-gray-900
                transition
                0.1s
                flex
                items-center
              "
              @click="
                profileOpen = !profileOpen;
                notifOpen = false;
                sidebarOpen = false;
              "
            >
              <i
                class="far fa-user-circle text-2xl md:text-3xl"
                v-if="!profileOpen"
              ></i>
              <i
                class="fas fa-user-circle text-2xl md:text-3xl"
                v-if="profileOpen"
              ></i>
              <span class="mx-5 hidden font-medium md:flex">
                {{ firstName.substring(0, 1) }}. {{ lastName }}
              </span>
              <div class="hidden md:block">
                <i class="fas fa-chevron-down mx-2"></i>
              </div>
            </button>
          </div>
        </div>
      </header>
</template>

<script>
export default {
  components: {},
  data: () => ({

  }),
};
</script>

<style></style>
