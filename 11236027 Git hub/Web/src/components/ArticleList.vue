<template>
    <div class="flex justify-center">
        <div class="grid gap-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
            <div v-for="houseData in houseDatas" :key="houseData.ID" >
                <info :house="houseData" />
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
    props: {},
    data() {
      return {
        houseDatas: []
      };
    },
    watch: {},
    computed: {},
    methods: {
        getTheHoursinfo(){
            axios.post('/api/getAllHouseInfo').then(res =>{
                this.houseDatas = res.data;
            }).catch({
                
            })
        }
    },
    created() {},
    mounted() {
        this.getTheHoursinfo();
    }
};
</script>

<style lang="scss" scoped>

</style>