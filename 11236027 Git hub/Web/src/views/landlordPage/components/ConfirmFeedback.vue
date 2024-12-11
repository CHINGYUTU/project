//TODO:未完工

<template>
  <div class="flex items-center justify-center p-4">
    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">ID</th>
            <th scope="col" class="px-6 py-3">房客姓名</th>
            <th scope="col" class="px-6 py-3">房客電話</th>
            <th scope="col" class="px-6 py-3">房客Email</th>
            <th scope="col" class="px-6 py-3">房屋連結</th>
            <th scope="col" class="px-6 py-3">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b" v-for="data in datas" :key="data.ID">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {{ data.ID }}
            </th>
            <td class="px-6 py-4">
              {{ data.Name }}
            </td>
            <td class="px-6 py-4">
              {{ data.Phone }}
            </td>
            <td class="px-6 py-4">
              {{ data.Email }}
            </td>
            <td class="px-6 py-4">
              <router-link :to="{ name: 'housepage', params: { id: data.HouseID } }" class="text-blue-600 text-center">連結</router-link>
            </td>
            <td class="px-6 py-4">
              <button
                @click="throughFeedBack(data.ID)"
                class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                通過
              </button>
              <button
                @click="rejectFeedBack(data.ID)"
                class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                不通過
              </button>
            </td>
          </tr>
        </tbody>
      </table>
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
      datas: [],
    };
  },
  watch: {},
  computed: {},
  methods: {
    getFeedBackCheckList() {
      axios
        .post("/api/getFeedBackCheckList", { ID: JSON.parse(localStorage.getItem("session")).ID })
        .then((res) => {
          this.datas = res.data;
          console.log(this.datas);
        })
        .catch((error) => {});
    },
    throughFeedBack(id) {
      axios
        .post("/api/throughFeedBack", { ID: id })
        .then((res) => {
          successMessage("成功");
        })
        .catch((error) => {
          errorMessage("發生錯誤,請聯絡網站管理員");
        });
        window.location.reload();
    },
    rejectFeedBack(id) {
      axios.post("/api/rejectFeedBack", { ID: id });
      window.location.reload();
    },
  },
  created() {},
  mounted() {
    this.getFeedBackCheckList();
  },
};
</script>

<style lang="scss" scoped></style>
