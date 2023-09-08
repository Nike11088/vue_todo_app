<template>
  <div>
    <div class="flex justify-between items-center w-[330px] h-[40px] mt-5">
      <button 
        class="w-[110px] h-[40px] text-blue-600 font-medium border-2 border-blue-700 rounded-l-full border-r-0 hover:bg-blue-300"  
        :class="{ 'text-white bg-blue-600 hover:bg-blue-500': activeFilter === 'All' }"  
        @click="setFilter('All')"    
      >
        All
      </button>
      <button 
        class="w-[110px] h-[40px] text-blue-600 font-medium border-2 border-blue-700 hover:bg-blue-300 border-lr-2"
        :class="{ 'text-white bg-blue-600 hover:bg-blue-500': activeFilter === 'Active' }" 
        @click="setFilter('Active')"  
      >
        Active
      </button>
      <button 
        class="w-[110px] h-[40px]  text-blue-600 font-medium border-2 border-blue-700 hover:bg-blue-300 rounded-r-full border-l-0"
        :class="{ 'text-white bg-blue-600 hover:bg-blue-500': activeFilter === 'Done' }"  
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

interface State {
  filters: Filter[]
}


export default defineComponent({ 
  //text-white  bg-blue-600 hover:bg-blue-500 
  props: {
    activeFilter: {
      type: String as PropType<Filter>
    }
  },
  data(): State {
    return {
      filters: ['All', 'Active', 'Done']
    }
  },
  methods: {
    setFilter (filter : Filter) {
      this.$emit('setFilter', filter)
    }
  },
  emits: {
    setFilter: (filter: Filter) => filter
  }
})
</script>

<style scoped>
</style>
