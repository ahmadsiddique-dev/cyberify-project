import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnection"
import { Ticket } from "@/models/Ticket.model"
import { Message } from "@/models/Message.model"

export async function DELETE(request: NextRequest) {
  await dbConnect()

  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "Ticket ID is required." }, { status: 400 })
  }

  const deletedTicket = await Ticket.findByIdAndDelete(id)

  if (!deletedTicket) {
    return NextResponse.json({ error: "Ticket not found." }, { status: 404 })
  }

  await Message.deleteMany({ ticketId: id })

  return NextResponse.json(
    { message: "Ticket and corresponding messages deleted successfully." },
    { status: 200 }
  )
}
