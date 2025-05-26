import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Heart, Play, Clock, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { CountdownTimer } from "@/components/countdown-timer"
import { HeroSlider } from "@/components/hero-slider"

export default function HomePage() {
  const upcomingEvents = [
    {
      title: "Snana Yatra",
      date: "June 14, 2025",
      time: "6:00 AM",
      description: "Sacred bathing ceremony of Lord Jagannath",
    },
    {
      title: "Rath Yatra Begins",
      date: "June 28, 2025",
      time: "7:00 AM",
      description: "The grand chariot procession starts",
    },
    {
      title: "Gundicha Yatra",
      date: "June 28, 2025",
      time: "2:00 PM",
      description: "Journey to Gundicha Temple",
    },
  ]

  const highlights = [
    {
      icon: Users,
      title: "100+ Devotees",
      description: "Join in this sacred journey",
    },
    {
      icon: Calendar,
      title: "1-Day Festival",
      description: "Complete spiritual experience",
    },
    {
      icon: MapPin,
      title: "2km Route",
      description: "From 284 Freshwater road Temple to ....",
    },
    {
      icon: Heart,
      title: "Free Prasadam",
      description: "Sacred food for all devotees",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] bg-cover bg-center opacity-10"></div>
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-orange-500 to-red-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-orange-600 to-red-500 rounded-full opacity-15 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-red-400 to-orange-500 rounded-full opacity-25 animate-pulse delay-1000"></div>

        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-gradient-to-r from-orange-600 to-red-500 text-white hover:from-red-500 hover:to-orange-600 shadow-lg">
                  <Sparkles className="w-4 h-4 mr-1" />🛕 Rath Yatra 2025
                </Badge>
                <Badge className="bg-gradient-to-r ml-1 from-orange-600 to-red-500 text-white hover:from-red-500 hover:to-orange-600 shadow-lg">
                  <MapPin className="h-4 w-4 text-white" />St. John's, Newfoundland and Labrador                  
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Journey of the
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                    {" "}
                    Divine Chariots
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  Experience the most sacred and magnificent festival of Lord Jagannath. Join us to pull Lord Jagannath’s chariot, spreading unity, devotion, joy, and divine blessings together!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-600 to-red-500 hover:from-red-500 hover:to-orange-600 text-white shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Live Stream
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  View Schedule
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="relative">
              <HeroSlider />
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Timer */}
      <section className="bg-gradient-to-r from-orange-600 via-red-500 to-orange-500 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-4 left-4 w-8 h-8 bg-white/20 rounded-full animate-ping"></div>
          <div className="absolute bottom-4 right-4 w-6 h-6 bg-white/20 rounded-full animate-ping delay-500"></div>
          <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-white/20 rounded-full animate-ping delay-1000"></div>
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-2">Rath Yatra Begins In</h2>
          <div className="flex items-center justify-center gap-2 text-orange-100 mb-8">
            <MapPin className="h-4 w-4" />
            <span>June 28, 2025 - St. John's, Newfoundland and Labrador</span>
          </div>
          <CountdownTimer targetDate="2025-06-28T07:00:00" />
        </div>
      </section>

      {/* Festival Overview */}
      <section className="py-16 bg-gradient-to-b from-white to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">About Rath Yatra</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The Festival of Chariots is one of the most ancient and sacred festivals, celebrating the journey of Lord
              Jagannath, Balabhadra, and Subhadra in the beautiful city of St. John's.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => (
              <Card
                key={index}
                className="text-center border-2 border-orange-100 hover:border-orange-600 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-b from-white to-orange-50/50"
              >
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-600 to-red-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <highlight.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">{highlight.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
            <p className="text-xl text-gray-600">Don't miss these sacred ceremonies and celebrations in St. John's</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-orange-100 hover:border-orange-600 bg-gradient-to-b from-white to-orange-50/30"
              >
                <CardHeader>
                  <div className="flex items-center gap-2 text-orange-600 mb-2">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm font-medium">{event.time}</span>
                  </div>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <CardDescription className="text-orange-600 font-medium">{event.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{event.description}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white transition-all duration-200"
                  >
                    Add to Calendar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-orange-600 to-red-500 hover:from-red-500 hover:to-orange-600 shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <Link href="/schedule">
                View Complete Schedule
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-gradient-to-br from-white via-orange-50/50 to-red-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Get Involved</h2>
            <p className="text-xl text-gray-600">
              Multiple ways to participate in this divine celebration in St. John's
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-orange-100 hover:border-orange-600 bg-gradient-to-b from-white to-orange-50/50">
              <CardHeader>
                <CardTitle className="text-lg">Volunteer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Help organize and serve during the festival</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
                >
                  Register Now
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-orange-100 hover:border-orange-600 bg-gradient-to-b from-white to-orange-50/50">
              <CardHeader>
                <CardTitle className="text-lg">Donate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Support prasadam and festival arrangements</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
                >
                  Donate Now
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-orange-100 hover:border-orange-600 bg-gradient-to-b from-white to-orange-50/50">
              <CardHeader>
                <CardTitle className="text-lg">Live Stream</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Watch the festival live from anywhere</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
                >
                  Watch Live
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-orange-100 hover:border-orange-600 bg-gradient-to-b from-white to-orange-50/50">
              <CardHeader>
                <CardTitle className="text-lg">Route Map</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Plan your visit with interactive maps</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
                >
                  View Map
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
