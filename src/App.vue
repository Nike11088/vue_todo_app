<template>
  <div
    class="mx-2 flex h-[100vh] min-w-[400px] flex-col items-center overflow-hidden"
    @click="containerClick"
  >
    <div class="mt-5 flex items-center">
      <div class="h-8 w-8"></div>
      <TaskFilter
        :activeFilter="activeFilter"
        @setFilter="setFilter"
      />
      <LampIcon
        class="mx-2 cursor-pointer"
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
      @taskTouchStart="taskTouchStart"
      @taskTouchMove="taskTouchMove"
      @taskDragStart="taskDragStart"
      @taskDrop="taskDrop"
    />
    <div
      v-else
      class="mt-10 font-bold text-gray-400"
    >
      Task list is empty
    </div>

    <AddTaskButton
      v-if="!addTaskFormVisible"
      class="mb-2 mt-8"
      @click="showAddTaskForm"
    />

    <AddTaskForm
      class="mb-2 mt-8"
      :visible="addTaskFormVisible"
      @close="closeAddTaskForm"
      @addTask="addTask"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import 'material-icons/iconfont/material-icons.css'
import 'material-icons/iconfont/material-icons.css'
import TaskFilter from './components/TaskFilter.vue'
import TaskList from './components/TaskList.vue'
import AddTaskButton from './components/AddTaskButton.vue'
import AddTaskForm from './components/AddTaskForm.vue'
import LampIcon from './components/icons/LampIcon.vue'
import { type Filter } from './types/Filter'
import { type Task } from './types/Task'
import { type TaskTouchEventArg } from './types/TaskTouchEventArg'
import { type TaskDragEvent } from './types/TaskDragEvent'
import { isMobile } from './scripts/utils'

type Nullable<T> = T | null
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
  setup() {
    const activeFilter = ref<Filter>('All')
    const addTaskFormVisible = ref(false)
    const tasks = ref<Task[]>([])
    const selected = ref<Nullable<number>>(null)
    const taskTouchEvent = ref<Nullable<TaskTouchEventArg>>(null)
    const darkTheme = ref(false)

    const filteredTasks = computed(() => {
      switch (activeFilter.value) {
        case 'Active':
          return tasks.value.filter((t) => !t.completed)
        case 'Done':
          return tasks.value.filter((t) => t.completed)
        case 'All':
        default:
          return tasks.value
      }
    })
    const themeColor = computed(() => (darkTheme.value ? 'text-amber-300' : 'text-slate-600'))

    const setFilter = (filter: Filter) => (activeFilter.value = filter)
    const showAddTaskForm = () => (addTaskFormVisible.value = true)
    const closeAddTaskForm = () => (addTaskFormVisible.value = false)
    const addTask = (text: string) => {
      const newTask = {
        id: Date.now(),
        text,
        completed: false,
        order: Date.now()
      }
      tasks.value.push(newTask)
      localStorage.setItem(`${appName}.${tasksName}`, JSON.stringify(tasks.value))
    }
    const clickTask = (id: number) => {
      if (isMobile()) {
        if (selected.value === id) {
          selected.value = null
        } else {
          completeTask(id)
        }
      } else {
        completeTask(id)
      }
    }
    const completeTask = (id: number) => {
      const task = tasks.value.find((t) => t.id === id)
      if (!task) return
      task.completed = !task.completed
      localStorage.setItem(`${appName}.${tasksName}`, JSON.stringify(tasks.value))
    }
    const deleteTask = (id: number) => {
      tasks.value = tasks.value.filter((t) => t.id !== id)
      localStorage.setItem(`${appName}.${tasksName}`, JSON.stringify(tasks.value))
    }
    const taskMouseEnter = (id: number) => {
      if (!isMobile()) {
        const task = getTaskId(id)
        selected.value = selected.value === task ? null : task
      }
    }
    const taskMouseLeave = () => {
      if (!isMobile()) {
        selected.value = null
      }
    }
    const taskTouchStart = (event: TaskTouchEventArg) => (taskTouchEvent.value = event)
    const taskTouchMove = (eventArg: TaskTouchEventArg) => {
      if (taskTouchEvent.value && taskTouchEvent.value?.id === eventArg.id) {
        const oldClientX = taskTouchEvent.value.event.changedTouches[0].clientX
        const newClientX = eventArg.event.changedTouches[0].clientX
        if (newClientX - oldClientX > 50) {
          selected.value = getTaskId(eventArg.id)
        }
      }
    }
    const taskDragStart = (e: TaskDragEvent) => {
      let dataTransfer = e.event.dataTransfer as DataTransfer
      dataTransfer.dropEffect = 'move'
      dataTransfer.effectAllowed = 'move'
      dataTransfer.setData('task', JSON.stringify(e.task))
    }
    const taskDrop = (e: TaskDragEvent) => {
      let dataTransfer = e.event.dataTransfer as DataTransfer
      let movingTask = JSON.parse(dataTransfer.getData('task'))
      movingTask = tasks.value.find((t) => t.id === movingTask.id)
      const movingTaskOrder = movingTask.order
      movingTask.order = e.task.order
      e.task.order = movingTaskOrder
      tasks.value = [...tasks.value]
      localStorage.setItem(`${appName}.${tasksName}`, JSON.stringify(tasks.value))
    }
    const containerClick = (evt: MouseEvent) => {
      const target = evt.target as Element
      if (isMobile() && !target.classList.contains('task-item')) {
        selected.value = null
      }
    }
    const getTaskId = (id: number) => tasks.value.find((t) => t.id === id)?.id || null
    const switchTheme = () => {
      if (darkTheme.value) {
        document.documentElement.classList.remove('dark')
        localStorage.setItem(`${appName}.${themeName}`, 'light')
        darkTheme.value = false
      } else {
        document.documentElement.classList.add('dark')
        localStorage.setItem(`${appName}.${themeName}`, 'dark')
        darkTheme.value = true
      }
    }

    onMounted(() => {
      if (
        localStorage['todo-app.theme'] === 'dark' ||
        (localStorage[`${appName}.${themeName}`] !== 'light' &&
          !('theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        document.documentElement.classList.add('dark')
        darkTheme.value = true
      } else {
        document.documentElement.classList.remove('dark')
        darkTheme.value = false
      }

      const storageTasks = localStorage.getItem(`${appName}.${tasksName}`)
      if (storageTasks) {
        tasks.value = JSON.parse(storageTasks)
      }
    })

    return {
      activeFilter,
      addTaskFormVisible,
      tasks,
      selected,
      taskTouchEvent,
      darkTheme,
      filteredTasks,
      themeColor,
      setFilter,
      showAddTaskForm,
      closeAddTaskForm,
      addTask,
      clickTask,
      completeTask,
      deleteTask,
      taskMouseEnter,
      taskMouseLeave,
      taskTouchStart,
      taskTouchMove,
      taskDragStart,
      taskDrop,
      containerClick,
      switchTheme
    }
  }
})
</script>

<style scoped></style>
