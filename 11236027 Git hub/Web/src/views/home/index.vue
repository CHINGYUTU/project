<template>
    <div class="flex-grow justify-center text-center p-4">
      <Search @selectCity="searchCityFun" @selectArea="searchAreaFun" @selectAddress="searchAddressFun" />
      {{ this.selectCity }}
      {{ this.selectArea }}
      <ArticleList class="" />
    </div>
  </template>
  
<script>
import ArticleList from '../../components/ArticleList.vue'
import Search from './components/Search.vue';

export default {
    components: {
      ArticleList,
      Search,
    },
    props: {},
    data() {
      return {
        selectCity: "",
        selectArea: "",
        selectAddress: "",
      };
    },
    watch: {},
    computed: {},
    methods: {
      searchCity(data){
        this.selectCity = data;
      },
      searchArea(data){
        this.selectArea = data;
      },
      searchAddress(data){
        this.selectAddress = data;
      },
    },
    created() {},
    mounted() {}
};

</script>
  
<style lang="scss" scoped>

</style>