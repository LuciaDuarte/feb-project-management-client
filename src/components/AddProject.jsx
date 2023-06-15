import { useState } from 'react';
import { addProject, upload } from '../api/projects.api';

const AddProject = ({ refreshList }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState();

  const handleTitle = ({ target }) => {
    setTitle(target.value);
  };

  const handleDescription = ({ target }) => {
    setDescription(target.value);
  };

  const handleImage = ({ target }) => {
    // our image is going to be in the files array, first position
    setImage(target.files[0]);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      let newProject = { title, description };

      if (image) {
        // create a new FormData to be able to send images
        // same as encoding type were set to "multipart/form-data".
        const uploadData = new FormData();
        // we add the image to the formData
        uploadData.append('file', image);

        // make a request to our api to send it to Cloudinary
        const response = await upload(uploadData);
        // console.log('response from upload', response.data);

        newProject.imgUrl = response.data.imgUrl;
      }

      await addProject(newProject);
      refreshList();
    } catch (error) {
      console.log('Error adding a new project', error);
    }

    setTitle('');
    setDescription('');
    setImage();
  };

  return (
    <div className='AddProject'>
      <h2>Add Project</h2>

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
        <label>Image</label>
        <input type='file' onChange={handleImage} />
        <button type='submit'>Create project</button>
      </form>
    </div>
  );
};

export default AddProject;
