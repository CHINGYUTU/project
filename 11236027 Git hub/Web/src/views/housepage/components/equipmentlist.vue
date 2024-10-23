<template>
  <div class="flex">
    <div class="grid grid-cols-8 gap-8">
        <!-- 第一排圖片及文字 -->
        <div class="flex flex-col items-center ">
            <img src="/Refrigerator icon.png" class=" w-16 h-auto " :class="{'opacity-25' : !refrigerator}" alt="Image 1" />
            <p class="mt-2 text-center" :class="{'line-through' : !refrigerator}">冰箱</p>
        </div>
        <div class="flex flex-col items-center">
            <img src="/Air-con icon.png" class="w-16 h-auto " :class="{'opacity-25' : !airConditioner}"  alt="Image 2" />
            <p class="mt-2 text-center" :class="{'line-through' : !airConditioner}">冷氣</p>
        </div>
        <div class="flex flex-col items-center">
            <img src="/Double Bed.png" class="w-16 h-auto " :class="{'opacity-25' : !bed}" alt="Image 3" />
            <p class="mt-2 text-center" :class="{'line-through' : !bed}">床</p>
        </div>
        <div class="flex flex-col items-center">
            <img src="/Elevator icon.png" class="w-16 h-auto " :class="{'opacity-25' : !elevator}" alt="Image 4" />
            <p class="mt-2 text-center" :class="{'line-through' : !elevator}">電梯</p>
        </div>
        <div class="flex flex-col items-center">
            <img src="/Gas Stove.png" class="w-16 h-auto " :class="{'opacity-25' : !naturalGas}" alt="Image 5" />
            <p class="mt-2 text-center" :class="{'line-through' : !naturalGas}">天然瓦斯</p>
        </div>
        <div class="flex flex-col items-center">
            <img src="/Parking icon.png" class="w-16 h-auto " :class="{'opacity-25' : !parkingSpace}" alt="Image 6" />
            <p class="mt-2 text-center" :class="{'line-through' : !parkingSpace}">停車位</p>
        </div>
        <div class="flex flex-col items-center">
            <img src="/Potted Plant.png" class="w-16 h-auto " :class="{'opacity-25' : !balcony}" alt="Image 7" />
            <p class="mt-2 text-center" :class="{'line-through' : !balcony}">陽台</p>
        </div>
        <div class="flex flex-col items-center">
            <img src="/Sofa icon.png" class="w-16 h-auto " :class="{'opacity-25' : !sofa}" alt="Image 8" />
            <p class="mt-2 text-center" :class="{'line-through' : !sofa}">沙發</p>
        </div>

        <div class="flex flex-col items-center">
            <img src="/Table search result.png" class="w-16 h-auto " :class="{'opacity-25' : !tables}" alt="Image 9" />
            <p class="mt-2 text-center" :class="{'line-through' : !tables}">桌椅</p>
        </div>
        <div class="flex flex-col items-center">
            <img src="/TV icon from Fotor.png" class="w-16 h-auto " :class="{'opacity-25' : !channel4}" alt="Image 10" />
            <p class="mt-2 text-center" :class="{'line-through' : !channel4}">第四台</p>
        </div>
        <div class="flex flex-col items-center">
            <img src="/tv.png" class="w-16 h-auto " :class="{'opacity-25' : !tv}" alt="Image 11" />
            <p class="mt-2 text-center" :class="{'line-through' : !tv}">電視</p>
        </div>
        <div class="flex flex-col items-center">
            <img src="/Wardrobe icon.png" class="w-16 h-auto " :class="{'opacity-25' : !wardrobe}" alt="Image 12" />
            <p class="mt-2 text-center" :class="{'line-through' : !wardrobe}">衣櫥</p>
        </div>
        <div class="flex flex-col items-center">
            <img src="/Washing machine icon.png" class="w-16 h-auto " :class="{'opacity-25' : !washingMachine}" alt="Image 13" />
            <p class="mt-2 text-center" :class="{'line-through' : !washingMachine}">洗衣機</p>
        </div>
        <div class="flex flex-col items-center">
            <img src="/Water icon.png" class="w-16 h-auto " :class="{'opacity-25' : !waterHeater}" alt="Image 14" />
            <p class="mt-2 text-center" :class="{'line-through' : !waterHeater}">電熱水器</p>
        </div>
        <div class="flex flex-col items-center">
            <img src="/wi-fi.png" class="w-16 h-auto " :class="{'opacity-25' : !network}" alt="Image 15" />
            <p class="mt-2 text-center" :class="{'line-through' : !network}">網路</p>
        </div>
    </div>
</div>
</template>

<script>
export default {
    components: {},
    props: {
        refrigerator: { type: Number, required: true },
        washingMachine: { type: Number, required: true },
        tv: { type: Number, required: true },
        airConditioner: { type: Number, required: true },
        waterHeater: { type: Number, required: true },
        bed: { type: Number, required: true },
        wardrobe: { type: Number, required: true },
        channel4: { type: Number, required: true },
        network: { type: Number, required: true },
        naturalGas: { type: Number, required: true },
        sofa: { type: Number, required: true },
        tables: { type: Number, required: true },
        balcony: { type: Number, required: true },
        elevator: { type: Number, required: true },
        parkingSpace: { type: Number, required: true }
    },
    data() {
      return {
        a : 1
      };
    },
    watch: {},
    computed: {},
    methods: {},
    created() {},
    mounted() {}
};
</script>

<style lang="scss" scoped>

</style>