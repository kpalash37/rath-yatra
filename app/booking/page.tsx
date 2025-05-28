'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, Heart, Shirt, ShirtIcon, Star } from 'lucide-react';
import React, { useState } from 'react';

type Size = 'S' | 'M' | 'L' | 'XL';

const availableSizes: Size[] = ['S', 'M', 'L', 'XL'];

const tShirtBookings = [
    { name: 'Alice', size: 'M' },
    { name: 'Bob', size: 'L' },
    { name: 'Charlie', size: 'XL' },
];

export default function Page() {
    const [selectedSize, setSelectedSize] = useState<Size>('M');
    const [name, setName] = useState('');
    const [bookings, setBookings] = useState(tShirtBookings);

    // Modal state
    const [modalImg, setModalImg] = useState<string | null>(null);

    const handleBooking = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            setBookings([...bookings, { name, size: selectedSize }]);
            setName('');
        }
    };

    return (
<>
<div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Book Your T-Shirt</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join us in celebrating Rath Yatra 2025 with a special commemorative T-Shirt. Book your size now and be part of this grand festival!
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
                </CardTitle>
                <CardDescription>
                    Choose your T-Shirt size and fill in your details to book your T-Shirt for the Rath Yatra 2025.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Quick Amount Selection */}
                <div>
                  <Label className="text-base font-medium mb-3 block">Size</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {availableSizes.map((amount) => (
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
                  <Label htmlFor="phone">Quantity</Label>
                  <Input
                    id="Quantity"
                    placeholder="2"
                    value={1}
                    className="mt-2 border-orange-200 focus:border-orange-600"
                  />
                </div>

                

                <Button className="w-full bg-gradient-to-r from-orange-600 to-red-500 hover:from-red-500 hover:to-orange-600 text-lg py-6 shadow-lg transform hover:scale-105 transition-all duration-200">
                  <ShirtIcon className="mr-2 h-5 w-5" />
                  Book Now
                </Button>

                <p className="text-sm text-gray-600 text-center">
                    Your booking is secure and you will receive a confirmation via email.
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
                                onClick={() => setModalImg('/images/tshirt-front.png')}
                            />
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="font-medium mb-2">Back</span>
                            <img
                                src="/images/tshirt-back.png"
                                alt="T-Shirt Back"
                                className="w-32 h-32 object-contain rounded shadow cursor-pointer border border-orange-200 hover:border-orange-600"
                                onClick={() => setModalImg('/images/tshirt-back.png')}
                            />
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Click image to enlarge</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-100 hover:border-orange-600 transition-all duration-300 shadow-xl bg-gradient-to-b from-white to-orange-50/30">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Star className="h-5 w-5 text-orange-600" />
                 QR code for payment    
                </CardTitle>
                <CardDescription>
                    Scan the QR code to make your payment securely and easily.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                    <img
                        src="/images/qr-code.png"
                        alt="QR Code for Payment"
                        className="w-48 h-48 object-contain mx-auto rounded shadow cursor-pointer border border-orange-200 hover:border-orange-600"
                        onClick={() => setModalImg('/images/qr-code.png')}
                    />
                    <p className="text-sm text-gray-600 mt-4">Scan to pay</p>
                  
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>

        <div style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>           

            {/* Modal */}
            {modalImg && (
                <div
                    onClick={() => setModalImg(null)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        background: 'rgba(0,0,0,0.7)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                        cursor: 'pointer'
                    }}
                >
                    <img
                        src={modalImg}
                        alt="Full T-Shirt"
                        style={{
                            maxWidth: '90vw',
                            maxHeight: '90vh',
                            boxShadow: '0 4px 32px rgba(0,0,0,0.5)',
                            background: '#fff',
                            borderRadius: 8
                        }}
                        onClick={e => e.stopPropagation()}
                    />
                </div>
            )}           
           
        </div>
        
</>
    );
}