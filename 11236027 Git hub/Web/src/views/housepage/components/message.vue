<template>
  <div class="p-4 mb-6">
    <!-- 評價輸入區域 -->
    <textarea
      v-model="newReview.text"
      placeholder="輸入你的評價..."
      class="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
      rows="4"
    ></textarea>

    <div class="flex items-center my-4">
      <span class="mr-2">星級:</span>
      <div class="flex">
        <span
          v-for="star in 5"
          :key="star"
          @click="newReview.rating = star"
          class="cursor-pointer text-2xl"
          :class="{
            'text-yellow-500': star <= newReview.rating,
            'text-gray-300': star > newReview.rating,
          }"
        >
          ★
        </span>
      </div>
      <button @click="openCheckMessage" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">提交評價</button>
    </div>

    <!-- 確認訊息彈出框 -->
    <div v-if="isDialogOpen" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 class="text-xl font-semibold mb-4 text-red-500">請檢查</h3>
        <p class="mb-6">請確定您有租令此房屋,將送到房東/管理員端審核(房東不會看到您的留言)</p>
        <div class="flex justify-end space-x-4">
          <!-- 取消按鈕 -->
          <button @click="closeCheckMessage" class="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">取消</button>
          <!-- 確定按鈕 -->
          <button @click="addReview" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">確定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { successMessage, warningMessage, errorMessage } from "../../../api/messgae";

export default {
  components: {},
  data() {
    return {
      newReview: {
        text: "",
        rating: 5,
      },
      isDialogOpen: false, // 控制是否顯示 checkMessage
    };
  },
  methods: {
    openCheckMessage() {
      this.isDialogOpen = true; // 顯示確認訊息框
    },
    closeCheckMessage() {
      this.isDialogOpen = false; // 關閉確認訊息框
    },
    addReview() {
      this.closeCheckMessage(); // 關閉彈窗
      axios
        .post("/api/updateFeedBack", {
          HouseID: this.$route.params.id,
          UserID: JSON.parse(localStorage.getItem("session")).ID,
          Rating: this.newReview.rating,
          Message: this.newReview.text,
        })
        .then((res) => {
          successMessage("提交成功請等待審核");
          this.newReview.text = ""; // 重置表單
          this.newReview.rating = 5;
          window.location.reload();
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
