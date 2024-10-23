<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-blue-100 to-gray-300">
        <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">

        <div class="flex justify-center mb-6">
            <router-link to="/">
            <img src="/logo.png" alt="Logo" class="w-24 h-24 object-contain" />
            </router-link>
        </div>
        
        <!-- 登入表單 -->
        <form @submit.prevent="get()">
            <!-- Email 輸入框 -->
            <div class="mb-4">
            <label for="email" class="block text-gray-700 text-sm font-bold mb-2">電子郵件</label>
            <input
                v-model="email"
                type="email"
                id="email"
                placeholder="請輸入你的郵件地址"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                required
            />
            </div>

            <div class="mb-4">
            <button
                type="submit"
                :disabled="!email"
                class="w-full text-white bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 focus:outline-none  disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
            >
                取得
            </button>
            </div>

            <!-- 其他連結 -->
            <p class="mt-4 text-center text-sm text-gray-600">
            <router-link to="/register" class="text-blue-500 hover:underline">沒有帳號？</router-link>
            <router-link to="/resPwd" class="ml-4 text-blue-500 hover:underline">忘記密碼？</router-link>
            
            </p>
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
        email: ''
      };
    },
    watch: {},
    computed: {},
    methods: {
        get(){
            axios.post('/auth/sendverifymail', {Email: this.email}).then(res =>{
                successMessage('已發送')
                this.email = ''
                this.$router.push({ name: 'login' });
            }).catch(err =>{
                errorMessage('發生錯誤')
            })
        }
    },
    created() {},
    mounted() {}
};
</script>

<style lang="scss" scoped>

</style>