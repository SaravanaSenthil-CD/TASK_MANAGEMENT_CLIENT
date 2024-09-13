import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import AddIcon from '@mui/icons-material/Add';
import { Task } from '../../services/TaskService';

interface ColumnProps {
  columnId: string;
  columnTitle: string;
  tasks: Task[];
  onAddTask: (columnId: string) => void;
  onEditTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export const Column: React.FC<ColumnProps> = ({ columnId, columnTitle, tasks, onAddTask, onEditTask, onDeleteTask }) => {
  return (
    <Droppable droppableId={columnId}>
      {(provided: DroppableProvided) => (
        <Box
          ref={provided.innerRef}
          {...provided.droppableProps}
          sx={{
            p: 2,
            width: 350,
            minHeight: 780,
            bgcolor: '#f4f4f4',
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            marginLeft:'',
            boxShadow: 1
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            {columnTitle}
          </Typography>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            fullWidth
            color="primary"
            onClick={() => onAddTask(columnId)}
            sx={{ mb: 2 }}
          >
            Add Task
          </Button>
          {tasks.map((task, index) => (
            <TaskCard
              key={task.id}
              task={task}
              index={index}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          ))}
          {provided.placeholder}
        </Box>
      )}
    </Droppable>
  );
};
