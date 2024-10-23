<template>
    <div class="flex items-center justify-center h-screen bg-gradient-to-br from-gray-100 via-blue-100 to-gray-300 dark:from-gray-900 dark:to-gray-700">
      <div class="bg-white p-8 rounded-lg shadow-md w-96">
        
        <div class="flex justify-center mb-6">
          <router-link to="/">
            <img src="/logo.png" alt="Logo" class="w-24 h-24 object-contain" />
          </router-link>
        </div>

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
            <p v-if="isEmailRepeat" class="text-red-500 text-sm mb-4">
              電子郵件已存在
            </p>
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700" for="phone">電話</label>
            <input
              v-model="phone"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              type="text"
              id="phone"
              placeholder="請輸入電話號碼"
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
            <div class="flex space-x-4 items-center justify-center">
              <!-- 數字 -->
              <p :class="{'text-green-500': /\d/.test(password), 'text-red-500': !/\d/.test(password)}">
                數字
              </p>
              
              <!-- 大小寫英文 -->
              <p :class="{'text-green-500': /[A-Z]/.test(password) && /[a-z]/.test(password), 'text-red-500': !(/[A-Z]/.test(password) && /[a-z]/.test(password))}">
                大小寫英文
              </p>
              
              <!-- 長度 -->
              <p :class="{'text-green-500': password.length >= 8, 'text-red-500': password.length < 8}">
                長度
              </p>
            </div>
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

            <p v-if="password != confirmPassword && confirmPassword != ''" class="text-red-500 text-sm mb-4">
              密碼不一致，請確認密碼。
            </p>
          </div>

          

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">選擇身份</label>
            <div class="mt-2">
              <label class="inline-flex items-center">
                <input
                  v-model="role"
                  type="radio"
                  value="User"
                  class="form-radio text-blue-600"
                />
                <span class="ml-2">租客</span>
              </label>
              <label class="inline-flex items-center ml-6">
                <input
                  v-model="role"
                  type="radio"
                  value="Landlord"
                  class="form-radio text-blue-600"
                />
                <span class="ml-2">房東</span>
              </label>
            </div>
          </div>

          <button :disabled="!(isFormValid)" type="submit" class="w-full text-white bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg">註冊</button>
        </form>
        <p class="mt-4 text-center text-sm text-gray-600">
          已有帳號？ <router-link to="/login" class="text-blue-500">登入</router-link>
        </p>
      </div>
    </div>
  </template>
  
  <script>
import axios from 'axios';
import { successMessage, warningMessage, errorMessage } from "../../api/messgae";

  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        isPasswordValid: false,
        role:'User',
        isEmailRepeat: false,
      };
    },
    computed: {
      // 表单是否有效
      isFormValid() {
        return this.username && this.email && this.password === this.confirmPassword && this.phone && this.hasNumber() && this.hasUpperAndLowerCase() && this.isLengthValid();
      }
    },
    methods: {
      // 檢查是否包含數字
      hasNumber() {
        return /\d/.test(this.password);
      },
      // 檢查是否同時包含大寫和小寫字母
      hasUpperAndLowerCase() {
        return /[A-Z]/.test(this.password) && /[a-z]/.test(this.password);
      },
      // 檢查密碼長度
      isLengthValid() {
        return this.password.length >= 8;
      },
      isPasswordValidFun() {
        if(this.confirmPassword != "" && this.password != ""){
          if(this.confirmPassword === this.password){
            this.isPasswordValid = this.hasNumber && this.hasUpperAndLowerCase && this.isLengthValid;
          }
        }
        return this.isPasswordValid
      },
      handleSubmit() {
        axios.post('/auth/register', {Email: this.email, Password: this.password, UserName: this.username, Role: this.role, Phone: this.phone}).then((res) => {
          this.isEmailRepeat = false;
          successMessage("註冊成功")
          this.$router.push({ name: 'login' });
        }).catch(err =>{
          if(err.status === 409){
            this.isEmailRepeat = true;
          }else{
            errorMessage('發生錯誤')
          }
        });
      }
    }
  };
  </script>
  
  <style scoped>
  /* 可以在这里添加额外的样式 */
  </style>
  