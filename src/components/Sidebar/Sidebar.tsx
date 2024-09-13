import React, { useState, useContext, useEffect } from 'react';
import {
  Drawer, List, ListItem, ListItemText, ListItemIcon, IconButton,
  TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  MenuItem, CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { ProjectContext } from '../../contexts/ProjectContext';
import { fetchProjects, addProject, deleteProject, Project, fetchProjectById } from '../../services/ProjectService';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { projects, setProjects } = useContext(ProjectContext)!;
  const [searchTerm, setSearchTerm] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [newProject, setNewProject] = useState<Project>({
    id: '',
    email:'',
    projectname: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'ACTIVE',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      fetchProjectList();
    }
  }, [isOpen]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAddProject = async () => {
    setLoading(true);
    try {
      await addProject(newProject);
      setNewProject({
        id: '',
        email:'',
        projectname: '',
        description: '',
        startDate: '',
        endDate: '',
        status: 'ACTIVE',
      });
      fetchProjectList();
      setLoading(false);
      handleCloseModal();
    } catch (error) {
      console.error('Failed to add project', error);
    }
  };

  const fetchProjectList = async () => {
    try {
      const projects = await fetchProjects();
      setProjects(projects);
    } catch (error) {
      console.error('Failed to fetch projects', error);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(projectId);
        fetchProjectList();
      } catch (error) {
        console.error('Failed to delete project', error);
      }
    }
  };

  const handleProjectClick =async  (projectId: string) => {
    try {
      const projectData = await fetchProjectById(projectId);
      navigate(`/project/${projectId}`, { state: { project: projectData } });
    } catch (error) {
      console.error('Failed to load project details', error);
    }
  };

  const filteredProjects = projects.filter((project) =>
    project.projectname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 300,
          backgroundColor: '#f5f5f5',
          padding: '16px',
        },
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Search Projects"
        fullWidth
        onChange={handleSearchChange}
        InputProps={{
          endAdornment: <SearchIcon />,
        }}
        sx={{
          marginBottom: '20px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      />
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleOpenModal}
        sx={{
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1976d2',
          '&:hover': {
            backgroundColor: '#1565c0',
          },
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        Add New Project
      </Button>
      <List>
        {filteredProjects.map((project) => (
          <ListItem
            key={project.id} 
            sx={{
              padding: '10px 20px',
              borderRadius: '8px',
              marginBottom: '8px',
              backgroundColor: 'white',
              boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                backgroundColor: '#f0f0f0',
              },
            }}
          >
            <ListItemText
              primary={project.projectname}
              onClick={() => handleProjectClick(project.id)}
              sx={{ cursor: 'pointer', fontWeight: '500', fontSize: '16px' }}
            />
            <ListItemIcon>
              <IconButton onClick={() => handleDeleteProject(project.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle sx={{ fontWeight: 'bold', color: '#1976d2' }}>Add New Project</DialogTitle>
        <DialogContent>
        <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={newProject.email}
            onChange={(e) => setNewProject({ ...newProject, email: e.target.value })}
            sx={{ marginBottom: '12px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}
          />
          <TextField
            label="Project Name"
            fullWidth
            margin="normal"
            value={newProject.projectname}
            onChange={(e) => setNewProject({ ...newProject, projectname: e.target.value })}
            sx={{ marginBottom: '12px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            sx={{ marginBottom: '12px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}
          />
          <TextField
            label="Start Date"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={newProject.startDate}
            onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
            sx={{ marginBottom: '12px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}
          />
          <TextField
            label="End Date"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={newProject.endDate}
            onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
            sx={{ marginBottom: '12px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}
          />
          <TextField
            label="Status"
            select
            fullWidth
            margin="normal"
            value={newProject.status}
            onChange={(e) => setNewProject({ ...newProject })}
            sx={{ marginBottom: '12px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}
          >
            <MenuItem value="ACTIVE">Active</MenuItem>
            <MenuItem value="INACTIVE">Inactive</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddProject} color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Add Project'}
          </Button>
        </DialogActions>
      </Dialog>
    </Drawer>
  );
};

export default Sidebar;