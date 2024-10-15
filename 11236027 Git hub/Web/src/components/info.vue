<template>
  
  <div class="bg-white rounded-lg shadow-lg overflow-hidden w-64 mt-10 hover:bg-gray-100 ">
    <router-link :to="{ name: 'info', params: { id: house.ID } }">
      <div class="relative">
        <!-- Image Section -->
        <img :src="house.MainPic" alt="Building Image" class="w-full h-60 object-cover">
        
        <!-- Rental Details Overlay -->
        <div class="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center py-1 text-sm">
          {{ house.Pattern }} · {{ house.Size }} 坪
        </div>
      </div>

      <!-- Info Section -->
      <div class="p-4">
        <h3 class="text-lg font-semibold">{{ house.Title }}</h3>
        <p class="text-gray-500 text-sm">{{ house.Area }} - {{ house.Address }}</p>
        
        <!-- Tags -->
        <!-- <div class="flex items-center justify-between mt-2">
          <span class="bg-yellow-100 text-yellow-600 text-xs px-2 py-1 rounded">同租金</span>
          <span class="bg-yellow-100 text-yellow-600 text-xs px-2 py-1 rounded">同鄰市推薦</span>
        </div> -->
        
        <!-- Price Info -->
        <div class="mt-4 text-red-500 text-2xl font-bold">
          {{ formattedPrice }} 元/月起
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
    components: {},
    props: {
      house: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        
      };
    },
    watch: {},
    computed: {
      formattedPrice() {
        return new Intl.NumberFormat().format(this.house.Price);
      }
    },
    methods: {},
    created() {},
    mounted() {}
};
</script>

<style lang="scss" scoped>

</style>