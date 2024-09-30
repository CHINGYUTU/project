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
                        城市
                    </th>
                    <th scope="col" class="px-6 py-3">
                        地區
                    </th>
                    <th scope="col" class="px-6 py-3">
                        地址
                    </th>
                    <th scope="col" class="px-6 py-3">
                        價格
                    </th>
                    <th scope="col" class="px-6 py-3">
                        格局
                    </th>
                    <th scope="col" class="px-6 py-3">
                        大小(坪)
                    </th>
                    <th scope="col" class="px-6 py-3">
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="listinfo in lists" :key="listinfo.ID">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ listinfo.ID }}</th>
                    <td class="px-6 py-4">{{ listinfo.City }}</td>
                    <td class="px-6 py-4">{{ listinfo.Area }}</td>
                    <td class="px-6 py-4">{{ listinfo.Address }}</td>
                    <td class="px-6 py-4 text-red-600">{{ Intl.NumberFormat('en-US', {style: 'currency',currency: 'TWD',minimumFractionDigits: 0, mFractionDigits: 0,}).format(listinfo.Price)}}</td>
                    <td class="px-6 py-4">{{ listinfo.Pattern }}</td>
                    <td class="px-6 py-4">{{ listinfo.Size }}</td>
                    <td class="px-6 py-4 text-right">
                        <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">通過</button>
                        <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">不通過</button>
                    </td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="listinfo in lists" :key="listinfo.ID">
                    <th></th>
                    <td class="px-6 py-4 text-center">房東姓名</td>
                    <td class="px-6 py-4 text-center" >{{ listinfo.Name }}</td>
                    <td class="px-6 py-4 text-center">Email</td>
                    <td class="px-6 py-4 text-center">{{ listinfo.Email }}</td>
                    <td class="px-6 py-4 text-center">電話</td>
                    <td class="px-6 py-4 text-center">{{ listinfo.Phone }}</td>
                </tr>
            </tbody>
        </table>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
    components: {},
    props: {},
    data() {
      return {
        lists : [],
        key: 1,
      };
    },
    watch: {},
    computed: {},
    methods: {
        listnotreviewed(){
            axios.post('/admin/listnotreviewed').then( res =>{
                this.lists = res.data;
                console.log(this.lists)
            }).catch(error => {
                
            });
        }
    },
    created() {},
    mounted() {
        this.listnotreviewed();
    }
};
</script>

<style lang="scss" scoped>

</style>