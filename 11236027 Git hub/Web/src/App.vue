<template>
  <div class="flex flex-col min-h-screen">
    <TopBar v-if="!route.meta.hideTopBar" />

    <router-view></router-view>

    <!-- <EndBar class="absolute bottom-0 left-0 right-0 bg-gray-800 text-white p-4" /> -->
  </div>
</template>

<script setup>
import TopBar from './components/TopBar.vue'
import EndBar from './components/EndBar.vue'
import Info from './views/home/components/info.vue'
import { useRoute } from 'vue-router'; // 确保正确导入 useRoute

const route = useRoute();

</script>

<style scoped>

</style>
