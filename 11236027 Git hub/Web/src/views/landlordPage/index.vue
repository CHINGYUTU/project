<template>
  <div>
    <ul class="flex justify-center flex-wrap mt-10 text-sm font-medium text-center text-gray-500 border-b border-gray-200">
      <li class="mr-2">
        <router-link 
          to="/landlord/userProfile"
          class="inline-block p-4 rounded-t-lg transition-colors duration-300 hover:text-blue-600 hover:bg-blue-50"
          :class="{ 'text-blue-600 bg-blue-100 ': $route.path === '/landlord/userProfile' }"
        >
          個人資料
        </router-link>
      </li>
      <li class="mr-2">
        <router-link 
          to="/landlord/allPost"
          class="inline-block p-4 rounded-t-lg transition-colors duration-300 hover:text-blue-600 hover:bg-blue-50"
          :class="{ 'text-blue-600 bg-blue-100 ': $route.path === '/landlord/allPost' }"
        >
          已發布房屋
        </router-link>
      </li>
    </ul>
    <router-view></router-view>

    <router-link to="/post">
      <button class="fixed bottom-4 right-4 w-16 h-16 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-300 text-3xl">
        +
      </button>
    </router-link>
  </div>
</template>

<script>
export default {
    components: {},
    props: {},
    data() {
      return {};
    },
    watch: {},
    computed: {},
    methods: {},
    created() {},
    mounted() {}
};
</script>

<style lang="scss" scoped>

</style>