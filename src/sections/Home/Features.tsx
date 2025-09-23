import { motion } from "framer-motion";
import FeatureCard from "src/components/Home/Features/FeatureCard";
import FastDelivery from "src/components/ui/icons/FastDelivery";
import Upload from "src/components/ui/icons/Upload";
import Preview from "src/components/ui/icons/Preview";

const FeaturesData = [
  {
    icon: <Upload />,
    title: "Easy Upload",
    subTitle:
      "Upload up to 150 photos from your device or our photo lab with ease and speed.",
  },
  {
    icon: <Preview />,
    title: "Easy Preview",
    subTitle:
      "Real-time preview with multiple size and upgrade options to personalize your blanket.",
  },
  {
    icon: <FastDelivery />,
    title: "Fast Delivery",
    subTitle:
      "Track your order from design to delivery, ensuring your custom blanket arrives quickly.",
  },
];

const Features = () => {
  return (
    <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {FeaturesData.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.2,
              duration: 0.5,
            }}
          >
            <FeatureCard
              Icon={feature.icon}
              title={feature.title}
              subTitle={feature.subTitle}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Features;
