<template>
  <div class="flex-col items-center justify-center p-5">
    <div>
      <form class="max-w-md mx-auto">
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-5 group">
            <select v-model="selectCity" id="citySelect" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
              <option v-for="(cityName, cityKey) in Citys" :key="cityKey" :value="cityKey">
                {{ cityName }}
              </option>
            </select>
            <label for="floating_phone" class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">縣市</label>
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <select v-model="selectArea" id="citySelect" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
              <option v-for="area in Areas[selectCity]" :key="area" :value="selectArea">
                {{ area }}
              </option>
            </select>
            <label for="floating_company" class="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">區域</label>
          </div>
        </div>

        <div class="relative z-0 w-full mb-5 group">
          <input v-modle="address" type="text" name="repeat_password" id="floating_repeat_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer" v-model="address" placeholder=" " required />
          <label for="floating_repeat_password" class="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">地址</label>
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <input v-model="title" type="text" name="repeat_password" id="floating_repeat_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label for="floating_repeat_password" class="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">標題</label>
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-5 group">
            <input v-model="pattern" type="text" name="floating_phone" id="floating_phone" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label for="floating_phone" class="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">格局</label>
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <select v-model="deposit" id="citySelect" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
              <option :value="1">一個月</option>
              <option :value="2">兩個月</option>
            </select>
            <label for="floating_company" class="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">押金</label>
          </div>
        </div>

        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-5 group">
            <input v-model="floor" type="text" name="floating_phone" id="floating_phone" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label for="floating_phone" class="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">樓層</label>
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <input v-model="size" type="number" name="floating_company" id="floating_company" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   d focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label for="floating_company" class="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">坪數</label>
          </div>
        </div>

        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-5 group">
            <input v-model="price" type="number" name="floating_phone" id="floating_phone" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label for="floating_phone" class="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">租金(月)</label>
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <input v-model="managementFee" type="number" name="floating_company" id="floating_company" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label for="floating_company" class="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">管理費(月)</label>
          </div>
        </div>

        <div class="mb-5">
          <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900">租住說明</label>
          <input v-model="rentalInstructions" type="text" id="large-input" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500">
        </div>

        <div class="mb-5">
          <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900">簡介</label>
          <input v-model="introduction" type="text" id="large-input" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500">
        </div>

        <div class="flex flex-row items-center justify-center">
          <div class="flex items-center mb-4 pr-2">
            <input v-model="Refrigerator" id="Refrigerator" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
            <label for="Refrigerator" class="ms-2 text-sm font-medium text-gray-900">冰箱</label>
          </div>
          <div class="flex items-center mb-4 pr-2">
            <input v-model="AirConditioner" id="AirConditioner" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
            <label for="AirConditioner" class="ms-2 text-sm font-medium text-gray-900">冷氣</label>
          </div>
          <div class="flex items-center mb-4 pr-2">
            <input v-model="Bed" id="Bed" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
            <label for="Bed" class="ms-2 text-sm font-medium text-gray-900">床</label>
          </div>
          <div class="flex items-center mb-4 pr-2">
            <input v-model="Elevator" id="Elevator" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
            <label for="dElevator" class="ms-2 text-sm font-medium text-gray-900">電梯</label>
          </div>
          <div class="flex items-center mb-4 pr-2">
            <input v-model="NaturalGas" id="NaturalGas" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
            <label for="dNaturalGas" class="ms-2 text-sm font-medium text-gray-900">天然瓦斯</label>
          </div>
          <div class="flex items-center mb-4 pr-2">
            <input v-model="ParkingSpace" id="ParkingSpace" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
            <label for="ParkingSpace" class="ms-2 text-sm font-medium text-gray-900">停車位</label>
          </div>
        </div>

        <div class="flex flex-row items-center justify-center">
          <div class="flex items-center mb-4 pr-2">
            <input v-model="Balcony" id="Balcony" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
            <label for="Balcony" class="ms-2 text-sm font-medium text-gray-900">陽台</label>
          </div>
          <div class="flex items-center mb-4 pr-2">
            <input v-model="Sofa" id="Sofa" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
            <label for="Sofa" class="ms-2 text-sm font-medium text-gray-900">沙發</label>
          </div>
          <div class="flex items-center mb-4 pr-2">
            <input v-model="Tables" id="Tables" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
            <label for="Tables" class="ms-2 text-sm font-medium text-gray-900">桌椅</label>
          </div>
          <div class="flex items-center mb-4 pr-2">
            <input v-model="Channel4" id="Channel4" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
            <label for="Channel4" class="ms-2 text-sm font-medium text-gray-900">第四台</label>
          </div>
          <div class="flex items-center mb-4 pr-2">
            <input v-model="TV" id="TV" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
            <label for="TV" class="ms-2 text-sm font-medium text-gray-900">電視</label>
          </div>
          <div class="flex items-center mb-4 pr-2">
            <input v-model="Wardrobe" id="Wardrobe" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
            <label for="Wardrobe" class="ms-2 text-sm font-medium text-gray-900">衣櫥</label>
          </div>
        </div>

        <div class="flex flex-row items-center justify-center">
          <div class="flex items-center mb-4 pr-2">
            <input v-model="WashingMachine" id="WashingMachine" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
            <label for="WashingMachine" class="ms-2 text-sm font-medium text-gray-900">洗衣機</label>
          </div>
          <div class="flex items-center mb-4 pr-2">
            <input v-model="WaterHeater" id="WaterHeater" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
            <label for="WaterHeater" class="ms-2 text-sm font-medium text-gray-900">電熱水器</label>
          </div>
          <div class="flex items-center mb-4 pr-2">
            <input v-model="Network" id="Network" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
            <label for="Network" class="ms-2 text-sm font-medium text-gray-900">網路</label>
          </div>
        </div>

        <div class="flex items-center justify-center">
          <button
            @click="update"
            type="submit"
            :disabled="!selectArea || !selectCity || !address || !price || !title || !pattern || !size || !floor || !introduction || !rentalInstructions || !imageURL"
            class="w-full text-white bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 focus:outline-none  disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          >
            發布
          </button>
        </div>
      </form>
    </div>

    <div class="flex items-center justify-center">
      <uploadImage @updatePicEvent="updatePic"></uploadImage>
    </div>
  </div>
</template>


<script>
import uploadImage from './components/UploadImage.vue';
import axios from 'axios';
import { successMessage, warningMessage, errorMessage } from "../../api/messgae";

export default {
    components: {
      uploadImage,
    },
    props: {},
    data() {
      return {
        selectCity: "Taipei",
        selectArea: "南港區",
        deposit: "1",
        address: "",
        title:"",
        price:"",
        pattern:"",
        size:"",
        floor:"",
        introduction: "",
        managementFee: "",
        rentalInstructions:"",
        Refrigerator: false,
        WashingMachine: false,
        TV: false,
        AirConditioner: false,
        WaterHeater: false,
        Bed: false,
        Wardrobe: false,
        Channel4: false,
        Network: false,
        NaturalGas: false,
        Sofa: false,
        Tables: false,
        Balcony: false,
        Elevator: false,
        ParkingSpace: false,
        imageURL: [],
        Citys: {"Taipei":"台北市","NewTaipei":"新北市","Keelung":"基隆市","Taoyuan":"桃園市","HsinchuCity":"新竹市","HsinchuCounty":"新竹縣","Miaoli":"苗栗縣","Taichung":"台中市","Changhua":"彰化縣","Yunlin":"雲林縣","Nantou":"南投縣","ChiayiCounty":"嘉義縣","ChiayiCity":"嘉義市","Tainan":"台南市","Kaohsiung":"高雄市","PingtungCounty":"屏東縣","Yilan":"宜蘭縣","HualienCounty":"花蓮縣","TaitungCounty":"台東縣","Penghu":"澎湖縣","Kinmen":"金門縣","Lienchiang":"連江縣"},
        Areas:{
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
      };
    },
    watch: {},
    computed: {},
    methods: {
      updatePic(data){
        this.imageURL = data
      },
      update(){

        const User = JSON.parse(localStorage.getItem('session'));

        const formData = {
          id: User.ID,
          city: Citys[this.selectCity],
          area: this.selectArea,
          address: this.address,
          title: this.title,
          price: this.price,
          deposit: this.deposit,
          pattern: this.pattern,
          size: this.size,
          floor: this.floor,
          introduction: this.introduction,
          managementFee: this.managementFee,
          rentalInstructions: this.rentalInstructions,
          imageURL: this.imageURL,
          selectedFacilities: {Refrigerator: this.Refrigerator, WashingMachine: this.WashingMachine, WaterHeater: this.WaterHeater, TV: this.TV, Bed: this.Bed, AirConditioner: this.AirConditioner, Wardrobe: this.Wardrobe, Channel4: this.Channel4, Network: this.Network, NaturalGas: this.NaturalGas, NaturalGas: this.NaturalGas, Sofa: this.Sofa, Tables: this.Tables, Balcony: this.Balcony, Elevator: this.Elevator, ParkingSpace: this.ParkingSpace},
        };

        axios.post('/api/post', formData).then(res =>{
          successMessage("上傳成功")
        })
      }
    },
    created() {},
    mounted() {}
};
</script>

<style lang="scss" scoped>

</style>