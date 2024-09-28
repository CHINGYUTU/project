<script setup>
import TopBar from './components/TopBar.vue'
import EndBar from './components/EndBar.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <TopBar />

    <router-view></router-view>

    <!-- <EndBar /> -->
  </div>
</template>

<style scoped>

</style>
