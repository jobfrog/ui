// src/pages/NotFoundPage.tsx
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const NotFoundPage = () => {
  const navigate = useNavigate();

  // Animation variants for frog
  const jumpVariants = {
    initial: { y: 0 },
    jump: {
      y: [-20, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeOut",
      },
    },
  };

  // Animation variants for lily pads
  const floatVariants = {
    initial: { y: 0 },
    float: (i: number) => ({
      y: [-(i * 5), i * 5],
      transition: {
        duration: 2 + i * 0.5,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut",
      },
    }),
  };

  // Animation variants for flies
  const flyVariants = {
    initial: { x: 0, y: 0 },
    fly: (i: number) => ({
      x: [-(i * 15), i * 15],
      y: [-(i * 10), i * 10],
      transition: {
        duration: 2 + i * 0.3,
        repeat: Infinity,
        repeatType: "mirror" as const,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-b from-teal-50 to-blue-100 overflow-hidden p-4">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Water ripples */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`ripple-${i}`}
            className="absolute rounded-full border border-teal-200/40"
            style={{
              height: `${50 + i * 100}px`,
              width: `${50 + i * 100}px`,
              bottom: `${20 + Math.random() * 60}%`,
              left: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              scale: [1, 2],
              opacity: [0.7, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.8,
            }}
          />
        ))}

        {/* Lily pads */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`lilypad-${i}`}
            className="absolute rounded-full bg-green-500/40"
            style={{
              height: `${30 + Math.random() * 40}px`,
              width: `${30 + Math.random() * 40}px`,
              bottom: `${10 + Math.random() * 30}%`,
              left: `${10 + Math.random() * 80}%`,
            }}
            variants={floatVariants}
            initial="initial"
            animate="float"
            custom={i}
          />
        ))}

        {/* Flies */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`fly-${i}`}
            className="absolute"
            style={{
              top: `${20 + Math.random() * 30}%`,
              left: `${20 + Math.random() * 60}%`,
            }}
            variants={flyVariants}
            initial="initial"
            animate="fly"
            custom={i + 1}
          >
            <div className="h-2 w-2 bg-gray-800 rounded-full" />
            <div className="absolute -top-1 -left-2 h-1 w-3 bg-gray-500/50 rounded-full transform -rotate-45" />
            <div className="absolute -top-1 left-1 h-1 w-3 bg-gray-500/50 rounded-full transform rotate-45" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-md text-center">
        {/* 404 text with frog */}
        <div className="relative mb-6">
          <h1 className="text-9xl font-extrabold text-teal-600 tracking-widest">
            4<span className="inline-block relative">0</span>4
          </h1>

          {/* Frog in the "0" */}
          <motion.div
            className="absolute"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            variants={jumpVariants}
            initial="initial"
            animate="jump"
          >
            <div className="relative">
              {/* Frog body */}
              <div className="h-16 w-20 bg-green-500 rounded-full"></div>

              {/* Frog eyes */}
              <div className="absolute top-2 left-2 h-4 w-4 bg-white rounded-full">
                <div className="absolute top-0.5 left-0.5 h-2 w-2 bg-black rounded-full"></div>
              </div>
              <div className="absolute top-2 right-2 h-4 w-4 bg-white rounded-full">
                <div className="absolute top-0.5 left-0.5 h-2 w-2 bg-black rounded-full"></div>
              </div>

              {/* Frog mouth */}
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-green-700 rounded"></div>
            </div>
          </motion.div>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Oops! Looks like this lily pad doesn't exist
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Our frog seems to have hopped to the wrong pond. The page you're
          looking for has either been moved or never existed.
        </p>

        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
          <Button
            onClick={() => navigate("/")}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all"
          >
            Hop back home
          </Button>

          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="border-teal-600 text-teal-600 hover:bg-teal-50 px-6 py-3 rounded-full text-lg font-medium"
          >
            Take me out of here
          </Button>
        </div>
      </div>

      {/* Water surface */}
      <div className="absolute bottom-0 w-full h-20 bg-blue-400/20 backdrop-blur-sm" />
    </div>
  );
};

export default NotFoundPage;
