import React, { useState } from 'react';
import { FaTrash, FaTimes } from 'react-icons/fa';
import { MdUndo, MdCheckCircle } from 'react-icons/md';
import Toast from 'react-native-toast-message';
import '../css/todolist.css';



const MAX_DESCRIPTION_LENGTH = 50;

interface Task {
    id: number;
    description: string;
    urgencyRank: string;
    isDone: boolean;
  }
  

const ToDoList = () => {
  const [taskDescription, setTaskDescription] = useState('');
  const [urgencyRank, setUrgencyRank] = useState('');
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);


  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= MAX_DESCRIPTION_LENGTH) {
      setTaskDescription(e.target.value);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: `Description cannot exceed ${MAX_DESCRIPTION_LENGTH} characters.`, // Use backticks for template literals
      });
    }
  };
  
  

  const handleUrgencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUrgencyRank(e.target.value);
  };
  

  const addTask = () => {
    if (!taskDescription.trim() || !urgencyRank) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter a task description and select an urgency rank.',
      });
      return;
    }
  
    if (tasks.some((task) => task.description === taskDescription)) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Task with this description already exists.',
      });
      return;
    }
  
    const newTask = {
      id: Date.now(),
      description: taskDescription,
      urgencyRank: urgencyRank,
      isDone: false,
    };
  
    setTasks([...tasks, newTask]);
    setTaskDescription('');
    setUrgencyRank('');
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: `Task "${taskDescription}" added successfully!`,
    });
  };

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, isDone: !task.isDone } : task
      )
    );
    Toast.show({
      type: 'success',
      text1: 'Task Status Updated',
      text2: `Task marked as ${tasks.find((task) => task.id === taskId)?.isDone ? 'pending' : 'completed'}!`,
    });
  };
  

  const openDeleteModal = (task: Task) => {
    setTaskToDelete(task);
    setDeleteModalOpen(true);
  };

  const confirmDeleteTask = () => {
    if (!taskToDelete) return; // Ensure taskToDelete is not null
  
    setTasks(tasks.filter((task) => task.id !== taskToDelete.id));
    setDeleteModalOpen(false);
    Toast.show({
      type: 'success',
      text1: 'Task Deleted',
      text2: `Task "${taskToDelete.description}" deleted successfully!`,
    });
  };
  
  

  return (
    <div className="todo-container">
      <h2 className="section-title">To-Do List</h2>
      {/* Input for Task Description */}
      <input
        type="text"
        placeholder="Enter a task..."
        value={taskDescription}
        onChange={handleTaskChange}
        className="task-input"
      />

      {/* Dropdown for Urgency Rank */}
      <select
        value={urgencyRank}
        onChange={handleUrgencyChange}
        className="urgency-select"
      >
        <option value="">Select Urgency Rank</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <br />
      <button onClick={addTask} className="add-task-btn">
        Add Task
      </button>

      {/* Task List */}
      {tasks.length === 0 ? (
        <p>No tasks yet. Start by adding a task above!</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="task-item"
              style={{
                textDecoration: task.isDone ? 'line-through' : 'none',
                color: 'white',
                backgroundColor:
                  task.urgencyRank === 'High'
                    ? '#FF6961'
                    : task.urgencyRank === 'Medium'
                    ? '#FBC02D'
                    : '#289d8B',
                padding: '10px',
                margin: '5px 0',
                borderRadius: '50px',
                fontSize: '15px',
              }}
            >
              <span>
                {task.description} - ({task.urgencyRank})
              </span>
              <button
                className="toggle-complete-btn"
                onClick={() => toggleTaskCompletion(task.id)}
              >
                {task.isDone ? (
                  <MdUndo style={{ marginTop: '2px', fontSize: '1.5em' }} />
                ) : (
                  <MdCheckCircle style={{ marginTop: '2px', fontSize: '1.5em' }} />
                )}
              </button>
              <button
                className="delete-task-btn"
                onClick={() => openDeleteModal(task)}
              >
                <FaTrash style={{ marginTop: '2px', fontSize: '1.1em' }} />
              </button>
            </li>
          ))}
        </ul>
      )}

      

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && taskToDelete && (
        <div className="d-modal-overlay">
          <div className="d-delete-popup">
            <div className="modal-header">
              <h3>Confirm Delete</h3>
              <button
                className="close-button"
                onClick={() => setDeleteModalOpen(false)}
              >
                <FaTimes />
              </button>
            </div>
            <div className="d-delete-popup-content">
              <p>
                Delete the task <strong>"{taskToDelete?.description}"</strong>?
              </p>
            </div>
            <div className="d-delete-confirmation-actions">
              <button className="d-confirm-button" onClick={confirmDeleteTask}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToDoList;
