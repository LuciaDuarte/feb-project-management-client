import { useState } from 'react';
import { addTask } from '../api/projects.api';

const AddTask = ({ projectId, refreshProject }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      projectId
    };

    await addTask(newTask);

    // clear inputs
    setTitle('');
    setDescription('');

    refreshProject(projectId);
  };

  const handleTitle = e => {
    setTitle(e.target.value);
  };

  const handleDescription = e => {
    setDescription(e.target.value);
  };

  return (
    <div className='AddTask'>
      <h3>Add New Task</h3>

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type='text' name='title' value={title} onChange={handleTitle} />

        <label>Description:</label>
        <textarea
          type='text'
          name='description'
          value={description}
          onChange={handleDescription}
        />

        <button type='submit'>Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;
