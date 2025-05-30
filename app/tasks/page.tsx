"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Users,
  Calendar,
  MapPin,
  Edit,
  Trash2,
  Search,
  Phone,
} from "lucide-react";
import {
  addPersonToTaskService,
  createTaskByAdmin,
  deletePersonFromTaskService,
  getTasks,
} from "@/services/task.service";
import { IPerson, ITask } from "@/lib/interfaces/task.interface";
import { toast } from "react-toastify";

export default function TasksPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All Status");
  const [filterPriority, setFilterPriority] = useState("All Priorities");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<ITask[]>([]);
  const [createTask, setcreateTask] = useState<ITask>({
    title: "",
    description: "",
    category: "",
    priority: "Low", // Default priority
    status: "Pending", // Default status
    startDate: new Date().toISOString().split("T")[0], // Default to today
    endDate: new Date(new Date().setDate(new Date().getDate() + 7))
      .toISOString()
      .split("T")[0], // Default to 7 days later
    location: "",
    assignedPersons: [],
    responsiblePerson: {
      id: "",
      name: "",
      phone: "",
      role: "",
    },
    progress: 0, // Default progress
  });
  const [open, setOpen] = useState(false);
  const [openPersonPopup, setOpenPersonPopup] = useState(false);

  const [person, setPerson] = useState<IPerson>({
    name: "",
    phone: "",
    role: "",
    avatar: "",
  });
  // Mock data for tasks

  useEffect(() => {
    // Fetch tasks from the service
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks();

        console.log("Fetched tasks:", fetchedTasks);
        setTasks(fetchedTasks);
        setFilteredTasks(fetchedTasks);
      } catch (error) {
        toast.error("Failed to fetch tasks:");
      }
    };
    fetchTasks();
  }, []);

  const createTaskAction = async () => {
    try {
      if (
        !createTask.title ||
        !createTask.description ||
        !createTask.category
      ) {
        toast.error("Please fill in all required fields.");
        return;
      }

      await createTaskByAdmin(createTask);

      setcreateTask({
        title: "",
        description: "",
        category: "",
        priority: "Low",
        status: "Pending",
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date(new Date().setDate(new Date().getDate() + 7))
          .toISOString()
          .split("T")[0],
        location: "",
        assignedPersons: [],
        responsiblePerson: {
          id: "",
          name: "",
          phone: "",
          role: "",
        },
        progress: 0,
      });
      setSearchTerm("");
      toast.success("Task created successfully!");
      // Optionally, you can refetch tasks or update the state to include the new task
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
      setFilteredTasks(fetchedTasks);
      setOpen(false); // Close the dialog after creating the task
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Failed to create task:");
    }
  };

  const addPersonToTask = async (task: ITask) => {
    if (!task.assignedPersons) {
      task.assignedPersons = [];
    }

    // Validate person details
    if (!person.name || !person.phone || !person.role) {
      toast.error("Please fill in all person details.");
      return;
    }
    // Check if the person is already assigned
    const isAlreadyAssigned = task.assignedPersons.some(
      (assignedPerson) => assignedPerson.phone === person.phone
    );
    if (isAlreadyAssigned) {
      toast.error("This person is already assigned to the task.");
      return;
    }

    console.log("Adding person to task:", task, person);
    await addPersonToTaskService(task.id || "", person);

    const fetchedTasks = await getTasks();
    setTasks(fetchedTasks);
    setFilteredTasks(fetchedTasks);
    toast.success("Person added to task successfully");

    setOpenPersonPopup(false); // Close the popup after adding the person
  };

  const removePersonFromTask = async (task: ITask, person: IPerson) => {
    if (!task.assignedPersons) {
      task.assignedPersons = [];
    }
    // Validate person details
    if (!person.name || !person.phone || !person.role) {
      toast.error("Please fill in all person details.");
      return;
    }

    // Check if the person is assigned to the task
    const isAssigned = task.assignedPersons.some(
      (assignedPerson) => assignedPerson.phone === person.phone
    );
    if (!isAssigned) {
      toast.error("This person is not assigned to the task.");
      return;
    }
    await deletePersonFromTaskService(task.id || "", person.name);
    // Optionally, you can refetch tasks or update the state to reflect the removal
    toast.success("Person removed from task successfully");

    const fetchedTasks = await getTasks();
    setTasks(fetchedTasks);
    setFilteredTasks(fetchedTasks);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-4 w-4" />;
      case "In Progress":
        return <Clock className="h-4 w-4" />;
      case "Pending":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const filteredTasksAction = () => {
    const filterTask = tasks.filter((task: ITask) => {
      console.log("Filtering task:", task);
      if (!task) return false; // Ensure task is defined

      const matchesSearch =
        task.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        false ||
        task.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        false ||
        task.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        false;
      const matchesStatus =
        filterStatus === "All Status" || task.status === filterStatus;
      const matchesPriority =
        filterPriority === "All Priorities" || task.priority === filterPriority;
      return task && matchesSearch && matchesStatus && matchesPriority;
    });

    setFilteredTasks(filterTask);
  };

  const adminPermission = () => {
    // Placeholder for admin permission logic
    toast.info("Admin permissions are required for this action.");
  };

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "Completed").length,
    inProgress: tasks.filter((t) => t.status === "In Progress").length,
    pending: tasks.filter((t) => t.status === "Pending").length,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Task Distribution & Management
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Organize, assign, and track all festival preparation tasks with
            responsible team members.
          </p>
        </div>

        {/* Task Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl font-bold text-gray-900">
                {taskStats.total}
              </CardTitle>
              <CardDescription>Total Tasks</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center border-green-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl font-bold text-green-600">
                {taskStats.completed}
              </CardTitle>
              <CardDescription className="flex items-center justify-center gap-1">
                <CheckCircle className="h-4 w-4" />
                Completed
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl font-bold text-blue-600">
                {taskStats.inProgress}
              </CardTitle>
              <CardDescription className="flex items-center justify-center gap-1">
                <Clock className="h-4 w-4" />
                In Progress
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center border-yellow-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl font-bold text-yellow-600">
                {taskStats.pending}
              </CardTitle>
              <CardDescription className="flex items-center justify-center gap-1">
                <AlertCircle className="h-4 w-4" />
                Pending
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6 border-orange-100">
          <CardHeader>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search & Filter Tasks
              </CardTitle>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Task
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Task</DialogTitle>
                    <DialogDescription>
                      Add a new task and assign team members to it.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="taskTitle">Task Title</Label>
                      <Input
                        id="taskTitle"
                        placeholder="Enter task title"
                        value={createTask.title}
                        onChange={(e) =>
                          setcreateTask({
                            ...createTask,
                            title: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="taskDescription">Description</Label>
                      <Textarea
                        id="taskDescription"
                        placeholder="Describe the task..."
                        value={createTask.description}
                        onChange={(e) =>
                          setcreateTask({
                            ...createTask,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={createTask.category}
                          onValueChange={(value) =>
                            setcreateTask({ ...createTask, category: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="infrastructure">
                              Infrastructure
                            </SelectItem>
                            <SelectItem value="decoration">
                              Decoration
                            </SelectItem>
                            <SelectItem value="security">Security</SelectItem>
                            <SelectItem value="food-service">
                              Food Service
                            </SelectItem>
                            <SelectItem value="training">Training</SelectItem>
                            <SelectItem value="logistics">Logistics</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="priority">Priority</Label>
                        <Select
                          value={createTask.priority}
                          onValueChange={(value: "High" | "Medium" | "Low") =>
                            setcreateTask({ ...createTask, priority: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={createTask.startDate}
                          onChange={(e) =>
                            setcreateTask({
                              ...createTask,
                              startDate: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="endDate">End Date</Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={createTask.endDate}
                          onChange={(e) =>
                            setcreateTask({
                              ...createTask,
                              endDate: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="Task location"
                        value={createTask.location}
                        onChange={(e) =>
                          setcreateTask({
                            ...createTask,
                            location: e.target.value,
                          })
                        }
                      />
                    </div>
                    <Button
                      className="w-full bg-orange-600 hover:bg-orange-700"
                      onClick={createTaskAction}
                    >
                      Create Task
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <Input
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Status">All Status</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select
                  value={filterPriority}
                  onValueChange={setFilterPriority}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Priorities">
                      All Priorities
                    </SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Button
                  variant="outline"
                  className="w-full bg-orange-600 text-white hover:bg-orange-700"
                  onClick={filteredTasksAction}
                >
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tasks List */}
        <div className="grid gap-6">
          {filteredTasks.map((task) => (
            <Card
              key={task.id}
              className="hover:shadow-lg transition-shadow border-orange-100"
            >
              <CardHeader>
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(task.status)}
                      <CardTitle className="text-xl">{task.title}</CardTitle>
                      <Badge className={getStatusColor(task.status)}>
                        {task.status}
                      </Badge>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority} Priority
                      </Badge>
                    </div>
                    <CardDescription className="text-base">
                      {task.description}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => adminPermission()}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => adminPermission()}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Task Details */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-orange-600" />
                      <div>
                        <p className="text-sm font-medium">Duration</p>
                        <p className="text-sm text-gray-600">
                          {task.startDate} to {task.endDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-orange-600" />
                      <div>
                        <p className="text-sm font-medium">Location</p>
                        <p className="text-sm text-gray-600">{task.location}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Progress</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-orange-600 h-2 rounded-full transition-all"
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        {task.progress}% complete
                      </p>
                    </div>
                  </div>

                  {/* Responsible Person */}
                  <div>
                    <p className="text-sm font-medium mb-2">
                      Responsible Person
                    </p>
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>
                          {task?.responsiblePerson?.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {task?.responsiblePerson?.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {task?.responsiblePerson?.role}
                        </p>
                      </div>
                      <Badge className="ml-auto bg-orange-100 text-orange-800">
                        Lead
                      </Badge>
                    </div>
                  </div>

                  {/* Assigned Team */}
                  <div>
                    <p className="text-sm font-medium mb-3">
                      Assigned Team ({task?.assignedPersons?.length} members)
                    </p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {(task.assignedPersons || []).map((person) => (
                        <div
                          key={person.id}
                          className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg"
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={person.avatar || "/placeholder.svg"}
                            />
                            <AvatarFallback>
                              {person.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">
                              {person.name} | {person.phone}
                            </p>
                            <p className="text-xs text-gray-600 truncate">
                              {person.role}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className="border-orange-600 text-orange-600"
                    >
                      {task.category}
                    </Badge>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Users className="mr-2 h-4 w-4" />
                          Manage Team
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg">
                        <DialogHeader>
                          <DialogTitle>Manage Assigned Team</DialogTitle>
                          <DialogDescription>
                            Add or remove team members for this task.
                          </DialogDescription>
                        </DialogHeader>
                        {/* List assigned members */}
                        <div className="mb-4">
                          <p className="font-medium mb-2">Current Members</p>
                          <div className="flex flex-col gap-2">
                            {(task.assignedPersons || []).length === 0 && (
                              <span className="text-sm text-gray-500">
                                No members assigned.
                              </span>
                            )}
                            {(task.assignedPersons || []).map((person) => (
                              <div
                                key={person.id}
                                className="flex items-center gap-3 p-2 border rounded"
                              >
                                <Avatar className="h-7 w-7">
                                  <AvatarImage
                                    src={person.avatar || "/placeholder.svg"}
                                  />
                                  <AvatarFallback>
                                    {person.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium truncate">
                                    {person.name} | {person.phone}
                                  </p>
                                  <p className="text-xs text-gray-600 truncate">
                                    {person.role}
                                  </p>
                                </div>
                                {/* Remove button (UI only, implement logic as needed) */}
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-red-500"
                                  title="Remove"
                                  onClick={() =>
                                    removePersonFromTask(task, person)
                                  }
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* Add new member (UI only, implement logic as needed) */}
                        <div className="border-t pt-4 mt-4">
                          <p className="font-medium mb-2">Add Member</p>
                          <div className="flex gap-2">
                            <Input
                              placeholder="Member name"
                              value={person.name}
                              onChange={(e) =>
                                setPerson({ ...person, name: e.target.value })
                              }
                            />
                            <Input
                              placeholder="Role/ Activities"
                              value={person.role}
                              onChange={(e) =>
                                setPerson({ ...person, role: e.target.value })
                              }
                            />
                            <Input
                              placeholder="Phone"
                              value={person.phone}
                              onChange={(e) =>
                                setPerson({ ...person, phone: e.target.value })
                              }
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-orange-600 text-white hover:bg-orange-700"
                              onClick={() => addPersonToTask(task)}
                            >
                              Add
                            </Button>
                          </div>
                        </div>
                        <div className="flex justify-end mt-4">
                          <Button variant="outline">Close</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
