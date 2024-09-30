<script setup>
import TopBar from './components/TopBar.vue'
import EndBar from './components/EndBar.vue'
import Info from './components/info.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <TopBar />

    <router-view></router-view>
    <!-- <Info></Info> -->

    <!-- <EndBar /> -->
  </div>
</template>

<style scoped>

</style>
