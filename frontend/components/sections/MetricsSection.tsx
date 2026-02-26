"use client";

import { useEffect, useRef, useState } from "react";

const metrics = {
  headline: "Delivering Results That Matter",
  stats: [
    {
      value: 100,
      displayValue: "100+",
      label: "Projects Delivered",
      description: "Successfully completed",
    },
    {
      value: 50,
      displayValue: "50+",
      label: "Happy Clients",
      description: "Across Tanzania",
    },
    {
      value: 5,
      displayValue: "5+",
      label: "Years Experience",
      description: "In IT solutions",
    },
    {
      value: 98,
      displayValue: "98%",
      label: "Client Satisfaction",
      description: "Average rating",
    },
  ],
};

export function MetricsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-linear-to-br from-red-600 via-red-700 to-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-400/20 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {metrics.headline}
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                {isVisible && (
                  <CountUpAnimation 
                    end={stat.value} 
                    displayValue={stat.displayValue}
                    duration={2000}
                  />
                )}
              </div>
              <div className="text-lg font-semibold text-red-100 mb-2">
                {stat.label}
              </div>
              <div className="text-sm text-red-200">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(5deg); }
          66% { transform: translate(-20px, 20px) rotate(-5deg); }
        }
        
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float 25s ease-in-out infinite;
          animation-delay: -10s;
        }
      `}</style>
    </section>
  );
}

// Simple count-up animation component
function CountUpAnimation({ 
  end, 
  displayValue, 
  duration 
}: { 
  end: number; 
  displayValue: string; 
  duration: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + duration;

    const timer = setInterval(() => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      // Easing function (ease-out)
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(eased * end);
      
      setCount(currentCount);

      if (now >= endTime) {
        setCount(end);
        clearInterval(timer);
      }
    }, 16); // ~60fps

    return () => clearInterval(timer);
  }, [end, duration]);

  // If displayValue contains non-numeric characters, show it as is when complete
  if (count >= end) {
    return <>{displayValue}</>;
  }

  return <>{count}</>;
}