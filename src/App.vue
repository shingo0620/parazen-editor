<template>
  <div class="flex flex-no-wrap bg-gray-200">
    <div class="absolute z-40 flex-col justify-between w-64 transition duration-150 ease-in-out bg-gray-800 shadow md:h-full" ref="navRef">
      <div
        id="openSideBar"
        class="absolute right-0 items-center justify-center w-10 h-10 mt-10 -mr-10 bg-gray-800 rounded-tr rounded-br shadow cursor-pointer"
        :class="{ 'hidden': !closed, 'flex': closed }"
        @click="sidebarHandler()
      ">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-adjustments" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFFFFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" />
          <circle cx="6" cy="10" r="2" />
          <line x1="6" y1="4" x2="6" y2="8" />
          <line x1="6" y1="12" x2="6" y2="20" />
          <circle cx="12" cy="16" r="2" />
          <line x1="12" y1="4" x2="12" y2="14" />
          <line x1="12" y1="18" x2="12" y2="20" />
          <circle cx="18" cy="7" r="2" />
          <line x1="18" y1="4" x2="18" y2="5" />
          <line x1="18" y1="9" x2="18" y2="20" />
        </svg>
      </div>
      <div
        id="closeSideBar"
        class="absolute right-0 items-center justify-center w-10 h-10 mt-10 -mr-10 text-white bg-gray-800 rounded-tr rounded-br shadow cursor-pointer"
        :class="{ 'hidden': closed, 'flex': !closed }"
        @click="sidebarHandler()"
      >
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
      </div>

      <div class="flex flex-col h-screen">
        <!-- Title -->
        <div class="w-full h-12 p-4 text-2xl font-bold text-center text-gray-50">
          <h1>Parazen Editor</h1>
        </div>

        <!-- Input ID -->
        <div class="relative flex w-full gap-2 px-4">
          <div class="absolute inset-0 w-4 h-4 m-auto ml-6 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z"></path>
              <circle cx="10" cy="10" r="7"></circle>
              <line x1="21" y1="21" x2="15" y2="15"></line>
            </svg>
          </div>
          <form @submit.prevent="getGltf" class="w-full">
            <input class="w-full py-2 pl-8 text-sm text-gray-500 bg-gray-100 rounded focus:outline-none" type="number" placeholder="Enter Parazen ID..." max="721" min="0"/>
          </form>

          <button class="relative w-10 h-full p-1 border rounded border-gray-50" :style="`background-color: ${bgColor};`" @click="pickColorHandler()">
            <input class="hidden w-full" type="color" v-model="bgColor" ref="colorPickerRef">
            <img class="w-full" src="/images/colors.png" alt="color picker">
          </button>
        </div>


        <!-- Properties -->
        <div class="h-full overflow-y-auto">
          <ul class="text-gray-50">
            <TraitSelector
              ref="traitSelectorRefs"
              v-for="(item, index) in bodyItems"
              :key="item.name"
              :name="item.name"
              v-model="bodyParameters[item.name]"
              @expand="expandHandler(index)"
            >
            </TraitSelector>
          </ul>
        </div>

        <!-- search & image -->
        <div>
          <div>
            <a href="https://www.paraland.world">
              <img src="/images/view_parazens.png" alt="View Parazens">
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="relative h-screen p-4 transition duration-500 ease-in-out left-64 text-gray-50" :style="`background-color: ${bgColor};`" ref="contentRef">
    <p>Load yout gltf content here</p>
  </div>


</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import TraitSelector from './components/TraitSelector.vue'

const closed = ref(false)
const navRef = ref()
const contentRef = ref()
const colorPickerRef = ref()
const traitSelectorRefs = ref([])
const loader = new GLTFLoader()
const bodyItems = ref([
	{
		name: "All",
		index: []
	},
	{
		name: "Head",
		index: [11]
	},
	{
		name: "Spine",
		index: [18]
	},
	{
		name: "Hips",
		index: [4]
	},
	{
		name: "LeftArm",
		index: [5]
	},
	{
		name: "LeftForeArm",
		index: [7]
	},
	{
		name: "LeftHand",
		index: [8]
	},
	{
		name: "LeftThumbFinger",
		index: [8, 4]
	},
	{
		name: "LeftIndexFinger",
		index: [8, 0]
	},
	{
		name: "LeftMiddleFinger",
		index: [8, 1]
	},
	{
		name: "LeftRingFinger",
		index: [8, 3]
	},
	{
		name: "LeftPinkyFinger",
		index: [8, 2]
	},
	{
		name: "RightArm",
		index: [12]
	},
	{
		name: "RightForeArm",
		index: [14]
	},
	{
		name: "RightHand",
		index: [15]
	},
	{
		name: "RightThumbFinger",
		index: [15, 4]
	},
	{
		name: "RightIndexFinger",
		index: [15, 0]
	},
	{
		name: "RightMiddleFinger",
		index: [15, 1]
	},
	{
		name: "RightRingFinger",
		index: [15, 3]
	},
	{
		name: "RightPinkyFinger",
		index: [15, 2]
	},
	{
		name: "LeftUpperLeg",
		index: [10]
	},
	{
		name: "LeftLeg",
		index: [9]
	},
	{
		name: "LeftFoot",
		index: [6]
	},
	{
		name: "RightUpperLeg",
		index: [17]
	},
	{
		name: "RightLeg",
		index: [16]
	},
	{
		name: "RightFoot",
		index: [13]
	}
])
const bodyParameters = reactive({})
const bgColor = ref()

onMounted(() => {
  bodyItems.value.forEach(item => {
    bodyParameters[item.name] = {
      'name': item.name,
      'x-position': 0,
      'y-position': 0,
      'z-position': 0,
      'x-rotate': 0,
      'y-rotate': 0,
      'z-rotate': 0
    }
  })
})

// 切換選單展出狀態
const sidebarHandler = () => {
  if (closed.value) {
      navRef.value.style.transform = "translateX(0px)"
      contentRef.value.style.transform = "translateX(0px)"
      closed.value = false
  } else {
      navRef.value.style.transform = "translateX(-260px)"
      contentRef.value.style.transform = "translateX(-260px)"
      closed.value = true
  }
}

const getGltf = () => {
  // https://paralandbusinesscardweb.blob.core.windows.net/web/NFTWebAR/1/scoure/Model/1/1.gltf
  loader.load('/models/parazen_1_alt.gltf', function (data) {
    console.log(data)
  })
}

// 關閉其他 Selector
const expandHandler = (targetIndex: Number) => {
  traitSelectorRefs.value.forEach((ref, index) => {
    if (index !== targetIndex) {
      ref.close()
    }
  })
}

const pickColorHandler = () => {
  colorPickerRef.value.focus()
  colorPickerRef.value.click()
}
</script>
