// src/app/(protected)/user-access-control/page.tsx
'use client'

import { useState } from 'react'
import { Header } from '@/components/user-access/header'
import { TabNavigation } from '@/components/user-access/tab-navigation'
import { UsersTab } from '@/components/user-access/users-tab'
import { RolesTab } from '@/components/user-access/roles-tab'
import { InviteUserModal } from '@/components/user-access/modals/invite-user-modal'
import { BulkUploadModal } from '@/components/user-access/modals/bulk-upload-modal'
import { UserDrawer } from '@/components/user-access/drawers/user-drawer'

export default function UserAccessControlPage() {
  const [activeTab, setActiveTab] = useState<'users' | 'roles'>('users')
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
  const [isBulkUploadModalOpen, setIsBulkUploadModalOpen] = useState(false)
  const [isUserDrawerOpen, setIsUserDrawerOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

  const handleUserClick = (userId: string) => {
    setSelectedUserId(userId)
    setIsUserDrawerOpen(true)
  }

  return (
    <div className="flex h-screen">
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <TabNavigation 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="flex-1 overflow-auto">
          {activeTab === 'users' ? (
            <UsersTab
              onInviteUser={() => setIsInviteModalOpen(true)}
              onBulkUpload={() => setIsBulkUploadModalOpen(true)}
              onUserClick={handleUserClick}
            />
          ) : (
            <RolesTab />
          )}
        </div>

        <InviteUserModal
          isOpen={isInviteModalOpen}
          onClose={() => setIsInviteModalOpen(false)}
        />

        <BulkUploadModal
          isOpen={isBulkUploadModalOpen}
          onClose={() => setIsBulkUploadModalOpen(false)}
        />

        <UserDrawer
          isOpen={isUserDrawerOpen}
          onClose={() => setIsUserDrawerOpen(false)}
          userId={selectedUserId}
        />
      </main>
    </div>
  )
}