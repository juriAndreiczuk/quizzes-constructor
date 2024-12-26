import StatusChecker from '@/app/components/shared/StatusChecker'
import UserProfile from '@/app/components/shared/UserProfile'

const DashboardLayout = (
  { children } : Readonly<{ children: React.ReactNode }>
) => (
  <StatusChecker>
    <UserProfile />
    {children}
  </StatusChecker>
)

export default DashboardLayout
