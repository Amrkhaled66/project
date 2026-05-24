import { motion } from "framer-motion";

export type TabId =
  | "size"
  | "materials"
  | "elements"
  | "script"
  | "corners"
  | "customPanel";

export interface Tab {
  id: TabId;
  label: string;
  component: React.ReactNode;
  isActive: boolean;
}

/* -------------------------------------------------------------------------- */
/* UI Components                                                              */
/* -------------------------------------------------------------------------- */
const TabButton = ({
  tab,
  isActive,
  onClick,
}: {
  tab: Tab;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`animate relative py-2 text-sm font-medium text-nowrap`}
  >
    {tab.label}
    {isActive && (
      <motion.div
        layoutId="activeTabUnderline"
        className="bg-secondary absolute right-0 bottom-0 left-0 h-[2px] rounded-full"
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    )}
  </button>
);
export default TabButton;
