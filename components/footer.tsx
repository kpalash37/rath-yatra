import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-600 via-red-500 to-orange-600"></div>
      <div className="absolute top-4 right-4 w-20 h-20 bg-orange-600/10 rounded-full"></div>
      <div className="absolute bottom-4 left-4 w-16 h-16 bg-red-500/10 rounded-full"></div>

      <div className="relative container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-600 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold">🛕</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-400 bg-clip-text text-transparent">
                Rath Yatra 2025
              </span>
            </div>
            <p className="text-gray-300">
              Experience the divine journey of Lord Jagannath, Balabhadra, and Subhadra in the most sacred festival of
              chariots.
            </p>
            {/* <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-300 hover:text-orange-600 transition-colors transform hover:scale-110 duration-200"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-300 hover:text-orange-600 transition-colors transform hover:scale-110 duration-200"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-300 hover:text-orange-600 transition-colors transform hover:scale-110 duration-200"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-300 hover:text-orange-600 transition-colors transform hover:scale-110 duration-200"
              >
                <Youtube className="h-5 w-5" />
              </Link>
            </div> */}
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-orange-600">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/schedule" className="block text-gray-300 hover:text-orange-600 transition-colors">
                Event Schedule
              </Link>
              <Link href="/route" className="block text-gray-300 hover:text-orange-600 transition-colors">
                Route Map
              </Link>
              <Link href="/live" className="block text-gray-300 hover:text-orange-600 transition-colors">
                Live Stream
              </Link>
              <Link href="/register" className="block text-gray-300 hover:text-orange-600 transition-colors">
                Volunteer Registration
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-orange-600">Services</h3>
            <div className="space-y-2">
              <Link href="/donate" className="block text-gray-300 hover:text-orange-600 transition-colors">
                Donations
              </Link>
              <Link href="/accommodation" className="block text-gray-300 hover:text-orange-600 transition-colors">
                Accommodation
              </Link>
              <Link href="/prasadam" className="block text-gray-300 hover:text-orange-600 transition-colors">
                Prasadam Distribution
              </Link>
              <Link href="/tasks" className="block text-gray-300 hover:text-orange-600 transition-colors">
                Task Guidelines
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-orange-600">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-orange-600" />
                <span className="text-gray-300">+1 (709) 749-9280</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-orange-600" />
                <span className="text-gray-300">info@rathyatra2025.org</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-orange-600 mt-1" />
                <span className="text-gray-300">
                  284 Freshwater Road
                  <br />
                  St. John's, NL A1B 1C2
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2025 Rath Yatra Festival. St. John's, NL. All rights reserved. |
            <Link
              href="https://techexpan.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 hover:text-red-400 hover:underline ml-1 transition-colors"
            >
              Developed by{" "}
              <span className="font-semibold">Tech Expan</span>
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
