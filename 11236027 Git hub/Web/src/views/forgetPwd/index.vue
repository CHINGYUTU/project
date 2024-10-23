<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-blue-100 to-gray-300 ">
    <div class="p-6 w-full max-w-md flex flex-col items-center space-y-6 bg-white shadow-2xl rounded-lg">
      
      <div class="flex justify-center mb-6">
        <router-link to="/">
          <img src="/logo.png" alt="Logo" class="w-24 h-24 object-contain" />
        </router-link>
      </div>

      <!-- Email 輸入框 -->
      <div class="w-full">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Email 地址</label>
        <input 
          type="email" 
          v-model="email"
          id="email" 
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  transition duration-300 ease-in-out transform hover:shadow-lg"
          placeholder="ex@11236027.me" 
          required 
        />
      </div>
      
      <!-- 驗證碼輸入框 -->
      <!-- <div class="w-full p-4 bg-gray-50 shadow-md rounded-lg " v-if="this.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)">
        <label for="vCode" class="block mb-2 text-sm font-medium text-gray-900 ">驗證碼</label>
        <input 
          type="text" 
          v-model="vCode"
          id="vCode"
          class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3  transition duration-300 ease-in-out transform hover:shadow-lg"
          placeholder="請輸入驗證碼" 
          required 
        />
      </div> -->

      <!-- 取得驗證碼按鈕 -->
      <button 
        type="button" 
        class="w-full text-white bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
        :disabled="!(this.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email))"
        @click="getResPwdToken"
      >
        取得重置密碼信
      </button>

      <p class="mt-4 text-center text-sm text-gray-600">
        <router-link to="/login" class="text-blue-500">登入</router-link>
        <router-link to="/register" class="ml-4 text-blue-500 hover:underline">註冊</router-link>
      </p>
      
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { successMessage, warningMessage, errorMessage } from "../../api/messgae";

export default {
    components: {},
    props: {},
    data() {
      return {
        email: "",
        vCode: "",
      };
    },
    watch: {},
    computed: {},
    methods: {
        getResPwdToken(){
            axios.post('/auth/forgetPwd', {Email:this.email}).then(res => {
              this.email = ""
              successMessage("信件已傳送,請查收!!")
              this.$router.push({ name: 'login' });
            }).catch(err =>{
              warningMessage("未知信箱")
              this.email = ""
            })
        }
    },
    created() {},
    mounted() {}
};
</script>

<style lang="scss" scoped>

</style>


