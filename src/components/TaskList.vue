<template>
  <div class="flex flex-col items-center mt-10 max-w-[530px] overflow-y-auto">

   <TaskItem 
    v-for="task in tasks"
    :key="task.id"
    :task="task"
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
})
</script>

<style scoped>
</style>
