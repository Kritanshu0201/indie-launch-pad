
import * as React from "react";
import { Project, Task } from "@/types";
import { mockProjects } from "@/data/mockData";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";

interface ProjectContextType {
  projects: Project[];
  getProject: (id: string) => Project | undefined;
  addProject: (project: Omit<Project, "id" | "createdAt" | "updatedAt">) => void;
  updateProject: (id: string, updates: Partial<Omit<Project, "id" | "createdAt" | "updatedAt">>) => void;
  deleteProject: (id: string) => void;
  addTask: (projectId: string, task: Omit<Task, "id" | "createdAt">) => void;
  updateTask: (projectId: string, taskId: string, updates: Partial<Omit<Task, "id" | "createdAt">>) => void;
  deleteTask: (projectId: string, taskId: string) => void;
  filterProjects: (status?: string) => Project[];
}

const ProjectContext = React.createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = React.useState<Project[]>(mockProjects);
  const { toast } = useToast();

  const getProject = (id: string) => {
    return projects.find(project => project.id === id);
  };

  const addProject = (project: Omit<Project, "id" | "createdAt" | "updatedAt">) => {
    const now = new Date().toISOString();
    const newProject: Project = {
      ...project,
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
    };
    setProjects([...projects, newProject]);
    toast({
      title: "Project created",
      description: `${newProject.title} has been created successfully.`,
    });
  };

  const updateProject = (id: string, updates: Partial<Omit<Project, "id" | "createdAt" | "updatedAt">>) => {
    setProjects(projects.map(project => {
      if (project.id === id) {
        return {
          ...project,
          ...updates,
          updatedAt: new Date().toISOString(),
        };
      }
      return project;
    }));
    toast({
      title: "Project updated",
      description: `Project has been updated successfully.`,
    });
  };

  const deleteProject = (id: string) => {
    const projectToDelete = projects.find(project => project.id === id);
    if (projectToDelete) {
      setProjects(projects.filter(project => project.id !== id));
      toast({
        title: "Project deleted",
        description: `${projectToDelete.title} has been deleted.`,
        variant: "destructive",
      });
    }
  };

  const addTask = (projectId: string, task: Omit<Task, "id" | "createdAt">) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        const newTask: Task = {
          ...task,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
        };
        return {
          ...project,
          tasks: [...project.tasks, newTask],
          updatedAt: new Date().toISOString(),
        };
      }
      return project;
    }));
    toast({
      title: "Task added",
      description: `New task has been added to the project.`,
    });
  };

  const updateTask = (projectId: string, taskId: string, updates: Partial<Omit<Task, "id" | "createdAt">>) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          tasks: project.tasks.map(task => {
            if (task.id === taskId) {
              return {
                ...task,
                ...updates,
              };
            }
            return task;
          }),
          updatedAt: new Date().toISOString(),
        };
      }
      return project;
    }));
  };

  const deleteTask = (projectId: string, taskId: string) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          tasks: project.tasks.filter(task => task.id !== taskId),
          updatedAt: new Date().toISOString(),
        };
      }
      return project;
    }));
    toast({
      title: "Task deleted",
      description: `Task has been removed from the project.`,
    });
  };

  const filterProjects = (status?: string) => {
    if (!status || status === "all") {
      return projects;
    }
    return projects.filter(project => project.status === status);
  };

  return (
    <ProjectContext.Provider value={{
      projects,
      getProject,
      addProject,
      updateProject,
      deleteProject,
      addTask,
      updateTask,
      deleteTask,
      filterProjects,
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = React.useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectProvider");
  }
  return context;
};
