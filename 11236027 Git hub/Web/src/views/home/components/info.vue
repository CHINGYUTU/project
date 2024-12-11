<template>
  <router-link :to="{ name: 'housepage', params: { id: house.ID } }">
    <div class="w-[380px] md:w-[600px] mx-auto bg-white rounded-xl shadow-md overflow-hidden relative"> <!-- 使用固定宽度 w-[600px] -->
      <div class="md:flex">
        <!-- 左侧图片部分 -->
        <div class="md:shrink-0 relative">
            <img class="h-48 w-full object-cover md:h-full md:w-48" :src="house.MainPic">
        </div>

        <!-- 右侧信息部分 -->
        <div class="p-8 flex flex-col justify-between"> <!-- 确保信息区域占满剩余空间 -->
            <!-- 标题和区域信息 -->
            <div>
              <div class="uppercase tracking-wide text-xl font-semibold text-start min-h-[3rem]"> <!-- 固定标题区域高度 -->
                {{ house.Title }}
              </div>
              <p class="mt-2 text-slate-500 text-start">{{ house.Area }} - {{ house.Address }}</p>
              <div class="flex flex-row items-center">
                <img src="/House icon.png" class="w-4 h-4 mt-2"><p class="text-start mt-2 pl-2">{{ house.Pattern }} · {{ house.Size }} 坪</p>
              </div>
            </div>

            <!-- 底部时间和价格区域 -->
            <div class="flex justify-between items-center mt-4">
              <div class="absolute bottom-2 text-slate-500 text-start text-xs">
                發佈時間: {{ house.ReleaseTime }}
              </div>
              <div class="absolute bottom-2 right-2 text-lg text-red-500 font-bold" :class="{ 'line-through' : house.Rent}">
                {{ house.Price }} 元/月
              </div>
            </div>

            <!-- 已出租标签 -->
            <div class="absolute top-2 right-2 text-lg text-red-500 font-bold" v-if="house.Rent">
              已出租
            </div>
        </div>
      </div>
    </div>
  </router-link>
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
      },
    },
    methods: {
      
    },
    created() {},
    mounted() {}
};
</script>

<style lang="scss" scoped>

</style>

<!-- const formattedDateTime = time.toISOString().replace('T', ' ').slice(0, 19);
                this.houseInfo.ReleaseTime = formattedDateTime -->