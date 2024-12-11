<template>
  <div class="flex justify-center">
    <div role="status" class="justify-center" v-if="isLoader">
      <svg
        aria-hidden="true"
        class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span class="sr-only">Loading...</span>
    </div>
    <div v-else>
      <p v-if="lists.length == 0">沒有留言</p>
      <div class="grid gap-6 2xl:grid-cols-1 xl:grid-cols-1 lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1" v-else>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-center">連結</th>
              <th scope="col" class="px-6 py-3 text-center">房東確認狀態</th>
              <th scope="col" class="px-6 py-3 text-center">管理員確認狀態</th>
              <th scope="col" class="px-6 py-3 text-center">星數</th>
              <th scope="col" class="px-6 py-3 text-center">內容</th>
              <th scope="col" class="px-6 py-3 text-center">修改時間</th>
              <th scope="col" class="px-6 py-3 text-center">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b" v-for="list in lists" :key="list.ID">
              <td class="px-6 py-4">
                <router-link :to="{ name: 'housepage', params: { id: list.HouseID } }" class="text-blue-600 underline">{{ list.Title }}</router-link>
              </td>
              <td class="px-6 py-4">
                <p v-if="list.LandlordCheck == 1" class="text-green-400">已確認</p>
                <p v-else-if="list.LandlordCheck == -1" class="text-red-400">已拒絕,你未租令這個房屋</p>
                <p v-else class="text-blue-400">未確認</p>
              </td>
              <td class="px-6 py-4">
                <p v-if="list.AdminCheck == 1" class="text-green-400">已確認</p>
                <p v-else-if="list.AdminCheck == -1" class="text-red-400">已拒絕,請修改留言</p>
                <p v-else class="text-blue-400">未確認</p>
              </td>
              <td class="px-6 py-4">
                <span v-for="star in list.Stars" :key="star" class="text-yellow-400">★</span>
              </td>
              <td class="px-6 py-4">
                <div v-if="list.AdminCheck == -1 && list.LandlordCheck == 1" class="flex gap-x-1 items-center justify-center">
                  <input type="text" class="border rounded-md p-2" placeholder="輸入文字" v-model="message" />
                </div>
                <div v-else>
                  {{ list.Message }}
                </div>
              </td>
              <td class="px-6 py-4">
                {{ formatDate(list.ReleaseTime) }}
              </td>
              <td class="px-6 py-4">
                <button
                  @click="upload(list.ID)"
                  class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
                  v-if="list.AdminCheck == -1 && list.LandlordCheck == 1"
                >
                  上傳
                </button>
                <button
                  @click="del(list.ID)"
                  class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
                >
                  刪除
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { successMessage, warningMessage, errorMessage } from "../../../api/messgae";

export default {
  components: {},
  props: {},
  data() {
    return {
      lists: [],
      isLoader: false,
      message: "",
    };
  },
  watch: {},
  computed: {},
  methods: {
    getMyFeedBack() {
      axios.post("/api/getuserfeedback", { UserID: JSON.parse(localStorage.getItem("session")).ID }).then((res) => {
        this.lists = res.data;
        console.log(this.lists);
      });
    },
    formatDate(date) {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");

      return `${year}/${month}/${day}`;
    },
    upload(id) {
      axios.post("/api/updatefeedbackmessage", { ID: id, Message: this.message }).then((res) => {});
      successMessage("更新成功請等待管理員審核");
      this.getMyFeedBack();
    },
    del(id) {
      axios.post("/api/delfeedbackmessage", { ID: id }).then((res) => {
        successMessage("刪除成功");
        this.getMyFeedBack();
      });
    },
  },
  created() {},
  mounted() {
    this.getMyFeedBack();
  },
};
</script>

<style lang="scss" scoped></style>
