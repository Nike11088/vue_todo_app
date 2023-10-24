<template>
  <div
    ref="maintask"
    class="task-item relative mb-2 mr-[2px] flex cursor-pointer items-center justify-between rounded-xl border-2 border-blue-700 px-2 py-1 text-black dark:text-white"
    :draggable="true"
    @mouseenter="mouseEnter"
    @mouseleave="mouseLeave"
    @mousedown="mouseDown($event)"
    @mouseup="mouseUp($event)"
    @mousemove="mouseMove($event)"
    @touchstart="touchStart($event)"
    @touchmove="touchMove($event)"
    @touchend="touchEnd($event)"
    @click="clickTask"
  >
    <div class="flex items-center">
      <div class="mr-1 flex h-[30px] w-[30px] items-center">
        <span
          v-if="task?.completed"
          class="material-icons-round cursor-pointer !text-3xl text-green-400"
        >
          done
        </span>
      </div>
      <span
        class="cursor-pointer"
        :class="{ 'line-through': task.completed }"
      >
        {{ task.text }}
      </span>
    </div>
    <div class="mr-1 flex h-[30px] w-[30px] items-center">
      <span
        v-if="selected"
        class="material-icons-outlined ml-1 cursor-pointer !text-3xl text-red-600 hover:text-red-400"
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
  },
  setup({ task }, { emit }) {
    const mouseEnter = () => emit('taskMouseEnter', task.id)
    const mouseLeave = () => emit('taskMouseLeave', task.id)
    const mouseDown = (event: MouseEvent) => emit('taskMouseDown', { id: task.id, clientX: event.clientX })
    const mouseUp = (event: MouseEvent) => emit('taskMouseUp', { id: task.id, clientX: event.clientX })
    const mouseMove = (event: MouseEvent) => emit('taskMouseMove', { id: task.id, clientX: event.clientX })
    const touchStart = (event: TouchEvent) => emit('taskTouchStart', { id: task.id, event })
    const touchMove = (event: TouchEvent) => emit('taskTouchMove', { id: task.id, event })
    const touchEnd = (event: TouchEvent) => {}
    const completeTask = () => emit('complete', task.id)
    const deleteTask = () => emit('delete', task.id)
    const clickTask = () => emit('clickTask', task.id)

    return {
      mouseEnter,
      mouseLeave,
      mouseDown,
      mouseUp,
      mouseMove,
      touchStart,
      touchMove,
      touchEnd,
      completeTask,
      deleteTask,
      clickTask
    }
  }
})
</script>

<style scoped></style>
