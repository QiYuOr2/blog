<script setup lang="ts">
interface FilterItem {
  key: string
  label: string
  checked: boolean
}

defineProps<{
  items: FilterItem[]
}>()
</script>

<template>
  <div flex items-center mb-2>
    <div v-for="item in items" :key="item.key" flex items-center mr-3>
      <input type="checkbox" :id="item.key" :value="item.key" appearance-none
        border="gray-3 1.5 checked:emerald-700 hover:emerald-600 checked:focus:emerald-700 checked:hover:emerald-500"
        bg="checked:emerald-700 checked:hover:emerald-500 checked:focus:emerald-700"
        w-3.5 h-3.5 transition-colors cursor-pointer focus-visible:outline-none focus:outline-none
        v-model="item.checked"
      />
      <label :for="item.key" ml-1 text-sm text-stone-5 select-none cursor-pointer>{{ item.label }}</label>
    </div>
  </div>
</template>