
import React, { useState, useMemo } from "react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/contexts/ProjectContext";
import { format, isSameDay, startOfMonth, endOfMonth } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Task } from "@/types";

interface TaskWithProject extends Task {
  projectId: string;
  projectTitle: string;
  projectStatus: string;
}

const Calendar: React.FC = () => {
  const { projects } = useProjects();
  const [date, setDate] = useState<Date>(new Date());
  
  // Extract tasks with due dates from all projects
  const tasksWithDueDate = useMemo(() => {
    const allTasks: TaskWithProject[] = [];
    
    projects.forEach(project => {
      project.tasks
        .filter(task => task.dueDate)
        .forEach(task => {
          allTasks.push({
            ...task,
            projectId: project.id,
            projectTitle: project.title,
            projectStatus: project.status
          });
        });
    });
    
    return allTasks;
  }, [projects]);
  
  // Get all tasks for a specific date
  const getTasksForDate = (day: Date) => {
    return tasksWithDueDate.filter(task => 
      task.dueDate && isSameDay(new Date(task.dueDate), day)
    );
  };
  
  // Handle month navigation
  const nextMonth = () => {
    const nextMonth = new Date(date);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setDate(nextMonth);
  };
  
  const prevMonth = () => {
    const prevMonth = new Date(date);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setDate(prevMonth);
  };
  
  // Get all days in the current month with tasks
  const daysWithTasks = useMemo(() => {
    const startDate = startOfMonth(date);
    const endDate = endOfMonth(date);
    const days: { date: Date; tasks: TaskWithProject[] }[] = [];
    
    for (let day = new Date(startDate); day <= endDate; day.setDate(day.getDate() + 1)) {
      const tasksForDay = getTasksForDate(day);
      if (tasksForDay.length > 0) {
        days.push({
          date: new Date(day),
          tasks: tasksForDay,
        });
      }
    }
    
    return days;
  }, [date, tasksWithDueDate]);
  
  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "planning": return "bg-status-planning";
      case "active": return "bg-status-active";
      case "onhold": return "bg-status-onhold";
      case "completed": return "bg-status-completed";
      case "canceled": return "bg-status-canceled";
      default: return "bg-muted";
    }
  };
  
  return (
    <div className="container max-w-6xl mx-auto animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Calendar</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft size={18} />
          </Button>
          <div className="text-lg font-medium w-36 text-center">
            {format(date, "MMMM yyyy")}
          </div>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-6">
        <Card>
          <CardContent className="p-4">
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              className="rounded-md border"
              modifiers={{
                hasTasks: (date) => 
                  tasksWithDueDate.some(task => 
                    task.dueDate && isSameDay(new Date(task.dueDate), date)
                  )
              }}
              modifiersStyles={{
                hasTasks: { 
                  fontWeight: "bold",
                  backgroundColor: "hsl(var(--accent))"
                }
              }}
              components={{
                DayContent: (props) => {
                  const dayTasks = getTasksForDate(props.date);
                  return (
                    <div className="relative h-9 w-9 p-0 font-normal aria-selected:opacity-100">
                      <div className="flex h-full w-full items-center justify-center">
                        {props.date.getDate()}
                      </div>
                      {dayTasks.length > 0 && (
                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
                          {dayTasks.length <= 3 ? (
                            dayTasks.map((_, i) => (
                              <div
                                key={i}
                                className="h-1 w-1 rounded-full bg-primary"
                              />
                            ))
                          ) : (
                            <>
                              <div className="h-1 w-1 rounded-full bg-primary" />
                              <div className="h-1 w-1 rounded-full bg-primary" />
                              <div className="h-1 w-1 rounded-full bg-primary" />
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  );
                },
              }}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Tasks for {format(date, "MMMM yyyy")}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 pt-0">
            {daysWithTasks.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                No tasks scheduled for this month
              </div>
            ) : (
              <div className="space-y-6">
                {daysWithTasks.map(({ date, tasks }) => (
                  <div key={date.toString()} className="space-y-2">
                    <h3 className="font-medium text-sm">
                      {format(date, "EEEE, MMMM d")}
                    </h3>
                    <div className="space-y-2">
                      {tasks.map((task) => (
                        <div
                          key={task.id}
                          className="flex items-center p-2 rounded-md bg-muted/50"
                        >
                          <div
                            className={`h-2 w-2 rounded-full mr-2 ${getStatusColor(
                              task.projectStatus
                            )}`}
                          />
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <span className={task.completed ? "line-through text-muted-foreground" : ""}>
                                {task.title}
                              </span>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {task.projectTitle}
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className={`ml-2 text-xs ${
                              task.completed ? "bg-muted" : ""
                            }`}
                          >
                            {task.completed ? "Done" : "Todo"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Calendar;
