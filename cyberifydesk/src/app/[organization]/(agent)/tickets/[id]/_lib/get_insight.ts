import dbConnect from "@/lib/dbConnection"
import { Ticket } from "@/models/Ticket.model"

export async function fetchInsight(ticketId: string, organizationId: string) {
  await dbConnect()

  const insight = await Ticket.findOne(
    {
      _id: ticketId,
      organization: organizationId,
    },
    {
      _id: 0,
      summary: 1,
      rootCause: 1,
      solution: 1,
    }
  )
  .lean()

  if (!insight) return null

  return insight;
}
