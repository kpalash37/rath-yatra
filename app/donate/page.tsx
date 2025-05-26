import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Users, Utensils, Shield, Star, AlertCircle } from "lucide-react"

export default function DonatePage() {
  const donationCategories = [
    {
      icon: Utensils,
      title: "Prasadam Distribution",
      description: "Support free food distribution for millions of devotees",
      goal: "CAD $50,000",
      raised: "CAD $32,500",
      percentage: 65,
    },
    {
      icon: Shield,
      title: "Safety & Security",
      description: "Ensure safe festival experience for all participants",
      goal: "CAD $25,000",
      raised: "CAD $18,750",
      percentage: 75,
    },
    {
      icon: Users,
      title: "Volunteer Support",
      description: "Training and support for thousands of volunteers",
      goal: "CAD $15,000",
      raised: "CAD $12,000",
      percentage: 80,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Support Rath Yatra 2025</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your generous donations help us organize this sacred festival and serve millions of devotees. Every
            contribution, big or small, makes a difference.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Donation Form */}
          <div className="lg:col-span-2">
            <Card className="border-2 border-orange-100 hover:border-orange-600 transition-all duration-300 shadow-xl bg-gradient-to-b from-white to-orange-50/30">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Heart className="h-6 w-6 text-orange-600" />
                  Make a Donation
                </CardTitle>
                <CardDescription>Choose your donation amount and category</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Quick Amount Selection */}
                <div>
                  <Label className="text-base font-medium mb-3 block">Quick Amount Selection (CAD)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["$25", "$50", "$100", "$250"].map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        className="border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white transform hover:scale-105 transition-all duration-200"
                      >
                        {amount}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Custom Amount */}
                <div>
                  <Label htmlFor="amount" className="text-base font-medium">
                    Custom Amount (CAD)
                  </Label>
                  <Input
                    id="amount"
                    placeholder="Enter amount in CAD $"
                    className="mt-2 border-orange-200 focus:border-orange-600"
                  />
                </div>

                {/* Donation Category */}
                <div>
                  <Label className="text-base font-medium mb-3 block">Donation Category</Label>
                  <div className="grid gap-3">
                    {donationCategories.map((category, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-3 border-2 border-orange-100 rounded-lg hover:bg-orange-50 hover:border-orange-600 cursor-pointer transition-all duration-200"
                      >
                        <input type="radio" name="category" className="text-orange-600 focus:ring-orange-600" />
                        <category.icon className="h-5 w-5 text-orange-600" />
                        <div className="flex-1">
                          <p className="font-medium">{category.title}</p>
                          <p className="text-sm text-gray-600">{category.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Donor Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      className="mt-2 border-orange-200 focus:border-orange-600"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="mt-2 border-orange-200 focus:border-orange-600"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="+1 (709) 749-9280"
                    className="mt-2 border-orange-200 focus:border-orange-600"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Share your thoughts or prayers..."
                    className="mt-2 border-orange-200 focus:border-orange-600"
                  />
                </div>

                <Button className="w-full bg-gradient-to-r from-orange-600 to-red-500 hover:from-red-500 hover:to-orange-600 text-lg py-6 shadow-lg transform hover:scale-105 transition-all duration-200">
                  <Heart className="mr-2 h-5 w-5" />
                  Donate Now
                </Button>

                <p className="text-sm text-gray-600 text-center">
                  Your donation is secure and tax-deductible. You will receive a receipt via email.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Donation Progress */}
          <div className="space-y-6">
            <Card className="border-2 border-orange-100 hover:border-orange-600 transition-all duration-300 shadow-xl bg-gradient-to-b from-white to-orange-50/30">
              <CardHeader>
                <CardTitle className="text-xl">Donation Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {donationCategories.map((category, index) => (
                  <div key={index}>
                    <div className="flex items-center gap-2 mb-2">
                      <category.icon className="h-4 w-4 text-orange-600" />
                      <span className="font-medium text-sm">{category.title}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{category.raised}</span>
                        <span>{category.goal}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-orange-600 to-red-500 h-3 rounded-full transition-all duration-1000 ease-out shadow-sm"
                          style={{ width: `${category.percentage}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-600">{category.percentage}% of goal reached</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-100 hover:border-orange-600 transition-all duration-300 shadow-xl bg-gradient-to-b from-white to-orange-50/30">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Star className="h-5 w-5 text-orange-600" />
                  Our Sponsors
                </CardTitle>
                <CardDescription>Grateful to our generous sponsors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No Sponsors Available Now</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    We are currently seeking generous sponsors to support this sacred festival.
                  </p>
                  <Button
                    variant="outline"
                    className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
                  >
                    Become a Sponsor
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
