<template>
    <div class="flex justify-center">
        <div role="status" class="justify-center" v-if="isLoader">
            <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span class="sr-only">Loading...</span>
        </div>
        <div v-else>
            <p v-if="filteredHouseDatas.length == 0">沒有資料</p>
            <div class="grid gap-6 grid-cols-1" v-else>
                <div v-for="houseData in filteredHouseDatas" :key="houseData.ID" >
                    <info :house="houseData" />
                </div>
            </div>

            <!-- 分頁按鈕 -->
            <div class="flex justify-center items-center mt-4">
                <button class="px-4 py-2 mx-2 bg-gray-200 text-gray-800 rounded" @click="previousPage" :disabled="currentPage === 1">上一頁</button>
                <span class="text-lg">{{ currentPage }} / {{ totalPages }}</span>
                <button class="px-4 py-2 mx-2 bg-gray-200 text-gray-800 rounded" @click="nextPage" :disabled="currentPage === totalPages">下一頁</button>
            </div>
        </div>
    </div>
</template>


<script>
import axios from "axios";
import info from "./info.vue"

export default {
    components: {
        info
    },
    props: {
        selectData: {
            type: Object,
            required: true,
        },
    },
    data() {
      return {
        houseDatas: [],
        isLoader: true,
        filteredHouseDatas: [],  // 保存过滤后的数据
        currentPage: 1,  // 當前頁碼
        pageSize: 10,  // 每頁顯示的資料數量
      };
    },
    computed: {
        // 計算總頁數
        totalPages() {
            return Math.ceil(this.filteredHouseDatas.length / this.pageSize);
        },
        // 取得當前頁的資料
        paginatedHouseDatas() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.filteredHouseDatas.slice(start, end);
        }
    },
    watch: {
        // 监听 selectData 的变化，触发重新过滤数据
        selectData: {
            handler() {
                this.applyFilter();  // 每次 selectData 变更时执行过滤
            },
            immediate: true,
            deep: true
        }
    },
    methods: {
        // 获取房屋数据
        getTheHouseinfo() {
            axios.post('/api/getAllHouseInfo').then(res => {
                this.filteredHouseDatas = this.houseDatas = res.data;
                this.isLoader = false;
                this.applyFilter();  // 数据加载后应用初始过滤
            }).catch(err => {
                console.error(err);
            });
        },
        // 应用过滤逻辑
        applyFilter() {
            this.currentPage = 1;
            this.filteredHouseDatas = this.houseDatas.filter(house => {
                const cityMatch = this.selectData.City === "全部" || house.City === this.selectData.City;
                
                const areaMatch = this.selectData.Area === "不限" || house.Area.includes(this.selectData.Area);
                let priceMatch;
                switch(this.selectData.Price){
                    case "5000元以下":
                        priceMatch = house.Price < 5000;
                        break;
                    case "5000-10000元":
                        priceMatch = house.Price >= 5000 && house.Price < 10000;
                        break;
                    case "10000-20000元":
                        priceMatch = house.Price >= 10000 && house.Price < 20000;
                        break;
                    case "20000-30000元":
                        priceMatch = house.Price >= 20000 && house.Price < 30000;
                        break;
                    case "30000-40000元":
                        priceMatch = house.Price >= 30000 && house.Price < 40000;
                        break;
                    case "40000元以上":
                        priceMatch = house.Price >= 40000;
                        break;
                    default:
                        priceMatch = true;
                }
                let sizeMatch;
                switch(this.selectData.Size){
                    case "10坪以下":
                        sizeMatch = house.Size < 10;
                        break;
                    case "10-20坪":
                        sizeMatch = house.Size >= 10 && house.Size < 20;
                        break;
                    case "20-30坪":
                        sizeMatch = house.Size >= 20 && house.Size < 30;
                        break;
                    case "30-40坪":
                        sizeMatch = house.Size >= 30 && house.Size < 40;
                        break;
                    case "40-50坪":
                        sizeMatch = house.Size >= 40 && house.Size < 50;
                        break;
                    case "50坪以上":
                        sizeMatch = house.Size >= 50;
                        break;
                    default:
                        sizeMatch = true;
                }
                const addressMatch = this.selectData.Address === "" || house.Address.includes(this.selectData.Address);
                
                return cityMatch && areaMatch && priceMatch && sizeMatch && addressMatch;
            });
        },
        // 切換到下一頁
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        // 切換到上一頁
        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        }
    },
    mounted() {
        this.getTheHouseinfo();  // 加载数据
    }
};
</script>
