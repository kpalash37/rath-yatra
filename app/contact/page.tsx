"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Users,
  Heart,
  Shield,
  Calendar,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react"
import { createMessage } from "@/services/message.service"
import { toast } from "react-toastify"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Contact form submitted:", formData)
    await createMessage(formData) // Assuming createMessage is imported from your service file

    toast.success("Your message has been sent successfully! We will get back to you shortly.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      category: "",
      message: "",
    })

  }

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: "+1 (709) 749-9280",
      description: "Call us for immediate assistance",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: Mail,
      title: "Email",
      details: "info@rathyatra2025.org",
      description: "Send us your questions anytime",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: MapPin,
      title: "Address",
      details: "284 Freshwater Road",
      description: "St. John's, NL A1B 1C2",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: "Mon - Fri: 9:00 AM - 6:00 PM",
      description: "Sat - Sun: 10:00 AM - 4:00 PM",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ]

  const departments = [
    {
      title: "General Information",
      email: "info@rathyatra2025.org",
      phone: "+1 (709) 749-9280",
      description: "General inquiries about the festival",
      icon: MessageCircle,
    },
    {
      title: "Volunteer Coordination",
      email: "volunteers@rathyatra2025.org",
      phone: "+1 (709) 749-9281",
      description: "Volunteer registration and coordination",
      icon: Users,
    },
    {
      title: "Donations & Sponsorship",
      email: "donations@rathyatra2025.org",
      phone: "+1 (709) 749-9282",
      description: "Donation inquiries and sponsorship opportunities",
      icon: Heart,
    },
    {
      title: "Security & Safety",
      email: "security@rathyatra2025.org",
      phone: "+1 (709) 749-9283",
      description: "Safety concerns and security matters",
      icon: Shield,
    },
    {
      title: "Event Coordination",
      email: "events@rathyatra2025.org",
      phone: "+1 (709) 749-9284",
      description: "Event scheduling and coordination",
      icon: Calendar,
    },
  ]

  const socialMedia = [
    { name: "Facebook", icon: Facebook, url: "#", color: "text-blue-600" },
    { name: "Twitter", icon: Twitter, url: "#", color: "text-sky-500" },
    { name: "Instagram", icon: Instagram, url: "#", color: "text-pink-600" },
    { name: "YouTube", icon: Youtube, url: "#", color: "text-red-600" },
  ]

  const faqs = [
    {
      question: "What are the festival dates for 2025?",
      answer:
        "The main Rath Yatra procession will take place on June 28, 2025, with related events from June 14 to July 6, 2025.",
    },
    {
      question: "How can I volunteer for the festival?",
      answer:
        "You can register as a volunteer through our registration page or contact our volunteer coordination team directly.",
    },
    {
      question: "Is there parking available at the venue?",
      answer:
        "Yes, we have designated parking areas. However, we recommend using public transportation due to expected large crowds.",
    },
    {
      question: "Are there any age restrictions for volunteers?",
      answer: "Volunteers must be at least 16 years old. Minors (16-17) require parental consent and supervision.",
    },
    {
      question: "What should I bring to the festival?",
      answer:
        "Bring comfortable walking shoes, water bottle, sun protection, and a positive spirit. Food and refreshments will be available.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with our team for any questions, support, or information about Rath Yatra 2025. We're here to
            help make your festival experience memorable.
          </p>
        </div>

        {/* Contact Information Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow border-orange-100">
              <CardHeader>
                <div className={`mx-auto w-16 h-16 ${info.bgColor} rounded-full flex items-center justify-center mb-4`}>
                  <info.icon className={`h-8 w-8 ${info.color}`} />
                </div>
                <CardTitle className="text-lg">{info.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold text-gray-900 mb-1">{info.details}</p>
                <p className="text-sm text-gray-600">{info.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Contact Form */}
          <Card className="border-orange-100">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Send className="h-6 w-6 text-orange-600" />
                Send us a Message
              </CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Your full name"
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
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      placeholder="+1 (709) 555-0123"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="volunteer">Volunteer Information</SelectItem>
                        <SelectItem value="donation">Donations & Sponsorship</SelectItem>
                        <SelectItem value="event">Event Information</SelectItem>
                        <SelectItem value="media">Media & Press</SelectItem>
                        <SelectItem value="technical">Technical Support</SelectItem>
                        <SelectItem value="feedback">Feedback & Suggestions</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                    placeholder="Brief subject of your message"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                    placeholder="Please describe your inquiry in detail..."
                    rows={6}
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-lg py-6">
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
                </Button>

                <p className="text-sm text-gray-600 text-center">
                  We typically respond within 24 hours during business days.
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Map and Location */}
          <div className="space-y-6">
            <Card className="border-orange-100">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <MapPin className="h-6 w-6 text-orange-600" />
                  Our Location
                </CardTitle>
                <CardDescription>Visit us at our office for in-person assistance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Rath Yatra 2025 Office</h3>
                    <p className="text-gray-700">
                      284 Freshwater Road
                      <br />
                      St. John's, NL A1B 1C2
                      <br />
                      Canada
                    </p>
                  </div>

                  {/* Placeholder for map */}
                  <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Interactive Map</p>
                      <p className="text-sm text-gray-400">284 Freshwater Road, St. John's, NL</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50">
                      Get Directions
                    </Button>
                    <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50">
                      View on Maps
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="border-red-100">
              <CardHeader>
                <CardTitle className="text-xl text-red-600">Emergency Contact</CardTitle>
                <CardDescription>For urgent matters during the festival</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="font-semibold">24/7 Emergency Hotline</p>
                      <p className="text-red-600">+1 (709) 749-9280</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="font-semibold">Emergency Email</p>
                      <p className="text-red-600">emergency@rathyatra2025.org</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
            
      </div>
    </div>
  )
}
