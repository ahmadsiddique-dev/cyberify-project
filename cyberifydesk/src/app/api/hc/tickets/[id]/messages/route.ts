import { NextRequest } from "next/server"
import dbConnect from "@/lib/dbConnection"
import { Message } from "@/models/Message.model"
import { User } from "@/models/User.model"
import { Ticket } from "@/models/Ticket.model"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect()
  const { id } = await params
  
  const messages = await Message.find({ ticketId: id })
    .populate("senderId", "fullName role")
    .sort({ createdAt: 1 })
  
  const ticket = await Ticket.findById(id).select("status")
  const ticketStatus = ticket ? ticket.status : null
  
  return Response.json({ messages, ticketStatus }, { status: 200 })
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect()
  const { id } = await params
  
  const body = await request.json()
  const { senderId, senderType, message } = body
  
  if (!senderType || !message) {
    return Response.json({ error: "Missing required fields" }, { status: 400 })
  }
  
  const newMessage = await Message.create({
    ticketId: id,
    senderId: senderId || null,
    senderType,
    message,
  })
  
  const populatedMessage = await Message.findById(newMessage._id).populate("senderId", "fullName role")
  
  if (senderType === "agent") {
    await Ticket.findOneAndUpdate(
      { _id: id, status: "open" },
      { status: "pending", updatedAt: new Date() }
    )
  } else {
    await Ticket.findByIdAndUpdate(id, { updatedAt: new Date() })
  }
  
  return Response.json({ message: "Message sent", data: populatedMessage }, { status: 201 })
}
