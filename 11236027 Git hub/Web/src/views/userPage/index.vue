<template>
  <div>
    <ul class="flex justify-center flex-wrap mt-10 text-sm font-medium text-center text-gray-500 border-b border-gray-200">
      <li class="mr-2">
        <router-link
          to="/user/userProfile"
          class="inline-block p-4 rounded-t-lg transition-colors duration-300 hover:text-blue-600 hover:bg-blue-50"
          :class="{ 'text-blue-600 bg-blue-100 ': $route.path === '/user/userProfile' }"
        >
          個人資料
        </router-link>
      </li>
      <li class="mr-2">
        <router-link
          to="/user/favorites"
          class="inline-block p-4 rounded-t-lg transition-colors duration-300 hover:text-blue-600 hover:bg-blue-50"
          :class="{ 'text-blue-600 bg-blue-100 ': $route.path === '/user/favorites' }"
        >
          收藏列表
        </router-link>
      </li>
      <li class="mr-2">
        <router-link
          to="/user/feedback"
          class="inline-block p-4 rounded-t-lg transition-colors duration-300 hover:text-blue-600 hover:bg-blue-50"
          :class="{ 'text-blue-600 bg-blue-100 ': $route.path === '/user/feedback' }"
        >
          我的留言
        </router-link>
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
  mounted() {},
};
</script>

<style lang="scss" scoped></style>
