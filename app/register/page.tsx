"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { UserPlus, Users, Heart, Shield } from "lucide-react"
import { createDevotee } from "@/services/devotees.service"
import { toast } from "react-toastify"

export default function RegisterPage() {
  const [selectedRole, setSelectedRole] = useState<string>("")
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "St. John's",
    state: "Newfoundland and Labrador",
    pincode: "",
    emergencyContact: "",
    emergencyPhone: "",
    skills: [] as string[],
    availability: [] as string[],
    experience: "",
    motivation: "",
    department: "",
    adminLevel: "",
    specialRequirements: "",
    groupSize: "",
    transportationNeeded: false,
  })

  const roles = [
    {
      id: "devotee",
      title: "Devotee",
      description: "Participate in the sacred festival and ceremonies",
      icon: Heart,
      color: "bg-orange-100 text-orange-800",
    },
    {
      id: "volunteer",
      title: "Volunteer",
      description: "Help organize and serve during the festival",
      icon: Users,
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: "admin",
      title: "Admin",
      description: "Manage festival operations and coordination",
      icon: Shield,
      color: "bg-purple-100 text-purple-800",
    },
  ]

  const volunteerSkills = [
    "Crowd Management",
    "First Aid",
    "Translation",
    "Photography",
    "Sound System",
    "Decoration",
    "Food Service",
    "Security",
    "Transportation",
    "Event Coordination",
  ]

  const availabilitySlots = [
    "Early Morning (5 AM - 9 AM)",
    "Morning (9 AM - 1 PM)",
    "Afternoon (1 PM - 5 PM)",
    "Evening (5 PM - 9 PM)",
    "Night (9 PM - 1 AM)",
    "Full Day",
  ]

  const handleSkillChange = (skill: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      skills: checked ? [...prev.skills, skill] : prev.skills.filter((s) => s !== skill),
    }))
  }

  const handleAvailabilityChange = (slot: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      availability: checked ? [...prev.availability, slot] : prev.availability.filter((s) => s !== slot),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedRole) {
      toast.error("Please select a role before submitting the form.")
      return
    }
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields.")
      return
    }
    console.log("Registration submitted:", { role: selectedRole, ...formData })

    await createDevotee({ role: selectedRole, ...formData, createdAt: new Date().toISOString() });
    toast.success("Registration successful! Thank you for joining us.")
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "St. John's",
      state: "Newfoundland and Labrador",
      pincode: "",
      emergencyContact: "",
      emergencyPhone: "",
      skills: [],
      availability: [],
      experience: "",
      motivation: "",
      department: "",
      adminLevel: "",
      specialRequirements: "",
      groupSize: "",
      transportationNeeded: false,
    // Handle form submission
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Register for Rath Yatra 2025</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join us in this sacred celebration. Choose your role and be part of this divine journey.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Role Selection */}
          <Card className="mb-8 border-orange-100">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <UserPlus className="h-6 w-6 text-orange-600" />
                Select Your Role
              </CardTitle>
              <CardDescription>Choose how you'd like to participate in the festival</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {roles.map((role) => (
                  <div
                    key={role.id}
                    className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedRole === role.id
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200 hover:border-orange-300"
                    }`}
                    onClick={() => setSelectedRole(role.id)}
                  >
                    <div className="text-center">
                      <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                        <role.icon className="h-8 w-8 text-orange-600" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{role.title}</h3>
                      <p className="text-gray-600 text-sm">{role.description}</p>
                      <Badge className={`mt-3 ${role.color}`}>{role.title}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Registration Form */}
          {selectedRole && (
            <Card className="border-orange-100">
              <CardHeader>
                <CardTitle className="text-2xl">Registration Details</CardTitle>
                <CardDescription>
                  Please fill in your information for {roles.find((r) => r.id === selectedRole)?.title} registration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                          placeholder="+1 (709) 555-0123"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                        <Input
                          id="emergencyContact"
                          value={formData.emergencyContact}
                          onChange={(e) => setFormData((prev) => ({ ...prev, emergencyContact: e.target.value }))}
                          placeholder="Emergency contact person"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                        <Input
                          id="emergencyPhone"
                          value={formData.emergencyPhone}
                          onChange={(e) => setFormData((prev) => ({ ...prev, emergencyPhone: e.target.value }))}
                          placeholder="+1 (709) 555-0124"
                        />
                      </div>
                      {selectedRole === "devotee" && (
                        <div>
                          <Label htmlFor="groupSize">Group Size</Label>
                          <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, groupSize: value }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select group size" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">Individual</SelectItem>
                              <SelectItem value="2-5">2-5 people</SelectItem>
                              <SelectItem value="6-10">6-10 people</SelectItem>
                              <SelectItem value="11-20">11-20 people</SelectItem>
                              <SelectItem value="20+">20+ people</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Address Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Address Information</h3>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                        placeholder="Enter your complete address"
                      />
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                          placeholder="St. John's"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">Province</Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={(e) => setFormData((prev) => ({ ...prev, state: e.target.value }))}
                          placeholder="Newfoundland and Labrador"
                        />
                      </div>
                      <div>
                        <Label htmlFor="pincode">Postal Code</Label>
                        <Input
                          id="pincode"
                          value={formData.pincode}
                          onChange={(e) => setFormData((prev) => ({ ...prev, pincode: e.target.value }))}
                          placeholder="A1A 1A1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Role-specific fields */}
                  {selectedRole === "volunteer" && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Volunteer Information</h3>

                      <div>
                        <Label className="text-base font-medium mb-3 block">Skills & Expertise</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {volunteerSkills.map((skill) => (
                            <div key={skill} className="flex items-center space-x-2">
                              <Checkbox
                                id={skill}
                                checked={formData.skills.includes(skill)}
                                onCheckedChange={(checked) => handleSkillChange(skill, checked as boolean)}
                              />
                              <Label htmlFor={skill} className="text-sm">
                                {skill}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label className="text-base font-medium mb-3 block">Availability</Label>
                        <div className="grid md:grid-cols-2 gap-3">
                          {availabilitySlots.map((slot) => (
                            <div key={slot} className="flex items-center space-x-2">
                              <Checkbox
                                id={slot}
                                checked={formData.availability.includes(slot)}
                                onCheckedChange={(checked) => handleAvailabilityChange(slot, checked as boolean)}
                              />
                              <Label htmlFor={slot} className="text-sm">
                                {slot}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="experience">Previous Experience</Label>
                        <Textarea
                          id="experience"
                          value={formData.experience}
                          onChange={(e) => setFormData((prev) => ({ ...prev, experience: e.target.value }))}
                          placeholder="Describe any relevant volunteer experience..."
                        />
                      </div>

                      <div>
                        <Label htmlFor="motivation">Why do you want to volunteer?</Label>
                        <Textarea
                          id="motivation"
                          value={formData.motivation}
                          onChange={(e) => setFormData((prev) => ({ ...prev, motivation: e.target.value }))}
                          placeholder="Share your motivation for volunteering..."
                        />
                      </div>
                    </div>
                  )}

                  {selectedRole === "admin" && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Admin Information</h3>                     
                      <div>
                        <Label htmlFor="experience">Administrative Experience</Label>
                        <Textarea
                          id="experience"
                          value={formData.experience}
                          onChange={(e) => setFormData((prev) => ({ ...prev, experience: e.target.value }))}
                          placeholder="Describe your administrative and event management experience..."
                        />
                      </div>
                    </div>
                  )}

                  {/* Additional Requirements */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Additional Requirements</h3>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="transportation"
                          checked={formData.transportationNeeded}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({ ...prev, transportationNeeded: checked as boolean }))
                          }
                        />
                        <Label htmlFor="transportation">I need transportation assistance</Label>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="specialRequirements">Special Requirements</Label>
                      <Textarea
                        id="specialRequirements"
                        value={formData.specialRequirements}
                        onChange={(e) => setFormData((prev) => ({ ...prev, specialRequirements: e.target.value }))}
                        placeholder="Any special requirements, dietary restrictions, accessibility needs, etc."
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-lg py-6">
                    <UserPlus className="mr-2 h-5 w-5" />
                    Complete Registration
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
