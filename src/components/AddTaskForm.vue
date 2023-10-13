<template>
  <div 
    class="px-[10px] sm:w-[550px] w-full"
    :class="{'hidden': !visible}"
  >
    <div class="border-2 border-blue-700 rounded-xl mb-5 p-3 pt-1 pb-5">
      <div class="flex !justify-end mb-3" @click="close">
        <span class="material-icons-round !text-3xl ml-1 text-blue-600 hover:text-blue-400 hover:cursor-pointer">cancel</span>  
      </div>        
      <input 
        class="border-2 border-blue-600 outline-0 rounded-full w-full mb-5 px-2 py-[7px] dark:text-white bg-slate-200 dark:bg-slate-800"
        v-model="taskText"
      > 
      <div class="flex justify-center">
        <AddTaskButton @click="addTask" /> 
      </div>            
    </div>
  </div> 
</template>

<script lang="ts">
import AddTaskButton from './AddTaskButton.vue'
import { type PropType, defineComponent } from 'vue'

interface State {
  taskText: string
}

export default defineComponent({ 
  components: {
    AddTaskButton
  },
  props: {
    visible: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  data () : State {
    return {
      taskText: ''
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    addTask () {
      if (this.taskText === '') return
      this.$emit('addTask', this.taskText)
      this.taskText = ''
    }
  },
  emits: {
    close: () => true,
    addTask: (text: string) => text
  }
})
</script>

<style scoped>
</style>
