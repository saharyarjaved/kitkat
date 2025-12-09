"use client";

import { useParallax } from "@/hooks/use-parallax";

export const FloatingShapes = () => {
  const scrollY = useParallax();

  const shapes = [
    {
      id: 1,
      size: "w-72 h-72",
      position: "top-20 left-10",
      gradient: "from-red-600 to-red-800", // classic KitKat red
    },
    {
      id: 2,
      size: "w-96 h-96",
      position: "top-1/3 right-10",
      gradient: "from-rose-500 to-red-600", // soft red glow
    },
    {
      id: 3,
      size: "w-64 h-64",
      position: "bottom-20 left-1/4",
      gradient: "from-red-700 to-rose-700", // deep wrapper red
    },
    {
      id: 4,
      size: "w-80 h-80",
      position: "bottom-1/3 right-1/4",
      gradient: "from-red-500 to-red-700", // energetic highlight
    },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className={`absolute ${shape.size} ${shape.position}
          bg-gradient-to-br ${shape.gradient}
          rounded-full blur-3xl opacity-20 animate-pulse`}
          style={{
            transform: `translateY(${scrollY * 0.45}px) rotate(${scrollY * 0.08}deg)`,
          }}
        />
      ))}
    </div>
  );
};
