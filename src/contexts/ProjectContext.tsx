import React, { createContext, useState, ReactNode } from 'react';
import { Project } from '../services/ProjectService'; 

interface ProjectContextType {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  addProject: (project: Project) => void;
}

export const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);

  const addProject = (project: Project) => {
    setProjects(prevProjects => [...prevProjects, project]);
  };

  return (
    <ProjectContext.Provider value={{ projects, setProjects, addProject }}>
      {children}
    </ProjectContext.Provider>
  );
};
