<template>
  <div
    class="w-full sm:w-[540px]"
    :class="{ hidden: !visible }"
  >
    <div class="rounded-xl border-2 border-blue-700 p-3 pb-5 pt-1">
      <div
        class="mb-3 flex !justify-end"
        @click="close"
      >
        <span class="material-icons-round ml-1 !text-3xl text-blue-600 hover:cursor-pointer hover:text-blue-400"
          >cancel</span
        >
      </div>
      <input
        class="mb-5 w-full rounded-full border-2 border-blue-600 bg-slate-200 px-2 py-[7px] outline-0 dark:bg-slate-800 dark:text-white"
        v-model="taskText"
      />
      <div class="flex justify-center">
        <AddTaskButton @click="addTask" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AddTaskButton from './AddTaskButton.vue'
import { type PropType, defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
    AddTaskButton
  },
  emits: {
    close: () => true,
    addTask: (text: string) => text
  },
  props: {
    visible: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  setup(props, { emit }) {
    const taskText = ref('')

    const addTask = () => {
      if (taskText.value === '') return
      emit('addTask', taskText.value)
      taskText.value = ''
    }

    const close = () => {
      emit('close')
    }

    return {
      taskText,
      addTask,
      close
    }
  }
})
</script>

<style scoped></style>
