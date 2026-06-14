import dbConnect from "@/lib/dbConnection"
import { Ticket } from "@/models/Ticket.model"

export async function fetchSingleTicket(ticketId: string, organizationId: string) {
  await dbConnect()

  const ticket = await Ticket.findOne({
    _id: ticketId,
    organization: organizationId
  })
  .populate("customer", "fullName email")
  .lean()

  if (!ticket) return null

  return JSON.parse(JSON.stringify({
    ...ticket,
    customer: (ticket.customer as any)?.fullName || "Unknown Customer",
    customerEmail: (ticket.customer as any)?.email || ""
  }))
}
