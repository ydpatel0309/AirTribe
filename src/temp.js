import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Column from './Column.js';

const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, content: 'Task 1', status: 'todo' },
    { id: 2, content: 'Task 2', status: 'todo' },
    { id: 3, content: 'Task 3', status: 'in-progress' },
    { id: 4, content: 'Task 4', status: 'completed' },
  ]);

  const addTask = () => {
    // Take user input for task content
    const taskContent = window.prompt("Enter task content:");
  
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

  return (
    <div>
      <h1>Todo App</h1>
      <div>
        <button onClick={addTask}>Add New Task</button>
      </div>

      <DndProvider backend={HTML5Backend}>
        <div style={{ display: 'flex' }}>
          <Column
            status="todo"
            tasks={tasks}
            moveTask={moveTask}
            onTaskContentChange={handleTaskContentChange}
          />
          <Column
            status="in-progress"
            tasks={tasks}
            moveTask={moveTask}
            onTaskContentChange={handleTaskContentChange}
          />
          <Column
            status="completed"
            tasks={tasks}
            moveTask={moveTask}
            onTaskContentChange={handleTaskContentChange}
          />
        </div>
      </DndProvider>
    </div>
  );
};

export default App;
s