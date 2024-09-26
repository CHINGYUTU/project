<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-2xl font-bold mb-6 text-center">登入</h2>
  
        <form @submit.prevent="login">
          <!-- Email Input -->
          <div class="mb-4">
            <label for="email" class="block text-gray-700 text-sm font-bold mb-2">電子郵件</label>
            <input
              v-model="email"
              type="email"
              id="email"
              placeholder="請輸入你的郵件地址"
              class="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          <!-- Password Input -->
          <div class="mb-6 ">
            <label for="password" class="block text-gray-700 text-sm font-bold mb-2">密碼</label>
            <input
              v-model="pwd"
              type="password"
              id="password"
              placeholder="請輸入密碼"
              class="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          <!-- Submit Button -->
          <div class="mb-4">
            <button
              type="submit"
              class="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              登入
            </button>
          </div>
  
          <!-- Register Link -->
          <div class="text-center">
            <router-link to="/register" class="text-sm text-blue-500 hover:underline">
              沒有帳號？立即註冊
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const email = ref('')
  const pwd = ref('')
  
  function login() {
    // 在這裡處理登入邏輯，例如向後端發送登入請求
    console.log('郵件地址:', email.value)
    console.log('密碼:', pwd.value)
  }
  </script>
  
  <style scoped>
  /* 可選: 這裡可以添加一些自定義樣式 */
  </style>
  










