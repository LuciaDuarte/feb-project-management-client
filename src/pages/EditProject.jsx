import { useState, useEffect } from 'react';
import { updateProject, deleteProject } from '../api/projects.api';
import { useNavigate, useParams } from 'react-router-dom';
import { getProject } from '../api/projects.api';

const EditProject = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await getProject(id);
        setTitle(response.data.title);
        setDescription(response.data.description);
      } catch (error) {
        console.log('Error fetching project', error);
      }
    };

    fetchProject();
  }, [id]);

  const handleTitle = ({ target }) => {
    setTitle(target.value);
  };

  const handleDescription = ({ target }) => {
    setDescription(target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const updatedProject = { title, description, _id: id };

    try {
      await updateProject(updatedProject);
      navigate(`/projects/${id}`);
    } catch (error) {
      console.log('Error updating a new project', error);
    }

    setTitle('');
    setDescription('');
  };

  const handleDelete = async () => {
    try {
      await deleteProject(id);
      navigate(`/projects`);
    } catch (error) {
      console.log('Error deleting the project', error);
    }
  };

  return (
    <div className='EditProjectPage'>
      <h2>Edit Project</h2>

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type='text' name='title' value={title} onChange={handleTitle} />
        <label>Description:</label>
        <textarea
          name='description'
          value={description}
          cols='10'
          rows='10'
          onChange={handleDescription}
        />
        <button type='submit'>Update project</button>
      </form>

      <button onClick={handleDelete}>Delete Project</button>
    </div>
  );
};

export default EditProject;
