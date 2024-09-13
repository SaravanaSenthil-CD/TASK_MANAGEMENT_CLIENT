import React, { useState} from 'react';
import { CssBaseline, Box } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../src/components/Navbar/Navbar';
import Sidebar from '../src/components/Sidebar/SideBar';
import { ProjectProvider } from '../src/contexts/ProjectContext';
import ProjectDashboard from './pages/ProjectDashboard';
import HomePage from './pages/Home';
import SignIn from './components/User/SignIn';
import SignUp from './components/User/SignUp';

const App: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <ProjectProvider>
      <CssBaseline />
      <Router>
        <Navbar toggleSidebar={toggleSidebar} />
        <Box sx={{ display: 'flex' }}>
          <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
          <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Routes>
             <Route path="/" element={<SignIn />} />
             <Route path="/signup" element={<SignUp />} />
              <Route path="/project" element={<HomePage 
              isOpen={isSidebarOpen} 
              onClose={() => setSidebarOpen(false)} toggleSidebar={toggleSidebar}
               />} />
              <Route path="/project/:projectId" element={<ProjectDashboard />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ProjectProvider>
  );
};

export default App;
