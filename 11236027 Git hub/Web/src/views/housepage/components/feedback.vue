<template>
  <div class="flex flex-col items-center justify-center">
    <div class="p-6 w-full flex flex-col md:flex-row items-center justify-center" v-if="data.length != 0">
      <!-- 左側區域 -->
      <div class="flex flex-col items-center md:items-center md:w-1/3 mb-4 md:mb-0">
        <p class="text-4xl font-bold text-gray-800">{{ averageStars }}</p>
        <div class="flex items-center mt-2">
          <!-- 動態顯示星星 -->
          <svg
            v-for="n in 5"
            :key="n"
            :class="{ 'text-yellow-300': n <= averageStars, 'text-gray-300': n > averageStars }"
            class="w-6 h-6"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27l5.18 3.09-1.39-5.88 4.73-4.11-6.06-.52L12 2 9.54 10.85l-6.06.52 4.73 4.11-1.39 5.88L12 17.27z" />
          </svg>
        </div>
        <p class="text-gray-500 text-sm mt-2">共 {{ messageCount }} 則評價</p>
      </div>

      <!-- 右側區域 -->
      <div class="flex-1 md:pl-6">
        <div class="flex flex-col">
          <div v-for="(feedback, index) in paginatedData" :key="index" class="p-4 border-b">
            <!-- 上方顯示名字、星數和日期 -->
            <div v-if="feedback.LandlordCheck && feedback.AdminCheck">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <strong class="ml-2">{{ feedback.Name }}</strong>
                  <div class="flex">
                    <svg
                      v-for="n in 5"
                      :key="n"
                      :class="{ 'text-yellow-300': n <= feedback.Stars, 'text-gray-300': n > feedback.Stars }"
                      class="w-4 h-4"
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

                <span class="text-gray-500 text-sm">{{ formatDate(feedback.ReleaseTime) }}</span>
              </div>

              <!-- 下方顯示 Message -->
              <div class="mt-2 ml-4">
                <p>{{ feedback.Message }}</p>
              </div>
            </div>
          </div>

          <!-- 分頁控制 -->
          <div class="flex justify-center items-center mt-4" v-if="totalPages > 1">
            <button class="px-4 py-2 mx-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300" @click="previousPage" :disabled="currentPage === 1">
              上一頁
            </button>

            <!-- 顯示當前頁碼和總頁數 -->
            <span class="text-lg font-semibold">{{ currentPage }} / {{ totalPages }}</span>

            <button
              class="px-4 py-2 mx-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              @click="nextPage"
              :disabled="currentPage === totalPages"
            >
              下一頁
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>沒有評論</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    ID: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      messageCount: 0, // 評價總數
      data: [], // 儲存所有的評價資料
      averageStars: 0, // 平均星數
      currentPage: 1, // 當前頁碼
      pageSize: 3, // 每頁顯示的評價數量
      totalPages: 0, // 總頁數
    };
  },
  computed: {
    // 計算當前頁面顯示的評價
    paginatedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      const paginatedItems = this.data.slice(start, end);

      return paginatedItems;
    },
  },
  methods: {
    formatDate(date) {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");

      return `${year}/${month}/${day}`;
    },
    calculateAverageStars() {
      if (this.data.length === 0) return 0;
      const totalStars = this.data.reduce((acc, feedback) => acc + feedback.Stars, 0);
      this.averageStars = (totalStars / this.data.length).toFixed(1); // 計算平均星數並保留一位小數
    },
    getFeedbackData() {
      axios
        .post("/api/getFeedbackData", { ID: this.ID })
        .then((res) => {
          this.data = res.data;
          this.messageCount = this.data.length;
          this.calculateAverageStars();
          this.totalPages = Math.ceil(this.messageCount / this.pageSize); // 計算總頁數
        })
        .catch((error) => {});
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  },
  mounted() {
    this.getFeedbackData();
  },
};
</script>
