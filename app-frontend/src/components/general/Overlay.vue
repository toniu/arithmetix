<template>
    <div
      id="overlay"
      class="block fixed w-full h-full z-10 top-16"
      :class="{
        'ease-in bg-black bg-opacity-50': menuOpen === true,
        '-translate-x-full ease-out bg-opacity-100 bg-none hidden':
          menuOpen === false,
      }"
    ></div>
</template>

<script>
export default {
  name: 'Overlay',
  props: ['menuOpen'],
};
</script>

<style></style>