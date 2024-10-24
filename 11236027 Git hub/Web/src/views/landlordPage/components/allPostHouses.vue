<template>
    <div class="flex items-center justify-center p-4">
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                    <th scope="col" class="px-6 py-3">
                      ID
                    </th>
                    <th scope="col" class="px-6 py-3">
                      城市
                    </th>
                    <th scope="col" class="px-6 py-3">
                      地區
                    </th>
                    <th scope="col" class="px-6 py-3">
                      地址
                    </th>
                    <th scope="col" class="px-6 py-3">
                      價格
                    </th>
                    <th scope="col" class="px-6 py-3">
                      操作
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-white border-b  " v-for="data in datas" :key="data.ID">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                        {{ data.ID }}
                    </th>
                    <td class="px-6 py-4">
                        {{ data.City }}
                    </td>
                    <td class="px-6 py-4">
                        {{ data.Area }}
                    </td>
                    <td class="px-6 py-4">
                        {{ data.Address }}
                    </td>
                    <td class="px-6 py-4">
                        NT.{{ data.Price }}
                    </td>
                    <td class="px-6 py-4">
                      <button @click="changeRent(data.ID, data.Rent)" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 " v-if="!data.Rent">出租</button>
                      <button @click="changeRent(data.ID, data.Rent)" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 " v-else>空閒</button>
                      <button @click="del(data.ID)" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" >刪除</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  
    
    
  </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { successMessage, warningMessage, errorMessage } from "../../../api/messgae";
  
  export default {
      components: {},
      props: {},
      data() {
        return {
          datas: [],
        };
      },
      watch: {},
      computed: {},
      methods: {
          getPosted(){
              axios.post('/api/getPosted', { ID : JSON.parse(localStorage.getItem('session')).ID }).then(res =>{
                  this.datas = res.data;
              })
          },
          changeRent(ID, Rent){
            axios.post('/api/changeRent', { ID : ID, Rent : !Rent }).then(res =>{
              this.$router.go(0);
            })
          },
          del(ID){
            axios.post('/api/delpost', { ID : ID}).then(res =>{
              this.$router.go(0);
              successMessage('刪除成功')
            })
          }
      },
      created() {},
      mounted() {
          this.getPosted();
      }
  };
  </script>
  
  <style lang="scss" scoped>
  
  </style>