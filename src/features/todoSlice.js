import { createSlice } from "@reduxjs/toolkit"


const todoSlice = createSlice({
    name: 'todos',
    initialState: {
      todoItems: [],
      filter: 'all',
    },
    reducers:{
        addTodo: (state, action) =>{
            state.todoItems.push(action.payload)
        },
        removeTodo: (state, action) =>{
          const todoId = action.payload
          state.todoItems = state.todoItems.filter(todo => todo.id !== todoId)
        },
        toggleTodo: (state, action) => {
          const todo = state.todoItems.find(todo => todo.id === action.payload);
          if (todo) {
            todo.status = !todo.status;
          }
        },
        filterTodo: (state, action) => {
          state.filter = action.payload;
        }
    }
    
})

export const {addTodo, removeTodo, toggleTodo, filterTodo} = todoSlice.actions
export default todoSlice.reducer

export const selectFilteredTasks = (state) => {
  switch (state.todos.filter) {
    case 'completed':
      return state.todos.todoItems.filter(todo => todo.status === true);
    case 'not completed':
      return state.todos.todoItems.filter(todo => todo.status === false);
    default:
      return state.todos.todoItems;
  }
};