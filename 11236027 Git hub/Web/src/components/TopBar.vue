<template>
  <nav class="bg-gray-800 p-4">
    <div class="container mx-auto flex justify-between items-center">
        <!-- 左側 Logo 或標題 -->
        <div class="flex items-center space-x-2 text-white text-xl font-bold">
          <img src="/logo.png" alt="Logo" class="h-9 invert"> <!-- 根據需求調整圖片大小 -->
          <router-link to="/" class="text-gray-300 hover:text-white">隨心租</router-link>
        </div>

        <div v-if="!isAuthenticated" class="space-x-4">
            <router-link to="/register" class="text-gray-300 hover:text-white" v-if="!isAuthenticated">註冊</router-link>
            <router-link to="/login" class="text-gray-300 hover:text-white" v-if="!isAuthenticated">登入</router-link>
        </div>

        

        <div v-else class="space-x-4">
            <div class="flex items-center" v-if="isAuthenticated">
                <!-- 圖片作為觸發器 -->
                 <router-link to="/adminPage" class="mr-2" v-if="this.role == 'Admin'">
                    <img class="rounded-full w-10 h-10 cursor-pointer" :src="this.Headshot"  alt="image description"/>
                 </router-link>

                 <router-link to="/landlordPage" class="mr-2" v-else-if="this.role == 'Landlord'">
                    <img class="rounded-full w-10 h-10 cursor-pointer" :src="this.Headshot"  alt="image description"/>
                 </router-link>

                 <router-link to="/userPage" class="mr-2" v-else-if="this.role == 'User'">
                    <img class="rounded-full w-10 h-10 cursor-pointer" :src="this.Headshot"  alt="image description"/>
                 </router-link>
                
                <button class="bg-red-500 block text-left px-4 py-2 rounded-full hover:bg-gray-100 " @click="logout">登出</button>
            </div>
        </div>
    </div>
  </nav>
</template>

<script>

export default {
  data() {
    return {
      isAuthenticated: false,
      dropdownOpen: false,
      Headshot: "",
      role: "User"
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
      if(this.isAuthenticated){
        this.Headshot = JSON.parse(localStorage.getItem('session')).Headshot;
        this.role = JSON.parse(localStorage.getItem('session')).Role;
      }
      
    },
    logout() {
      localStorage.removeItem('session');
      this.checkAuthentication(); // 更新狀態
      this.$router.push('/'); // 重定向到首頁
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