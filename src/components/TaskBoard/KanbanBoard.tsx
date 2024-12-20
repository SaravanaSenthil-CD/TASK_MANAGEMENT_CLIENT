import React, { useState, useCallback, useEffect } from 'react';
import { Box } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AddTaskModal from './AddTaskModal';
import { createTask, CreateTaskDto, deleteTask, fetchTasksbyproject, Task, updateTaskStatus } from '../../services/TaskService';
import { Column } from '../TaskBoard/Column';

interface ColumnType {
  id: string;
  projectname: string;
  tasks: Task[];
}

interface KanbanBoardProps {
  project: {
    id: string;
    projectname: string;
    tasks: Task[];
  };
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ project }) => {
  const initializeColumns = useCallback(async () => {
    try {
      const response = await fetchTasksbyproject(project.id);
    console.log('API Response:', response); 
    const tasksArray = Array.isArray(response) ? response : [];
    console.log('Tasks Array:', tasksArray);
      const columnsData: ColumnType[] = [
        {
            id: 'TODO',
            projectname: 'TODO',
            tasks: tasksArray.filter(task => task.status === 'TODO'),
        },
        {
            id: 'INPROGRESS',
            projectname: 'IN PROGRESS',
            tasks: tasksArray.filter(task => task.status === 'INPROGRESS'),
        },
        {
            id: 'INREVIEW',
            projectname: 'IN REVIEW',
            tasks: tasksArray.filter(task => task.status === 'INREVIEW'),
        },
        {
            id: 'COMPLETED',
            projectname: 'DONE',
            tasks: tasksArray.filter(task => task.status === 'COMPLETED'),
        },
    
      ];

      setColumns(columnsData);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  }, [project.id]);

  useEffect(() => {
    initializeColumns();
  }, [initializeColumns]);

  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentColumnId, setCurrentColumnId] = useState<string | null>(null);

  const handleDragEnd = async (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const startColumn = columns.find(column => column.id === source.droppableId);
    const endColumn = columns.find(column => column.id === destination.droppableId);

    if (!startColumn || !endColumn) {
      return;
    }

    const task = startColumn.tasks.find(task => task.id === draggableId);
    if (!task) {
      return;
    }

    const updatedTask = {
      ...task,
      status: destination.droppableId,
    };

    try {
      await updateTaskStatus(task.id, { ...updatedTask });
      
      const updatedColumns = columns.map(column => {
        if (column.id === source.droppableId) {
          return { ...column, tasks: column.tasks.filter(task => task.id !== draggableId) };
        }
        if (column.id === destination.droppableId) {
          return { ...column, tasks: [...column.tasks, updatedTask] };
        }
        return column;
      });

      setColumns(updatedColumns);
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  const handleAddTask = (columnId: string) => {
    setCurrentColumnId(columnId);
    setIsModalOpen(true);
  };
  const handleSaveTask = async (title: string, description: string) => {
    if (currentColumnId) {
      const newTask: CreateTaskDto = {
        projectId: project.id,
        projectname: project.projectname,
        title,
        description,
        storyPoints: 0,
        startDate: new Date(),
        endDate: new Date(),
        status: currentColumnId,
      };
  
      try {
        const savedTask = await createTask(newTask);

        if (savedTask && 'id' in savedTask) {
          const updatedColumns = columns.map((column) =>
            column.id === currentColumnId
              ? { ...column, tasks: [...column.tasks, savedTask] }
              : column
          );
          setColumns(updatedColumns);
        } else {
          console.error('Saved task is not valid:', savedTask);
        }
      } catch (error) {
        console.error('Failed to save task:', error);
      }
      setIsModalOpen(false);
      
    }
  };
  
  
  

  const handleEditTask = (taskId: string) => {
  
  };

  const handleDeleteTask = async(taskId: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteTask(taskId);
      
      } catch (error) {
        console.error('Failed to delete project', error);
      }
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{ display: 'flex', gap: 2, overflowX: 'auto' }}
          >
            {columns.map((column, index) => (
              <Draggable draggableId={column.id} index={index} key={column.id}>
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    sx={{ flex: '1 0 auto', minWidth: 300 }}
                  >
                    <Column
                      columnId={column.id}
                      columnTitle={column.projectname
                      }
                      tasks={column.tasks}
                      onAddTask={handleAddTask}
                      onEditTask={handleEditTask}
                      onDeleteTask={handleDeleteTask}
                    />
                  </Box>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
      <AddTaskModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
      />
    </DragDropContext>
  );
};

export default KanbanBoard;
