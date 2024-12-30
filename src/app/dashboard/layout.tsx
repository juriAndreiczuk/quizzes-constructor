import StatusChecker from '@/app/components/shared/StatusChecker'
import PageHeader from '@/app/components/layout/PageHeader'
import UserProfile from '@/app/components/shared/UserProfile'

const DashboardLayout = (
  { children } : Readonly<{ children: React.ReactNode }>
) => (
  <StatusChecker>
    <PageHeader>
      <UserProfile />
    </PageHeader>
    {children}
  </StatusChecker>
)

export default DashboardLayout
