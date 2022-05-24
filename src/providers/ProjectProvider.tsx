import React, {ReactElement, useEffect, useState} from 'react';
import {Project, useGetProjects} from '../api/projectApi';

interface ContextType {
  projects: Project[] | null;
  updateProjects: () => void;
}

export const ProjectContext = React.createContext({} as ContextType);

interface Props {
  children: React.ReactNode;
}

export const ProjectProvider = ({children}: Props): ReactElement => {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [updateProjects, projectsResponse] = useGetProjects();
  useEffect(() => {
    if (projectsResponse) {
      setProjects(projectsResponse);
    }
  }, [projectsResponse]);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        updateProjects,
      }}>
      {children}
    </ProjectContext.Provider>
  );
};
