import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, removeTodo, filterTodo, toggleTodo,selectFilteredTasks} from '../features/todoSlice';


const Todo = () => {
    const [inputValue, setInputValue] = useState('')
    const dispatch = useDispatch();
    const todos = useSelector(selectFilteredTasks);
    const handleAddTodo = () =>{
        if(inputValue.trim()){
            dispatch(addTodo({id: Date.now(), text: inputValue, status: false}))
            setInputValue('')
        }
    }
    const handleRemoveTodo = (id)=>{
        dispatch(removeTodo(id))
    }
    const handleToggleTodo = (id) =>{
        dispatch(toggleTodo(id))
    }
    const handleFilterTodo = (filt) =>{
        dispatch(filterTodo(filt))
    }
    return ( 
       <div className="">
         <div className="todo">
            <input 
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Введите задачу"
            />
                <button onClick={handleAddTodo}>Добавить</button>
        </div>
        <ul>
            <button onClick={()=>handleFilterTodo('all')}>все</button>
            <button onClick={()=>handleFilterTodo('completed')}>выполненые</button>
            <button onClick={()=>handleFilterTodo('not completed')} >не выполненые</button>
            {todos.map((todo) => ( 
                <li key={todo.id} className={todo.status ? 'done' : 'no-done'}>
                    {todo.text}
                    {todo.status ? <span>&#x2713;</span> :<button onClick={() => handleToggleTodo(todo.id)}>Выполнить</button>}
                    <button onClick={() => handleRemoveTodo(todo.id)}>&#x2715;</button>
                </li>
            ))}
        </ul>
       </div>
     );
}
 
export default Todo;