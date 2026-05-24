import CurrentOrderCard from "src/components/Profile/Dashboard/CurrentOrderCard";
import CurrentDesignCard from "src/components/Profile/Dashboard/CurrentDesginCard";
import ProfileFeatureCard from "src/components/Profile/Dashboard/ProfileFeatureCard";
import { motion, Variants } from "framer-motion";

import Draw from "src/components/ui/icons/Draw";
import Upload from "src/components/ui/icons/Upload";
import Orders from "src/components/ui/icons/Orders";
import usePageTitle from "src/hooks/useUpdatePageTitle";
import PageHeader from "src/components/ui/PageHeader";
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
  usePageTitle("Atelier");
  return (
    <div className="mx-auto space-y-5 lg:space-y-10">
      <PageHeader
        title="Private Atelier™ Lobby"
        subtitle="Your exclusive creative suite for bespoke textile architecture and commission management. Start a new blueprint or review your archive."
      />

      <div className="space-y-4 lg:space-y-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <CurrentOrderCard />
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
              title="Draft New Blueprint™"
              subTitle="Begin drafting the structural Blueprint™ for your next Jersey Blanket™ build."
              buttonText="Draft Blueprint™"
              to={"/profile/design-library"}
            />
          </motion.div>

          <motion.div variants={item} className="h-full">
            <ProfileFeatureCard
              Icon={<Upload />}
              title="Photo Lab™"
              subTitle="Upload reference images and story moments for your collection."
              buttonText="Enter Photo Lab™"
              to={"/profile/uploads"}
            />
          </motion.div>

          <motion.div variants={item} className="h-full">
            <ProfileFeatureCard
              Icon={<Orders />}
              title="Your Commissions"
              subTitle="Track the progress of your commissioned Jersey Blanket™ builds."
              buttonText="View Commissions"
              to="/profile/orders"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashBoard;
