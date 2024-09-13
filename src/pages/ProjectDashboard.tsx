import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import KanbanBoard from '../components/TaskBoard/KanbanBoard';
import { fetchProjectById } from '../services/ProjectService';
import { Task } from '../services/TaskService';

const ProjectDashboard: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<{ id: string; projectname: string;
    description:string;
     tasks: Task[] } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (projectId) {
        try {
          const projectData = await fetchProjectById(projectId);
          setProject(projectData);
          console.log(projectData);
        } catch (error) {
          console.error('Failed to load project details', error);
        }
      }
    };

    fetchData();
    console.log(projectId);
  }, [projectId]);

  if (!project) {
    return <Typography>Loading...</Typography>;
  }

  const filteredTasks = (project.tasks || []).filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#f9f9f9', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ mb: 3 ,fontWeight: 'bolder'}}>
        {project.projectname
        } Dashboard 
      </Typography>
      <Typography variant="h4" sx={{ mb: 3,fontSize:25 }}>
        {project.description} 
      </Typography>
      <TextField
        variant="outlined"
        placeholder="Search Tasks"
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          mb: 3,
          bgcolor: 'white',
          borderRadius: 2,
          boxShadow: 2,
          width:'23%',
        }}
      />
     <KanbanBoard project={{ id: project.id, projectname: project.projectname, tasks: filteredTasks }} />

    </Box>
  );
};

export default ProjectDashboard;
