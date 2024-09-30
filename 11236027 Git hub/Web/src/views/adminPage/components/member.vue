<template>
  <div class="flex justify-center flex-wrap mt-6">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <!-- <caption class="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                Our products
                <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Browse a list of Flowbite products designed to help you work and play, stay organized, get answers, keep in touch, grow your business, and more.</p>
            </caption> -->
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        ID
                    </th>
                    <th scope="col" class="px-6 py-3">
                        名稱
                    </th>
                    <th scope="col" class="px-6 py-3">
                        身份
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Email
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Phone
                    </th>
                    <th scope="col" class="px-6 py-3">
                        <span class="sr-only">Edit</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="memberData in memberDatas" :key="memberData.ID">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ memberData.ID }}</th>
                    <td class="px-6 py-4">{{ memberData.Name }}</td>
                    <td class="px-6 py-4">{{ memberData.Role }}</td>
                    <td class="px-6 py-4">{{ memberData.Email }}</td>
                    <td class="px-6 py-4">{{ memberData.Phone }}</td>

                    <td class="px-6 py-4 text-right">
                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    </td>
                </tr>
                
            </tbody>
        </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
    components: {},
    props: {},
    data() {
      return {
        memberDatas: [],
      };
    },
    watch: {},
    computed: {},
    methods: {
        getMember(){
            axios.post('/admin/listmember').then(res => {
                this.memberDatas = res.data;      
            }).catch(error => {
                
            });
        }
    },
    created() {},
    mounted() {
        this.getMember();
    }
};
</script>

<style lang="scss" scoped>

</style>