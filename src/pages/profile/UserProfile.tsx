import OrdersTable from "src/components/Profile/UserProfile/OrdersTable";
import usePageTitle from "src/hooks/useUpdatePageTitle";
import UpdateInfoForm from "src/components/Profile/UserProfile/UpdateInfoForm";
const UserProfile = () => {
  usePageTitle("Collector Profile");
  return (
    <div className="mx-auto space-y-6">
      <div className="page-header flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold sm:text-3xl">
          Collector Profile
        </h1>
      </div>
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
