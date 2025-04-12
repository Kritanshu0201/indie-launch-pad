
import { Project, ProjectStatus } from "@/types";
import { v4 as uuidv4 } from "uuid";

// Generate a random date within the past 30 days
const getRandomPastDate = (): string => {
  const now = new Date();
  const pastDate = new Date(now.getTime() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000);
  return pastDate.toISOString();
};

// Generate a random future date within the next 14 days
const getRandomFutureDate = (): string => {
  const now = new Date();
  const futureDate = new Date(now.getTime() + Math.floor(Math.random() * 14) * 24 * 60 * 60 * 1000);
  return futureDate.toISOString();
};

// Tech stack options
const techOptions = [
  "React", "Next.js", "Vue.js", "Angular", "Svelte", 
  "TypeScript", "JavaScript", "Python", "Go", "Rust", "Node.js",
  "Express", "NestJS", "Django", "Flask", "FastAPI",
  "PostgreSQL", "MySQL", "MongoDB", "Firebase", "Supabase",
  "TailwindCSS", "Styled Components", "SASS", "CSS Modules",
  "Redux", "MobX", "Recoil", "Zustand", "Context API",
  "Jest", "Playwright", "Cypress", "Testing Library",
  "Docker", "Kubernetes", "AWS", "Vercel", "Netlify"
];

// Get random items from array
const getRandomItems = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Generate mock projects
export const generateMockProjects = (count: number = 6): Project[] => {
  const statuses: ProjectStatus[] = ["planning", "active", "onhold", "completed", "canceled"];
  
  return Array.from({ length: count }, (_, i) => {
    const createdAt = getRandomPastDate();
    const updatedAt = new Date(new Date(createdAt).getTime() + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000).toISOString();
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    // Generate between 1-5 tasks for each project
    const taskCount = Math.floor(Math.random() * 5) + 1;
    
    return {
      id: uuidv4(),
      title: `Project ${i + 1}`,
      description: `This is a description for Project ${i + 1}. It's a ${status} project with various features and goals.`,
      status,
      githubUrl: Math.random() > 0.3 ? `https://github.com/username/project-${i + 1}` : undefined,
      liveUrl: Math.random() > 0.6 ? `https://project${i + 1}.example.com` : undefined,
      techStack: getRandomItems(techOptions, Math.floor(Math.random() * 5) + 2),
      tasks: Array.from({ length: taskCount }, (_, j) => ({
        id: uuidv4(),
        title: `Task ${j + 1} for Project ${i + 1}`,
        completed: Math.random() > 0.5,
        dueDate: Math.random() > 0.3 ? getRandomFutureDate() : undefined,
        createdAt: createdAt,
      })),
      createdAt,
      updatedAt,
    };
  });
};

// Create mock projects
export const mockProjects = generateMockProjects(8);
