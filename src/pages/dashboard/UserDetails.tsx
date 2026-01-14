import React, { useState } from "react";
import { useParams, useLocation, data } from "react-router-dom";
import AdminPageHeader from "src/components/admin/AdminPageHeader";
import { useAdminUserOverviewByIdQuery } from "src/hooks/queries/admin/userMangment.queries";
import {
  User,
  Mail,
  Phone,
  Upload,
  ShoppingBag,
  Palette,
  DollarSign,
} from "lucide-react";
import Tabs from "src/components/ui/Tabs";
import UserUploads from "src/components/admin/userMangment/userDetails/UserUploads";
import priceFormmater from "src/utils/priceFormmater";
const StatCard = ({
  title,
  value,
  icon: Icon,
  iconBg,
  iconColor,
}: {
  title: string;
  value: string | number;
  icon: any;
  iconBg: string;
  iconColor: string;
}) => {
  return (
    <div
      className="group relative overflow-hidden rounded-xl border bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md"
      style={{ borderColor: "#f3f4f6" }}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium" style={{ color: "#a098ae" }}>
            {title}
          </p>
          <p className="text-2xl font-semibold" style={{ color: "#002051" }}>
            {value}
          </p>
        </div>
        <div
          className="flex h-11 w-11 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-110"
          style={{ backgroundColor: iconBg }}
        >
          <Icon className="h-5 w-5" style={{ color: iconColor }} />
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <div
      className="flex items-center justify-between border-b py-2 last:border-b-0"
      style={{ borderColor: "#f3f4f6" }}
    >
      <span className="text-sm font-medium" style={{ color: "#565e6d" }}>
        {label}
      </span>
      <span className="text-sm font-semibold" style={{ color: "#002051" }}>
        {value}
      </span>
    </div>
  );
};

const UserDetails = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const stateData = location.state as { user: any; stats: any } | undefined;

  const hasPrefetchedData = !!stateData?.user;

  const { data, isLoading } = useAdminUserOverviewByIdQuery(id!, {
    enabled: !hasPrefetchedData,
  }) as { data?: { user: any; stats: any }; isLoading: boolean };

  const user = hasPrefetchedData ? stateData!.user : data?.user;
  const stats = hasPrefetchedData ? stateData!.stats : data?.stats;

  if (!user || !stats || isLoading) {
    return (
      <div className="py-20 text-center" style={{ color: "#a098ae" }}>
        Loading user details…
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="User Details"
        subtitle="Overview of user account and activity"
        icon={User}
      />

      {/* User Profile Card */}
      <div
        className="overflow-hidden rounded-2xl border bg-white shadow-sm"
        style={{ borderColor: "#f3f4f6" }}
      >
        {/* Header Section with Primary Color */}
        <div
          className="p-6 pb-20"
          style={{
            background: "linear-gradient(135deg, #002051 0%, #003875 100%)",
          }}
        >
          <div className="flex items-center gap-4">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-xl shadow-lg"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
            >
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                {user.firstName} {user.lastName}
              </h2>
              <p className="mt-0.5 text-sm text-white/80">User Account</p>
            </div>
          </div>
        </div>

        {/* Contact Info Cards */}
        <div className="-mt-12 grid gap-3 px-6 pb-6 sm:grid-cols-2">
          <div
            className="flex items-center gap-3 rounded-xl border bg-white p-4 shadow-md"
            style={{ borderColor: "#f3f4f6" }}
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{ backgroundColor: "#ebf3ff" }}
            >
              <Mail className="h-5 w-5" style={{ color: "#002051" }} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium" style={{ color: "#a098ae" }}>
                Email
              </p>
              <p
                className="truncate text-sm font-semibold"
                style={{ color: "#002051" }}
              >
                {user.email}
              </p>
            </div>
          </div>

          <div
            className="flex items-center gap-3 rounded-xl border bg-white p-4 shadow-md"
            style={{ borderColor: "#f3f4f6" }}
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{ backgroundColor: "#ebf3ff" }}
            >
              <Phone className="h-5 w-5" style={{ color: "#002051" }} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium" style={{ color: "#a098ae" }}>
                Phone
              </p>
              <p className="text-sm font-semibold" style={{ color: "#002051" }}>
                {user.phone || "Not provided"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Uploads"
          value={stats.uploads}
          icon={Upload}
          iconBg="#e0f2fe"
          iconColor="#0284c7"
        />
        <StatCard
          title="Orders"
          value={stats.orders}
          icon={ShoppingBag}
          iconBg="#d1fae5"
          iconColor="#059669"
        />
        <StatCard
          title="Designs"
          value={stats.designs}
          icon={Palette}
          iconBg="#e9d5ff"
          iconColor="#9333ea"
        />
        <StatCard
          title="Total Spent"
          value={`${priceFormmater(stats.totalSpent)}`}
          icon={DollarSign}
          iconBg="#fef3c7"
          iconColor="#d97706"
        />
      </div>

      {/* Account Information Grid */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Account Details */}
        <div
          className="rounded-xl border bg-white p-6 shadow-sm"
          style={{ borderColor: "#f3f4f6" }}
        >
          <h3
            className="mb-4 text-lg font-semibold"
            style={{ color: "#002051" }}
          >
            Account Information
          </h3>
          <div className="space-y-0">
            <InfoRow label="User ID" value={user.id.slice(0, 8) + "..."} />
            <InfoRow label="Member Since" value={formatDate(user.createdAt)} />
            <InfoRow label="Account Status" value="Active" />
          </div>
        </div>

        {/* Activity Summary */}
        <div
          className="rounded-xl border bg-white p-6 shadow-sm"
          style={{ borderColor: "#f3f4f6" }}
        >
          <h3
            className="mb-4 text-lg font-semibold"
            style={{ color: "#002051" }}
          >
            Activity Summary
          </h3>
          <div className="space-y-0">
            <InfoRow label="Total Orders" value={stats.orders.toString()} />
            <InfoRow label="Total Uploads" value={stats.uploads.toString()} />
            <InfoRow
              label="Last Order"
              value={
                stats.lastOrderAt
                  ? formatDate(stats.lastOrderAt)
                  : "No orders yet"
              }
            />
          </div>
        </div>
      </div>

      <Tabs
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          // {
          //   key: "orders",
          //   label: "Orders",
          //   icon: ShoppingBag,
          //   content: <div>Orders component goes here</div>,
          // },
          {
            key: "uploads",
            label: "Uploads",
            icon: Upload,
            content: <UserUploads />,
          },
        ]}
      />
    </div>
  );
};

export default UserDetails;
