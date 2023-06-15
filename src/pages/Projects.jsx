import { useState, useEffect } from 'react';
import { getAllProjects } from '../api/projects.api';
import { Link } from 'react-router-dom';
import AddProject from '../components/AddProject';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await getAllProjects();
      setProjects(response.data);
    } catch (error) {
      console.log('Error fetching the list of projects', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []); // empty array so it only runs once

  return (
    <div>
      <h1>Projects</h1>
      <AddProject refreshList={fetchProjects} />
      {projects.map(project => {
        return (
          <div key={project._id} className='ProjectCard card'>
            <h2>{project.title}</h2>
            {project.imgUrl && <img src={project.imgUrl} alt='' width={50} />}
            <Link to={`/projects/${project._id}`}>See details</Link>
          </div>
        );
      })}
    </div>
  );
};

export default Projects;
