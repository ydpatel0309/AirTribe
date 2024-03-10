import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Column from './Column.js';
import './App.css';

const App = () => {
  // Load tasks from local storage on component mount
  const initialTasks = JSON.parse(localStorage.getItem('tasks')) || [
    { id: 1, content: 'Task 1', status: 'todo' },
    { id: 2, content: 'Task 2', status: 'todo' },
    { id: 3, content: 'Task 3', status: 'in-progress' },
    { id: 4, content: 'Task 4', status: 'completed' },
  ];
  const [tasks, setTasks] = useState(initialTasks);

  // Save tasks to local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);  

  const addTask = () => {
    // Take user input for task content
    const taskContent = window.prompt('Enter task content:');

    // Check if the user entered something
    if (taskContent) {
      const newTask = {
        id: tasks.length + 1,
        content: taskContent, 
        status: 'todo',
      };

      setTasks([...tasks, newTask]);
    }
  };


  const moveTask = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  // New function to handle task content editing
  const handleTaskContentChange = (taskId, newContent) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, content: newContent } : task
    );
    setTasks(updatedTasks);
  };

  
  const onDeleteTask = (taskId) => {
    // Implement logic to delete the task with the given taskId
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='outer'>
        <div className='todo_header'>
          <h1>TRIBE-TASK</h1>
        </div>
        <div className='new_task'>
          <button onClick={addTask} id='new_button'>
            Add New Task
          </button>
        </div>

        <div style={{ display: 'flex' ,color:'white'}}>
          <Column
            status="todo"
            tasks={tasks}
            moveTask={moveTask}
            onTaskContentChange={handleTaskContentChange}
            onDeleteTask={onDeleteTask}
            onAddNewTask={addTask}
          />
          <Column
            status="in-progress"
            tasks={tasks}
            moveTask={moveTask}
            onTaskContentChange={handleTaskContentChange}
            onDeleteTask={onDeleteTask}
            onAddNewTask={addTask}
          />
          <Column
            status="completed"
            tasks={tasks}
            moveTask={moveTask}
            onTaskContentChange={handleTaskContentChange}
            onDeleteTask={onDeleteTask}
            onAddNewTask={addTask}
          />
        </div>
      </div>
      
    </DndProvider>
  );
};

export default App;