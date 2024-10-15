<template>
  <div class="flex flex-col items-center justify-center w-2/3 space-y-4 rounded-lg">
    <!-- 上传区 -->
    <label
      for="dropzone-file"
      class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
    >
      <div class="flex flex-col items-center justify-center pt-5 pb-6">
        <svg
          class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
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
        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span class="font-semibold">按此上傳</span>或拖動上傳
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400">PNG, JPG</p>
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
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      <div
        v-for="(image, index) in imagePreviews"
        :key="index"
        class="relative w-48 h-48 border border-gray-200 rounded-lg overflow-hidden"
      >
        <img
          :src="image"
          alt="Image Preview"
          class="w-full h-full object-cover"
        />
      </div>
    </div>
    <button v-if="imageFiles.length" @click="UploadPic">上傳</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      imageFiles: [], // 保存 File 对象
      imagePreviews: [], // 保存 base64 预览图
      fileLimit: 9,
    };
  },
  methods: {
    onFileChange(event) {
      const files = Array.from(event.target.files);
      if (this.imageFiles.length + files.length > this.fileLimit) {
        alert(`最多只能上传 ${this.fileLimit} 张图片`);
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

    UploadPic() {
      axios.post('/pic', this.imageFiles).then(res => {
        console.log('文件上传成功', res.data);
      }).catch(error => {
        console.error('文件上传失败', error);
      });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
