import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import {Column} from '../components/TaskBoard/Column';
import AddIcon from '@mui/icons-material/Add';
import { Task } from '../services/TaskService';

// interface Task {
//     id: string;
//     title: string;
//     description: string;
//     storyPoint: string;
//     startDate: string;
//     endDate: string;
//     status: string;
// }


interface HomePageProps {
    isOpen: boolean;
    onClose: () => void;
    toggleSidebar: () => void;
}

interface TasksState {
    [key: string]: Task[];
}

const initialTasks: TasksState = {
    TODO: [],
    IN_PROGRESS: [],
    IN_REVIEW: [],
    DONE: [],
};



const HomePage: React.FC<HomePageProps> = ({ toggleSidebar }) => {
    const [tasks, setTasks] = useState(initialTasks);

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        const sourceColumn = tasks[source.droppableId];
        const destinationColumn = tasks[destination.droppableId];
        const [movedTask] = sourceColumn.splice(source.index, 1);
        destinationColumn.splice(destination.index, 0, movedTask);

        setTasks({
            ...tasks,
            [source.droppableId]: sourceColumn,
            [destination.droppableId]: destinationColumn,
        });
    };

    const handleAddTask = (columnId: string) => {
        const newTask: Task = {
            id: String(new Date().getTime()),
            projectname: 'New Task',
            title: 'New Task',
            description: '',
            storyPoints: 2,
            startDate: '',
            endDate: '',
            status: columnId as 'TODO' | 'INPROGRESS' | 'INREVIEW' | 'COMPLETED',
            projectId: ''
        };
        const updatedColumn = [...tasks[columnId], newTask];
        setTasks({ ...tasks, [columnId]: updatedColumn });
    };
    

    const handleEditTask = (taskId: string) => {
        // console.log(`Edit task ${taskId}`);
    };

    const handleDeleteTask = (taskId: string) => {
        const updatedTasks = Object.keys(tasks).reduce((acc, columnId) => {
            acc[columnId] = tasks[columnId].filter((task) => task.id !== taskId);
            return acc;
        }, {} as typeof tasks);
        setTasks(updatedTasks);
    };

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" sx={{ marginTop: 0, marginBottom: 1 }}>
                It always seems impossible until it's done
            </Typography>
            <Typography variant="h6" sx={{ marginBottom: 3 }}>
                Initially, you want to create the project
                <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<AddIcon />}
                    sx={{
                        marginLeft: 3,
                        padding: 0.7,
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                    onClick={toggleSidebar}
                >
                    Click to add project
                </Button>
            </Typography>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="all-columns" direction="horizontal">
                    {(provided) => (
                        <Box
                            sx={{ display: 'flex', justifyContent: 'space-between' }}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {Object.keys(tasks).map((columnId, _index) => (
                                <Column
                                    key={columnId}
                                    columnId={columnId}
                                    columnTitle={columnId.replace('_', ' ')}
                                    tasks={tasks[columnId]}
                                    onAddTask={handleAddTask}
                                    onEditTask={handleEditTask}
                                    onDeleteTask={handleDeleteTask}
                                />
                            ))}
                            {provided.placeholder}
                        </Box>
                    )}
                </Droppable>
            </DragDropContext>
        </Box>
    );
};

export default HomePage;



