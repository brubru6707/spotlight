"use client";
import React from "react";
import { motion } from "framer-motion";

export const TestimonialsColumn = (props) => {
  const { className, testimonials, duration = 10 } = props;
  
  return (
    <div className={className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2).fill(0)].map((_, index) => (
          <React.Fragment key={index}>
            {testimonials.map(({ text, image, name, role }, i) => (
              <motion.div
                key={`${index}-${i}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 rounded-3xl border border-gray-200 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-xs w-full"
              >
                <div className="text-gray-700 text-sm leading-relaxed">{text}</div>
                <div className="flex items-center gap-3 mt-5">
                  <img
                    width={44}
                    height={44}
                    src={image}
                    alt={name}
                    className="h-11 w-11 rounded-full object-cover ring-2 ring-gray-100"
                  />
                  <div className="flex flex-col">
                    <div className="font-semibold text-gray-900 tracking-tight leading-5">{name}</div>
                    <div className="text-sm text-gray-500 tracking-tight">{role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};
