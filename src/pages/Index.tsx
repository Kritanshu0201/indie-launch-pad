
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ProjectProvider } from "@/contexts/ProjectContext";

const Index: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="border-b border-border">
        <div className="container mx-auto max-w-7xl px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="font-bold text-xl">ProjectPilot</span>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
            <Button onClick={() => navigate("/dashboard")} variant="outline">Go to Dashboard</Button>
          </nav>
          <Button onClick={() => navigate("/dashboard")} className="md:hidden">Dashboard</Button>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Track Your Projects <span className="text-pp-purple">Effortlessly</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground">
                  A minimal project tracker designed for solo developers and indie hackers. Monitor your projects, manage tasks, and stay on track.
                </p>
                <div className="flex gap-4">
                  <Button size="lg" onClick={() => navigate("/dashboard")}>
                    Get Started
                  </Button>
                </div>
              </div>
              <div className="flex-1 rounded-lg overflow-hidden border border-border glass-card p-6">
                <img 
                  src="/placeholder.svg" 
                  alt="ProjectPilot Dashboard"
                  className="w-full rounded-md border border-border"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-16 bg-muted/30">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                ProjectPilot provides the essential tools to manage your development projects without unnecessary complexity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-card rounded-lg p-6 hover-card">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M3 9h18" />
                    <path d="M9 21V9" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Project Dashboard</h3>
                <p className="text-muted-foreground">
                  Get a complete overview of all your projects and their status at a glance.
                </p>
              </div>

              <div className="bg-card rounded-lg p-6 hover-card">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" x2="16" y1="2" y2="6" />
                    <line x1="8" x2="8" y1="2" y2="6" />
                    <line x1="3" x2="21" y1="10" y2="10" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Task Planning</h3>
                <p className="text-muted-foreground">
                  Organize tasks with due dates and view them in a monthly calendar.
                </p>
              </div>

              <div className="bg-card rounded-lg p-6 hover-card">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="m16 6 4 14" />
                    <path d="M12 6v14" />
                    <path d="M8 8v12" />
                    <path d="M4 4v16" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Tech Stack Tracking</h3>
                <p className="text-muted-foreground">
                  Tag your projects with the technologies you use for easy filtering and reference.
                </p>
              </div>

              <div className="bg-card rounded-lg p-6 hover-card">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="M8 13h8" />
                    <path d="M8 17h8" />
                    <path d="M8 9h2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Project Details</h3>
                <p className="text-muted-foreground">
                  Store GitHub links, deployment URLs, and other key information about your projects.
                </p>
              </div>

              <div className="bg-card rounded-lg p-6 hover-card">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M12 2v20" />
                    <path d="m17 5-5-3-5 3" />
                    <path d="m17 19-5 3-5-3" />
                    <path d="M12 10 4.93 6.34" />
                    <path d="M19.07 6.34 12 10" />
                    <path d="m12 14 7.07 3.66" />
                    <path d="M4.93 17.66 12 14" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Status Tracking</h3>
                <p className="text-muted-foreground">
                  Update project status from planning to completion to keep track of your progress.
                </p>
              </div>

              <div className="bg-card rounded-lg p-6 hover-card">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h9" />
                    <path d="m22 16-4 4-4-4" />
                    <path d="M18 13v7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Future AI Integration</h3>
                <p className="text-muted-foreground">
                  Built with future AI capabilities in mind for smarter project management.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="py-16">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Getting started with ProjectPilot is simple. Here's how to make the most of it.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-12">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold text-2xl">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Create Your Project</h3>
                  <p className="text-muted-foreground">
                    Start by adding your project with a title, description, and initial status. This gives you a foundation to build on.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold text-2xl">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Add Tasks and Tech Stack</h3>
                  <p className="text-muted-foreground">
                    Break down your project into manageable tasks and tag the technologies you're using for better organization.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold text-2xl">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
                  <p className="text-muted-foreground">
                    Update task status, change project phases, and use the calendar to keep track of deadlines and milestones.
                  </p>
                </div>
              </div>

              <div className="text-center pt-4">
                <Button size="lg" onClick={() => navigate("/dashboard")}>
                  Start Tracking Now
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="font-bold text-xl">ProjectPilot</span>
              <p className="text-sm text-muted-foreground mt-1">
                A project management tool for developers
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} ProjectPilot. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Wrap with ProjectProvider to enable context in the dashboard navigation
const IndexWithProvider = () => (
  <ProjectProvider>
    <Index />
  </ProjectProvider>
);

export default IndexWithProvider;
