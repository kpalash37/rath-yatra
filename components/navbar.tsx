"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Heart, MapPin, Shirt } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

export function Navbar() {
   const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter();

  const handleBookingClick = (path:string) => {
    router.push(path)
  }

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Schedule", href: "/schedule" },
    { name: "Route Map", href: "/route" },
    { name: "Live Stream", href: "/live" },
    { name: "Register", href: "/register" },
    { name: "Devotees", href: "/devotees" },
    // { name: "Tasks", href: "/tasks" },
    //{ name: "Donate", href: "/donate" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-orange-200">
      <div className="container mx-auto px-4">
      <div className="flex justify-between items-center h-16">
        <Link href="/" className="flex items-center space-x-2 group">
        <div className="w-8 h-8 bg-gradient-to-br from-orange-600 to-red-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200">
          <span className="text-white font-bold text-lg">🛕</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          Rath Yatra 2025
          </span>
          <div className="flex items-center gap-1 text-xs text-gray-600">
          <MapPin className="h-3 w-3" />
          <span>St. John's, NL</span>
          </div>
        </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
        {navigation.map((item) => {
          //console.log("Current Path:", typeof window !== "undefined" , window.location.pathname , "item.href:", item.href);
          return (
          <Link
            key={item.name}
            href={item.href}
            className={`transition-colors font-medium relative group ${
            pathname === item.href
              ? "text-orange-600 font-bold"
              : "text-gray-700 hover:text-orange-600"
            }`}
          >
            {item.name}
            <span
            className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-orange-600 to-red-500 transition-all duration-300 ${
              pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
            }`}
            ></span>
          </Link>
          );
        })}
        <Button className="bg-gradient-to-r from-orange-600 to-red-500 hover:from-red-500 hover:to-orange-600 shadow-lg transform hover:scale-105 transition-all duration-200" 
          onClick={() => handleBookingClick("/donate")}>
          <Heart className="mr-2 h-4 w-4" />
          Donate Now
        </Button>
        <Button
          className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-red-500 hover:to-yellow-400 shadow-lg transform hover:scale-110 transition-all duration-300 animate-pulse border-2 border-yellow-300"
          style={{
          boxShadow: "0 4px 20px 0 rgba(255,140,0,0.25)",
          }}
          onClick={() => handleBookingClick("/booking")}
        >
          <Shirt className="mr-2 h-4 w-4 text-yellow-300 animate-bounce" />
          <span className="font-bold text-white drop-shadow-md">Book Now</span>
        </Button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="hover:bg-orange-100">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden py-4 border-t border-orange-200 bg-white/95 backdrop-blur-md">
        <div className="flex flex-col space-y-4">
          {navigation.map((item) => {
          const isActive = typeof window !== "undefined" && window.location.pathname === item.href;
          return (
            <Link
            key={item.name}
            href={item.href}
            className={`transition-colors font-medium px-2 py-1 rounded ${
              pathname === item.href
              ? "text-orange-600 font-bold bg-orange-50"
              : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
            }`}
            onClick={() => setIsOpen(false)}
            >
            {item.name}
            </Link>
          );
          })}
          <Button className="bg-gradient-to-r from-orange-600 to-red-500 hover:from-red-500 hover:to-orange-600 shadow-lg transform hover:scale-105 transition-all duration-200" 
          onClick={() => handleBookingClick("/donate")}>
          <Heart className="mr-2 h-4 w-4" />
          Donate Now
        </Button>
        <Button
          className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-red-500 hover:to-yellow-400 shadow-lg transform hover:scale-110 transition-all duration-300 animate-pulse border-2 border-yellow-300"
          style={{
          boxShadow: "0 4px 20px 0 rgba(255,140,0,0.25)",
          }}
          onClick={() => handleBookingClick("/booking")}
        >
          <Shirt className="mr-2 h-4 w-4 text-yellow-300 animate-bounce" />
          <span className="font-bold text-white drop-shadow-md">Book Now</span>
        </Button>
        </div>
        </div>
      )}
      </div>
    </nav>
  )
}
