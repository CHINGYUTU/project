<template>
  <nav class="bg-gray-800 p-4">
    <div class="container mx-auto flex justify-between items-center">
        <!-- 左側 Logo 或標題 -->
        <div class="text-white text-xl font-bold">
            <router-link to="/" class="text-gray-300 hover:text-white">隨心租</router-link>
        </div>

        <div class="relative inline-block text-left">
          <button @click="toggleDropdown" class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-700 text-sm font-medium text-white hover:bg-gray-600">
            路由表
            <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- 下拉菜單 -->
          <div v-if="dropdownOpen" class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div class="py-1">
              <router-link v-for="route in routeNames" :key="route.name" :to="{ name: route }" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                {{ route }}
              </router-link>
            </div>
          </div>
        </div>

        <div v-if="!isAuthenticated" class="hidden md:flex space-x-4">
            <router-link to="/register" class="text-gray-300 hover:text-white" v-if="!isAuthenticated">註冊</router-link>
            <router-link to="/login" class="text-gray-300 hover:text-white" v-if="!isAuthenticated">登入</router-link>
        </div>
        <div v-else class="hidden md:flex space-x-4">
            <div class="flex items-center" v-if="isAuthenticated">
                <!-- 圖片作為觸發器 -->
                 <router-link to="/adminPage" class="mr-2">
                    <img @click="toggleDropdown" class="rounded-full w-10 h-10 cursor-pointer" src="/vite.svg"  alt="image description"/>
                 </router-link>
                
                <button class="bg-red-500 block text-left px-4 py-2 rounded-full hover:bg-gray-100 " @click="logout">登出</button>
            </div>
        </div>

        

        <!-- 漢堡菜單（在小屏幕顯示）-->
        <div class="md:hidden">
            <button id="menu-btn" class="text-gray-300 focus:outline-none">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
        </div>
    </div>

    <!-- 小屏幕的導航菜單 -->
        <div id="mobile-menu" class="hidden md:hidden">
            <a href="#" class="block text-gray-300 hover:text-white p-2">Home</a>
            <a href="#" class="block text-gray-300 hover:text-white p-2">About</a>
            <a href="#" class="block text-gray-300 hover:text-white p-2">Services</a>
            <a href="#" class="block text-gray-300 hover:text-white p-2">Contact</a>
        </div>
    </nav>
</template>

<script>
import { router } from '../router/router.js';

export default {
  data() {
    return {
      isAuthenticated: false,
      dropdownOpen: false,
      userData: {}
    };
  },
  created() {
    this.checkAuthentication();
  },
  watch: {
  },
  methods: {
    checkAuthentication() {
      this.isAuthenticated = !!localStorage.getItem('session');
    },
    logout() {
      localStorage.removeItem('session');
      this.checkAuthentication(); // 更新狀態
      this.$router.push('/'); // 重定向到首頁
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
  },
  computed: {
    routeNames() {
      return this.$router.options.routes.map(route => route.name).filter(name => name);
    },
  }
};
</script>

<style lang="scss" scoped>

</style>