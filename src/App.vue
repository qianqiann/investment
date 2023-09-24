<template>
  <div class="full-page">
    <the-header></the-header>
    <router-view />
  </div>
</template>

<style></style>

<script>
import TheHeader from "./components/segments/TheHeader.vue";
export default {
  components: {
    TheHeader,
  },
};
</script>
