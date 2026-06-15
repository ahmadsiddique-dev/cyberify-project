import { checkAgentAuth } from "@/lib/auth-check"
import { DashboardHeader } from "@/app/[organization]/(agent)/_components/DashboardHeader"
import { BackgroundBlur } from "@/components/elements/BackgroundBlur"
import Footer from "../_components/Footer"
import { KbUpload } from "./_components/KbUpload"

export type Props = {
  params: Promise<{ organization: string }>
}

export default async function KnowledgeBasePage({ params }: Props) {
  const user = await checkAgentAuth()
  const { organization } = await params

  return (
    <div className="relative flex min-h-screen flex-col bg-background font-sans text-foreground transition-colors duration-300 selection:bg-primary/30">
      <BackgroundBlur />
      <DashboardHeader title="Knowledge Base" user={user} />

      <main className="px-4 py-8 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center gap-8">
        <KbUpload />
      </main>

      <Footer />
    </div>
  )
}
