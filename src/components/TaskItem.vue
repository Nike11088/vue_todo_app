<template>
  <div 
    class="task-item flex justify-between items-center border-2 border-blue-700 rounded-xl w-full py-1 px-2 mb-2 text-black dark:text-white"
    @mouseenter="mouseEnter"    
    @mouseleave="mouseLeave"   
    @mousedown="mouseDown($event)"
    @mouseup="mouseUp($event)"
    @mousemove="mouseMove($event)"
    @touchstart="touchStart($event)"
    @touchmove="touchMove($event)"
    @click="clickTask" 
  >
    <div 
      class="flex items-center"      
    >
      <div 
        class="flex items-center w-[30px] h-[30px] mr-1"
      >
        <span 
          v-if="task?.completed"
          class="material-icons-round !text-3xl text-green-400 hover:text-green-600 cursor-pointer"  
          @click.stop="completeTask"            
        >
          done
        </span> 
      </div>                    
      <span
        class="cursor-default"
        :class="{'line-through': task.completed}"        
      >
        {{ task.text }}
      </span>
    </div> 
    <div class="flex items-center w-[30px] h-[30px] mr-1">
      <span  
        v-if="selected"
        class="material-icons-outlined !text-3xl ml-1 text-red-400 hover:text-red-600 cursor-pointer"
        @click.stop="deleteTask"
      >
        delete
      </span> 
    </div>    
  </div> 
</template>

<script lang="ts">
import { type PropType, defineComponent } from 'vue'
import { type Task } from '../types/Task'
import { type TaskMouseEventArg } from '../types/TaskMouseEventArg'
import { type TaskTouchEventArg } from '../types/TaskTouchEventArg'

export default defineComponent({ 
  props: {
    task: {
      type: Object as PropType<Task>,
      required: true
    },
    selected: {
      type: Boolean,
      required: false
    }
  },
  methods: {
    mouseEnter () { 
      this.$emit('taskMouseEnter', this.task.id)
    },
    mouseLeave () {
      this.$emit('taskMouseLeave', this.task.id)
    },  
    mouseDown (event: MouseEvent) {
      this.$emit('taskMouseDown', { id: this.task.id, clientX: event.clientX })
    }, 
    mouseUp (event: MouseEvent) {
      this.$emit('taskMouseUp', { id: this.task.id, clientX: event.clientX })
    }, 
    mouseMove (event: MouseEvent) {
      this.$emit('taskMouseMove', { id: this.task.id, clientX: event.clientX })
    },
    touchStart (event: TouchEvent) {
      this.$emit('taskTouchStart', { id: this.task.id, event })
    },
    touchMove (event: TouchEvent) {
      this.$emit('taskTouchMove', { id: this.task.id, event })
    },
    completeTask () {    
      this.$emit('complete', this.task.id)
    },
    deleteTask () {
      this.$emit('delete', this.task.id)
    },   
    clickTask () {  
      this.$emit('clickTask', this.task.id)     
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
    clickTask: (id: number) => Number.isInteger(id),
    complete: (id: number) => Number.isInteger(id),
    delete: (id: number) => Number.isInteger(id)
  }
})
</script>

<style scoped>
</style>
