<template>
  <div class="flex justify-between items-center border-2 border-blue-700 rounded-xl w-full px-2 mb-2"
    @mouseover="mouseOver"
    @mouseleave="mouseLeave"
  >
    <div class="flex items-center hover:cursor-pointer">
      <span 
        class="material-icons-round !text-3xl mr-1 text-green-400 hover:text-green-600 collapse"
        :class="{'!visible': completeVisible || task?.completed}" 
        @click="completeTask"      
      >
        done
      </span>                 
      <span
        :class="{'line-through': task.completed}"
      >
        {{ task.text }}
      </span>
    </div> 
    <span 
      class="material-icons-outlined !text-3xl ml-1 text-red-400 hover:text-red-600 hover:cursor-pointer collapse"
      :class="{'!visible': deleteVisible}"
      @click="deleteTask"
    >
      delete
    </span>  
  </div> 
</template>

<script lang="ts">
import { type PropType, defineComponent } from 'vue';
import { type Task } from '../types/Task';

interface State {
  completeVisible: boolean,
  deleteVisible: boolean
}

export default defineComponent({ 
  props: {
    task: {
      type: Object as PropType<Task>,
      required: true
    }
  },
  data () : State {
    return {
      completeVisible: false,
      deleteVisible: false
    }
  },
  methods: {
    mouseOver () { 
      this.completeVisible = true
      this.deleteVisible = true
    },
    mouseLeave () {
      this.completeVisible = false
      this.deleteVisible = false
    },
    
    completeTask () {
      this.$emit('complete', this.task.id)
    },
    deleteTask () {
      this.$emit('delete', this.task.id)
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
