import CurrentOrderCard from "src/components/Profile/Dashboard/CurrentOrderCard";
import CurrentDesignCard from "src/components/Profile/Dashboard/CurrentDesginCard";
import orders from "src/data/orders";
import ProfileFeatureCard from "src/components/Profile/Dashboard/ProfileFeatureCard";
import { motion, Variants } from "framer-motion";

import Draw from "src/components/ui/icons/Draw";
import Upload from "src/components/ui/icons/Upload";
import Orders from "src/components/ui/icons/Orders";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.25, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const DashBoard = () => {
  const name = "Hares";
  const isLoading = false;

  return (
    <div className="mx-auto container space-y-5 lg:space-y-10">
      <div className="page-header flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold sm:text-3xl">
          Dashboard Overview
        </h1>
        <p className="text-base font-semibold text-gray-700 sm:text-lg">
          Welcome back, <span className="underline">{name}!</span>
        </p>
      </div>

      <div className="space-y-4 lg:space-y-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {isLoading ? (
            <div className="w-full">
              <Skeleton className="!h-[280px] w-full sm:!h-[300px]" />
            </div>
          ) : (
            <CurrentOrderCard order={orders[0]} />
          )}
          <CurrentDesignCard />
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          <motion.div variants={item} className="h-full">
            <ProfileFeatureCard
              Icon={<Draw />}
              title="Start New Design"
              subTitle="Begin creating your next custom blanket."
              buttonText="Create Design"
              to={"/profile/desgin"}
            />
          </motion.div>

          <motion.div variants={item} className="h-full">
            <ProfileFeatureCard
              Icon={<Upload />}
              title="Upload Photos"
              subTitle="Add new memories to your photo lab."
              buttonText="Let's Upload"
              to={"/profile/uploads"}
            />
          </motion.div>

          <motion.div variants={item} className="h-full">
            <ProfileFeatureCard
              Icon={<Orders />}
              title="Your Orders"
              subTitle="Track the status of your blanket orders."
              buttonText="View Orders"
              to="/profile/orders"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashBoard;
