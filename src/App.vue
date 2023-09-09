<template>
  <div class="flex flex-col items-center min-w-[350px]">    

    <TaskFilter 
      :activeFilter="activeFilter" 
      @setFilter="setFilter"
    />

    <TaskList
      :tasks="tasks"
    />        
    
    <AddTaskButton 
      v-if="!addTaskFormVisible"
      class="mt-10" 
      @click="showAddTaskForm"
    />

    <AddTaskForm 
      class="mt-10" 
      :visible="addTaskFormVisible" 
      @close="closeAddTaskForm"
      @addTask="addTask"
    />

  </div> 
</template>

<script lang="ts">
import 'material-icons/iconfont/material-icons.css'
import TaskFilter from './components/TaskFilter.vue'
import TaskList from './components/TaskList.vue'
import AddTaskButton from './components/AddTaskButton.vue'
import AddTaskForm from './components/AddTaskForm.vue'
import { defineComponent } from 'vue'
import { type Filter } from './types/Filter';
import { type Task } from './types/Task';

interface State {
  activeFilter: Filter,
  tasks: Task[],
  addTaskFormVisible: boolean
}

export default defineComponent({
  components: {
    TaskFilter,
    TaskList,
    AddTaskButton,
    AddTaskForm
  },
  data () : State {
    return {
      activeFilter: 'All',
      tasks: [
        { id: 0, text: 'Learn the basics of Vue', completed: true },
        { id: 1, text: 'Learn the basics of Typescript', completed: false },
        { id: 2, text: 'Subscribe to the channel', completed: false },
      ],
      addTaskFormVisible: false
    }
  },
  methods: {
    setFilter (filter : Filter) {
      this.activeFilter = filter
    },
    showAddTaskForm () {
      this.addTaskFormVisible = true
    },
    closeAddTaskForm () {
      this.addTaskFormVisible = false
    },
    addTask (text: string) {
      const newTask = {
        id: Date.now(),
        text,
        completed: false
      }
      this.tasks.push(newTask)
    }
  }
})
</script>

<style scoped>
</style>
