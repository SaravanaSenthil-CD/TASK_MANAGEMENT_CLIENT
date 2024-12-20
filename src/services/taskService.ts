import axios from '../utils/api';

export interface Task {
  id: string;
  projectname: string;
  title: string;
  description: string;
  storyPoints: number;
  startDate: string;
  endDate?: string;
  status: 'TODO' | 'INPROGRESS' | 'INREVIEW' | 'COMPLETED';
  projectId:string;
}


export interface CreateTaskDto {
  projectId: string;
  projectname: string;
  title: string;
  description?: string;
  storyPoints: number;
  startDate: Date;
  endDate?: Date;
  status: string;
}

export const createTask = async (task: CreateTaskDto): Promise<Task> => {
  try {
    const response = await axios.post('/tasks/create', task);
    return response.data;
  } catch (error) {
    console.error('Failed to add task', error);
    throw error;
  }
};


export const fetchTasksbyproject = async (projectId:string): Promise<Task[]> => {
  try {
    const response = await axios.get(`/tasks/project/${projectId}`);
    const {data} =response.data;
    console.log(response.data)
      return data as Task[];
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const updateTaskStatus = async (taskId: string, updateData: { status: string }) => {
  try {
    const response = await axios.put(`/tasks/update/${taskId}`, updateData);
    return response.data;
  } catch (error) {
    console.error('Error updating task status:', error);
    throw error;
  }
};

export const deleteTask = async (id: string): Promise<void> => {
  try{
    return axios.delete(`tasks/delete/${id}`)
  }catch(error){
    console.log('Failed to delete project',error)
  }
};
