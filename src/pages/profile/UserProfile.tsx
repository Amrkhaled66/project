import OrdersTable from "src/components/Profile/UserProfile/OrdersTable";
import TransactionsTable from "src/components/Profile/UserProfile/TransactionsTable";
import UpdateInfoForm from "src/components/Profile/UserProfile/UpdateInfoForm";
const UserProfile = () => {
  return (
    <div className="space-y-6">
      <div className="page-header flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold sm:text-3xl">
          Account Information
        </h1>
      </div>
      <div className="space-y-6">
        <UpdateInfoForm />
        <div className="flex flex-col gap-6">
          <OrdersTable />
          <TransactionsTable />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
