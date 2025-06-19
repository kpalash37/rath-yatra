"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    image: "/images/banner 1.png",
    title: "The Sacred Three Chariots",
    description: "Lord Jagannath, Balabhadra, and Subhadra in their divine chariots",
  },
  {
    image: "/images/rath-yatra-chariots.jpg",
    title: "The Sacred Three Chariots",
    description: "Lord Jagannath, Balabhadra, and Subhadra in their divine chariots",
  },
  {
    image: "/images/rath-yatra-celebration.jpg",
    title: "Devotees in Divine Celebration",
    description: "Millions gather to witness the sacred journey",
  },
  {
    image: "/images/rath-yatra-garlands.jpg",
    title: "Decorated with Sacred Garlands",
    description: "Traditional marigold decorations adorning the chariots",
  },
]

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-orange-200">
      <div className="relative h-[400px] lg:h-[500px]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ${
              index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          >
            <Image src={slide.image || "/placeholder.svg"} alt={slide.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">{slide.title}</h3>
              <p className="text-white/90 drop-shadow-md">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-orange-600/80 text-white border border-white/30 backdrop-blur-sm"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-orange-600/80 text-white border border-white/30 backdrop-blur-sm"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-orange-600 shadow-lg scale-110" : "bg-white/50 hover:bg-white/70"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}
