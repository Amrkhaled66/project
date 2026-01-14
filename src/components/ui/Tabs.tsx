import React from "react";

type TabItem = {
  key: string;
  label: string;
  icon?: React.ElementType;
  content: React.ReactNode;
};

const Tabs = ({
  tabs,
  activeTab,
  onChange,
}: {
  tabs: TabItem[];
  activeTab: string;
  onChange: (key: string) => void;
}) => {
  const active = tabs.find((t) => t.key === activeTab);

  return (
    <div className="space-y-4 border bg-white/70 p-6 shadow-md backdrop-blur-md rounded-2xl">
      {/* Tabs Header */}
      <div
        className="rounded-xl border-2 bg-white"
        style={{ borderColor: "#f3f4f6" }}
      >
        <div className="flex gap-1 p-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.key === activeTab;

            return (
              <button
                key={tab.key}
                onClick={() => onChange(tab.key)}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all
                  ${
                    isActive
                      ? "bg-primary text-white shadow-sm"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
              >
                {Icon && <Icon className="h-4 w-4" />}
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div
        className="rounded-xl border bg-white p-6 shadow-sm"
        style={{ borderColor: "#f3f4f6" }}
      >
        {active?.content}
      </div>
    </div>
  );
};

export default Tabs;
