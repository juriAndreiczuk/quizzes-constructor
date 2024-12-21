import StatusChecker from '@/app/components/StatusChecker'
import UserProfile from '@/app/components/UserProfile'

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
