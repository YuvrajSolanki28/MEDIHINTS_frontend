import { StarIcon, HeartIcon, AwardIcon } from "lucide-react";
import React from "react";
import { Carousel } from 'react-responsive-carousel';
import { motion } from "framer-motion";
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function AboutUs() {
  const quotes = [
    {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque felis vitae tortor augue. Velit nascetur Consequat faucibus porttitor enim et.",
      author: "John Doe",
    },
    {
      text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.",
      author: "Jane Smith",
    },
    {
      text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias.",
      author: "Mike Johnson",
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section with Slide-up Animation */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }} 
        className="relative h-[300px] mb-16"
      >
        <img src="/aboutus1.png" alt="Medical team" className="w-full h-full object-cover brightness-50" />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8">
          <h1 className="text-5xl text-white font-bold">About us</h1>
        </div>
      </motion.div>

      {/* Info Section with Fade-in and Staggered Animation */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } }
        }}
        className="max-w-7xl mx-auto px-4 md:px-8 mb-16"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.img 
            src="/aboutus2.png" 
            alt="Medical professionals" 
            className="rounded-lg w-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />

          <motion.div>
            <motion.span 
              className="text-blue-600 font-medium"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              WELCOME TO HOSPITAL NAME
            </motion.span>
            <motion.h2 
              className="text-4xl font-bold mt-2 mb-8 text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Best Care for Your Good Health
            </motion.h2>

            {/* Animated List */}
            <motion.div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[ 
                { icon: <HeartIcon className="w-5 h-5 text-blue-600" />, text: "A Passion for Healing" },
                { icon: <StarIcon className="w-5 h-5 text-blue-600" />, text: "5-Star Care" },
                { icon: <HeartIcon className="w-5 h-5 text-blue-600" />, text: "All our best" },
                { icon: <StarIcon className="w-5 h-5 text-blue-600" />, text: "Believe in Us" },
                { icon: <HeartIcon className="w-5 h-5 text-blue-600" />, text: "Always Caring" },
                { icon: <AwardIcon className="w-5 h-5 text-blue-600" />, text: "A Legacy of Excellence" }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {item.icon}
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.p className="text-gray-600 mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare.
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      {/* Testimonials with Fade-in and Slide-in Animation */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }} 
        className="w-full min-h-[600px] relative flex items-center justify-center px-4 py-20"
      >
        <div className="absolute inset-0 w-full h-full" style={{
          backgroundImage: "url('/aboutus3.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }} />
        <div className="absolute inset-0 bg-slate-900/80" />
        <div className="max-w-3xl mx-auto text-center relative z-10 w-full">
          <Carousel showArrows={true} autoPlay interval={3000} infiniteLoop={true} showStatus={false}>
            {quotes.map((ele, ind) => (
              <motion.div 
                className="w-full h-full flex flex-col items-center text-center"
                key={ind}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: ind * 0.2 }}
              >
                <div className="relative mb-8">
                  <span className="text-6xl text-white opacity-20 absolute -top-8 left-1/2 transform -translate-x-1/2">"</span>
                  <p className="text-white text-lg md:text-2xl leading-relaxed px-4 md:px-12">{ele.text}</p>
                </div>
                <div className="mb-12">
                  <h3 className="text-white text-xl font-medium">{ele.author}</h3>
                </div>
              </motion.div>
            ))}
          </Carousel>
        </div>
      </motion.div>
    </div>
  );
}
