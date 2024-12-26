import StatusChecker from '@/app/components/shared/StatusChecker'
import UserProfile from '@/app/components/shared/UserProfile'

const AdminLayout = (
  { children } : Readonly<{ children: React.ReactNode }>
) => (
  <div key="dashboard-layout">
    <StatusChecker>
      <UserProfile />
      {children}
    </StatusChecker>
  </div>
)

export default AdminLayout
