import { motion } from "framer-motion";

const FeatureCard = ({
  Icon,
  title,
  subTitle,
}: {
  Icon: React.ReactNode;
  title: string;
  subTitle: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5, 
      }}
      className="flex flex-col items-center justify-center gap-y-6 p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-all"
    >
      <div className="text-gray-700">
        {Icon}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">{subTitle}</p>
    </motion.div>
  );
};

export default FeatureCard;
