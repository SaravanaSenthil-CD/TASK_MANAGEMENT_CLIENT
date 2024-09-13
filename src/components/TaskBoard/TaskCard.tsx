import React from 'react';
import { Box, Typography, IconButton, Avatar, Card, CardHeader, CardContent } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Draggable } from 'react-beautiful-dnd';
import { Task } from '../../services/TaskService';

interface TaskCardProps {
    task: Task;
    index: number;
    onEdit: (taskId: string) => void;
    onDelete: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index, onEdit, onDelete }) => {
    return (
        <Draggable key={task.id} draggableId={task.id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Card sx={{ minWidth: 275, m: "8px 1px", padding: 2 }}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: "#2C5CC9" }} aria-label="recipe">
                                    {task.title.charAt(0).toUpperCase()}
                                </Avatar>
                            }
                            action={
                                <Box>
                                    <IconButton onClick={() => onEdit(task.id)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => onDelete(task.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            }
                        />
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                                {task.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {task.description}
                            </Typography>
                            <Box sx={{ mt: 2, color: "#333" }}>
                                <Typography variant="subtitle2" sx={{ color: "#666" }}>
                                    Status: {task.status.toUpperCase()}
                                </Typography>
                                
                            </Box>
                        </CardContent>
                    </Card>
                </div>
            )}
        </Draggable>
    );
};

export default TaskCard;
