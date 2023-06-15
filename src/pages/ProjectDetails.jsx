import { useState, useEffect } from 'react';
import { getProject } from '../api/projects.api';
import { useParams, Link } from 'react-router-dom';
import AddTask from '../components/AddTask';

const ProjectDetails = () => {
  const [project, setProject] = useState(null);
  const { id } = useParams();

  const fetchProject = async projectId => {
    try {
      const response = await getProject(projectId);
      setProject(response.data);
    } catch (error) {
      console.log('Error fetching project', error);
    }
  };

  useEffect(() => {
    fetchProject(id);
  }, [id]);

  return (
    <div className='ProjectDetails'>
      {project && (
        <>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
        </>
      )}

      <AddTask refreshProject={fetchProject} projectId={id} />

      {project &&
        project.tasks.map(task => (
          <li className='TaskCard card' key={task._id}>
            <h3>{task.title}</h3>
            <h4>Description:</h4>
            <p>{task.description}</p>
          </li>
        ))}

      <Link to='/projects'>
        <button>Back to projects</button>
      </Link>

      <Link to={`/projects/edit/${id}`}>
        <button>Edit Project</button>
      </Link>
    </div>
  );
};

export default ProjectDetails;
