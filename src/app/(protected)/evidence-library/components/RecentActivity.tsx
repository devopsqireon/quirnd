// src/app/(protected)/evidence-library/components/RecentActivity.tsx
import { Button } from "@/components/ui/button";
import { Check, Upload, Link, AlertTriangle, Download } from "lucide-react";

const activities = [
  {
    id: "1",
    type: "validation",
    icon: Check,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    action: "validated",
    item: "ISO 27001 Information Security Policy",
    user: "Sarah Johnson",
    time: "2 hours ago",
  },
  {
    id: "2",
    type: "upload",
    icon: Upload,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    action: "uploaded",
    item: "Network Security Assessment Report",
    user: "Mike Chen",
    time: "4 hours ago",
  },
  {
    id: "3",
    type: "link",
    icon: Link,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    action: "linked evidence to control",
    item: "A.12.6.1",
    user: "Lisa Rodriguez",
    time: "6 hours ago",
  },
  {
    id: "4",
    type: "alert",
    icon: AlertTriangle,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    action: "System alert:",
    item: "SSL Certificate expires in 30 days",
    user: null,
    time: "8 hours ago",
  },
  {
    id: "5",
    type: "export",
    icon: Download,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    action: "exported evidence bundle for",
    item: "Q4 Audit",
    user: "Tom Wilson",
    time: "1 day ago",
  },
];

export function RecentActivity() {
  return (
    <section className="bg-gray-50 px-8 py-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Evidence Activity
        </h3>
        
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`w-8 h-8 ${activity.iconBg} rounded-full flex items-center justify-center`}>
                <activity.icon className={`${activity.iconColor} text-sm h-4 w-4`} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  {activity.user && <strong>{activity.user}</strong>} {activity.action}{" "}
                  <em>{activity.item}</em>
                </p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <Button variant="ghost" className="text-primary hover:text-primary/80 text-sm">
            View all activity
          </Button>
        </div>
      </div>
    </section>
  );
}