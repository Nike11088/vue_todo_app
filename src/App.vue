<template>
  <div 
    class="flex flex-col items-center min-w-[350px] h-100vh"
    @click="containerClick"
  >    
    <TaskFilter 
      :activeFilter="activeFilter" 
      @setFilter="setFilter"
    />

    <TaskList
      v-if="filteredTasks.length > 0"
      :tasks="filteredTasks"
      :selected="selected"
      @clickTask="clickTask"
      @complete="completeTask"
      @delete="deleteTask"
      @taskMouseEnter="taskMouseEnter"
      @taskMouseLeave="taskMouseLeave"
    />        
    <div v-else class="mt-10 font-bold text-gray-400">Task list is empty</div>
    
    <AddTaskButton 
      v-if="!addTaskFormVisible"
      class="mt-8" 
      @click="showAddTaskForm"
    />

    <AddTaskForm 
      class="mt-8" 
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
import { type Filter } from './types/Filter'
import { type Task } from './types/Task'

type Nullable<T> = T | null

interface State {
  activeFilter: Filter,
  tasks: Task[],
  addTaskFormVisible: boolean,
  selected: Nullable<number>
}

const appName = 'todo-app'
const tasksName = 'tasks'

export default defineComponent({
  components: {
    TaskFilter,
    TaskList,
    AddTaskButton,
    AddTaskForm
  },
  created () {
    const tasks = localStorage.getItem(`${appName}.${tasksName}`)
    if (tasks) {
      this.tasks = JSON.parse(tasks)
    } 
  },
  data () : State {
    return {
      activeFilter: 'All',
      tasks: [],
      addTaskFormVisible: false,
      selected: null
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
      localStorage.setItem(`${appName}.${tasksName}`, JSON.stringify(this.tasks))
    },
    clickTask (id: number) {         
      if (this.isMobile()) {
        const selected = this.tasks.find(t => t.id === id)?.id || null
        this.selected = this.selected === selected ? null : selected
      }      
    },
    completeTask (id: number) {
      const task = this.tasks.find(t => t.id === id) 
      if (!task) return     
      task.completed = !task.completed
      localStorage.setItem(`${appName}.${tasksName}`, JSON.stringify(this.tasks))
    },
    deleteTask (id: number) {
      this.tasks = this.tasks.filter(t => t.id !== id)
      localStorage.setItem(`${appName}.${tasksName}`, JSON.stringify(this.tasks))
    },
    taskMouseEnter (id: number) {
      if (!this.isMobile()) {
        const selected = this.getTaskId(id)
        this.selected = this.selected === selected ? null : selected
      }      
    },
    taskMouseLeave () {      
      if (!this.isMobile()) {
        this.selected = null
      } 
    },
    containerClick (evt: MouseEvent) {
      const target = evt.target as Element;
      if (this.isMobile() && !target.classList.contains('task-item')) {
        this.selected = null
      }
    },
    getTaskId (id: number) {
      return this.tasks.find(t => t.id === id)?.id || null
    },
    isMobile () {
      return /Android|iPhone/i.test(navigator.userAgent)
    }
  },
  computed: {
    filteredTasks () {
      switch (this.activeFilter) {       
        case 'Active':
          return this.tasks.filter(t => !t.completed)
        case 'Done':
          return this.tasks.filter(t => t.completed)
        case 'All':
        default:
          return this.tasks
      }
    }
  }
})
</script>

<style scoped>
</style>
