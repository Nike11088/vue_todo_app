<script lang="ts">
import 'material-icons/iconfont/material-icons.css'
import TaskFilter from './components/TaskFilter.vue'
import { defineComponent } from 'vue'
import { type Filter } from './types/Filter';

interface State {
  activeFilter: Filter
}

export default defineComponent({
  components: {
    TaskFilter
  },
  data () : State {
    return {
      activeFilter: 'All'
    }
  },
  methods: {
    setFilter (filter : Filter) {
      this.activeFilter = filter
    }
  }
})
</script>

<template>
  <div class="flex justify-center min-w-[350px] max-w-[550px] mx-auto max-h-screen">
    <div class="flex flex-col items-center px-[10px]">    

      <TaskFilter 
        :activeFilter="activeFilter" 
        @setFilter="setFilter"
      />

      <div class="flex flex-col items-center mt-10 max-w-[530px] overflow-y-auto">
        <div class="flex justify-between items-center border-2 border-blue-700 rounded-xl w-full p-2 mb-4">
          <div class="flex items-center">
            <span class="material-icons-round !text-3xl mr-1 text-green-400 hover:text-green-600 hover:cursor-pointer">done</span>             
            <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut consequuntur suscipit non eveniet consectetur ad obcaecati cupiditate amet esse provident.</span>
          </div>         
          <span class="material-icons-outlined !text-3xl ml-1 text-red-400  hover:text-red-600 hover:cursor-pointer">delete</span>  
        </div>
        <div class="flex justify-between items-center border-2 border-blue-700 rounded-xl w-full p-2 mb-4">
          <div class="flex items-center">
            <span class="material-icons-round !text-3xl mr-1 text-green-400 hover:text-green-600 hover:cursor-pointer">done</span>             
            <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut consequuntur suscipit non eveniet consectetur ad obcaecati cupiditate amet esse provident.</span>
          </div>         
          <span class="material-icons-outlined !text-3xl ml-1 text-red-400  hover:text-red-600 hover:cursor-pointer">delete</span>  
        </div>
        <div class="flex justify-between items-center border-2 border-blue-700 rounded-xl w-full p-2 mb-4">
          <div class="flex items-center">
            <span class="material-icons-round !text-3xl mr-1 text-green-400 hover:text-green-600 hover:cursor-pointer">done</span>             
            <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut consequuntur suscipit non eveniet consectetur ad obcaecati cupiditate amet esse provident.</span>
          </div>         
          <span class="material-icons-outlined !text-3xl ml-1 text-red-400  hover:text-red-600 hover:cursor-pointer">delete</span>  
        </div>
        <div class="flex justify-between items-center border-2 border-blue-700 rounded-xl w-full p-2 mb-4">
          <div class="flex items-center">
            <span class="material-icons-round !text-3xl mr-1 text-green-400 hover:text-green-600 hover:cursor-pointer">done</span>             
            <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut consequuntur suscipit non eveniet consectetur ad obcaecati cupiditate amet esse provident.</span>
          </div>         
          <span class="material-icons-outlined !text-3xl ml-1 text-red-400  hover:text-red-600 hover:cursor-pointer">delete</span>  
        </div>  
      </div>              

      <div class="my-5">
        <button class="w-[110px] h-[40px] rounded-full text-white border-2 border-blue-700 bg-blue-600 hover:bg-blue-500 font-medium">Add Task</button>
      </div>

      <div class="flex flex-col border-2 border-blue-700 rounded-xl mt-5 mb-5 w-full p-3 pt-1">
        <div class="flex justify-end mb-3">
          <span class="material-icons-round !text-3xl ml-1 text-blue-600  hover:text-blue-400 hover:cursor-pointer">cancel</span>  
        </div>        
        <input class="border-2 border-blue-300 focus:border-blue-600 outline-0 rounded-full w-full mb-5">  
        <div class="flex justify-center">
          <button class="w-[110px] h-[40px] rounded-full text-white border-2 border-blue-700 bg-blue-600 hover:bg-blue-500 font-medium">Add Task</button>       
        </div>        
      </div>

    </div>     
  </div>
</template>

<style scoped>
</style>
