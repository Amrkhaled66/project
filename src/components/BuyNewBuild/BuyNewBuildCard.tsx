import { motion } from "framer-motion";
import { ArrowRight, Grid3X3, Ruler, Truck } from "lucide-react";

import Button from "src/components/ui/Button";
import { type BlanketSize } from "src/data/blanketSizes";
import priceFormmater from "src/utils/priceFormmater";
import { getBuyNewBuildShippingLabel } from "src/utils/buyNewBuild";

type BuyNewBuildCardProps = {
  index: number;
  isLoading: boolean;
  onCheckout: (size: BlanketSize) => void;
  size: BlanketSize;
};

const cardMotion = {
  hidden: { opacity: 0, y: 18 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, delay: index * 0.05 },
  }),
};

export default function BuyNewBuildCard({
  index,
  isLoading,
  onCheckout,
  size,
}: BuyNewBuildCardProps) {
  return (
    <motion.article
      custom={index}
      initial="hidden"
      animate="visible"
      variants={cardMotion}
      className="group hover:border-primary/20 relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(15,23,42,0.10)]"
    >
      <div className="bg-secondary absolute inset-x-0 top-0 h-1" />

      <div className="flex h-full flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="mt-1 truncate text-lg leading-snug font-bold text-[#0C2340] sm:text-xl">
              {size.name}
            </h2>

            <div className="mt-2 inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
              {size.rows}x{size.cols} grid
            </div>
          </div>

          <div className="shrink-0 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-right">
            <p className="text-[10px] font-medium text-slate-400">Price</p>
            <p className="mt-0.5 text-base leading-none font-bold text-[#0C2340] sm:text-lg">
              {priceFormmater(size.price)}
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-stretch divide-x divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
          <div className="flex flex-1 flex-col items-center gap-1.5 px-3 py-3.5 text-center">
            <Grid3X3 size={16} className="text-slate-400" />
            <p className="text-sm leading-none font-bold text-[#0C2340]">
              {size.rows} x {size.cols}
            </p>
            <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
              Footprint
            </p>
          </div>

          <div className="flex flex-1 flex-col items-center gap-1.5 px-3 py-3.5 text-center">
            <Ruler size={16} className="text-slate-400" />
            <p className="text-sm leading-none font-bold text-[#0C2340]">
              {size.width}x{size.height}
            </p>
            <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
              Dimensions
            </p>
          </div>

          <div className="flex flex-1 flex-col items-center gap-1.5 px-3 py-3.5 text-center">
            <Truck size={16} className="text-slate-400" />
            <p className="text-sm leading-none font-bold text-[#0C2340]">
              {priceFormmater(size.shippingPrice)}
            </p>
            <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
              {getBuyNewBuildShippingLabel(size.shippingPrice)}
            </p>
          </div>
        </div>

        <div className="mt-5 pt-1">
          <Button
            onClick={() => onCheckout(size)}
            isLoading={isLoading}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-2xl bg-[#0C2340] px-4 text-xs font-semibold text-white transition hover:bg-[#173a63] disabled:cursor-not-allowed disabled:opacity-70 sm:h-11 sm:text-sm"
          >
            Commission This Build
            {!isLoading && <ArrowRight size={15} />}
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
