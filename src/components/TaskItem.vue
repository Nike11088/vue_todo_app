<template>
  <div class="flex justify-between items-center border-2 border-blue-700 rounded-xl w-full py-1 px-2 mb-2"
    @mouseover="mouseOver"
    @mouseleave="mouseLeave"    
  >
    <div 
      class="flex items-center hover:cursor-pointer"
      @click="clickTask"
    >
      <div class="flex items-center w-[30px] h-[30px] mr-1">
        <span 
          ref="completeIcon"
          v-if="completeVisible || task?.completed "
          class="material-icons-round !text-3xl text-green-400 hover:text-green-600"              
        >
          done
        </span> 
      </div>                    
      <span
        :class="{'line-through': task.completed}"        
      >
        {{ task.text }}
      </span>
    </div> 
    <div class="flex items-center w-[30px] h-[30px] mr-1">
      <span  
        ref="deleteIcon"
        v-if="deleteVisible"
        class="material-icons-outlined !text-3xl ml-1 text-red-400 hover:text-red-600 hover:cursor-pointer"
        @click="deleteTask"
      >
        delete
      </span> 
    </div>    
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
      if (this.isMobile()) return
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
      if (!this.$refs.deleteIcon.classList.contains('!visible')) return
      this.$emit('delete', this.task.id)
    },
    isMobile () {
      return /Android|iPhone/i.test(navigator.userAgent)
    },
    clickTask () {
      if (this.isMobile()) {
        this.completeVisible = !this.completeVisible
        this.deleteVisible = !this.deleteVisible
        return
      }

      this.completeTask()
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
