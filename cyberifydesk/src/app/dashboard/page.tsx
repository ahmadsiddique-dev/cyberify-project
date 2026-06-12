import { AuthLayout } from "@/components/elements/AuthLayout"
import { DashboardCard } from "@/components/elements/DashboardCard"

export default function Page() {
  return (
    <AuthLayout backLink="/" backText="Back to Home">
      <DashboardCard />
    </AuthLayout>
  )
}
