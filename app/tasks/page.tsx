"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, Clock, AlertCircle, Plus, Users, Calendar, MapPin, Edit, Trash2, Search } from "lucide-react"

export default function TasksPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("All Status")
  const [filterPriority, setFilterPriority] = useState("All Priorities")

  // Mock data for tasks
  const tasks = [
    {
      id: 1,
      title: "Setup Main Stage",
      description: "Construct and decorate the main stage for cultural performances",
      category: "Infrastructure",
      priority: "High",
      status: "In Progress",
      startDate: "2025-06-20",
      endDate: "2025-06-25",
      location: "Main Amphitheater, St. John's",
      assignedPersons: [
        { id: 1, name: "Ravi Krishnan", role: "Lead Coordinator", avatar: "/placeholder.svg?height=40&width=40" },
        { id: 2, name: "Anita Gupta", role: "Assistant", avatar: "/placeholder.svg?height=40&width=40" },
      ],
      responsiblePerson: { id: 1, name: "Ravi Krishnan", role: "Lead Coordinator" },
      progress: 65,
      estimatedHours: 120,
      actualHours: 78,
    },
    {
      id: 2,
      title: "Volunteer Training Program",
      description: "Conduct comprehensive training for all registered volunteers",
      category: "Training",
      priority: "High",
      status: "Pending",
      startDate: "2025-06-15",
      endDate: "2025-06-20",
      location: "Community Hall, St. John's",
      assignedPersons: [
        { id: 3, name: "Kavita Mishra", role: "Training Manager", avatar: "/placeholder.svg?height=40&width=40" },
        { id: 4, name: "Meera Joshi", role: "Assistant Trainer", avatar: "/placeholder.svg?height=40&width=40" },
        { id: 5, name: "Amit Patel", role: "Logistics Support", avatar: "/placeholder.svg?height=40&width=40" },
      ],
      responsiblePerson: { id: 3, name: "Kavita Mishra", role: "Training Manager" },
      progress: 0,
      estimatedHours: 80,
      actualHours: 0,
    },
    {
      id: 3,
      title: "Chariot Decoration",
      description: "Decorate all three chariots with traditional flowers and ornaments",
      category: "Decoration",
      priority: "Medium",
      status: "Completed",
      startDate: "2025-06-10",
      endDate: "2025-06-15",
      location: "Temple Premises, St. John's",
      assignedPersons: [
        { id: 6, name: "Sunita Devi", role: "Decoration Lead", avatar: "/placeholder.svg?height=40&width=40" },
        { id: 7, name: "Priya Sharma", role: "Assistant", avatar: "/placeholder.svg?height=40&width=40" },
      ],
      responsiblePerson: { id: 6, name: "Sunita Devi", role: "Decoration Lead" },
      progress: 100,
      estimatedHours: 60,
      actualHours: 55,
    },
    {
      id: 4,
      title: "Security Coordination",
      description: "Coordinate with local police and security agencies for crowd management",
      category: "Security",
      priority: "High",
      status: "In Progress",
      startDate: "2025-06-01",
      endDate: "2025-07-10",
      location: "Multiple Locations, St. John's",
      assignedPersons: [
        { id: 8, name: "Vikram Singh", role: "Security Chief", avatar: "/placeholder.svg?height=40&width=40" },
      ],
      responsiblePerson: { id: 8, name: "Vikram Singh", role: "Security Chief" },
      progress: 40,
      estimatedHours: 200,
      actualHours: 80,
    },
    {
      id: 5,
      title: "Prasadam Distribution Setup",
      description: "Setup distribution points and organize food preparation",
      category: "Food Service",
      priority: "Medium",
      status: "Pending",
      startDate: "2025-06-25",
      endDate: "2025-06-28",
      location: "Multiple Distribution Points, St. John's",
      assignedPersons: [
        { id: 9, name: "Rajesh Kumar", role: "Food Coordinator", avatar: "/placeholder.svg?height=40&width=40" },
        { id: 10, name: "Anita Gupta", role: "Logistics Support", avatar: "/placeholder.svg?height=40&width=40" },
      ],
      responsiblePerson: { id: 9, name: "Rajesh Kumar", role: "Food Coordinator" },
      progress: 0,
      estimatedHours: 100,
      actualHours: 0,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-4 w-4" />
      case "In Progress":
        return <Clock className="h-4 w-4" />
      case "Pending":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "All Status" || task.status === filterStatus
    const matchesPriority = filterPriority === "All Priorities" || task.priority === filterPriority
    return matchesSearch && matchesStatus && matchesPriority
  })

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "Completed").length,
    inProgress: tasks.filter((t) => t.status === "In Progress").length,
    pending: tasks.filter((t) => t.status === "Pending").length,
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Task Distribution & Management</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Organize, assign, and track all festival preparation tasks with responsible team members.
          </p>
        </div>

        {/* Task Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl font-bold text-gray-900">{taskStats.total}</CardTitle>
              <CardDescription>Total Tasks</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center border-green-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl font-bold text-green-600">{taskStats.completed}</CardTitle>
              <CardDescription className="flex items-center justify-center gap-1">
                <CheckCircle className="h-4 w-4" />
                Completed
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl font-bold text-blue-600">{taskStats.inProgress}</CardTitle>
              <CardDescription className="flex items-center justify-center gap-1">
                <Clock className="h-4 w-4" />
                In Progress
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center border-yellow-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl font-bold text-yellow-600">{taskStats.pending}</CardTitle>
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
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Task
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Task</DialogTitle>
                    <DialogDescription>Add a new task and assign team members to it.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="taskTitle">Task Title</Label>
                      <Input id="taskTitle" placeholder="Enter task title" />
                    </div>
                    <div>
                      <Label htmlFor="taskDescription">Description</Label>
                      <Textarea id="taskDescription" placeholder="Describe the task..." />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="infrastructure">Infrastructure</SelectItem>
                            <SelectItem value="decoration">Decoration</SelectItem>
                            <SelectItem value="security">Security</SelectItem>
                            <SelectItem value="food-service">Food Service</SelectItem>
                            <SelectItem value="training">Training</SelectItem>
                            <SelectItem value="logistics">Logistics</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="priority">Priority</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input id="startDate" type="date" />
                      </div>
                      <div>
                        <Label htmlFor="endDate">End Date</Label>
                        <Input id="endDate" type="date" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" placeholder="Task location" />
                    </div>
                    <div>
                      <Label htmlFor="estimatedHours">Estimated Hours</Label>
                      <Input id="estimatedHours" type="number" placeholder="Estimated hours to complete" />
                    </div>
                    <Button className="w-full bg-orange-600 hover:bg-orange-700">Create Task</Button>
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
                <Select value={filterPriority} onValueChange={setFilterPriority}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Priorities">All Priorities</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Button variant="outline" className="w-full">
                  Export Tasks
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tasks List */}
        <div className="grid gap-6">
          {filteredTasks.map((task) => (
            <Card key={task.id} className="hover:shadow-lg transition-shadow border-orange-100">
              <CardHeader>
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(task.status)}
                      <CardTitle className="text-xl">{task.title}</CardTitle>
                      <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                      <Badge className={getPriorityColor(task.priority)}>{task.priority} Priority</Badge>
                    </div>
                    <CardDescription className="text-base">{task.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
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
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-orange-600" />
                      <div>
                        <p className="text-sm font-medium">Hours</p>
                        <p className="text-sm text-gray-600">
                          {task.actualHours}/{task.estimatedHours}h
                        </p>
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
                      <p className="text-xs text-gray-600 mt-1">{task.progress}% complete</p>
                    </div>
                  </div>

                  {/* Responsible Person */}
                  <div>
                    <p className="text-sm font-medium mb-2">Responsible Person</p>
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>
                          {task.responsiblePerson.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{task.responsiblePerson.name}</p>
                        <p className="text-sm text-gray-600">{task.responsiblePerson.role}</p>
                      </div>
                      <Badge className="ml-auto bg-orange-100 text-orange-800">Lead</Badge>
                    </div>
                  </div>

                  {/* Assigned Team */}
                  <div>
                    <p className="text-sm font-medium mb-3">Assigned Team ({task.assignedPersons.length} members)</p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {task.assignedPersons.map((person) => (
                        <div key={person.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={person.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {person.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{person.name}</p>
                            <p className="text-xs text-gray-600 truncate">{person.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="border-orange-600 text-orange-600">
                      {task.category}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Users className="mr-2 h-4 w-4" />
                      Manage Team
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
