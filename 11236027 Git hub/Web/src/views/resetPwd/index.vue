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

          <button :disabled="!(isFormValid)" type="submit" class="w-full text-white bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg">更改</button>
        </form>

    </div>
  </div>
</template>

<script>
import { successMessage, warningMessage, errorMessage } from "../../api/messgae";
import axios from "axios";

export default {
    components: {},
    props: {},
    data() {
      return {
        password: "",
        confirmPassword: '',
        isPasswordValid: false,
      };
    },
    watch: {},
    computed: {
      isFormValid() {
        return this.password === this.confirmPassword && this.hasNumber() && this.hasUpperAndLowerCase() && this.isLengthValid();
      }
    },
    methods: {
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
      handleSubmit(){
        axios.post('/auth/resetPwd', {token: this.$route.params.token, Password: this.password}).then(res =>{
          successMessage('更改成功')
          this.$router.push({ name: 'login' });
        }).catch(err =>{
          errorMessage('無效令牌')
        })
      }
    },
    created() {},
    mounted() {}
};
</script>

<style lang="scss" scoped>

</style>

<!-- this.$route.params.token -->