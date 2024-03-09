// Column.js

import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

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
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        border: '1px solid #000',
        padding: '8px',
        marginBottom: '4px',
        backgroundColor: '#fff',
      }}
    >
      {task.content}
      <div>
        <button onClick={handleEditClick}>Edit</button>
        <button onClick={handleDeleteClick}>Delete</button>
      </div>
    </div>
  );
};

const Column = ({ status, tasks, moveTask, onTaskContentChange, onDeleteTask }) => {
  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: (item) => moveTask(item.id, status),
  });

  const columnTasks = tasks.filter((task) => task.status === status);

  return (
    <div
      ref={drop}
      style={{
        flex: 1,
        padding: '16px',
        margin: '8px',
        border: '1px solid #000',
        borderRadius: '8px',
      }}
    >
      <h2>{status.charAt(0).toUpperCase() + status.slice(1)}</h2>
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