<template>
  <div class="flex items-center">
    <!-- 這裡顯示滿星 -->
    {{ stars }}
    <div v-for="s in Math.floor(stars)" :key="s">
      <span class="text-yellow-400">★</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    LID: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      stars: 0,
    };
  },
  watch: {
    LID(newVal, oldVal) {
      this.getLandlordStars();
    },
  },
  methods: {
    getLandlordStars() {
      axios
        .post("/api/getLandlordStars", { ID: this.LID })
        .then((res) => {
          this.stars = res.data.averageStars;
        })
        .catch((error) => {
          console.error("取得評分錯誤:", error);
        });
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped></style>
