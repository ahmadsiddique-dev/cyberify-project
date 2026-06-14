import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnection"
import { Ticket } from "@/models/Ticket.model"

export async function PATCH(request: NextRequest) {
  await dbConnect()

  const { id, title, description, priority, status } = await request.json()

  if (!id) {
    return NextResponse.json({ error: "Ticket ID is required." }, { status: 400 })
  }

  const updateFields: any = {}
  if (title !== undefined) updateFields.title = title
  if (description !== undefined) updateFields.description = description
  if (priority !== undefined) updateFields.priority = priority
  if (status !== undefined) updateFields.status = status

  const updatedTicket = await Ticket.findByIdAndUpdate(
    id,
    updateFields,
    { new: true }
  )

  if (!updatedTicket) {
    return NextResponse.json({ error: "Ticket not found." }, { status: 404 })
  }

  return NextResponse.json(
    { message: "Ticket updated successfully.", ticket: updatedTicket },
    { status: 200 }
  )
}
