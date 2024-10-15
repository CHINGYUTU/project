<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">登入</h2>

       <form @submit.prevent="login()"> 
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
        <p class="mt-4 text-center text-sm text-gray-600">
          沒有帳號？
          <router-link to="/register" class="text-sm text-blue-500 hover:underline">
            立即註冊
          </router-link>
        </p>

      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { successMessage, warningMessage, errorMessage } from "../../api/messgae"

export default {
  components: {},
  props: {},
  data() {
    return {
      email: "",
      pwd: "",
    };
  },
  watch: {},
  computed: {
    // loginBtnDisable(){
    //   return !(this.email && this.pwd);
    // }
  },
  methods: {
    login(){
      axios.post("/auth/login",{Email: this.email, Password: this.pwd}).then(res =>{
        if(res.status == 200){
          localStorage.setItem("session", JSON.stringify(res.data))
          successMessage("登入成功");
          if(res.data.Role == "User"){
            this.$router.push({name: 'userProfile'})
          }else if(res.data.Role == "Admin"){
            this.$router.push({name: 'adminPage'})
          }else if(res.data.Role == "Landlord"){
            this.$router.push({name: 'adminPage'})
          }
        }
      }).catch(err => {
        if(err.response.status == 401){
          warningMessage("帳號或密碼錯誤")
        }else{
          errorMessage("發生錯誤")
        }
      })
    },
    testFun(){
      successMessage("測試");
    }
  },
  created() {},
  mounted() {}
};
</script>

<style scoped>

</style>









