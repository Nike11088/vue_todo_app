<template>
  <!-- <Header /> -->
  <div class="container" >
    <div class="add-todo-container">
      <input 
        v-model="newTodo" 
        type="text" 
        class="add-todo-input"
      >
      <button class="add-btn" @click="addTodo">Добавить</button>
    </div>
    <div class="filter-container">
      <button class="filter-btn" @click="() => changeFilter('all')">Все</button>
      <button class="filter-btn" @click="() => changeFilter('active')">Активные</button>
      <button class="filter-btn" @click="() => changeFilter('completed')">Завершённые</button>
    </div>  
    <div class="list-container">
      <ul v-for="todo in filteredTodos">
        <li :key="todo.id">
          <div class="todo-item">
            <div 
              :class="{'completed': todo.completed}"
              class="todo-item__text"
            >
              {{ todo.text }}        
            </div>
            <div class="todo-item__buttons">
              <button v-if="!todo.completed" @click="() => completeTodo(todo.id)">Завершить</button>
              <button v-else @click="() => startTodo(todo.id)">Возобновить</button>
              <button @click="() => deleteTodo(todo.id)">Удалить</button>
            </div>           
          </div>        
        </li>
      </ul>
    </div>   
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  },
  data() {
    return {
      newTodo: '',
      todos: [],
      filter: 'all',
      localStorageTodosItemName: 'vue-todos-app__todos'
    }
  },
  mounted () {
    let todos = localStorage.getItem(this.localStorageTodosItemName)
    if (todos) {
      this.todos = JSON.parse(todos)
    }
  },  
  methods: {
    addTodo () {
      this.newTodo = this.newTodo.trim()
      if (this.newTodo !== '') {
        this.todos = [...this.todos, { id: Date.now(), text: this.newTodo, completed: false }]     
      }
      this.newTodo = ''        
    },
    changeFilter (filter) {
      this.filter = filter
    },
    completeTodo (id) {
      const todo = this.todos.find(t => t.id === id)
      todo.completed = true 
      this.todos = [...this.todos]    
    },
    deleteTodo (id) {
      this.todos = this.todos.filter(t => t.id !== id)
    },
    startTodo (id) {
      const todo = this.todos.find(t => t.id === id)
      todo.completed = false 
      this.todos = [...this.todos]   
    }
  },
  watch: {
    todos () {
      console.warn('watch')
      localStorage.setItem(this.localStorageTodosItemName, JSON.stringify(this.todos)) 
    }
  },
  computed: {
    filteredTodos () {
      if (this.filter === 'all') return this.todos
      if (this.filter === 'active') return this.todos.filter(t => !t.completed)
      if (this.filter === 'completed') return this.todos.filter(t => t.completed)
    }
  }
};
</script>

<style>
* {  
  margin: 0;
  box-sizing: border-box;
  list-style-type: none;
  font-family: "Roboto", "-apple-system", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14pt;
}
ul, li {
  padding: 0;
}
.container {
  width: 600px;
  margin: auto;
  padding: 20px;
}
.add-todo-input {
  width: 100%;
  padding: 5px;
  margin-right: 10px;
}
.add-btn {
  width: 128px;
}
.add-todo-container {
  display: flex;  
}
.filter-container {
  margin-top: 20px;
  display: flex; 
  justify-content: center;
}
.filter-btn {
  margin-right: 5px;
}
.list-container {
  margin-top: 20px;
  height: calc(100vh - 194px);
  overflow-y: auto;
}
.todo-item {
  display: flex;  
  padding: 5px 0;
  justify-content: space-between;
}
.todo-item__text {
  width: 250px;
  text-wrap: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.todo-item__text.completed {
  text-decoration: line-through;
}
.todo-item__buttons button {
  width: 128px;
  margin-left: 5px;
}
</style>

