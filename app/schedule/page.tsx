import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, MapPin, Users, Calendar, Plus } from "lucide-react"

export default function SchedulePage() {
  const events = {
    religious: [
      {
        title: "Snana Yatra",
        date: "June 14, 2025",
        time: "6:00 AM - 12:00 PM",
        location: "Jagannath Temple",
        description: "Sacred bathing ceremony of the deities",
        attendees: "50,000+",
      },
      {
        title: "Rath Yatra Begins",
        date: "June 28, 2025",
        time: "7:00 AM - 6:00 PM",
        location: "Temple to Gundicha",
        description: "Grand chariot procession starts",
        attendees: "2,000,000+",
      },
      {
        title: "Bahuda Yatra",
        date: "July 6, 2025",
        time: "8:00 AM - 7:00 PM",
        location: "Gundicha to Temple",
        description: "Return journey of the chariots",
        attendees: "1,500,000+",
      },
    ],
    cultural: [
      {
        title: "Classical Dance Performance",
        date: "June 27, 2025",
        time: "7:00 PM - 9:00 PM",
        location: "Cultural Stage",
        description: "Odissi and Bharatanatyam performances",
        attendees: "5,000+",
      },
      {
        title: "Devotional Music Concert",
        date: "June 29, 2025",
        time: "6:00 PM - 10:00 PM",
        location: "Main Amphitheater",
        description: "Bhajans and kirtans by renowned artists",
        attendees: "10,000+",
      },
    ],
    food: [
      {
        title: "Mahaprasadam Distribution",
        date: "June 28 - July 6, 2025",
        time: "12:00 PM - 3:00 PM Daily",
        location: "Multiple Distribution Points",
        description: "Free sacred food for all devotees",
        attendees: "500,000+ daily",
      },
      {
        title: "Community Feast",
        date: "July 1, 2025",
        time: "1:00 PM - 4:00 PM",
        location: "Community Hall",
        description: "Traditional Odia cuisine for all",
        attendees: "25,000+",
      },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Festival Schedule</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete timeline of all religious ceremonies, cultural events, and community activities during the 9-day
            Rath Yatra festival.
          </p>
        </div>

        <Tabs defaultValue="religious" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="religious">Religious Events</TabsTrigger>
            <TabsTrigger value="cultural">Cultural Programs</TabsTrigger>
            <TabsTrigger value="food">Food & Prasadam</TabsTrigger>
          </TabsList>

          {Object.entries(events).map(([category, categoryEvents]) => (
            <TabsContent key={category} value={category}>
              <div className="grid gap-6">
                {categoryEvents.map((event, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow border-orange-100">
                    <CardHeader>
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div>
                          <CardTitle className="text-2xl text-gray-900 mb-2">{event.title}</CardTitle>
                          <CardDescription className="text-lg">{event.description}</CardDescription>
                        </div>
                        <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200 w-fit">
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-orange-600" />
                          <div>
                            <p className="font-medium text-gray-900">{event.date}</p>
                            <p className="text-sm text-gray-600">Date</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-orange-600" />
                          <div>
                            <p className="font-medium text-gray-900">{event.time}</p>
                            <p className="text-sm text-gray-600">Time</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-orange-600" />
                          <div>
                            <p className="font-medium text-gray-900">{event.location}</p>
                            <p className="text-sm text-gray-600">Location</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-orange-600" />
                          <div>
                            <p className="font-medium text-gray-900">{event.attendees}</p>
                            <p className="text-sm text-gray-600">Expected</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button className="bg-orange-600 hover:bg-orange-700">
                          <Plus className="mr-2 h-4 w-4" />
                          Add to Calendar
                        </Button>
                        <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50">
                          Get Directions
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
