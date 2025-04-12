
export type ProjectStatus = "planning" | "active" | "onhold" | "completed" | "canceled";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string; // ISO date string
  createdAt: string; // ISO date string
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  githubUrl?: string;
  liveUrl?: string;
  techStack: string[];  // Array of technology tags
  tasks: Task[];
  createdAt: string;  // ISO date string
  updatedAt: string;  // ISO date string
}
