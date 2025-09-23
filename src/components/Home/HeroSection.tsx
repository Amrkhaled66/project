import { motion } from "framer-motion";
import Button from "src/components/ui/Button";
import SunIcon from "../ui/icons/SunIcon";

const HeroSection = () => {
  return (
    <div className="bg-primary-50 flex h-screen flex-col items-center justify-center space-y-12 text-center px-4 sm:px-6 lg:px-8">
      <motion.div
        className="flex flex-col items-center gap-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <SunIcon />
        </motion.div>

        <motion.h1
          className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Create Your <br className="hidden sm:block" /> Perfect Blanket
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          Transform your memories into a beautiful custom <br className="hidden sm:block" />
          blanket with our easy-to-use design platform.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <Button className="px-12 py-3 text-lg sm:text-xl lg:px-28 lg:py-4">
          Start Your Blanket
        </Button>
      </motion.div>
    </div>
  );
};

export default HeroSection;
