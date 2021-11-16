<template>
  <div class="antialiased min-h-screen duration-150" x-data="{sidebarOpen: false}">
    <!-- Overlay -->
    <div id="overlay" class="block fixed w-full h-full z-10 top-16"
        :class="{'ease-in bg-black bg-opacity-50':sidebarOpen === true, '-translate-x-full ease-out bg-opacity-100 bg-none hidden': sidebarOpen === false}">
    </div>
    <!-- Sidebar -->
    <nav class="
        fixed
        inset-0
        transform
        duration-100
        top-16
        z-50
        w-80
        bg-gray-800
        text-white
        h-full
      "
        :class="{'translate-x-0 ease-in opacity-100':sidebarOpen === true, '-translate-x-full ease-out opacity-100': sidebarOpen === false}">
        <div class="mt-4">
            <a href="#" class="px-4 py-2 flex align-center hover:bg-gray-700">
                <i class="fas fa-home text-lg mx-3 "></i>
                <span class="flex-auto">home</span>
            </a>
            <a href="#" class="px-4 py-2 flex align-center hover:bg-gray-700">
                <i class="fas fa-book text-lg mx-3 "></i>
                <span class="flex-auto">syllabus</span>
                <i class="fas fa-chevron-down "></i>
            </a>
            <a href="#" class="px-4 py-2 flex align-center hover:bg-gray-700">
                <i class="fas fa-book-open text-lg mx-3 "></i>
                <span class="flex-auto">modules</span>
                <i class="fas fa-chevron-down "></i>
            </a>
            <a href="#" class="px-4 py-2 flex align-center hover:bg-gray-700">
                <i class="fas fa-school text-lg mx-3 "></i>
                <span class="flex-auto">homework</span>
                <i class="fas fa-chevron-down "></i>
            </a>
            <a href="#" class="px-4 py-2 flex align-center hover:bg-gray-700">
                <i class="fas fa-book-reader text-lg mx-3 "></i>
                <span class="flex-auto">exam papers</span>
                <i class="fas fa-chevron-down "></i>
            </a>

        </div>
    </nav>
    <!-- Header -->
    <div class="relative z-50">
        <header class="fixed w-full flex bg-gray-800 h-16 text-white items-center px-3">
            <button class="
            p-2
            hover:text-blue-200
            rounded-md
          " @click="sidebarOpen = !sidebarOpen">
                <i class="
              fas
              fa-bars
              w-6
              h-6
              text-white text-2xl
              hover:text-blue-200
              transition
              0.1s
            " x-show="!sidebarOpen" x-cloak=""></i>
                <i class="
              fas
              fa-times
              w-6
              h-6
              text-white text-2xl
              hover:text-blue-200
              transition
              0.1s
            " x-show="sidebarOpen"></i>
            </button>
            <span class="flex-auto text-2xl font-bold p-4">
                <i class="fas fa-calculator mx-2 text-xl text-blue-300"></i>
                arith<span class="font-light">metix.</span>
            </span>
            <div id="navbar-buttons" class="flex flex-wrap justify-between w-auto items-center">
                <div id="notifications" class="mx-6" x-data="{ tooltip: false }">
                    <button class="hover:text-blue-200 transition 0.1s" x-on:mouseover="tooltip = true"
                        x-on:mouseleave="tooltip = false">
                        <i class="far fa-bell text-3xl"></i>
                        <!-- Only show when notifications available -->
                        <span id="notifcations-badge" class="hidden absolute bg-red-800 w-5 h-5 rounded-full text-sm">
                            5
                        </span>
                    </button>
                    <div class="relative" x-cloak x-show.transition.origin.left="tooltip">
                        <div
                            class="p-2 m-2 fixed -translate-x-28 -translate-y-10 bg-black bg-opacity-80 text-sm leading-tight text-white transform rounded-lg">
                            notifications
                        </div>
                    </div>
                </div>
                <div id="profile" class="mx-5 flex">
                    <button class="hover:bg-gray-700 p-2 rounded-full bg-gray-900 transition 0.1s flex items-center">
                        <i class="far fa-user-circle text-3xl"></i>
                        <span class="mx-5 hidden font-medium md:flex">
                            J. Smith
                        </span>
                        <div class="hidden md:block"> 
                            <i class="fas fa-chevron-down mx-2"></i>
                        </div>
                    </button>
                </div>
            </div>
        </header>
    </div>
    <!-- Notifications Bar -->
    <div class="block fixed pt-2 top-16 h-auto w-full md:w-96 right-0 z-50 bg-gray-900 bg-opacity-95">
        <h1 class="p-2 text-white text-center font-medium"> Notifications (0) </h1>
        <hr class="m-2">
        <div class="p-3 text-black h-96">
            <!-- Show when no notifications -->
            <div class="text-center">
                <i class="far fa-bell block text-9xl p-3 m-2 text-gray-600 w-full"> </i>
                <span class="block text-gray-400 text-lg font-bold mx-2 my-2 w-full"> Currently no notifications </span>
                <span class="block text-gray-400 text-base font-normal px-5 my-3 w-full"> You will receive notifications
                    about assignment deadlines, feedback and other information here </span>
            </div>
            <!-- Show when notifications available -->
            <ul class="hidden space-y-1 text-sm md:text-base">
                <li
                    class="bg-gray-50 p-2 rounded flex justify-between align-center border-solid border-l-8 border-blue-500">
                    <span class="p-1"> Assignment #564 due in 2 days! </span>
                    <button class="p-1 mx-2 hover:bg-gray-200 w-8 rounded-full transition 0.1s">
                        <i class="fas fa-times flex-auto"> </i>
                    </button>
                </li>
                <li
                    class="bg-gray-50 p-2 rounded flex justify-between align-center border-solid border-l-8 border-blue-500">
                    <span class="p-1"> Assignment #231 due in 5 days! </span>
                    <button class="p-1 mx-2 hover:bg-gray-200 w-8 rounded-full transition 0.1s">
                        <i class="fas fa-times flex-auto"> </i>
                    </button>
                </li>
                <li
                    class="bg-gray-50 p-2 rounded flex justify-between align-center border-solid border-l-8 border-blue-500">
                    <span class="p-1"> Assignment #923 due in 11 days! </span>
                    <button class="p-1 mx-2 hover:bg-gray-200 w-8 rounded-full transition 0.1s">
                        <i class="fas fa-times flex-auto"> </i>
                    </button>
                </li>
            </ul>
        </div>
    </div>
    <!-- Main content -->
    <div id="main-content" class="container py-16 mx-auto h-screen max-w-none text-center">
        <section class="p-5 bg-gray-900 flex justify-center items-center">
            <i class="fas fa-user p-3 m-3 flex text-7xl text-white opacity-90 justify-center text-center align-center"></i>
            <h1
                class="py-10 mx-5 text-4xl inline font-extrabold text-gray-100 md:text-center leading-none">
                <span class="block text-2xl font-normal"> Welcome back </span> <span
                    class="relative mt-2 text-transparent text-3xl bg-clip-text bg-gradient-to-br from-blue-300 to-gray-200 md:inline-block">
                    Jeremy Smith </span>
            </h1>
        </section>

    </div>
    <!-- Footer -->
  <section class="bg-white">
    <div class="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
        <nav class="flex flex-wrap justify-center -mx-5 -my-2">
            <div class="px-5 py-2">
                <a href="#" class="text-base leading-6 text-gray-500 hover:text-gray-900">
                    About
                </a>
            </div>
            <div class="px-5 py-2">
                <a href="#" class="text-base leading-6 text-gray-500 hover:text-gray-900">
                    Contact
                </a>
            </div>
            <div class="px-5 py-2">
                <a href="#" class="text-base leading-6 text-gray-500 hover:text-gray-900">
                    Terms
                </a>
            </div>
        </nav>
        <div class="flex justify-center mt-8 space-x-6">
            <a href="https://github.com/toniu/CS3821Repo"
            target="_blank"
            class="text-gray-400 hover:text-gray-500">
                <span class="sr-only">GitHub</span>
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path>
                </svg>
            </a>
        </div>
        <p class="mt-8 text-base leading-6 text-center text-gray-400">
            © 2021 arithmetix, Inc. All rights reserved.
        </p>
    </div>
</section>
</div>
</template>

<script>
export default {
    components: {},
    data: () => ({
      sidebarOpen: false,
    }),
    mounted() {},
    methods: {},
};
</script>

<style></style>
