<template>
  <div>
    <div class="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-2">
      <!-- 星星評分 -->
      <div class="flex items-center mb-4">
        <div class="flex">
          <svg
            v-for="n in 5"
            :key="n"
            :class="{
              'text-yellow-400': n <= rating,
              'text-gray-300': n > rating,
            }"
            @click="setRating(n)"
            class="w-6 h-6 cursor-pointer"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 22 20"
          >
            <path
              d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
            />
          </svg>
        </div>
      </div>

      <!-- 留言框 -->
      <div class="mb-4">
        <label for="message" class="block text-sm font-medium text-gray-700">留下你的看法</label>
        <textarea
          id="message"
          rows="4"
          class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="留下你的看法..."
        ></textarea>
      </div>

      <!-- 提交按鈕 -->
      <button class="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
        發布
      </button>
    </div>

    <!-- 顯示提示視窗的按鈕 -->
    <button @click="openDialog" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Open Confirmation Dialog</button>

    <!-- 提示視窗 -->
    <div v-if="isDialogOpen" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 class="text-xl font-semibold mb-4 text-red-500">請檢查</h3>
        <p class="mb-6">請確定您有租令此房屋,將送到房東/管理員端審核(房東不會看到您的留言)</p>
        <div class="flex justify-end space-x-4">
          <!-- 取消按鈕 -->
          <button @click="closeDialog" class="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">取消</button>
          <!-- 確定按鈕 -->
          <button @click="confirmAction" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">確定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDialogOpen: false, // 控制提示視窗顯示與隱藏
    };
  },
  methods: {
    // 打開提示視窗
    openDialog() {
      this.isDialogOpen = true;
    },
    // 關閉提示視窗
    closeDialog() {
      this.isDialogOpen = false;
    },
    // 確定按鈕的處理
    confirmAction() {
      // 在這裡執行確認動作
      console.log("Action confirmed!");
      this.closeDialog(); // 關閉提示視窗
    },
  },
};
</script>

<style lang="scss" scoped></style>
