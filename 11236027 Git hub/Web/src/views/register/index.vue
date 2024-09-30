<template>
    <div class="bg-gray-100 flex items-center justify-center h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 class="text-2xl font-bold mb-6 text-center">註冊</h2>
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700" for="username">名稱</label>
            <input
              v-model="username"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              type="text"
              id="username"
              placeholder="請輸入名稱"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700" for="email">電子郵件</label>
            <input
              v-model="email"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              type="email"
              id="email"
              placeholder="請輸入電子郵件"
              required
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700" for="password">密碼</label>
            <input
              v-model="password"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              type="password"
              id="password"
              placeholder="請輸入密碼"
              required
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700" for="confirm-password">確認密碼</label>
            <input
              v-model="confirmPassword"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              type="password"
              id="confirm-password"
              placeholder="請再次輸入密碼"
              required
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">選擇身份</label>
            <div class="mt-2">
              <label class="inline-flex items-center">
                <input
                  v-model="role"
                  type="radio"
                  value="user"
                  class="form-radio text-blue-600"
                />
                <span class="ml-2">租客</span>
              </label>
              <label class="inline-flex items-center ml-6">
                <input
                  v-model="role"
                  type="radio"
                  value="admin"
                  class="form-radio text-blue-600"
                />
                <span class="ml-2">房東</span>
              </label>
            </div>
          </div>

          <button type="submit" class="w-full bg-green-500 text-white p-2 rounded-md hover:bg-blue-600">註冊</button>
        </form>
        <p class="mt-4 text-center text-sm text-gray-600">
          已有帳號？ <router-link to="/login" class="text-blue-500">登入</router-link>
        </p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role:'',
      };
    },
    methods: {
      handleSubmit() {
        // 处理注册逻辑
        console.log('注册信息:', {
          username: this.username,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword
        });
      }
    }
  };
  </script>
  
  <style scoped>
  /* 可以在这里添加额外的样式 */
  </style>
  