<template>
  <div class="flex flex-col w-2/3 items-center justify-center space-y-4 rounded-lg">
    <div class="w-2/3 bg-gray-200 rounded-full h-4" v-if="isUploaded">
      <div class="h-4 animate-pulse rounded-full bg-gradient-to-r from-green-500 to-blue-500" :style="{ width: `${uploadProgress}%` }">
        <span class="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">{{ uploadProgress }}%</span>
      </div>
    </div>

    <div class="w-2/3" v-else>
      <p class="mt-4 text-xl flex items-center justify-center">
        第一張圖片為封面圖 已上傳
        <span :class="{'text-red-500': imageFiles.length === 9, 'text-green-500': imageFiles.length < 9}">
          {{ imageURL.length }}/9
        </span>
        張照片到伺服器
      </p>
      <label
        for="dropzone-file"
        class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 d  hover:bg-gray-100  "
      >
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            class="w-8 h-8 mb-4 text-gray-500 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p class="mb-2 text-sm text-gray-500 ">
            <span class="font-semibold">按此上傳</span>或拖動上傳
          </p>
          <p class="text-xs text-gray-500 ">PNG, JPG</p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          class="hidden"
          accept="image/*"
          multiple
          @change="onFileChange"
        />
      </label>

      <!-- 图片预览区域 -->
      <div class="grid grid-cols-3 gap-4 mt-6"> <!-- 增加 gap -->
        <div
          v-for="(image, index) in imagePreviews"
          :key="index"
          class="relative w-48 h-48 border border-gray-200 rounded-lg overflow-hidden"
          
        >
          <img
            :src="image"
            alt="Image Preview"
            class="w-full h-full"
          />
          <!-- 删除按钮 -->
          <button @click="removeImage(index)" class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
            x
          </button>
        </div>
      </div>

      <button
        class="w-30 text-white bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 focus:outline-none  disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
        v-if="imageFiles.length" @click="UploadPic">上傳</button>
    </div>


    <div class="w-2/3 grid grid-cols-3 gap-4 mt-2" v-if="this.imageURL"> <!-- 增加 gap -->
      <div
        v-for="(image, index) in imageURL"
        :key="index"
        class="relative w-48 h-48 border border-gray-200 rounded-lg overflow-hidden"
        
      >
        <img
          :src="image"
          alt="Image Preview"
          class="w-full h-full"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { successMessage, warningMessage, errorMessage } from "../../../api/messgae";

export default {
  data() {
    return {
      imageFiles: [], // 保存 File 对象
      imagePreviews: [], // 保存 base64 预览图
      isUploaded: false,
      imageURL: [],
      uploadProgress: 0,
      fileLimit:9,
    };
  },
  
  methods: {
    onFileChange(event) {
      const files = Array.from(event.target.files);
      if (this.imageFiles.length + files.length > this.fileLimit) {
        warningMessage(`最多只能上傳${fileLimit}張`)
        return;
      }

      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreviews.push(e.target.result); // 保存 base64 预览
        };
        reader.readAsDataURL(file);

        this.imageFiles.push(file); // 保存 File 对象
      });
    },

    async UploadPic() {
      this.isUploaded = true;
      const totalImages = this.imageFiles.length;
      for (let i = 0; i < totalImages; i++) {
        const formData = new FormData();
      
        formData.append('image', this.imageFiles[i]); 
        formData.append('token', '2cec9714abb3764c1dff1b409e9c43ef'); 

        await axios.post('/pic', formData).then(res => {
          this.imageURL.push(res.data.url);
          this.uploadProgress = Math.round(((i + 1) / totalImages) * 100); // 更新进度百分比
        }).catch(error => {
          console.error('上傳失败', error);
        });
      }
      this.isUploaded = false;
      this.uploadProgress = 0; // 重置进度条
      this.imageFiles = [];
      this.imagePreviews = [];
      this.updatePic();
    },
    removeImage(index) {
      this.imageFiles.splice(index, 1);
      this.imagePreviews.splice(index, 1);
    },
    updatePic(){
      this.$emit('updatePicEvent', this.imageURL)
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
