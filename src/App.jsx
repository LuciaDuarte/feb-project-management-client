import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import EditProject from './pages/EditProject';
import ProjectDetails from './pages/ProjectDetails';
import { useContext } from 'react';
import { ThemeContext } from './context/theme.context';
import Signup from './pages/Signup';
import Login from './pages/Login';
import IsPrivate from './components/IsPrivate';
import IsAnon from './components/IsAnon';
import Error from './pages/Error';

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`App ${theme}`}>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/projects'
          element={
            <IsPrivate>
              <Projects />
            </IsPrivate>
          }
        />
        <Route
          path='/projects/edit/:id'
          element={
            <IsPrivate>
              <EditProject />
            </IsPrivate>
          }
        />
        <Route
          path='/projects/:id'
          element={
            <IsPrivate>
              <ProjectDetails />
            </IsPrivate>
          }
        />
        <Route
          path='/signup'
          element={
            <IsAnon>
              <Signup />
            </IsAnon>
          }
        />
        <Route
          path='/login'
          element={
            <IsAnon>
              <Login />
            </IsAnon>
          }
        />
        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
