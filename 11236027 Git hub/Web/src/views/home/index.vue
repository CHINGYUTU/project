<template>
    <div class="flex-grow justify-center text-center p-4">
      <Search @searchCriteriaEvent="searchCriteria" />
      
      <ArticleList :selectData="this.searchData" />
    </div>
  </template>
  
<script>
import ArticleList from './components/ArticleList.vue'
import Search from './components/Search.vue';

export default {
    components: {
      ArticleList,
      Search,
    },
    props: {},
    data() {
      return {
        searchData: null,
      };
    },
    watch: {},
    computed: {},
    methods: {
      searchCriteria(data){
        this.searchData = data;
        
      },
      
    },
    created() {},
    mounted() {}
};

</script>
  
<style lang="scss" scoped>

</style>