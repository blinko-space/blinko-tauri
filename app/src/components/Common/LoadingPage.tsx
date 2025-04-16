import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const LoadingPage = () => {
  const [show, setShow] = useState(true);
  
  useEffect(() => {
    const minDisplayTime = 500;
    const startTime = Date.now();
    
    return () => {
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < minDisplayTime) {
        const remainingTime = minDisplayTime - elapsedTime;
        setTimeout(() => setShow(false), remainingTime);
      } else {
        setShow(false);
      }
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          className="fixed inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="rounded-3xl overflow-hidden">
            <video
              src="/loading.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] object-contain"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 