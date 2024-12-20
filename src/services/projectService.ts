import axios from '../utils/api';

export interface Project{
  id:string;
  email:string;
  projectname:string,
  description: string;
  startDate: string;
  endDate: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface TaskType {
  id: string;
  title: string;
  description: string;
  storyPoint: Date;
  startDate: string;
  endDate: string;
  status: string;
}



export const fetchProjects = async (): Promise<Project[]> => {
    try {
      const response = await axios.get('/projects/allproject');
      const {data} =response.data;
      console.log(response.data)
      return data as Project[];
    } catch (error) {
      console.error('Failed to fetch projects', error);
      throw error;
    }
  };


export const addProject = async (project: Project): Promise<void> => {
    try {
      await axios.post('/projects/create', project);
    } catch (error) {
      console.error('Failed to add project', error);
      throw error;
    }
};

export const fetchProjectById = async (projectId: string) => {
  try {
    const response = await axios.get(`/projects/${projectId}`);
    const {data} =response.data;
      return data;
  } catch (error) {
    console.error('Failed to fetch project', error);
    throw error;
  }
};


export const deleteProject = async (projectId: string): Promise<void> => {
    try{
      return axios.delete(`projects/${projectId}`)
    }catch(error){
      console.log('Failed to delete project',error)
    }
};