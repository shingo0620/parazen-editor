<template>
  <div class="w-full">
    <!-- Traits 類別名稱 -->
    <div class="flex items-center p-2 text-white cursor-pointer bg-secondary" @click="toggleExpand()">
      <h3 class="whitespace-nowrap">{{ name }}</h3>
      <div class="ml-auto">
        <ChevronDown v-if="!isExpended" />
        <ChevronUp v-else />
      </div>
    </div>

    <div v-if="isExpended" class="w-full px-2 pt-4 pb-2 bg-gray-700">
      <!-- Positions -->
      <div class="flex items-center w-full gap-2 mt-2">
        <label class="uppercase whitespace-nowrap">x-pos</label>
        <input min="-2" max="2" step="0.00001" v-model.number="properties['x-position']" type="range" class="w-full">
        <input min="-2" max="2" step="0.00001" v-model.number="properties['x-position']" type="number" class="shrink-0 w-[56px] p-1 text-xs text-center text-black rounded">
      </div>

      <div class="flex items-center w-full gap-2 mt-2">
        <label class="uppercase whitespace-nowrap">y-pos</label>
        <input min="-2" max="2" step="0.00001" v-model.number="properties['y-position']" type="range" class="w-full">
        <input min="-2" max="2" step="0.00001" v-model.number="properties['y-position']" type="number" class="shrink-0 w-[56px] p-1 text-xs text-center text-black rounded">
      </div>

      <div class="flex items-center w-full gap-2 mt-2">
        <label class="uppercase whitespace-nowrap">z-pos</label>
        <input min="-2" max="2" step="0.00001" v-model.number="properties['z-position']" type="range" class="w-full">
        <input min="-2" max="2" step="0.00001" v-model.number="properties['z-position']" type="number" class="shrink-0 w-[56px] p-1 text-xs text-center text-black rounded">
      </div>

      <!--
      <div class="flex gap-2">
        <div class="relative w-full">
          <label :for="`${properties.name}-x-pos`" class="absolute px-1 text-xs text-black border border-black rounded pointer-events-none left-2 -top-2 bg-gray-50">X-POS</label>
          <input :id="`${properties.name}-x-pos`" v-model.number="properties['x-position']" type="number" class="w-full px-1 pt-2 pb-1 text-center text-black border-2 rounded border-primary bg-gray-50">
        </div>

        <div class="relative w-full">
          <label :for="`${properties.name}-y-pos`" class="absolute px-1 text-xs text-black border border-black rounded pointer-events-none left-2 -top-2 bg-gray-50">Y-POS</label>
          <input :id="`${properties.name}-y-pos`" v-model.number="properties['y-position']" type="number" class="w-full px-1 pt-2 pb-1 text-center text-black border-2 rounded border-primary bg-gray-50">
        </div>

        <div class="relative w-full">
          <label :for="`${properties.name}-z-pos`" class="absolute px-1 text-xs text-black border border-black rounded pointer-events-none left-2 -top-2 bg-gray-50">Z-POS</label>
          <input :id="`${properties.name}-z-pos`" v-model.number="properties['z-position']" type="number" class="w-full px-1 pt-2 pb-1 text-center text-black border-2 rounded border-primary bg-gray-50">
        </div>
      </div>
      -->

      <!-- Rotations -->
      <div class="flex items-center w-full gap-2 mt-2">
        <label class="uppercase whitespace-nowrap" :for="`${properties.name}-x-rot`">x-rot</label>
        <input min="-360" max="360" v-model.number="properties['x-rotate']" class="w-full" :id="`${properties.name}-x-rot`" type="range">
        <input min="-360" max="360" v-model.number="properties['x-rotate']" class="shrink-0 w-[56px] p-1 text-xs text-center text-black rounded" type="number">
      </div>
      <div class="flex items-center w-full gap-2 mt-2">
        <label class="uppercase whitespace-nowrap" :for="`${properties.name}-y-rot`">y-rot</label>
        <input min="-360" max="360" v-model.number="properties['y-rotate']" class="w-full" :id="`${properties.name}-y-rot`" type="range">
        <input min="-360" max="360" v-model.number="properties['y-rotate']" class="shrink-0 w-[56px] p-1 text-xs text-center text-black rounded" type="number">
      </div>
      <div class="flex items-center w-full gap-2 mt-2">
        <label class="uppercase whitespace-nowrap" :for="`${properties.name}-z-rot`">z-rot</label>
        <input min="-360" max="360" v-model.number="properties['z-rotate']" class="w-full" :id="`${properties.name}-z-rot`" type="range">
        <input min="-360" max="360" v-model.number="properties['z-rotate']" class="shrink-0 w-[56px] p-1 text-xs text-center text-black rounded" type="number">
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import ChevronDown from 'vue-material-design-icons/ChevronDown.vue'
import ChevronUp from 'vue-material-design-icons/ChevronUp.vue'
import CloseCircleOutline from 'vue-material-design-icons/CloseCircleOutline.vue'

const emits = defineEmits(['update:modelValue', 'expand'])
const props = defineProps({
  // 所有的 trait values
  traitSelections: {
    type: Set,
    default: () => new Set()
  },

  // trait type
  name: String,

  // filter
  modelValue: {
    type: Object,
    default: () => {}
  }
})

const properties = computed({
  get: () => props.modelValue,
  set: (value) => emits('update:modelValue', value)
})

// 是否展開選單
const isExpended = ref(false)

const toggleExpand = () => {
  isExpended.value = !isExpended.value

  if(isExpended.value) {
    emits('expand')
  }
}

const close = () => {
  isExpended.value = false
}
defineExpose({ close })

</script>
