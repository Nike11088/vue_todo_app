<template>
  <div>
    <div class="flex h-[40px] items-center justify-between">
      <button
        class="h-[40px] w-[110px] rounded-l-full border-2 border-r-0 border-blue-700 font-medium text-blue-600 hover:bg-blue-600 active:bg-none"
        :class="{ 'bg-blue-600 text-white': activeFilter === 'All' }"
        @click="setFilter('All')"
      >
        All
      </button>
      <button
        class="border-lr-2 h-[40px] w-[110px] border-2 border-blue-700 font-medium text-blue-600 hover:bg-blue-600 hover:text-white active:bg-none"
        :class="{ 'bg-blue-600 text-white': activeFilter === 'Active' }"
        @click="setFilter('Active')"
      >
        Active
      </button>
      <button
        class="h-[40px] w-[110px] rounded-r-full border-2 border-l-0 border-blue-700 font-medium text-blue-600 hover:bg-blue-600 hover:text-white active:bg-none"
        :class="{ 'bg-blue-600 text-white': activeFilter === 'Done' }"
        @click="setFilter('Done')"
      >
        Done
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { type PropType, defineComponent } from 'vue'
import { type Filter } from '../types/Filter'

export default defineComponent({
  props: {
    activeFilter: {
      type: String as PropType<Filter>
    }
  },
  emits: {
    setFilter: (filter: Filter) => filter
  },
  setup(props, { emit }) {
    const setFilter = (filter: Filter) => emit('setFilter', filter)

    return {
      setFilter
    }
  }
})
</script>

<style scoped></style>
