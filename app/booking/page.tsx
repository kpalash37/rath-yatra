"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IBooking } from "@/lib/interfaces/booking.interface";
import { createBooking, getBookingByPhone } from "@/services/booking.service";
import {
  AlertCircle,
  Heart,
  Search,
  Shirt,
  ShirtIcon,
  Star,
} from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";

type Size = "S" | "M" | "L" | "XL";

const availableSizes: Size[] = ["S", "M", "L", "XL"];

export default function Page() {
  const [showEmail, setShowEmail] = useState(false);
  const [selectedSize, setSelectedSize] = useState<Size>("M");
  const [searchPhone, setSearchPhone] = useState("");
  const [bookings, setBookings] = useState([] as IBooking[]);

  // Modal state
  const [modalImg, setModalImg] = useState<string | null>(null);

  const [form, setForm] = useState<IBooking>({
    name: "",
    email: "",
    phone: "",
    address: "",
    size: "M",
    quantity: 1,
    notes: "",
    price: 11.0,
    paymentStatus: "pending",
    deliveryStatus: "pending",
    createdAt: new Date().toISOString(),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };

  const handleSizeSelect = (size: Size) => {
    setForm((prev) => ({ ...prev, size }));
    setSelectedSize(size);
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) {
      toast.error("Please fill in your name, phone, and email.");
      return;
    }

    if (form.name.trim()) {
      console.log("Booking form submitted:", form);
      await createBooking(form);
      setForm({
        name: "",
        email: "",
        phone: "",
        address: "",
        size: "M",
        quantity: 1,
        notes: "",
        price: 0,
        paymentStatus: "pending",
        deliveryStatus: "pending",
        createdAt: new Date().toISOString(),
      });
      setSelectedSize("M");
    }

    toast.success(`Thank you ${form.name} for booking a T-Shirt!`, {
      icon: <Heart className="h-4 w-4 text-red-500" />,
    });
  };

  const searchBookings = async (phoneNumber: string) => {
    if (!phoneNumber.trim()) {
      toast.error("Please enter a phone number to search.");
      return;
    }

    const foundBooking = await getBookingByPhone(phoneNumber);
    console.log("Found booking:", foundBooking);

    if (foundBooking) {
      toast.success(
        `Found ${foundBooking.length} booking(s) for "${phoneNumber}"`
      );
      setBookings(foundBooking);
    } else {
      toast.error(`No bookings found for "${phoneNumber}"`);
      setBookings([]);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Book Your T-Shirt
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join us in celebrating Rath Yatra 2025 with a special
              commemorative T-Shirt. Book your size now and be part of this
              grand festival!
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Donation Form */}
            <div className="lg:col-span-2">
              <Card className="border-2 border-orange-100 hover:border-orange-600 transition-all duration-300 shadow-xl bg-gradient-to-b from-white to-orange-50/30">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Shirt className="h-6 w-6 text-orange-600" />
                    Book Your T-Shirt
                    <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-orange-100 text-orange-700 border border-orange-300">
                      ${form.price} only
                    </span>
                  </CardTitle>
                  <CardDescription>
                    Choose your T-Shirt size and fill in your details to book
                    your T-Shirt for the Rath Yatra 2025.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Quick Amount Selection */}
                  <div>
                    <Label className="text-base font-medium mb-3 block">
                      Size
                    </Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {availableSizes.map((amount) => (
                        <Button
                          key={amount}
                          variant="outline"
                          className={`border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white transform hover:scale-105 transition-all duration-200 ${
                            selectedSize === amount
                              ? "bg-orange-600 text-white"
                              : ""
                          }`}
                          onClick={() => handleSizeSelect(amount)}
                        >
                          {amount}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Donor Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">
                        Full Name <span className="text-red-300">*</span>
                      </Label>
                      <Input
                        id="name"
                        placeholder="Your full name"
                        className="mt-2 border-orange-200 focus:border-orange-600"
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">
                        Email Address <span className="text-red-300">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        className={`mt-2 border-orange-200 focus:border-orange-600 ${
                          form.email &&
                          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
                            ? "border-red-400"
                            : ""
                        }`}
                        name="email"
                        value={form.email}
                        onChange={handleInputChange}
                      />
                      {form.email &&
                        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && (
                          <span className="text-xs text-red-500">
                            Please enter a valid email address.
                          </span>
                        )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">
                        Phone Number <span className="text-red-300">*</span>
                      </Label>
                      <Input
                        id="phone"
                        placeholder="+1 (709) 749-9280"
                        className="mt-2 border-orange-200 focus:border-orange-600"
                        name="phone"
                        value={form.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Quantity</Label>
                      <Input
                        id="Quantity"
                        placeholder="2"
                        value={form.quantity}
                        className="mt-2 border-orange-200 focus:border-orange-600"
                        name="quantity"
                        type="number"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">Payment Note</Label>
                    <Input
                      id="notes"
                      placeholder="note for payment"
                      value={form.notes}
                      className="mt-2 border-orange-200 focus:border-orange-600"
                      name="notes"
                      type="text"
                      onChange={handleInputChange}
                    />
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-orange-600 to-red-500 hover:from-red-500 hover:to-orange-600 text-lg py-6 shadow-lg transform hover:scale-105 transition-all duration-200"
                    onClick={handleBooking}
                  >
                    <ShirtIcon className="mr-2 h-5 w-5" />
                    Book Now
                  </Button>

                  <p className="text-sm text-gray-600 text-center">
                    Your booking is secure and you will receive a confirmation
                    via email.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Donation Progress */}
            <div className="space-y-6">
              <Card className="border-2 border-orange-100 hover:border-orange-600 transition-all duration-300 shadow-xl bg-gradient-to-b from-white to-orange-50/30">
                <CardHeader>
                  <CardTitle className="text-xl">
                    <Shirt className="h-5 w-5 text-orange-600" />
                    T-Shirt Preview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <span className="font-medium mb-2">Front</span>
                        <img
                          src="/images/tshirt-front.png"
                          alt="T-Shirt Front"
                          className="w-32 h-32 object-contain rounded shadow cursor-pointer border border-orange-200 hover:border-orange-600"
                          onClick={() =>
                            setModalImg("/images/tshirt-front.png")
                          }
                        />
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="font-medium mb-2">Back</span>
                        <img
                          src="/images/tshirt-back.png"
                          alt="T-Shirt Back"
                          className="w-32 h-32 object-contain rounded shadow cursor-pointer border border-orange-200 hover:border-orange-600"
                          onClick={() => setModalImg("/images/tshirt-back.png")}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Click image to enlarge
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-orange-100 hover:border-orange-600 transition-all duration-300 shadow-xl bg-gradient-to-b from-white to-orange-50/30">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Star className="h-5 w-5 text-orange-600" />
                  E-Transfer Details
                </CardTitle>
                <CardDescription>
                  You can e-transfer your payment securely.
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
                      if (typeof navigator !== "undefined" && navigator.clipboard) {
                        navigator.clipboard.writeText("palash.kuet@gmail.com");
                        toast.success("E-Transfer email copied!");
                      } else {
                        toast.error("Clipboard not available.");
                      }
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <rect x="9" y="9" width="13" height="13" rx="2" strokeWidth="2" stroke="currentColor" fill="none"/>
                      <rect x="3" y="3" width="13" height="13" rx="2" strokeWidth="2" stroke="currentColor" fill="none"/>
                    </svg>
                  </Button>
                  {showEmail && (
                    <div className="mt-4 text-orange-700 font-semibold break-all">
                      <div>palash.kuet@gmail.com</div>
                    </div>
                  )}
                  <p className="text-sm text-gray-600 mt-4">
                    Please use the above email for your e-transfer.
                  </p>
                </div>
              </CardContent>
            </Card>
            </div>

            {/* Search Bookings */}

            <div className="lg:col-span-2">
              <Card className="border-2 border-orange-100 hover:border-orange-600 transition-all duration-300 shadow-xl bg-gradient-to-b from-white to-orange-50/30">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Search className="h-6 w-6 text-orange-600" />
                    Search Your Booking
                    <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-orange-100 text-orange-700 border border-orange-300">
                      ${form.price} only
                    </span>
                  </CardTitle>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex gap-2 items-end">
                    <div className="flex-1">
                      <Label htmlFor="searchName">
                        Enter your phone number to search booking
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
                        searchBookings(searchPhone);
                        setSearchPhone("");
                      }}
                    >
                      Search
                    </Button>
                  </div>

                  {bookings.length > 0 ? (
                    <div className="mt-6 space-y-4">
                      {bookings.map((booking, idx) => (
                        <Card
                          key={idx}
                          className="border border-orange-200 bg-white/80 shadow-sm"
                        >
                          <CardContent className="py-4">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                              <div>
                                <div className="font-semibold text-orange-700">
                                  {booking.name}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {booking.email}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {booking.phone}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {booking.address}
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="inline-flex items-center px-2 py-1 rounded bg-orange-100 text-orange-700 text-xs font-medium">
                                  Size: {booking.size}
                                </span>
                                <span className="inline-flex items-center px-2 py-1 rounded bg-orange-100 text-orange-700 text-xs font-medium">
                                  Qty: {booking.quantity}
                                </span>
                                <span className="inline-flex items-center px-2 py-1 rounded bg-orange-100 text-orange-700 text-xs font-medium">
                                  Status: {booking.paymentStatus}
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-6 text-center text-gray-500 flex flex-col items-center gap-2">
                      <AlertCircle className="h-6 w-6 text-orange-400 mb-1" />
                      <span>
                        No bookings found. Please search using your phone
                        number.
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
        {/* Modal */}
        {modalImg && (
          <div
            onClick={() => setModalImg(null)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              cursor: "pointer",
            }}
          >
            <img
              src={modalImg}
              alt="Full T-Shirt"
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                boxShadow: "0 4px 32px rgba(0,0,0,0.5)",
                background: "#fff",
                borderRadius: 8,
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </>
  );
}
