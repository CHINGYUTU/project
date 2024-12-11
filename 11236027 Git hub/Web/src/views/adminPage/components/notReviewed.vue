<template>
  <div class="flex justify-center flex-wrap mt-6">
    <div role="status" class="justify-center" v-if="isLoader">
      <svg
        aria-hidden="true"
        class="w-8 h-8 text-gray-200 animate-spin fill-blue-600"
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

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg" v-else>
      <table class="w-full text-sm text-left rtl:text-right text-gray-500" v-if="lists.length">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">ID</th>
            <th scope="col" class="px-6 py-3">城市</th>
            <th scope="col" class="px-6 py-3">地區</th>
            <th scope="col" class="px-6 py-3">地址</th>
            <th scope="col" class="px-6 py-3">價格</th>
            <th scope="col" class="px-6 py-3">格局</th>
            <th scope="col" class="px-6 py-3">大小(坪)</th>
            <th scope="col" class="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b" v-for="listinfo in lists" :key="listinfo.ID">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{{ listinfo.ID }}</th>
            <td class="px-6 py-4">{{ listinfo.City }}</td>
            <td class="px-6 py-4">{{ listinfo.Area }}</td>
            <td class="px-6 py-4">{{ listinfo.Address }}</td>
            <td class="px-6 py-4 text-red-600">
              {{
                Intl.NumberFormat("en-US", { style: "currency", currency: "TWD", minimumFractionDigits: 0, mFractionDigits: 0 }).format(
                  listinfo.Price
                )
              }}
            </td>
            <td class="px-6 py-4">{{ listinfo.Pattern }}</td>
            <td class="px-6 py-4">{{ listinfo.Size }}</td>
            <td class="px-6 py-4 text-right">
              <router-link
                :to="{ name: 'housepage', params: { id: listinfo.ID } }"
                class="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                >預覽</router-link
              >
              <button
                @click="pass(listinfo.ID)"
                type="button"
                class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                通過
              </button>
              <!-- <button @click="failed(listinfo.ID)" type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">不通過</button> -->
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="!lists">暫無資料</div>
      <!-- <div v-if="isPreview" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" @click.self="isPreview = false">
            <router-view></router-view>
        </div> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import housepage from "../../housepage/index.vue";
import { successMessage, warningMessage, errorMessage } from "../../../api/messgae";

export default {
  components: {
    housepage,
  },
  props: {},
  data() {
    return {
      lists: [],
      key: 1,
      isLoader: true,
      isPreview: false,
    };
  },
  watch: {},
  computed: {},
  methods: {
    listnotreviewed() {
      this.isLoader = true;
      axios
        .post("/admin/listnotreviewed")
        .then((res) => {
          this.lists = res.data;
          this.isLoader = false;
        })
        .catch((error) => {});
    },
    // failed(id){
    //     axios.post('/admin/failedpost', {ID: id}).then(res =>{
    //         successMessage('已否決發文');
    //     })
    // },
    pass(id) {
      axios.post("/admin/passpost", { ID: id }).then((res) => {
        successMessage("已通過發文");
      });
      this.$router.go(0);
    },
  },
  created() {},
  mounted() {
    this.listnotreviewed();
  },
};
</script>

<style lang="scss" scoped></style>
