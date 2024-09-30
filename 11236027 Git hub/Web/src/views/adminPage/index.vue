<template>
  <div>
    <ul class="flex justify-center flex-wrap mt-10 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
      <li class="mr-2">
        <router-link 
          to="/member"
          class="inline-block p-4 rounded-t-lg transition-colors duration-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 dark:hover:text-blue-500"
          :class="{ 'text-blue-600 bg-blue-100 dark:bg-gray-800 dark:text-blue-500': $route.path === '/member' }"
        >
          用戶列表
        </router-link>
      </li>
      <li class="mr-2">
        <router-link 
          to="/notReviewed"
          class="inline-block p-4 rounded-t-lg transition-colors duration-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 dark:hover:text-blue-500"
          :class="{ 'text-blue-600 bg-blue-100 dark:bg-gray-800 dark:text-blue-500': $route.path === '/notReviewed' }"
        >
          待審核
        </router-link>
      </li>
      <li class="mr-2">
        <router-link 
          to="/settings"
          class="inline-block p-4 rounded-t-lg transition-colors duration-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 dark:hover:text-blue-500"
          :class="{ 'text-blue-600 bg-blue-100 dark:bg-gray-800 dark:text-blue-500': $route.path === '/settings' }"
        >
          Settings
        </router-link>
      </li>
      <li class="mr-2">
        <router-link 
          to="/contacts"
          class="inline-block p-4 rounded-t-lg transition-colors duration-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 dark:hover:text-blue-500"
          :class="{ 'text-blue-600 bg-blue-100 dark:bg-gray-800 dark:text-blue-500': $route.path === '/contacts' }"
        >
          Contacts
        </router-link>
      </li>
      <li>
        <span class="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500">
          Disabled
        </span>
      </li>
    </ul>
    <router-view></router-view>
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