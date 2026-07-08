import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { BuyNewBuildGrid } from "src/components/BuyNewBuild";
import PageHeader from "src/components/ui/PageHeader";
import Toast from "src/components/ui/Toast";
import { type BlanketSize } from "src/data/blanketSizes";
import { useCreatePremiumBuildInvoice } from "src/hooks/queries/invoice.queries";
import usePageTitle from "src/hooks/useUpdatePageTitle";
import {
  getBuyNewBuildErrorMessage,
  getBuyNewBuildKey,
} from "src/utils/buyNewBuild";

export default function BuyNewBuildRoute() {
  usePageTitle("Buy New Build");

  const createPremiumBuildInvoice = useCreatePremiumBuildInvoice();
  const [selectedBuild, setSelectedBuild] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("canceled") === "1") {
      Toast("Checkout was canceled. No charge was made.", "warning");
    }
  }, []);

  const handleCheckout = async (size: BlanketSize) => {
    const build = getBuyNewBuildKey(size);
    setSelectedBuild(build);

    try {
      const data = await createPremiumBuildInvoice.mutateAsync({ build });

      if (!data?.paymentUrl) {
        throw new Error("Checkout URL was not returned");
      }

      window.location.href = data.paymentUrl;
    } catch (error) {
      Toast(getBuyNewBuildErrorMessage(error), "error");
      setSelectedBuild(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24 }}
      className="mx-auto space-y-6"
    >
      <PageHeader
        title="Buy New Build"
        subtitle="Choose a size and continue to checkout."
      />

      <BuyNewBuildGrid
        isPending={createPremiumBuildInvoice.isPending}
        onCheckout={handleCheckout}
        selectedBuild={selectedBuild}
      />
    </motion.div>
  );
}
