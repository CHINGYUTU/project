<template>
    <div class="mx-auto p-6 bg-white rounded-lg shadow-lg md:max-w-4xl max-w-md">
        <!-- Title Section -->
        <div class="flex justify-between items-center">
            <div class="mb-6">
                <h1 class="text-red-500 text-2xl" v-if="houseInfo.Rent">已出租</h1>
                <h1 class="text-4xl font-bold" :class="{'line-through' : houseInfo.Rent}">{{ houseInfo.Title }}</h1> 
                <p class="text-gray-600">{{ houseInfo.City }} > {{ houseInfo.Area }}</p>
            </div>
        </div>

        <div class="flex justify-between items-center">
            <p>發佈時間:{{ houseInfo.ReleaseTime }}</p>
            <button @click="changelike()" v-if="showLikeBtn"><i class="fa-regular fa-heart" v-if="!like"></i><img src="/Like icon.png" class="w-4" v-else /></button>
        </div>
        
        
        <div class="my-4 border-b border-gray-300"></div>
        <!-- Image Grid -->

        <div class="relative flex items-center justify-center">
            <img :src="houseInfo.MainPic" alt="Main room" class="rounded-lg w-full max-w-[800px] max-h-[600px] object-contain">
        </div>
        <morepic v-if="houseInfo.Pic1 || houseInfo.Pic2 || houseInfo.Pic3 ||houseInfo.Pic4 ||houseInfo.Pic5 ||houseInfo.Pic6||houseInfo.Pic7 ||houseInfo.Pic8" :Pic1="houseInfo.Pic1" :Pic2="houseInfo.Pic2" :Pic3="houseInfo.Pic3" :Pic4="houseInfo.Pic4" :Pic5="houseInfo.Pic5" :Pic6="houseInfo.Pic6" :Pic7="houseInfo.Pic7" :Pic8="houseInfo.Pic8"></morepic>

       
            
        <!-- </div> -->
        <div>
            <span class="mt-4 inline-block bg-blue-400 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
                {{ houseInfo.Pattern }}
            </span>
        </div>

        <!-- Rent Info -->
        <div class="flex justify-between items-center">
            
            <div>
                <p class="text-2xl text-red-500 font-bold">{{ houseInfo.Price }} 元/月</p>
                <p class="text-gray-500"> {{ houseInfo.Floor }} | {{ houseInfo.Size }}坪 | 押金 {{ houseInfo.Deposit }} 個月</p>
                <p>地址: {{ houseInfo.Address }}</p>
            </div>

            
            <p>管理費 {{ houseInfo.ManagementFee }} 元/月</p>
            
        </div>

        <div class="my-4 border-b border-gray-300"></div>
        
        <!-- Contact Information -->
        <div class="flex items-center">
            <router-link>
                <img 
                    :src="houseInfo.Headshot" 
                    alt="User Avatar" 
                    class="w-16 h-16 rounded-full border-2 border-gray-300 shadow-md"
                />
            </router-link>
            
            <div class="ml-4">
                <p>房東: {{ houseInfo.Name }} </p>
                <p> {{ houseInfo.JoinYear }} 加入</p>
            </div>

            <div class="flex-wrap">
                <p class="px-4 rounded-lg">Email: {{ houseInfo.Email }}</p>
                <p class="px-4 rounded-lg">手機: {{ houseInfo.Phone }}</p>
            </div>
            
        </div>

        <div class="my-4 border-b border-gray-300"></div>

        <div class="flex items-center">
            <img src="/Equipment Cardiogram.png" class="h-10" alt="設備圖標">
            <p class="ml-2 text-2xl font-bold">提供設備</p>
        </div>
        <div class="flex-wrap">
            <equipmentlist 
                class="flex justify-center p-10"
                :refrigerator="houseInfo.Refrigerator" 
                :washing-machine="houseInfo.WashingMachine" 
                :tv="houseInfo.TV"
                :air-conditioner="houseInfo.AirConditioner"
                :water-heater="houseInfo.WaterHeater"
                :bed="houseInfo.Bed"
                :wardrobe="houseInfo.Wardrobe"
                :channel4="houseInfo.Channel4"
                :network="houseInfo.Network"
                :natural-gas="houseInfo.NaturalGas"
                :sofa="houseInfo.Sofa"
                :tables="houseInfo.Tables"
                :balcony="houseInfo.Balcony"
                :elevator="houseInfo.Elevator"
                :parking-space="houseInfo.ParkingSpace"
            ></equipmentlist>
        </div>

        <div class="flex items-center">
            <img src="/Calendar icon.png" class="h-10" alt="設備圖標">
            <p class="ml-2 text-2xl font-bold">租住說明</p>
        </div>
        <p class="px-12 indent-8" v-if="houseInfo.RentalInstructions">{{ houseInfo.RentalInstructions }}</p>
        <p class="px-12" v-else>無</p>

        <div class="flex items-center">
            <img src="/Introduction Presentation.png" class="h-10" alt="設備圖標">
            <p class="ml-2 text-2xl font-bold">簡介</p>
        </div>
        <p class="px-12 indent-8" v-if="houseInfo.Introduction">{{ houseInfo.Introduction }}</p>
        <p class="px-12" v-else>無</p>
        
  </div>
</template>

<script>
import axios from "axios";
import equipmentlist from './components/equipmentlist.vue';
import EndBar from '../../components/EndBar.vue';
import morepic from './components/morepic.vue';

export default {
    components: {
        equipmentlist,
        EndBar,
        morepic,
    },
    props: {
        id: {
            type: String,
            required: true
        }
    },
    data() {
      return {
        houseInfo: {},
        like: false,
        showLikeBtn: false,
      };
    },
    watch: {},
    computed: {},
    methods: {
        getHouseInfo(){
            axios.post('/api/getSpecifyHouseInfo',{ ID : this.id }).then(res =>{
                this.houseInfo = res.data;
                const time = new Date(res.data.ReleaseTime);
                const formattedDateTime = time.toISOString().replace('T', ' ').slice(0, 19);
                this.houseInfo.ReleaseTime = formattedDateTime
                this.initLike();
            }).catch(error =>{
                this.$router.push({name : "404Page"})
            })
        },
        changelike(){
            if(localStorage.getItem('session')){
                this.like = !this.like;
                console.log(this.houseInfo)
                if(this.like){
                    axios.post('/api/like',{UserID: JSON.parse(localStorage.getItem('session')).ID, HouseID: this.id}).then(res =>{
                        
                    })
                }else{
                    axios.post('/api/cancelLike',{UserID: JSON.parse(localStorage.getItem('session')).ID, HouseID : this.id}).then(res =>{

                    })
                }
            }
        },
        initLike(){
            if(localStorage.getItem('session')){
                this.showLikeBtn = true;
                axios.post('/api/checklike',{UserID: JSON.parse(localStorage.getItem('session')).ID, HouseID : this.id}).then( res =>{
                    this.like = res.data.liked;
                }).catch(err =>{

                })
            }
        }
    },
    created() {
        
    },
    mounted() {
        this.getHouseInfo();
    }
};
</script>

<style lang="scss" scoped>

</style>