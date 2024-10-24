<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-blue-100 to-gray-300">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">

      <div class="flex justify-center mb-6">
        <router-link to="/">
          <img src="/logo.png" alt="Logo" class="w-24 h-24 object-contain" />
        </router-link>
      </div>
      
      <!-- 登入表單 -->
      <form @submit.prevent="login()">
        <!-- Email 輸入框 -->
        <div class="mb-4">
          <label for="email" class="block text-gray-700 text-sm font-bold mb-2">電子郵件</label>
          <input
            v-model="email"
            type="email"
            id="email"
            placeholder="請輸入你的郵件地址"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            required
          />
        </div>

        <!-- 密碼輸入框 -->
        <div class="mb-6">
          <label for="password" class="block text-gray-700 text-sm font-bold mb-2">密碼</label>
          <input
            v-model="pwd"
            type="password"
            id="password"
            placeholder="請輸入密碼"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            required
          />
        </div>

        <!-- 提交按鈕 -->
        <div class="mb-4">
          <button
            type="submit"
            :disabled="!email || !pwd || isLoader"
            class="w-full text-white bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 focus:outline-none  disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          >
            登入
          </button>
        </div>

        

        <!-- 其他連結 -->
        <p class="mt-4 text-center text-sm text-gray-600">
          <router-link to="/register" class="text-blue-500 hover:underline">沒有帳號？</router-link>
          <router-link to="/resPwd" class="ml-4 text-blue-500 hover:underline">忘記密碼？</router-link>
          <router-link to="/verifymail" class="ml-4 text-blue-500 hover:underline">取得驗證信</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { successMessage, warningMessage, errorMessage } from "../../api/messgae";

export default {
  data() {
    return {
      email: "",
      pwd: "",
      isLoader: false,
    };
  },
  methods: {
    login() {
      this.isLoader = true;
      axios.post("/auth/login", { Email: this.email, Password: this.pwd })
        .then(res => {
          if (res.status === 200) {
            if(res.data.Verify){
              localStorage.setItem("session", JSON.stringify(res.data));
              successMessage("登入成功");
              if (res.data.Role === "User") {
                this.$router.push({ name: 'home' });
              } else if (res.data.Role === "Admin") {
                this.$router.push({ name: 'home' });
              } else if (res.data.Role === "Landlord") {
                this.$router.push({ name: 'home' });
              }
            }else{
              warningMessage("請先至mail驗證完成後再登入")
            }
          }
        })
        .catch(err => {
          console.log(err.response);
          if (err.response.status === 401) {
            warningMessage("帳號或密碼錯誤");
          } else {
            errorMessage("發生錯誤");
          }
        });
        this.isLoader = false
    }
  }
};
</script>

<style scoped>
/* 可根據需要添加更多樣式 */
</style>
