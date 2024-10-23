<template>
    <div class="flex items-end justify-end">
      <!-- 按钮 -->
      <button @click="showModal = true" class="text-center text-gray-500 mt-2">
        更多圖片
      </button>
  
      <!-- 模态框 -->
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" @click.self="showModal = false">
        <div class="bg-white p-6 rounded-lg shadow-lg w-2/3 max-h-[80vh] overflow-auto" @click.stop>
            <div class="grid grid-cols-2 sm:grid-cols-2 gap-4">
                <div @click="showZoom(Pic1)">
                    <img :src="Pic1" v-if="Pic1 != null" alt="Image 1" class="h-auto w-full max-h-[300px] object-cover rounded-lg cursor-pointer">
                </div>
                <div @click="showZoom(Pic2)">
                    <img :src="Pic2" v-if="Pic2 != null" alt="Image 2" class="h-auto w-full max-h-[300px] object-cover rounded-lg cursor-pointer">
                </div>
                <div @click="showZoom(Pic3)">
                    <img :src="Pic3" v-if="Pic3 != null" alt="Image 3" class="h-auto w-full max-h-[300px] object-cover rounded-lg cursor-pointer">
                </div>
                <div @click="showZoom(Pic4)">
                    <img :src="Pic4" v-if="Pic4 != null" alt="Image 4" class="h-auto w-full max-h-[300px] object-cover rounded-lg cursor-pointer">
                </div>
                <div @click="showZoom(Pic5)">
                    <img :src="Pic5" v-if="Pic5 != null" alt="Image 5" class="h-auto w-full max-h-[300px] object-cover rounded-lg cursor-pointer">
                </div>
                <div @click="showZoom(Pic6)">
                    <img :src="Pic6" v-if="Pic6 != null" alt="Image 6" class="h-auto w-full max-h-[300px] object-cover rounded-lg cursor-pointer">
                </div>
                <div @click="showZoom(Pic7)">
                    <img :src="Pic7" v-if="Pic7 != null" alt="Image 7" class="h-auto w-full max-h-[300px] object-cover rounded-lg cursor-pointer">
                </div>
                <div @click="showZoom(Pic8)">
                    <img :src="Pic8" v-if="Pic8 != null" alt="Image 8" class="h-auto w-full max-h-[300px] object-cover rounded-lg cursor-pointer">
                </div>
            </div>
                
            </div>
        </div>
  
      <!-- 放大图片的模态框 -->
      <div v-if="zoomModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" @click="zoomModal = false">
        <div class="p-6 rounded-lg shadow-lg w-2/3 max-h-[90vh] overflow-auto">
          <img :src="currentImage" alt="Zoomed Image" class="w-full h-auto max-h-[90vh] max-w-[90vw] object-contain rounded-lg">
        </div>
      </div>
    </div>
  </template>

<script>
export default {
    components: {},
    props: {
        Pic1: {
            type: String,
            required: true
        },
        Pic2: {
            type: String,
            required: true
        },
        Pic3: {
            type: String,
            required: true
        },
        Pic4: {
            type: String,
            required: true
        },
        Pic5: {
            type: String,
            required: true
        },
        Pic6: {
            type: String,
            required: true
        },
        Pic7: {
            type: String,
            required: true
        },
        Pic8: {
            type: String,
            required: true
        },

    },
    data() {
      return {
        showModal: false,
        zoomModal: false,
        currentImage: '',
      };
    },
    watch: {},
    computed: {},
    methods: {
        showZoom(image) {
            this.currentImage = image;
            this.zoomModal = true;
        }
    },
    created() {},
    mounted() {}
};
</script>

<style lang="scss" scoped>

</style>