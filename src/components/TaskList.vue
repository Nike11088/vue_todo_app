<template>
  <div class="mt-10 sm:w-[550px] w-full px-[10px]">

   <TaskItem 
    v-for="task in tasks"
    :key="task.id"
    :task="task"
    @complete="completeTask"
    @delete="deleteTask"
   />

  </div> 
</template>

<script lang="ts">
import TaskItem from './TaskItem.vue'
import { type PropType, defineComponent } from 'vue';
import { type Task } from '../types/Task';

export default defineComponent({ 
  components: {
    TaskItem
  },
  props: {
    tasks: {
      type: Array as PropType<Task[]>,
      default: () => []
    }
  },
  methods: {
    completeTask (id: number) {
      this.$emit('complete', id)
    },
    deleteTask (id: number) {
      this.$emit('delete', id)
    }
  },
  emits: {
    complete: (id: number) => Number.isInteger(id),
    delete: (id: number) => Number.isInteger(id)
  }
})
</script>

<style scoped>
</style>
