
import React, { useState } from "react";
import { useProjects } from "@/contexts/ProjectContext";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Dashboard: React.FC = () => {
  const { projects, filterProjects } = useProjects();
  const [activeTab, setActiveTab] = useState("all");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const filteredProjects = filterProjects(activeTab === "all" ? undefined : activeTab);

  return (
    <div className="container mx-auto max-w-6xl animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Projects Dashboard</h1>
          <p className="text-muted-foreground">
            Manage and track all your development projects
          </p>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="planning">Planning</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="onhold">On Hold</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="canceled">Canceled</TabsTrigger>
        </TabsList>
      </Tabs>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No projects found</h3>
          <p className="text-muted-foreground mb-6">
            Create your first project to get started
          </p>
          <Button>Create Project</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
