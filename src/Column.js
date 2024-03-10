import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import './Column.css';

const ItemTypes = {
  TASK: 'task',
};

const Task = ({ task, moveTask, onTaskContentChange, onDeleteTask }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TASK,
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const handleEditClick = () => {
    const newContent = window.prompt('Edit task content:', task.content);
    if (newContent !== null) {
      onTaskContentChange(task.id, newContent);
    }
  };

  const handleDeleteClick = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');
    if (confirmDelete) {
      onDeleteTask(task.id);
    }
  };

  return (
    <div
      className='todo'
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        border: '1px solid white',
        padding: '8px',
        marginBottom: '4px',
        backgroundColor: 'transparent',
      }}
    >
      <div className="content">
        {task.content}
        
      </div>
      <div className='btn'>
        <button onClick={handleEditClick} id="edit">Edit</button>
        <button onClick={handleDeleteClick} id="delete">Delete</button>
      </div>
    </div>
  );
};

const Column = ({ status, tasks, moveTask, onTaskContentChange, onDeleteTask, onAddNewTask }) => {
  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: (item) => moveTask(item.id, status),
  });

  const columnTasks = tasks.filter((task) => task.status === status);
  const cardCount = columnTasks.length;

  const handleAddNewTask = () => {
    const newContent = window.prompt('Enter task content:');
    if (newContent !== null && newContent.trim() !== '') {
      onAddNewTask(newContent, status);
    }
  };

  return (
    <div ref={drop} className='col_in'>
      <h2>
        {status.charAt(0).toUpperCase() + status.slice(1)} ({cardCount} cards)
      </h2>
      {/* <button onClick={handleAddNewTask}>Add New Task</button> */}
      {columnTasks.map((task) => (
        <Task
        
          key={task.id}
          task={task}
          moveTask={moveTask}
          onTaskContentChange={onTaskContentChange}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
};

export default Column;
