<template>
  <div ref="taskList" class="mt-10 w-full sm:w-[540px] scrollbar scroll-m-2 overflow-x-hidden">
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
import { type PropType, defineComponent } from 'vue'
import { type Task } from '../types/Task'
import { type TaskMouseEventArg } from '../types/TaskMouseEventArg'
import { type TaskTouchEventArg } from '../types/TaskTouchEventArg'
import { type TaskDragEvent } from '../types/TaskDragEvent'
import { isMobile } from '../scripts/utils'

type Nullable<T> = T | null

interface State {
  tasksLength: number
  isTaskAdded: boolean
  isMobile: Function
}

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
  data(): State {
    return {
      tasksLength: 0,
      isTaskAdded: false,
      isMobile
    }
  },
  mounted() {
    this.tasksLength = this.tasks.length
  },
  updated() {
    if (this.isTaskAdded) {
      this.isTaskAdded = false
      const el = this.$refs.taskList as HTMLElement
      el.scrollTop = el.scrollHeight
    }
  },
  watch: {
    tasks: {
      handler: function () {
        if (this.tasks?.length > this.tasksLength) {
          this.isTaskAdded = true
        }
        this.tasksLength = this.tasks.length
      },
      deep: true
    }
  },
  methods: {
    clickTask(id: number) {
      this.$emit('clickTask', id)
    },
    completeTask(id: number) {
      this.$emit('complete', id)
    },
    deleteTask(id: number) {
      this.$emit('delete', id)
    },
    taskMouseEnter(id: number) {
      this.$emit('taskMouseEnter', id)
    },
    taskMouseLeave(id: number) {
      this.$emit('taskMouseLeave', id)
    },
    taskMouseDown(eventArg: TaskMouseEventArg) {
      this.$emit('taskMouseDown', eventArg)
    },
    taskMouseUp(eventArg: TaskMouseEventArg) {
      this.$emit('taskMouseUp', eventArg)
    },
    taskMouseMove(eventArg: TaskMouseEventArg) {
      this.$emit('taskMouseMove', eventArg)
    },
    taskTouchStart(event: TaskTouchEventArg) {
      this.$emit('taskTouchStart', event)
    },
    taskTouchMove(event: TaskTouchEventArg) {
      this.$emit('taskTouchMove', event)
    },
    dragStart(event: DragEvent, task: Task) {
      this.$emit('taskDragStart', { event, task })
    },
    drop(event: DragEvent, task: Task) {
      this.$emit('taskDrop', { event, task })
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
  }
})
</script>

<style scoped></style>
