import StatusChecker from '@/app/components/shared/StatusChecker'
import UserProfile from '@/app/components/shared/UserProfile'
import PageHeader from '@/app/components/layout/PageHeader'

const AdminLayout = (
  { children } : Readonly<{ children: React.ReactNode }>
) => (
  <div key="dashboard-layout">
    <StatusChecker>
      <PageHeader>
        <UserProfile />
      </PageHeader>
      {children}
    </StatusChecker>
  </div>
)

export default AdminLayout
