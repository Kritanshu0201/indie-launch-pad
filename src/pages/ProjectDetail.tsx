
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProjects } from "@/contexts/ProjectContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  Github,
  Globe,
  MoreVertical,
  PlusCircle,
  Trash2,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { format } from "date-fns";
import { ProjectStatus, Task } from "@/types";

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProject, updateProject, deleteProject, addTask, updateTask, deleteTask } = useProjects();
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [newTag, setNewTag] = useState("");
  
  const project = getProject(id || "");
  
  useEffect(() => {
    if (!project) {
      navigate("/dashboard");
    }
  }, [project, navigate]);
  
  if (!project) {
    return null;
  }
  
  const handleUpdateField = (field: string, value: string | string[] | ProjectStatus) => {
    updateProject(project.id, { [field]: value });
  };
  
  const handleDeleteProject = () => {
    deleteProject(project.id);
    navigate("/dashboard");
  };
  
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      addTask(project.id, {
        title: newTask,
        completed: false,
      });
      setNewTask("");
    }
  };
  
  const handleToggleTask = (taskId: string, completed: boolean) => {
    updateTask(project.id, taskId, { completed });
  };
  
  const handleDeleteTask = (taskId: string) => {
    deleteTask(project.id, taskId);
  };
  
  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTag.trim() && !project.techStack.includes(newTag.trim())) {
      handleUpdateField("techStack", [...project.techStack, newTag.trim()]);
      setNewTag("");
    }
  };
  
  const handleRemoveTag = (tag: string) => {
    handleUpdateField(
      "techStack",
      project.techStack.filter((t) => t !== tag)
    );
  };
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "PPP");
  };
  
  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case "planning": return "bg-status-planning text-white";
      case "active": return "bg-status-active text-white";
      case "onhold": return "bg-status-onhold text-white";
      case "completed": return "bg-status-completed text-white";
      case "canceled": return "bg-status-canceled text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };
  
  return (
    <div className="container mx-auto max-w-5xl animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-2xl font-bold">Project Details</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <Input
                  value={project.title}
                  onChange={(e) => handleUpdateField("title", e.target.value)}
                  className="text-xl font-bold px-0 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                
                <CardDescription>
                  Created on {formatDate(project.createdAt)}
                </CardDescription>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical size={18} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Duplicate Project</DropdownMenuItem>
                  <DropdownMenuItem>Export Data</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => setDeleteDialogOpen(true)}
                  >
                    Delete Project
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={project.description}
                  onChange={(e) => handleUpdateField("description", e.target.value)}
                  className="mt-1 resize-none"
                  rows={4}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">GitHub URL</label>
                  <div className="mt-1 flex gap-2">
                    <Github size={18} className="text-muted-foreground" />
                    <Input
                      value={project.githubUrl || ""}
                      onChange={(e) => handleUpdateField("githubUrl", e.target.value)}
                      placeholder="https://github.com/username/repo"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Live URL</label>
                  <div className="mt-1 flex gap-2">
                    <Globe size={18} className="text-muted-foreground" />
                    <Input
                      value={project.liveUrl || ""}
                      onChange={(e) => handleUpdateField("liveUrl", e.target.value)}
                      placeholder="https://yourproject.com"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Tasks section */}
          <Card>
            <CardHeader>
              <CardTitle>Tasks</CardTitle>
              <CardDescription>
                Track and manage tasks for this project
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {project.tasks.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  No tasks created yet
                </div>
              ) : (
                <div className="space-y-2">
                  {project.tasks.map((task: Task) => (
                    <div key={task.id} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={task.completed}
                          onCheckedChange={(checked) =>
                            handleToggleTask(task.id, checked === true)
                          }
                        />
                        <span className={task.completed ? "line-through text-muted-foreground" : ""}>
                          {task.title}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {task.dueDate && (
                          <div className="flex items-center text-xs text-muted-foreground">
                            <CalendarIcon size={14} className="mr-1" />
                            {format(new Date(task.dueDate), "MMM d")}
                          </div>
                        )}
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <form onSubmit={handleAddTask} className="flex gap-2">
                <Input
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Add a new task..."
                  className="flex-1"
                />
                <Button type="submit" size="sm">
                  <PlusCircle size={16} className="mr-1" />
                  Add
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        
        {/* Sidebar column */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Info</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Status</label>
                <Select
                  value={project.status}
                  onValueChange={(value) => handleUpdateField("status", value as ProjectStatus)}
                >
                  <SelectTrigger className={`mt-1 ${getStatusColor(project.status)}`}>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="onhold">On Hold</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="canceled">Canceled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium">Last Updated</label>
                <p className="text-sm text-muted-foreground mt-1">
                  {formatDate(project.updatedAt)}
                </p>
              </div>
              
              <Separator />
              
              <div>
                <label className="text-sm font-medium mb-2 block">Tech Stack</label>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.techStack.length === 0 ? (
                    <span className="text-sm text-muted-foreground">
                      No technologies added yet
                    </span>
                  ) : (
                    project.techStack.map((tech) => (
                      <Badge key={tech} variant="outline" className="flex gap-1 items-center">
                        {tech}
                        <X
                          size={14}
                          className="cursor-pointer"
                          onClick={() => handleRemoveTag(tech)}
                        />
                      </Badge>
                    ))
                  )}
                </div>
                
                <form onSubmit={handleAddTag} className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add technology..."
                    className="flex-1 text-sm"
                  />
                  <Button type="submit" size="sm">Add</Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Delete confirmation dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              project and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProject}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProjectDetail;
