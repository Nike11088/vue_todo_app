<template>
  <div class="flex justify-between items-center border-2 border-blue-700 rounded-xl min-w-[330px] w-full p-2 mb-4"
    @mouseover="mouseOver"
    @mouseleave="mouseLeave"
  >
    <div class="flex items-center hover:cursor-pointer">
      <span 
        class="material-icons-round !text-3xl mr-1 text-green-400 hover:text-green-600"
        :class="{'collapse': task?.completed}"
      >
        done
      </span>             
      <span>{{ task?.text }}</span>
    </div>         
    <span 
      class="material-icons-outlined !text-3xl ml-1 text-red-400 hover:text-red-600 hover:cursor-pointer"
      :class="{'collapse': !deleteVisible}"
    >
      delete
    </span>  
  </div> 
</template>

<script lang="ts">
import { type PropType, defineComponent } from 'vue';
import { type Task } from '../types/Task';

export default defineComponent({ 
  props: {
    task: {
      type: Object as PropType<Task>,
      requred: true
    }
  },
  data () {
    return {
      deleteVisible: false
    }
  },
  methods: {
    mouseOver () { 
      this.deleteVisible = true
    },
    mouseLeave () {
      this.deleteVisible = false
    }
  }
})
</script>

<style scoped>
</style>
