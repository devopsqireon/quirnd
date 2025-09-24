// src/app/(protected)/dashboard/member/page.tsx
"use client";

import { useState } from "react";
import DashboardHeader from "@/components/dashboard/member/DashboardHeader";
import QuickStats from "@/components/dashboard/member/QuickStats";
import MyTasks from "@/components/dashboard/member/MyTasks";
import MyPolicies from "@/components/dashboard/member/MyPolicies";
import MyTraining from "@/components/dashboard/member/MyTraining";
import IncidentReporting from "@/components/dashboard/member/IncidentReporting";
import NotificationsReminders from "@/components/dashboard/member/NotificationsReminders";
import RecentActivity from "@/components/dashboard/member/RecentActivity";
import ComplianceCalendar from "@/components/dashboard/member/ComplianceCalendar";
import QuickActions from "@/components/dashboard/member/QuickActions";
import IncidentReportModal from "@/components/dashboard/member/IncidentReportModal";

export default function MemberDashboardPage() {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const openReportModal = () => setIsReportModalOpen(true);
  const closeReportModal = () => setIsReportModalOpen(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DashboardHeader />
      <QuickStats />
      <MyTasks />
      <MyPolicies />
      <MyTraining />
      <IncidentReporting onOpenReportModal={openReportModal} />
      <NotificationsReminders />
      <RecentActivity />
      <ComplianceCalendar />
      <QuickActions onOpenReportModal={openReportModal} />
      
      <IncidentReportModal 
        isOpen={isReportModalOpen}
        onClose={closeReportModal}
      />
    </div>
  );
}