<template>
  <div class="flex flex-col justify-center items-center p-6" @mouseleave="closeSelectCity">
    
    <div class="flex items-center">
      <div class="relative inline-block" >
        <button class="pr-4" @mouseenter="openSelectCity">{{ Citys[selectCity] }} <i class="fa-solid fa-arrow-down-long w-1"></i> </button>
        <div v-if="isSelectCityOpen" class="absolute z-10 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
          <ul class="py-1">
            <li
              v-for="[cityKey, cityName] in Object.entries(Citys)"
              :key="cityKey"
              @click="sCity(cityKey)"
              class="px-4 py-2 text-gray-700 hover:bg-blue-100 cursor-pointer"
            >
              {{ cityName }}
            </li>
          </ul>
        </div>    
      </div>
      
      <form class="flex items-center border border-gray-300 bg-gray-50 rounded-full shadow-md px-3 py-2">      
        <!-- Search Icon -->
        <svg class="w-5 h-5 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
        </svg>
        <!-- Search Input -->
        <input 
          type="text" 
          placeholder="輸入道路名稱" 
          class="ml-3 w-64 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-0"
          v-model="selectAddress"
        />

        <!-- Search Button -->
        <button 
          type="submit" 
          class="ml-4 px-4 py-1 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          @click="searchfromaddress"
        >
          搜尋
        </button>
      </form>
    </div>

    <table class="w-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <tbody>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                地區
            </th>
            <td class="px-6 py-4">
              
              <div class="grid grid-cols-11 gap-2 mt-4">
                <label class="flex items-center space-x-2 mb-2">
                  <input type="radio" value="不限" v-model="selectArea" class="" />
                  <span :class="{'text-orange-500': selectArea === '不限', 'text-gray-700': selectArea !== '不限'}">不限</span>
                </label>
                <label v-for="area in areas[selectCity]" :key="area" class="flex items-center space-x-2 mb-2">
                  <input type="radio" :value="area" name="area" class="form-radio text-blue-600" v-model="selectArea">
                  {{ area }}
                </label>
              </div>
            </td>
        </tr>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                價格
            </th>
            <td class="px-6 py-4">
              <label class="cursor-pointer mr-5">
                <input
                  type="radio"
                  value="不限"
                  v-model="selectedPrice"
                  class="mr-1"
                />
                <span :class="{'text-orange-500': selectedPrice === '不限', 'text-gray-700': selectedPrice !== '不限'}">不限</span>
              </label>
              <label class="cursor-pointer mr-5" v-for="(price, index) in priceOptions" :key="index">
                <input
                  type="radio"
                  :value="price"
                  v-model="selectedPrice"
                  class="mr-1"
                />
                <span :class="{'text-orange-500': selectedPrice === price, 'text-gray-700': selectedPrice !== price}">{{ price }}</span>
              </label>
            </td>
        </tr>
        
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            坪數
          </th>
          <td class="px-6 py-4">
            <label class="cursor-pointer mr-5">
              <input
                type="radio"
                value="不限"
                v-model="selectSize"
                class="mr-1"
              />
              <span :class="{'text-orange-500': selectSize === '不限', 'text-gray-700': selectSize !== '不限'}">不限</span>
            </label>
            <label class="cursor-pointer mr-5" v-for="(size, index) in sizeOptions" :key="index">
              <input
                type="radio"
                :value="size"
                v-model="selectSize"
                class="mr-1"
              />
              <span :class="{'text-orange-500': selectSize === size, 'text-gray-700': selectSize !== size}">{{ size }}</span>
            </label>
          </td>
        </tr>
      </tbody>



    </table>

  </div>
</template>

<script>
export default {
    components: {},
    props: {},
    data() {
      return {
        selectAddress: "",
        selectArea: "不限",
        selectCity: "Taipei",
        selectedPrice: "不限",
        selectSize: "不限",
        isSelectCityOpen: false,
        Citys: {"Taipei":"台北市","NewTaipei":"新北市","Keelung":"基隆市","Taoyuan":"桃園市","HsinchuCity":"新竹市","HsinchuCounty":"新竹縣","Miaoli":"苗栗縣","Taichung":"台中市","Changhua":"彰化縣","Yunlin":"雲林縣","Nantou":"南投縣","ChiayiCounty":"嘉義縣","ChiayiCity":"嘉義市","Tainan":"台南市","Kaohsiung":"高雄市","PingtungCounty":"屏東縣","Yilan":"宜蘭縣","HualienCounty":"花蓮縣","TaitungCounty":"台東縣","Penghu":"澎湖縣","Kinmen":"金門縣","Lienchiang":"連江縣"},
        areas:{
          Taipei : ["南港區","內湖區","大安區","士林區","文山區","北投區","中山區","信義區","松山區","萬華區","中正區","大同區"],
          NewTaipei : ["板橋區","新莊區","中和區","三重區","新店區","土城區","永和區","汐止區","蘆洲區","淡水區","樹林區","林口區","三峽區","五股區","鶯歌區","泰山區","八里區","瑞芳區","深坑區","三芝區","萬里區","金山區","貢寮區","石門區","雙溪區","石碇區","坪林區","烏來區","平溪區"],
          Taoyuan : ["桃園區", "中壢區", "平鎮區", "八德區", "楊梅區", "龜山區", "蘆竹區", "龍潭區", "大溪區", "大園區", "觀音區", "新屋區", "復興區"],
          HsinchuCity : ["東區", "北區", "香山區"],
          HsinchuCounty : ["竹北市", "竹東鎮", "湖口鄉", "新豐鄉", "新埔鎮", "關西鎮", "芎林鄉", "寶山鄉", "橫山鄉", "尖石鄉", "北埔鄉", "峨嵋鄉", "五峰鄉"],
          Yilan : ["宜蘭市", "羅東鎮", "冬山鄉", "五結鄉", "蘇澳鎮", "礁溪鄉", "員山鄉", "頭城鎮", "壯圍鄉", "三星鄉", "南澳鄉", "大同鄉"],
          Keelung : ["安樂區", "信義區", "七堵區", "中正區", "中山區", "仁愛區", "暖暖區"],
          Taichung : ["北屯區", "西屯區", "大里區", "太平區", "南屯區", "豐原區", "北區", "南區", "東區", "西區", "潭子區", "沙鹿區", "大雅區", "清水區", "烏日區", "龍井區", "梧棲區", "大甲區", "神岡區", "霧峰區", "后里區", "外埔區", "新社區", "大安區", "中區", "石岡區", "和平區"],
          Changhua : ["彰化市", "員林市", "和美鎮", "鹿港鎮", "溪湖鎮", "二林鎮", "福興鄉", "花壇鄉", "伸港鄉", "秀水鄉", "永靖鄉", "埔心鄉", "北斗鎮", "芳苑鄉", "埔鹽鄉", "埤頭鄉", "溪州鄉", "大城鄉", "竹塘鄉", "二水鄉", "社頭鄉", "田中鎮", "田尾鄉", "芬園鄉"],
          Yunlin : ["斗六市", "虎尾鎮", "麥寮鄉", "西螺鎮", "斗南鎮", "北港鎮", "土庫鎮", "古坑鄉", "莿桐鄉", "林內鄉", "二崙鄉", "崙背鄉", "大埤鄉", "褒忠鄉", "東勢鄉", "臺西鄉", "元長鄉", "四湖鄉", "口湖鄉", "水林鄉"],
          Miaoli : ["頭份市", "竹南鎮", "苗栗市", "苑裡鎮", "後龍鎮", "通霄鎮", "公館鄉", "銅鑼鄉", "造橋鄉", "頭屋鄉", "南庄鄉", "西湖鄉", "三灣鄉", "泰安鄉", "獅潭鄉", "大湖鄉", "卓蘭鎮", "三義鄉"],
          Nantou : ["南投市", "草屯鎮", "埔里鎮", "竹山鎮", "名間鄉", "國姓鄉", "鹿谷鄉", "水里鄉", "仁愛鄉", "信義鄉", "魚池鄉", "中寮鄉", "集集鎮"],
          Kaohsiung : ["鳳山區", "三民區", "左營區", "楠梓區", "前鎮區", "苓雅區", "小港區", "鼓山區", "大寮區", "仁武區", "岡山區", "林園區", "路竹區", "新興區", "鳥松區", "橋頭區", "大樹區", "大社區", "湖內區", "茄萣區", "燕巢區", "阿蓮區", "前金區", "旗津區", "鹽埕區", "鳳山區", "美濃區", "杉林區", "甲仙區", "六龜區", "內門區", "茂林區", "那瑪夏區", "桃源區", "永安區"],
          Tainan : ["永康區", "安南區", "東區", "北區", "南區", "中西區", "仁德區", "新營區", "善化區", "麻豆區", "關廟區", "安定區", "白河區", "西港區", "七股區", "學甲區", "佳里區", "將軍區", "玉井區", "楠西區", "南化區", "左鎮區", "龍崎區", "山上區", "大內區", "新市區", "安平區", "柳營區", "官田區", "後壁區", "下營區", "六甲區", "東山區"],
          ChiayiCity : ["西區", "東區"],
          ChiayiCounty : ["民雄鄉", "水上鄉", "中埔鄉", "朴子市", "太保市", "竹崎鄉", "新港鄉", "大林鎮", "布袋鎮", "東石鄉", "六腳鄉", "梅山鄉", "義竹鄉", "鹿草鄉", "溪口鄉", "番路鄉", "阿里山鄉", "大埔鄉"],
          PingtungCounty : ["屏東市", "潮州鎮", "內埔鄉", "萬丹鄉", "東港鎮", "新園鄉", "恆春鎮", "長治鄉", "里港鄉", "麟洛鄉", "九如鄉", "佳冬鄉", "林邊鄉", "竹田鄉", "枋寮鄉", "枋山鄉", "春日鄉", "獅子鄉", "車城鄉", "滿州鄉", "琉球鄉", "泰武鄉", "來義鄉", "瑪家鄉", "三地門鄉", "霧臺鄉", "新埤鄉", "南州鄉", "新垣鄉"],
          TaitungCounty : ["臺東市", "卑南鄉", "成功鎮", "太麻里鄉", "關山鎮", "東河鄉", "池上鄉", "鹿野鄉", "長濱鄉", "大武鄉", "達仁鄉", "綠島鄉", "海端鄉", "延平鄉", "金峰鄉", "蘭嶼鄉"],
          HualienCounty : ["花蓮市", "吉安鄉", "玉里鎮", "新城鄉", "秀林鄉", "壽豐鄉", "光復鄉", "瑞穗鄉", "鳳林鎮", "富里鄉", "卓溪鄉", "豐濱鄉"],
          Penghu : ["馬公市", "湖西鄉", "白沙鄉", "西嶼鄉", "望安鄉", "七美鄉"],
          Kinmen : ["金城鎮", "金寧鄉", "金沙鎮", "金湖鎮", "烈嶼鄉", "烏坵鄉"],
          Lienchiang : ["南竿鄉", "北竿鄉", "東引鄉", "莒光鄉", "東沙", "南沙"],
        },
        priceOptions: [
          "5000元以下",
          "5000-10000元",
          "10000-20000元",
          "20000-30000元",
          "30000-40000元",
          "40000元以上"
        ],
        sizeOptions: [
          "10坪以下",
          "10-20坪",
          "20-30坪",
          "40-50坪",
          "50坪以上",
        ]
      };
    },
    watch: {

    },
    computed: {

    },
    methods: {
      searchfromaddress(){
        
      },
      openSelectCity() {
        this.isSelectCityOpen = true; // Opens the dropdown when hovered
      },
      closeSelectCity() {
        this.isSelectCityOpen = false; // Closes the dropdown when hover is removed
      },
      sCity(s){
        this.selectCity = s; // Sets the selected option
        this.isSelectCityOpen = false; // Closes the dropdown
      },
      searchCityFun(){
        this.$emit('selectCityFun', selectCity);
      },
      searchAreaFun(){
        this.$emit('selectAreaFun', selectArea);
      },
      searchAddressFun(){
        this.$emit('selectAddressFun', selectAddress);
      }
    },
    created() {},
    mounted() {}
};
</script>

<style lang="scss" scoped>

</style>