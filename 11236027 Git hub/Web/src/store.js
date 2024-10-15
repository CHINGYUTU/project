import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 定義一個新的 Vue Store
const store = new Vuex.Store({
    state: {
      isLoading: false,
    },
    mutations: {
      // 將state設定為參數
      Loaded(state) {
        // state的isLoading true/false 互轉
        state.isLoading = !state.isLoading
      }
    }

})
export default store;