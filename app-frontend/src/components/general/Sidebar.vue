<template>
  <nav
    class="
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
    :class="{
      'translate-x-0 ease-in opacity-100': isOpen === true,
      '-translate-x-full ease-out opacity-100': isOpen === false,
    }"
  >  
    <div class="mt-4">
      <router-link
        to="/student"
        class="
          px-4
          py-2
          flex
          align-center
          hover:bg-gray-700
          border-transparent border-l-4
          hover:border-white
          transition
          0.1s
        "
      >
        <i class="fas fa-home text-lg mx-3"></i>
        <span class="flex-auto">home</span>
      </router-link>
      <router-link
        to="/student/syllabus"
        class="
          px-4
          py-2
          flex
          align-center
          hover:bg-gray-700
          border-transparent border-l-4
          hover:border-white
          transition
          0.1s
        "
      >
        <i class="fas fa-book text-lg mx-3"></i>
        <span class="flex-auto">syllabus</span>
        <i class="fas fa-chevron-down"></i>
      </router-link>
      <router-link
        to="/student/modules"
        class="
          px-4
          py-2
          flex
          align-center
          hover:bg-gray-700
          border-transparent border-l-4
          hover:border-white
          transition
          0.1s
        "
      >
        <i class="fas fa-book-open text-lg mx-3"></i>
        <span class="flex-auto">modules</span>
        <i class="fas fa-chevron-down"></i>
      </router-link>
      <router-link
        to="/student/homework"
        class="
          px-4
          py-2
          flex
          align-center
          hover:bg-gray-700
          border-transparent border-l-4
          hover:border-white
          transition
          0.1s
        "
      >
        <i class="fas fa-school text-lg mx-3"></i>
        <span class="flex-auto">homework</span>
        <i class="fas fa-chevron-down"></i>
      </router-link>
      <router-link
        to="/student/exam-papers"
        class="
          px-4
          py-2
          flex
          align-center
          hover:bg-gray-700
          border-transparent border-l-4
          hover:border-white
          transition
          0.1s
        "
      >
        <i class="fas fa-book-reader text-lg mx-3"></i>
        <span class="flex-auto">exam papers</span>
        <i class="fas fa-chevron-down"></i>
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  /* For each button in the sidebar -- 
  Name, Icon, subMenuButtons if exists */
  name: 'Sidebar',
  props: ['isOpen'],
  data: () => ({
    menuItem: -1,
    menuHover: false,
    menu: [],
  }),
};
</script>

<style></style>
