import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import TaskTracker from './task-tracker';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TaskTracker />
  </React.StrictMode>
);

