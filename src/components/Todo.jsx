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
       <div className="todo__items">
         <div className="todo__form">
            <input 
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Введите задачу"
            />
                <button onClick={handleAddTodo}>Добавить</button>
        </div>        
        <div className="filter_btn">
                <button onClick={()=>handleFilterTodo('all')}>все</button>
                <button onClick={()=>handleFilterTodo('completed')}>выполненые</button>
                <button onClick={()=>handleFilterTodo('not completed')} >не выполненые</button>
            </div>
        <ul>
            {todos.map((todo) => ( 
                <li key={todo.id}>
                    {todo.status ? <span className='done'>выполнено</span> : <span className='no-done'>не выполнено</span>}
                    <h4>{todo.text}</h4>
                    {todo.status == false && <button onClick={() => handleToggleTodo(todo.id)}>Выполнить</button>}
                    <button className='removeBtn' onClick={() => handleRemoveTodo(todo.id)}>&#x2715;</button>
                    
                </li>
            ))}
        </ul>
       </div>
     );
}
 
export default Todo;