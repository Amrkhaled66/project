import TrackOrder from "src/components/Profile/Orders/TrackOrder";
import PreviousOrder from "src/components/Profile/Orders/PreviousOrder";
import PageHeader from "src/components/ui/PageHeader";
import usePageTitle from "src/hooks/useUpdatePageTitle";

const Orders = () => {
  usePageTitle("Your Builds");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Commission Archive™"
        subtitle="Track your commissioned Jersey Blanket™ builds and review their progress from placement through production."
      />

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <TrackOrder />
        <PreviousOrder />
      </div>
    </div>
  );
};

export default Orders;
