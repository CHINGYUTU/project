<template>
  <nav class="bg-gray-800 p-4">
    <div class="container mx-auto flex justify-between items-center">
        <!-- 左側 Logo 或標題 -->
        <div class="text-white text-xl font-bold">
            <router-link to="/" class="text-gray-300 hover:text-white">隨心租</router-link>
        </div>

        <!-- 右側導航連結 -->
        <div class="hidden md:flex space-x-4">
        <!-- <a href="#" class="text-gray-300 hover:text-white">Home</a>
        <a href="#" class="text-gray-300 hover:text-white">About</a> -->
            <router-link to="/register" class="text-gray-300 hover:text-white">註冊</router-link>
            <router-link to="/login" class="text-gray-300 hover:text-white">登入</router-link>
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
    components: {},
    props: {},
    data() {
      return {};
    },
    watch: {},
    computed: {},
    methods: {},
    created() {},
    mounted() {}
};
</script>

<style lang="scss" scoped>

</style>