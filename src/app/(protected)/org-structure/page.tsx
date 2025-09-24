// src/app/(protected)/organization-structure/page.tsx
"use client"

import { useState } from 'react'
import { Header } from './components/Header'
import { TabNavigation } from './components/TabNavigation'
import { DirectoryView } from './components/DirectoryView'
import { HierarchyView } from './components/HierarchyView'
import { UserStats } from './components/UserStats'
import { RoleAnalytics } from './components/RoleAnalytics'
import { ComplianceTraining } from './components/ComplianceTraining'
import { ActivityFeed } from './components/ActivityFeed'
import { SystemHealth } from './components/SystemHealth'
import { UserProfileDrawer } from './components/UserProfileDrawer'
import { InviteUserModal } from './components/InviteUserModal'

export default function OrganizationStructurePage() {
  const [activeTab, setActiveTab] = useState<'directory' | 'hierarchy'>('directory')
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false)
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onInviteUser={() => setIsInviteModalOpen(true)} />
      
      <TabNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />

      {activeTab === 'directory' ? (
        <>
          <DirectoryView onUserSelect={(user) => {
            setSelectedUser(user)
            setIsProfileDrawerOpen(true)
          }} />
          <UserStats />
          <RoleAnalytics />
          <ComplianceTraining />
          <ActivityFeed />
          <SystemHealth />
        </>
      ) : (
        <HierarchyView onUserSelect={(user) => {
          setSelectedUser(user)
          setIsProfileDrawerOpen(true)
        }} />
      )}

      <UserProfileDrawer 
        isOpen={isProfileDrawerOpen}
        onClose={() => setIsProfileDrawerOpen(false)}
        user={selectedUser}
      />

      <InviteUserModal 
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      />
    </div>
  )
}