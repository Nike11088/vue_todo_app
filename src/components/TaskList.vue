<template>
  <div class="mt-10 sm:w-[550px] w-full px-[10px] max-h-[calc(100vh-310px)] overflow-y-auto">

   <TaskItem 
    v-for="task in tasks"
    :key="task.id"
    :task="task"
    :selected="selected === task.id"
    @taskMouseEnter="taskMouseEnter"
    @taskMouseLeave="taskMouseLeave"
    @clickTask="clickTask"
    @complete="completeTask"
    @delete="deleteTask"
   />

  </div> 
</template>

<script lang="ts">
import TaskItem from './TaskItem.vue'
import { type PropType, defineComponent } from 'vue';
import { type Task } from '../types/Task';

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
  methods: {
    clickTask (id: number) {
      this.$emit('clickTask', id)
    },
    completeTask (id: number) {
      this.$emit('complete', id)
    },
    deleteTask (id: number) {
      this.$emit('delete', id)
    },
    taskMouseEnter (id: number) {
      this.$emit('taskMouseEnter', id)
    },
    taskMouseLeave (id: number) {
      this.$emit('taskMouseLeave', id)
    }
  },
  emits: {
    taskMouseEnter: (id: number) => Number.isInteger(id),
    taskMouseLeave: (id: number) => Number.isInteger(id),
    clickTask: (id: number) => Number.isInteger(id),
    complete: (id: number) => Number.isInteger(id),
    delete: (id: number) => Number.isInteger(id)
  }
})
</script>

<style scoped>
</style>
