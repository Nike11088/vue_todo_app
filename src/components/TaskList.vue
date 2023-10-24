<template>
  <div
    ref="taskList"
    class="scrollbar mt-10 w-full scroll-m-2 overflow-x-hidden sm:w-[540px]"
  >
    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      :selected="selected === task.id"
      @dragstart="dragStart($event, task)"
      @drop="drop($event, task)"
      @dragover.prevent
      @dragenter.prevent
      @taskMouseEnter="taskMouseEnter"
      @taskMouseLeave="taskMouseLeave"
      @taskMouseDown="taskMouseDown"
      @taskMouseUp="taskMouseUp"
      @taskMouseMove="taskMouseMove"
      @taskTouchStart="taskTouchStart"
      @taskTouchMove="taskTouchMove"
      @clickTask="clickTask"
      @complete="completeTask"
      @delete="deleteTask"
    />
  </div>
</template>

<script lang="ts">
import TaskItem from './TaskItem.vue'
import { type PropType, defineComponent, ref, onMounted, onUpdated, watch } from 'vue'
import { type Task } from '../types/Task'
import { type TaskMouseEventArg } from '../types/TaskMouseEventArg'
import { type TaskTouchEventArg } from '../types/TaskTouchEventArg'
import { type TaskDragEvent } from '../types/TaskDragEvent'

type Nullable<T> = T | null

export default defineComponent({
  components: {
    TaskItem
  },
  props: {
    tasks: {
      type: Array as PropType<Task[]>,
      default: () => []
    },
    selected: {
      type: Number as PropType<Nullable<number>>,
      default: null
    }
  },
  emits: {
    taskMouseEnter: (id: number) => Number.isInteger(id),
    taskMouseLeave: (id: number) => Number.isInteger(id),
    taskMouseDown: (eventArg: TaskMouseEventArg) => eventArg,
    taskMouseUp: (eventArg: TaskMouseEventArg) => eventArg,
    taskMouseMove: (eventArg: TaskMouseEventArg) => eventArg,
    taskTouchStart: (eventArg: TaskTouchEventArg) => eventArg,
    taskTouchMove: (eventArg: TaskTouchEventArg) => eventArg,
    taskDragStart: (eventArg: TaskDragEvent) => eventArg,
    taskDrop: (eventArg: TaskDragEvent) => eventArg,
    clickTask: (id: number) => Number.isInteger(id),
    complete: (id: number) => Number.isInteger(id),
    delete: (id: number) => Number.isInteger(id)
  },
  setup({ tasks }, { emit }) {
    const tasksLength = ref(0)
    const isTaskAdded = ref(false)
    const taskList = ref(null)

    onMounted(() => (tasksLength.value = tasks.length))
    onUpdated(() => {
      if (isTaskAdded.value) {
        isTaskAdded.value = false
        if (taskList.value) {
          const el = taskList.value as HTMLElement
          el.scrollTop = el.scrollHeight
        }
      }
    })
    watch(tasks, async (newTasks, oldTasks) => {
      if (tasks?.length > tasksLength.value) {
        isTaskAdded.value = true
      }
      tasksLength.value = tasks.length
    })

    const clickTask = (id: number) => emit('clickTask', id)
    const completeTask = (id: number) => emit('complete', id)
    const deleteTask = (id: number) => emit('delete', id)
    const taskMouseEnter = (id: number) => emit('taskMouseEnter', id)
    const taskMouseLeave = (id: number) => emit('taskMouseLeave', id)
    const taskMouseDown = (eventArg: TaskMouseEventArg) => emit('taskMouseDown', eventArg)
    const taskMouseUp = (eventArg: TaskMouseEventArg) => emit('taskMouseUp', eventArg)
    const taskMouseMove = (eventArg: TaskMouseEventArg) => emit('taskMouseMove', eventArg)
    const taskTouchStart = (event: TaskTouchEventArg) => emit('taskTouchStart', event)
    const taskTouchMove = (event: TaskTouchEventArg) => emit('taskTouchMove', event)
    const dragStart = (event: DragEvent, task: Task) => emit('taskDragStart', { event, task })
    const drop = (event: DragEvent, task: Task) => emit('taskDrop', { event, task })

    return {
      taskList,
      taskMouseEnter,
      taskMouseLeave,
      taskMouseDown,
      taskMouseUp,
      taskMouseMove,
      taskTouchStart,
      taskTouchMove,
      dragStart,
      completeTask,
      deleteTask,
      clickTask,
      drop
    }
  }
})
</script>

<style scoped></style>
