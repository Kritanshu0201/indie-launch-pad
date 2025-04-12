
import React from "react";
import { Link } from "react-router-dom";
import { Project } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Clock, Layers, CheckSquare } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { id, title, description, status, techStack, tasks } = project;
  
  const completedTaskCount = tasks.filter(task => task.completed).length;
  const totalTaskCount = tasks.length;
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "planning": return "bg-status-planning/20 text-status-planning border-status-planning/50";
      case "active": return "bg-status-active/20 text-status-active border-status-active/50";
      case "onhold": return "bg-status-onhold/20 text-status-onhold border-status-onhold/50";
      case "completed": return "bg-status-completed/20 text-status-completed border-status-completed/50";
      case "canceled": return "bg-status-canceled/20 text-status-canceled border-status-canceled/50";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Link to={`/projects/${id}`}>
      <Card className="h-full hover-card overflow-hidden">
        <CardContent className="p-5">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-medium text-lg line-clamp-1">{title}</h3>
            <Badge variant="outline" className={cn("status-badge capitalize", getStatusColor(status))}>
              {status}
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>
          
          <div className="flex flex-wrap gap-1 my-3">
            {techStack.slice(0, 3).map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
            {techStack.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{techStack.length - 3}
              </Badge>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="px-5 py-3 border-t bg-muted/30 gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <CheckSquare size={14} />
            <span>
              {completedTaskCount}/{totalTaskCount} tasks
            </span>
          </div>
          
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>
              {formatDistanceToNow(new Date(project.updatedAt), { addSuffix: true })}
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProjectCard;
