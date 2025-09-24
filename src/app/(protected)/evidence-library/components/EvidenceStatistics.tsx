// src/app/(protected)/evidence-library/components/EvidenceStatistics.tsx
import { Check, Clock, AlertTriangle, Folder } from "lucide-react";

const statistics = [
  {
    title: "Validated",
    value: 127,
    icon: Check,
    bgColor: "from-green-50 to-green-100",
    iconBg: "bg-green-500",
    textColor: "text-green-600",
    valueColor: "text-green-700",
  },
  {
    title: "Pending",
    value: 23,
    icon: Clock,
    bgColor: "from-yellow-50 to-yellow-100",
    iconBg: "bg-yellow-500",
    textColor: "text-yellow-600",
    valueColor: "text-yellow-700",
  },
  {
    title: "Expired",
    value: 2,
    icon: AlertTriangle,
    bgColor: "from-red-50 to-red-100",
    iconBg: "bg-red-500",
    textColor: "text-red-600",
    valueColor: "text-red-700",
  },
  {
    title: "Total Evidence",
    value: 152,
    icon: Folder,
    bgColor: "from-blue-50 to-blue-100",
    iconBg: "bg-blue-500",
    textColor: "text-blue-600",
    valueColor: "text-blue-700",
  },
];

export function EvidenceStatistics() {
  return (
    <section className="bg-white px-8 py-6 border-b border-gray-200">
      <div className="grid grid-cols-4 gap-6">
        {statistics.map((stat) => (
          <div
            key={stat.title}
            className={`bg-gradient-to-r ${stat.bgColor} rounded-lg p-4`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${stat.textColor}`}>
                  {stat.title}
                </p>
                <p className={`text-2xl font-bold ${stat.valueColor}`}>
                  {stat.value}
                </p>
              </div>
              <div className={`w-12 h-12 ${stat.iconBg} rounded-full flex items-center justify-center`}>
                <stat.icon className="text-white h-5 w-5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}