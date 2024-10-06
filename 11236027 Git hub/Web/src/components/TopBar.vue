<template>
  <nav class="bg-gray-800 p-4">
    <div class="container mx-auto flex justify-between items-center">
        <!-- 左側 Logo 或標題 -->
        <div class="text-white text-xl font-bold">
            <router-link to="/" class="text-gray-300 hover:text-white">隨心租</router-link>
        </div>

        <div v-if="!isAuthenticated" class="hidden md:flex space-x-4">
            <router-link to="/register" class="text-gray-300 hover:text-white" v-if="!isAuthenticated">註冊</router-link>
            <router-link to="/login" class="text-gray-300 hover:text-white" v-if="!isAuthenticated">登入</router-link>
        </div>
        <div v-else class="hidden md:flex space-x-4">
            <div class="relative inline-block text-left">
                <!-- 圖片作為觸發器 -->
                <img @click="toggleDropdown" class="rounded-full w-7 h-7 cursor-pointer" src="../../public/vite.svg"  alt="image description"/>

                <!-- 下拉菜單 -->
                <div v-if="dropdownOpen" class="absolute right-0 z-10 mt-2 w-44 rounded-lg shadow-lg bg-white divide-y divide-gray-100 ring-1 ring-black ring-opacity-5">
                    <ul class="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
                        <li>
                            <router-link to="/profile" class="block px-4 py-2 hover:bg-gray-100" @click="dropdownOpen = false">
                                個人資料
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/settings" class="block px-4 py-2 hover:bg-gray-100" @click="dropdownOpen = false">
                                設定
                            </router-link>
                        </li>
                        <li>
                            <button class="block w-full text-left px-4 py-2 hover:bg-gray-100" @click="logout">
                                登出
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- <img class="rounded-full w-7 h-7" src="../../public/vite.svg" alt="image description">
            <button class="text-gray-300 hover:text-white" v-if="isAuthenticated" @click="logout">登出</button> -->
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

export default {
  data() {
    return {
      isAuthenticated: false,
      dropdownOpen: false,

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
  }
};
</script>

<style lang="scss" scoped>

</style>