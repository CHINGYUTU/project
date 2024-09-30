<template>
  <div class="bg-white rounded-lg shadow-lg overflow-hidden w-64 mt-10">
    <div class="relative">
      <!-- Image Section -->
      <img src="../assets/image.jpeg" alt="Building Image" class="w-full h-40 object-cover">
      
      <!-- Rental Details Overlay -->
      <div class="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center py-1 text-sm">
        11間在租 | 1-21坪
      </div>
    </div>

    <!-- Info Section -->
    <div class="p-4">
      <h3 class="text-lg font-semibold">JR中山綠</h3>
      <p class="text-gray-500 text-sm">大同區 - 南京西路59號</p>
      
      <!-- Tags -->
      <div class="flex items-center justify-between mt-2">
        <span class="bg-yellow-100 text-yellow-600 text-xs px-2 py-1 rounded">同租金</span>
        <span class="bg-yellow-100 text-yellow-600 text-xs px-2 py-1 rounded">同鄰市推薦</span>
      </div>
      
      <!-- Price Info -->
      <div class="mt-4 text-red-500 text-2xl font-bold">
        2,200元/月起
      </div>
    </div>
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