import OrdersTable from "src/components/Profile/UserProfile/OrdersTable";
import usePageTitle from "src/hooks/useUpdatePageTitle";
import UpdateInfoForm from "src/components/Profile/UserProfile/UpdateInfoForm";
import PageHeader from "src/components/ui/PageHeader";

const UserProfile = () => {
  usePageTitle("Collector Profile");

  return (
    <div className="mx-auto space-y-6">
      <PageHeader
        title="Collector Profile"
        subtitle="Manage your account details and review the latest activity across your commissioned builds."
      />

      <div className="space-y-6">
        <UpdateInfoForm />

        <div className="flex flex-col gap-6">
          <OrdersTable />
          {/* <TransactionsTable /> */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
