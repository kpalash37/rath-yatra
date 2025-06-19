"use client";
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
import {
  Heart,
  Users,
  Utensils,
  Shield,
  Star,
  AlertCircle,
  Search,
} from "lucide-react";
import { useState } from "react";
import { createDonationService, getDonationByPhone } from "@/services/donation.service";
import { IDonation } from "@/lib/interfaces/donation.interface";
import { toast } from "react-toastify";

export default function DonatePage() {
  const [showEmail, setShowEmail] = useState(false);
  const [donationForm, setDonationForm] = useState<IDonation>({
    amount: "",
    category: "",
    name: "",
    email: "",
    phone: "",
    message: "",
    createdAt: new Date().toISOString(),
    status: "Pending", // Default status
  });

  const [searchPhone, setSearchPhone] = useState("");
  const [searchResults, setSearchResults] = useState<IDonation | null>(null);
  const submitDonation = async () => {
    // Here you would typically handle the form submission,
    // such as sending the data to your backend or a payment gateway.
    console.log("Donation submitted:", donationForm);

    await createDonationService(donationForm);

    toast.success(
      "Thank you for your generous donation! 🙏 Your support helps us make Rath Yatra 2025 a memorable event for everyone."
    );

    // Reset the form after submission
    setDonationForm({
      amount: "",
      category: "",
      name: "",
      email: "",
      phone: "",
      message: "",
      createdAt: new Date().toISOString(),
      status: "Pending", // Reset status to Pending
    });
  };

  const searchDonation = async (phone: string) => {
    if (!phone) {
      toast.error("Please enter a phone number to search.");
      return;
    } 
    const donation = await getDonationByPhone(phone);
    setSearchResults(donation);
  }

  const donationCategories = [
    {
      title: "Food and Supplies",
      description:
        "Support the distribution of food and essential supplies to devotees.",
      icon: Utensils,
    },
    {
      title: "Security and Safety",
      description:
        "Help us ensure the safety and security of all participants.",
      icon: Shield,
    },
    {
      title: "Community Support",
      description: "Contribute to community outreach and support programs.",
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Support Rath Yatra 2025
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your generous donations help us organize this sacred festival and
            serve millions of devotees. Every contribution, big or small, makes
            a difference.
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
                <CardDescription>
                  Choose your donation amount and category
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Quick Amount Selection */}
                <div>
                  <Label className="text-base font-medium mb-3 block">
                    Quick Amount Selection (CAD)
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["$25", "$50", "$100", "$250"].map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        className={`border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white transform hover:scale-105 transition-all duration-200 ${
                          donationForm.amount === amount.replace("$", "")
                            ? "bg-orange-600 text-white"
                            : ""
                        }`}
                        type="button"
                        onClick={() =>
                          setDonationForm((prev) => ({
                            ...prev,
                            amount: amount.replace("$", ""),
                          }))
                        }
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
                    value={donationForm.amount}
                    onChange={(e) =>
                      setDonationForm((prev) => ({
                        ...prev,
                        amount: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* Donation Category */}
                <div>
                  <Label className="text-base font-medium mb-3 block">
                    Donation Category
                  </Label>
                  <div className="grid gap-3">
                    {donationCategories.map((category, index) => (
                      <div
                        key={index}
                        className={`flex items-center space-x-3 p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                          donationForm.category === category.title
                            ? "bg-orange-50 border-orange-600"
                            : "border-orange-100 hover:bg-orange-50 hover:border-orange-600"
                        }`}
                        onClick={() =>
                          setDonationForm((prev) => ({
                            ...prev,
                            category: category.title,
                          }))
                        }
                      >
                        <input
                          type="radio"
                          name="category"
                          className="text-orange-600 focus:ring-orange-600"
                          checked={donationForm.category === category.title}
                          onChange={() =>
                            setDonationForm((prev) => ({
                              ...prev,
                              category: category.title,
                            }))
                          }
                        />
                        <category.icon className="h-5 w-5 text-orange-600" />
                        <div className="flex-1">
                          <p className="font-medium">{category.title}</p>
                          <p className="text-sm text-gray-600">
                            {category.description}
                          </p>
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
                      value={donationForm.name}
                      onChange={(e) =>
                        setDonationForm((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="mt-2 border-orange-200 focus:border-orange-600"
                      value={donationForm.email}
                      onChange={(e) =>
                        setDonationForm((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="+1 (709) 749-9280"
                    className="mt-2 border-orange-200 focus:border-orange-600"
                    value={donationForm.phone}
                    onChange={(e) =>
                      setDonationForm((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Share your thoughts or prayers..."
                    className="mt-2 border-orange-200 focus:border-orange-600"
                    value={donationForm.message}
                    onChange={(e) =>
                      setDonationForm((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                  />
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-orange-600 to-red-500 hover:from-red-500 hover:to-orange-600 text-lg py-6 shadow-lg transform hover:scale-105 transition-all duration-200"
                  onClick={submitDonation}
                >
                  <Heart className="mr-2 h-5 w-5" />
                  Donate Now
                </Button>

                <p className="text-sm text-gray-600 text-center">
                  Your donation is secure and tax-deductible. You will receive a
                  receipt via email.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Donation Progress */}
          <div className="space-y-6">
            <Card className="border-2 border-orange-100 hover:border-orange-600 transition-all duration-300 shadow-xl bg-gradient-to-b from-white to-orange-50/30">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Star className="h-5 w-5 text-orange-600" />
                  E-Transfer Details
                </CardTitle>
                <CardDescription>
                  You can e-transfer your donation securely.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Button
                    variant="outline"
                    className="border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white transition-all duration-200"
                    onClick={() => setShowEmail((prev) => !prev)}
                  >
                    {showEmail ? "Hide E-Transfer Email" : "Show E-Transfer Email"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Copy E-Transfer Email"
                    className="hover:bg-orange-100 ml-2"
                    onClick={() => {
                      navigator.clipboard.writeText("harekrishnastjohns108@gmail.com");
                      toast.success("E-Transfer email copied!");
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <rect x="9" y="9" width="13" height="13" rx="2" strokeWidth="2" stroke="currentColor" fill="none"/>
                      <rect x="3" y="3" width="13" height="13" rx="2" strokeWidth="2" stroke="currentColor" fill="none"/>
                    </svg>
                  </Button>
                  {showEmail && (
                    <div className="mt-4 text-orange-700 font-semibold break-all">
                      <div>harekrishnastjohns108@gmail.com</div>
                    </div>
                  )}
                  <p className="text-sm text-gray-600 mt-4">
                    Please use the above email for your e-transfer.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
              <Card className="border-2 border-orange-100 hover:border-orange-600 transition-all duration-300 shadow-xl bg-gradient-to-b from-white to-orange-50/30">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Search className="h-6 w-6 text-orange-600" />
                    Search Your Donation                    
                  </CardTitle>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex gap-2 items-end">
                    <div className="flex-1">
                      <Label htmlFor="searchName">
                        Enter your phone number to search donations
                      </Label>
                      <Input
                        id="searchName"
                        placeholder="phone number"
                        className="mt-2 border-orange-200 focus:border-orange-600"
                        value={searchPhone}
                        onChange={(e) => setSearchPhone(e.target.value)}
                      />
                    </div>
                    <Button
                      className="bg-orange-600 hover:bg-orange-700"
                      onClick={() => {
                        searchDonation(searchPhone);
                        setSearchPhone("");
                      }}
                    >
                      Search
                    </Button>
                  </div>
                  {searchResults && (
                    <div className="mt-6 p-4 border rounded-lg bg-orange-50 border-orange-200">
                      <h3 className="text-lg font-semibold mb-2 text-orange-700">Donation Details</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p><span className="font-medium">Name:</span> {searchResults.name}</p>
                          <p><span className="font-medium">Email:</span> {searchResults.email}</p>
                          <p><span className="font-medium">Phone:</span> {searchResults.phone}</p>
                          <p><span className="font-medium">Status:</span> {searchResults.status}</p>
                        </div>
                        <div>
                          <p><span className="font-medium">Amount:</span> ${searchResults.amount}</p>
                          <p><span className="font-medium">Category:</span> {searchResults.category}</p>
                          <p><span className="font-medium">Date:</span> {new Date(searchResults.createdAt ?? "").toLocaleString()}</p>
                          {searchResults.message && (
                            <p><span className="font-medium">Message:</span> {searchResults.message}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  
                </CardContent>
              </Card>
            </div>
        </div>
      </div>
    </div>
  );
}
