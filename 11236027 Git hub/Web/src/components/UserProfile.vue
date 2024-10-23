<template>
    <div class="mx-auto p-4 flex flex-row items-center justify-center">
      <div class="bg-white shadow-lg rounded-lg p-36 max-w-md w-full">
        <!-- 用戶頭像 -->
        <div class="flex flex-col justify-center items-center">
          <img :src="User.Headshot" alt="User Avatar" class="w-36 h-36 rounded-full object-cover border-4 border-blue-500">
          <h2 class="text-2xl font-semibold text-gray-900">{{ User.Name }}</h2>
          <p class="text-gray-600">{{ User.Email }}</p>
        </div>
  
        <!-- 用戶基本信息 -->
        
  
        <!-- 用戶聯繫信息 -->
        <div class="mt-6">
          <h3 class="text-lg font-semibold text-gray-800">聯繫方式</h3>
          <div class="flex items-center mt-2">
            <p class="ml-2 text-gray-600">電話:</p>
            <p class="ml-2 text-gray-600" v-if="User.Phone">{{ User.Phone }}</p>
            <p class="ml-2 text-gray-600" v-else>尚未設定</p>
          </div>
          <!-- <div class="flex items-center mt-2">
            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12h6v8h-6v-8zM2 9v8a4 4 0 004 4h12a4 4 0 004-4v-8m-16 0a2 2 0 00-2-2h-4V6a2 2 0 012-2h4v2"></path>
            </svg>
            <p class="ml-2 text-gray-600"></p>
          </div> -->
        </div>
  
        <!-- 設定按鈕 -->
        <!-- <div class="mt-6 flex justify-center">
          <button class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none">
            編輯資料
          </button>
        </div> -->

        
      </div>
      
    </div>
  </template>
  
<script>
export default {
    data() {
        return {
            User: {}
        };
    },
    methods: {
        getUserInfo() {
          this.User = JSON.parse(localStorage.getItem('session'));  // 將字符串轉換為對象
        }
    },
    created(){
        this.getUserInfo();
    }
};
</script>

  
  <style scoped>
  /* 避免兩個部分之間出現斷層 */
  .bg-white {
    min-height: 100%;
  }
  </style>
  