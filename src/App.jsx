import React, { useState } from 'react';
import './App.css';
//Other import keep here::

function App() {
  const [value, setValue] = useState('');
  const [todos, setTodos] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [currentTodoIndex, setCurrentTodoIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleTodo = (newTodo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      handleTodo(value);
      setValue('');
    }
  };

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };
  
  const filterTodo = (passIndex) => {
    setTodos((prevTodos) => prevTodos.filter((_, index) => index !== passIndex));
  };

  const editTodo = (index) => {
    setIsEditing(true);
    setCurrentTodoIndex(index);
    setEditValue(todos[index]);
  };

  const saveTodo = (index) => {
    const updatedTodos = todos.map((todo, idx) => (idx === index ? editValue : todo));
    setTodos(updatedTodos);
    setIsEditing(false);
    setCurrentTodoIndex(null);
    setEditValue('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Write Todo..."
          aria-label="Todo input"
          style={{ padding: '12px', borderRadius: '11px', marginRight: '5px' }}
        />
        <button type="submit" style={{ padding: '12px', borderRadius: '11px' }}>
          Add Todo
        </button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left' }}>
        {todos.map((todo, index) => (
          <li key={index} style={{ marginBottom: '10px' }}>
            {isEditing && currentTodoIndex === index ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={handleEditChange}
                  style={{ padding: '8px', borderRadius: '5px', marginRight: '5px' }}
                />
                <button onClick={() => saveTodo(index)} style={{ padding: '8px', borderRadius: '5px' }}>
                  Save
                </button>
              </>
            ) : (
              <>
                {todo} {' '}
                <button onClick={() => editTodo(index)} style={{ padding: '8px', borderRadius: '5px', marginRight: '5px' }}>
                  Edit
                </button>
                <button onClick={() => filterTodo(index)} style={{ padding: '8px', borderRadius: '5px' }}>
                  Remove
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
