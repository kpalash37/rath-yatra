"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Download, Users, MapPin, Phone, Mail, Calendar, Heart } from "lucide-react"

export default function DevoteesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCity, setFilterCity] = useState("All Cities")
  const [filterState, setFilterState] = useState("All States")

  // Mock data for devotees
  const devotees = [
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh.kumar@email.com",
      phone: "+1 (709) 555-0123",
      city: "St. John's",
      state: "Newfoundland and Labrador",
      groupSize: "2-5",
      registrationDate: "2025-01-15",
      transportationNeeded: false,
      specialRequirements: "Vegetarian meals only",
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "+1 (709) 555-0124",
      city: "St. John's",
      state: "Newfoundland and Labrador",
      groupSize: "Individual",
      registrationDate: "2025-01-20",
      transportationNeeded: true,
      specialRequirements: "Wheelchair accessibility required",
    },
    {
      id: 3,
      name: "Amit Patel",
      email: "amit.patel@email.com",
      phone: "+1 (709) 555-0125",
      city: "St. John's",
      state: "Newfoundland and Labrador",
      groupSize: "6-10",
      registrationDate: "2025-01-18",
      transportationNeeded: true,
      specialRequirements: "Family with elderly members",
    },
    {
      id: 4,
      name: "Sunita Devi",
      email: "sunita.devi@email.com",
      phone: "+1 (709) 555-0126",
      city: "St. John's",
      state: "Newfoundland and Labrador",
      groupSize: "11-20",
      registrationDate: "2025-01-22",
      transportationNeeded: false,
      specialRequirements: "Group accommodation preferred",
    },
    {
      id: 5,
      name: "Vikram Singh",
      email: "vikram.singh@email.com",
      phone: "+1 (709) 555-0127",
      city: "St. John's",
      state: "Newfoundland and Labrador",
      groupSize: "2-5",
      registrationDate: "2025-01-25",
      transportationNeeded: false,
      specialRequirements: "None",
    },
  ]

  const volunteers = [
    {
      id: 1,
      name: "Anita Gupta",
      email: "anita.gupta@email.com",
      phone: "+1 (709) 555-0128",
      city: "St. John's",
      state: "Newfoundland and Labrador",
      skills: ["Crowd Management", "First Aid", "Translation"],
      availability: ["Morning (9 AM - 1 PM)", "Afternoon (1 PM - 5 PM)"],
      experience: "5 years of event management",
      registrationDate: "2025-01-10",
    },
    {
      id: 2,
      name: "Ravi Krishnan",
      email: "ravi.krishnan@email.com",
      phone: "+1 (709) 555-0129",
      city: "St. John's",
      state: "Newfoundland and Labrador",
      skills: ["Photography", "Sound System", "Event Coordination"],
      availability: ["Full Day"],
      experience: "Professional photographer and event coordinator",
      registrationDate: "2025-01-12",
    },
    {
      id: 3,
      name: "Meera Joshi",
      email: "meera.joshi@email.com",
      phone: "+1 (709) 555-0130",
      city: "St. John's",
      state: "Newfoundland and Labrador",
      skills: ["Food Service", "Decoration", "Translation"],
      availability: ["Early Morning (5 AM - 9 AM)", "Evening (5 PM - 9 PM)"],
      experience: "Community service volunteer for 3 years",
      registrationDate: "2025-01-14",
    },
  ]

  const admins = [
    {
      id: 1,
      name: "Dr. Suresh Panda",
      email: "suresh.panda@rathyatra.org",
      phone: "+1 (709) 555-0131",
      city: "St. John's",
      state: "Newfoundland and Labrador",
      department: "Operations",
      adminLevel: "Director",
      experience: "20+ years in festival management",
      registrationDate: "2025-01-05",
    },
    {
      id: 2,
      name: "Kavita Mishra",
      email: "kavita.mishra@rathyatra.org",
      phone: "+1 (709) 555-0132",
      city: "St. John's",
      state: "Newfoundland and Labrador",
      department: "Volunteer Management",
      adminLevel: "Manager",
      experience: "10 years in volunteer coordination",
      registrationDate: "2025-01-08",
    },
  ]

  const filteredDevotees = devotees.filter((devotee) => {
    const matchesSearch =
      devotee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      devotee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      devotee.phone.includes(searchTerm)
    const matchesCity = filterCity === "All Cities" || devotee.city === filterCity
    const matchesState = filterState === "All States" || devotee.state === filterState
    return matchesSearch && matchesCity && matchesState
  })

  const stats = {
    totalDevotees: devotees.length,
    totalVolunteers: volunteers.length,
    totalAdmins: admins.length,
    transportationNeeded: devotees.filter((d) => d.transportationNeeded).length,
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Registered Participants</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            View and manage all registered devotees, volunteers, and administrators for Rath Yatra 2025.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center border-orange-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl font-bold text-orange-600">{stats.totalDevotees}</CardTitle>
              <CardDescription className="flex items-center justify-center gap-1">
                <Heart className="h-4 w-4" />
                Devotees
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center border-blue-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl font-bold text-blue-600">{stats.totalVolunteers}</CardTitle>
              <CardDescription className="flex items-center justify-center gap-1">
                <Users className="h-4 w-4" />
                Volunteers
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center border-purple-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl font-bold text-purple-600">{stats.totalAdmins}</CardTitle>
              <CardDescription className="flex items-center justify-center gap-1">
                <Users className="h-4 w-4" />
                Admins
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center border-yellow-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl font-bold text-yellow-600">{stats.transportationNeeded}</CardTitle>
              <CardDescription>Need Transportation</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Tabs defaultValue="devotees" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="devotees">Devotees ({stats.totalDevotees})</TabsTrigger>
            <TabsTrigger value="volunteers">Volunteers ({stats.totalVolunteers})</TabsTrigger>
            <TabsTrigger value="admins">Admins ({stats.totalAdmins})</TabsTrigger>
          </TabsList>

          <TabsContent value="devotees">
            {/* Search and Filter */}
            <Card className="mb-6 border-orange-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Search & Filter Devotees
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <Input
                      placeholder="Search by name, email, or phone..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Select value={filterCity} onValueChange={setFilterCity}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All Cities">All Cities</SelectItem>
                        <SelectItem value="St. John's">St. John's</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Select value={filterState} onValueChange={setFilterState}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by province" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All States">All Provinces</SelectItem>
                        <SelectItem value="Newfoundland and Labrador">Newfoundland and Labrador</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Button className="w-full bg-orange-600 hover:bg-orange-700">
                      <Download className="mr-2 h-4 w-4" />
                      Export List
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Devotees List */}
            <div className="grid gap-6">
              {filteredDevotees.map((devotee) => (
                <Card key={devotee.id} className="hover:shadow-lg transition-shadow border-orange-100">
                  <CardHeader>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl">{devotee.name}</CardTitle>
                        <CardDescription className="flex items-center gap-4 mt-2">
                          <span className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {devotee.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            {devotee.phone}
                          </span>
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Badge className="bg-orange-100 text-orange-800">Group: {devotee.groupSize}</Badge>
                        <Badge variant="outline">
                          <Calendar className="h-3 w-3 mr-1" />
                          {devotee.registrationDate}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-orange-600" />
                        <span className="text-sm">
                          {devotee.city}, {devotee.state}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={devotee.transportationNeeded ? "default" : "secondary"}>
                          Transportation: {devotee.transportationNeeded ? "Needed" : "Not Needed"}
                        </Badge>
                      </div>
                    </div>
                    {devotee.specialRequirements && devotee.specialRequirements !== "None" && (
                      <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
                        <p className="text-sm">
                          <strong>Special Requirements:</strong> {devotee.specialRequirements}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="volunteers">
            <div className="grid gap-6">
              {volunteers.map((volunteer) => (
                <Card key={volunteer.id} className="hover:shadow-lg transition-shadow border-blue-100">
                  <CardHeader>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl">{volunteer.name}</CardTitle>
                        <CardDescription className="flex items-center gap-4 mt-2">
                          <span className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {volunteer.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            {volunteer.phone}
                          </span>
                        </CardDescription>
                      </div>
                      <Badge variant="outline">
                        <Calendar className="h-3 w-3 mr-1" />
                        {volunteer.registrationDate}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">
                          {volunteer.city}, {volunteer.state}
                        </span>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2">Skills:</p>
                        <div className="flex flex-wrap gap-2">
                          {volunteer.skills.map((skill, index) => (
                            <Badge key={index} className="bg-blue-100 text-blue-800">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2">Availability:</p>
                        <div className="flex flex-wrap gap-2">
                          {volunteer.availability.map((slot, index) => (
                            <Badge key={index} variant="outline">
                              {slot}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm">
                          <strong>Experience:</strong> {volunteer.experience}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="admins">
            <div className="grid gap-6">
              {admins.map((admin) => (
                <Card key={admin.id} className="hover:shadow-lg transition-shadow border-purple-100">
                  <CardHeader>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl">{admin.name}</CardTitle>
                        <CardDescription className="flex items-center gap-4 mt-2">
                          <span className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {admin.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            {admin.phone}
                          </span>
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Badge className="bg-purple-100 text-purple-800">{admin.adminLevel}</Badge>
                        <Badge variant="outline">
                          <Calendar className="h-3 w-3 mr-1" />
                          {admin.registrationDate}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-purple-600" />
                          <span className="text-sm">
                            {admin.city}, {admin.state}
                          </span>
                        </div>
                        <div>
                          <Badge className="bg-purple-100 text-purple-800">Department: {admin.department}</Badge>
                        </div>
                      </div>

                      <div className="p-3 bg-purple-50 rounded-lg">
                        <p className="text-sm">
                          <strong>Experience:</strong> {admin.experience}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
