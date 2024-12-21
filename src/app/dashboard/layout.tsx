import StatusChecker from '@/app/components/StatusChecker'
import UserProfile from '@/app/components/UserProfile'

const DashboardLayout = (
  { children } : Readonly<{ children: React.ReactNode }>
) => (
  <StatusChecker>
    <UserProfile />
    {children}
  </StatusChecker>
)

export default DashboardLayout
