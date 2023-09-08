<template>
  <div class="flex justify-center min-w-[350px] max-w-[550px] mx-auto max-h-screen">
    <div class="flex flex-col items-center px-[10px]">    

      <TaskFilter 
        :activeFilter="activeFilter" 
        @setFilter="setFilter"
      />

      <TaskList
        :tasks="tasks"
      />             

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

<script lang="ts">
import 'material-icons/iconfont/material-icons.css'
import TaskFilter from './components/TaskFilter.vue'
import TaskList from './components/TaskList.vue'
import { defineComponent } from 'vue'
import { type Filter } from './types/Filter';
import { type Task } from './types/Task';

interface State {
  activeFilter: Filter,
  tasks: Task[]
}

export default defineComponent({
  components: {
    TaskFilter,
    TaskList
  },
  data () : State {
    return {
      activeFilter: 'All',
      tasks: [
        { id: 0, text: 'Learn the basics of Vue', completed: true },
        { id: 1, text: 'Learn the basics of Typescript', completed: false },
        { id: 2, text: 'Subscribe to the channel', completed: false },
      ]
    }
  },
  methods: {
    setFilter (filter : Filter) {
      this.activeFilter = filter
    }
  }
})
</script>

<style scoped>
</style>
