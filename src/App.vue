<template>
  <div 
    class="flex flex-col items-center min-w-[350px] h-[100vh] w-[100vw]"
    @click="containerClick"
    @mouseup="containerMouseUp"
    @touchend="containerTouchEnd"
  >    
    <div class="flex items-center mt-5 relative">
      <TaskFilter 
        :activeFilter="activeFilter" 
        @setFilter="setFilter"
      />  
      <LampIcon 
        class="absolute top-[4px] right-[-40px] cursor-pointer" 
        :color="themeColor"
        @click="switchTheme"
      />       
    </div>  

    <TaskList
      v-if="filteredTasks.length > 0"
      :tasks="filteredTasks.sort((a, b) => a.order - b.order)"
      :selected="selected"
      @clickTask="clickTask"
      @complete="completeTask"
      @delete="deleteTask"
      @taskMouseEnter="taskMouseEnter"
      @taskMouseLeave="taskMouseLeave"
      @taskMouseDown="taskMouseDown"
      @taskMouseUp="taskMouseUp"
      @taskMouseMove="taskMouseMove"
      @taskTouchStart="taskTouchStart"
      @taskTouchMove="taskTouchMove"
      @taskDragStart="taskDragStart"
      @taskDrop="taskDrop"
    />        
    <div 
      v-else 
      class="mt-10 font-bold text-gray-400"
      :class="{'h-[calc(100vh-195px)]': isMobile()}"
    >
      Task list is empty
    </div>
    
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
import LampIcon from './components/icons/LampIcon.vue'
import 'material-icons/iconfont/material-icons.css'
import { type TaskMouseEventArg } from './types/TaskMouseEventArg'
import { type TaskTouchEventArg } from './types/TaskTouchEventArg'
import { type TaskDragEvent } from './types/TaskDragEvent'
import { isMobile } from './scripts/utils'

type Nullable<T> = T | null

interface State {
  activeFilter: Filter,
  tasks: Task[],
  addTaskFormVisible: boolean,
  selected: Nullable<number>,
  darkTheme: boolean,
  taskTouchEvent: Nullable<TaskTouchEventArg>,
  isTaskMouseDown: boolean,
  isMobile: Function
}

const appName = 'todo-app'
const tasksName = 'tasks'
const themeName = 'theme'

export default defineComponent({
  components: {
    TaskFilter,
    TaskList,
    AddTaskButton,
    AddTaskForm,
    LampIcon
  },
  created () {
    if (localStorage['todo-app.theme'] === 'dark' || (localStorage[`${appName}.${themeName}`] !== 'light' && (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches))) {
      document.documentElement.classList.add('dark')
      this.darkTheme = true
    } else {
      document.documentElement.classList.remove('dark')
      this.darkTheme = false
    }

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
      selected: null,
      darkTheme: false,
      taskTouchEvent: null,
      isTaskMouseDown: false,
      isMobile
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
        completed: false,
        order: Date.now()
      }
      this.tasks.push(newTask)
      localStorage.setItem(`${appName}.${tasksName}`, JSON.stringify(this.tasks))   
    },
    clickTask (id: number) {    
      if (isMobile()) {
        if (this.selected === id) {
          this.selected = null
        } else {
          this.completeTask(id)
        }
      } else {
        this.completeTask(id)
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
      if (!isMobile()) {
        const selected = this.getTaskId(id)
        this.selected = this.selected === selected ? null : selected
      }      
    },
    taskMouseLeave () {      
      if (!isMobile()) {
        this.selected = null
      } 
    },
    taskMouseDown (eventArg: TaskMouseEventArg) {      
    }, 
    taskMouseUp (eventArg: TaskMouseEventArg) {        
    }, 
    taskMouseMove (eventArg: TaskMouseEventArg) {
    },
    taskTouchStart (event: TaskTouchEventArg) {      
      this.taskTouchEvent = event
    },
    taskTouchMove (eventArg: TaskTouchEventArg) {   
      if (this.taskTouchEvent && this.taskTouchEvent?.id === eventArg.id) {
        const oldClientX = this.taskTouchEvent.event.changedTouches[0].clientX
        const newClientX = eventArg.event.changedTouches[0].clientX
        if (newClientX - oldClientX > 50) {
          this.selected = this.getTaskId(eventArg.id)
        }     
      }  
    },
    taskDragStart (e: TaskDragEvent) {
      let dataTransfer = e.event.dataTransfer as DataTransfer
      dataTransfer.dropEffect = 'move'
      dataTransfer.effectAllowed = 'move'
      dataTransfer.setData('task', JSON.stringify(e.task))
    },
    taskDrop (e: TaskDragEvent) {    
      let dataTransfer = e.event.dataTransfer as DataTransfer      
      let movingTask = JSON.parse(dataTransfer.getData('task'))
      movingTask = this.tasks.find(t => t.id === movingTask.id)
      const movingTaskOrder = movingTask.order 
      movingTask.order = e.task.order
      e.task.order = movingTaskOrder
      this.tasks = [...this.tasks]
      localStorage.setItem(`${appName}.${tasksName}`, JSON.stringify(this.tasks))  
    },
    containerClick (evt: MouseEvent) {
      const target = evt.target as Element;
      if (isMobile() && !target.classList.contains('task-item')) {
        this.selected = null
      }
    },
    containerMouseUp (evt: MouseEvent) {
      console.log('mouse up', evt)
    },
    containerTouchEnd(evt: TouchEvent) {
      console.log('containerTouchEnd', evt)
    },
    getTaskId (id: number) {
      return this.tasks.find(t => t.id === id)?.id || null
    },
    switchTheme () {
      if (this.darkTheme) {
        document.documentElement.classList.remove('dark')
        localStorage.setItem(`${appName}.${themeName}`, 'light')
        this.darkTheme = false
      } else {
        document.documentElement.classList.add('dark')
        localStorage.setItem(`${appName}.${themeName}`, 'dark')
        this.darkTheme = true
      }
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
    },
    themeColor () {
      return this.darkTheme ? 'text-amber-300' : 'text-slate-600'
    }
  }
})
</script>

<style scoped>
</style>
