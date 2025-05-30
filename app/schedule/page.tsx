'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, MapPin, Users, Calendar, Plus } from "lucide-react"
import { createEvents, getEvents } from "@/services/events.service"
import { useEffect, useState } from "react"
import { IEvents } from "@/lib/interfaces/events.interface"

export default function SchedulePage() {

   const [events, setEvents] = useState<IEvents>();

  const saveData = async () => {
    console.log("Saving data...");
    // Here you would implement the logic to save the data, e.g., to a database or local storage
   // alert("Data saved successfully!");    
  }

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await getEvents();
        console.log("Fetched events:", fetchedEvents);
        console.log("Fetched events 2:", fetchedEvents[0]);
        setEvents(Array.isArray(fetchedEvents) ? fetchedEvents[0] : fetchedEvents || {
          religious: [],
          cultural: [],
          food: []
        });

        Object.entries(fetchedEvents[0]).forEach(([category, categoryEvents]) => {
          console.log(`Category: ${category}`);
          console.log("Events in category:", categoryEvents);
        });
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents(undefined);
      }
    };
    fetchEvents();
  }, []);


  
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

          {events && Object.entries(events).map(([category, categoryEvents]) => (
            <TabsContent key={category} value={category}>
              <div className="grid gap-6">
                {categoryEvents && categoryEvents.map((event:any, index: any) => (
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
