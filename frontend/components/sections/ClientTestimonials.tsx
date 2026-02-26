"use client";

import { useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Mwangi",
    company: "Kilimanjaro Tours & Safaris",
    role: "Managing Director",
    content: "Ricrene Investment transformed our online presence completely. Our new website is beautiful, fast, and has increased our bookings by 40% in just three months. The team was professional and delivered on time.",
    rating: 5,
    image: "SM",
    service: "Website Development",
  },
  {
    id: 2,
    name: "John Ndege",
    company: "Pemba Spice Exporters",
    role: "CEO",
    content: "The custom business system they built for us has streamlined our entire export process. What used to take days now takes hours. The ROI was clear within the first month. Highly recommended!",
    rating: 5,
    image: "JN",
    service: "Business Automation",
  },
  {
    id: 3,
    name: "Amina Hassan",
    company: "Zanzibar Hospitality Group",
    role: "Operations Manager",
    content: "Their SEO and digital marketing services have been game-changing for us. We now appear on the first page of Google for our key search terms, and our website traffic has tripled. Excellent work!",
    rating: 5,
    image: "AH",
    service: "SEO & Marketing",
  },
  {
    id: 4,
    name: "Peter Kimaro",
    company: "Dar Construction Ltd",
    role: "Project Director",
    content: "The data analytics dashboard they created gives us real-time insights into all our projects. We can now make informed decisions quickly and track performance across all sites. Outstanding service!",
    rating: 5,
    image: "PK",
    service: "Data Analytics",
  },
  {
    id: 5,
    name: "Fatma Ali",
    company: "Coastal Events & Weddings",
    role: "Founder",
    content: "The digital invitation system has revolutionized how we manage events. Our clients love the modern approach, and we've reduced paper waste by 90%. The team's creativity and technical skills are impressive.",
    rating: 5,
    image: "FA",
    service: "Digital Solutions",
  },
  {
    id: 6,
    name: "Mohamed Juma",
    company: "Tanzania Trade Solutions",
    role: "IT Manager",
    content: "Our corporate email system is now secure, professional, and reliable. The migration was seamless, and the ongoing support has been excellent. No downtime, no issues - just great service.",
    rating: 5,
    image: "MJ",
    service: "Corporate Email",
  },
];

export function ClientTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full mb-4">
            <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-semibold text-red-700">Client Success Stories</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Don&apos;t just take our word for it - hear from businesses we&apos;ve helped transform
          </p>
        </div>

        {/* Testimonial Slider */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 md:p-12">
            {/* Rating Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* Testimonial Content */}
            <blockquote className="text-xl md:text-2xl text-gray-900 text-center mb-8 leading-relaxed font-medium">
              &quot;{testimonials[currentIndex].content}&quot;
            </blockquote>

            {/* Client Info */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                {testimonials[currentIndex].image}
              </div>
              <div className="text-center">
                <p className="font-bold text-gray-900 text-lg">{testimonials[currentIndex].name}</p>
                <p className="text-gray-600">{testimonials[currentIndex].role}</p>
                <p className="text-gray-500 text-sm">{testimonials[currentIndex].company}</p>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 rounded-full mt-2">
                  <span className="text-xs font-medium text-red-700">{testimonials[currentIndex].service}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-red-600 w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-red-600 mb-2">50+</div>
            <div className="text-sm text-gray-600">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-red-600 mb-2">100+</div>
            <div className="text-sm text-gray-600">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-red-600 mb-2">98%</div>
            <div className="text-sm text-gray-600">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-red-600 mb-2">5★</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
}