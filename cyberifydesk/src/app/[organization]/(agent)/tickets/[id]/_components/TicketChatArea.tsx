"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  IconSend,
  IconLoader,
  IconMessageCircle,
  IconUser,
  IconHeadset,
  IconSparkles,
  IconInfoCircle
} from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import { useUserStore } from "@/store/user"
import axios from "axios"

interface MockMessage {
  _id: string
  senderId?: {
    _id: string
    fullName: string
    role: string
  } | null
  senderType: "user" | "agent" | "system"
  message: string
  createdAt: Date
}

interface TicketChatAreaProps {
  ticketId: string
  customerName: string
  ticketTitle: string
  ticketDescription?: string
  ticketCreatedAt: string
  ticketStatus: string
}

export function TicketChatArea({
  ticketId,
  customerName,
  ticketTitle,
  ticketDescription,
  ticketCreatedAt,
  ticketStatus,
}: TicketChatAreaProps) {
  const { user } = useUserStore()
  const [messages, setMessages] = React.useState<MockMessage[]>([])
  const [input, setInput] = React.useState("")
  const [currentStatus, setCurrentStatus] = React.useState(ticketStatus)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  React.useEffect(() => {
    setCurrentStatus(ticketStatus)
  }, [ticketStatus])

  const adjustHeight = React.useCallback(() => {
    const textarea = textareaRef.current
    if (!textarea) return
    textarea.style.height = "auto"
    textarea.style.height = `${Math.min(textarea.scrollHeight, 144)}px`
  }, [])

  React.useEffect(() => {
    adjustHeight()
  }, [input, adjustHeight])

  const fetchMessages = React.useCallback(async () => {
    if (!ticketId) return
    try {
      const res = await axios.get(`/api/hc/tickets/${ticketId}/messages`)
      setMessages(res.data.messages)
      if (res.data.ticketStatus) {
        setCurrentStatus(res.data.ticketStatus)
      }
    } catch (err) {
    }
  }, [ticketId])

  React.useEffect(() => {
    fetchMessages()
    const interval = setInterval(fetchMessages, 3000)
    return () => clearInterval(interval)
  }, [fetchMessages])

  const chatMessages = React.useMemo(() => {
    const firstMsg: MockMessage = {
      _id: "desc-" + ticketId,
      senderType: "user",
      message: ticketDescription || "No description provided.",
      createdAt: new Date(ticketCreatedAt),
    }
    return [firstMsg, ...messages]
  }, [ticketId, ticketDescription, ticketCreatedAt, messages])

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatMessages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || !user?._id) return

    const tempId = Date.now().toString()
    const agentMsg: MockMessage = {
      _id: tempId,
      senderId: {
        _id: user._id,
        fullName: user.fullName,
        role: "agent"
      },
      senderType: "agent",
      message: input.trim(),
      createdAt: new Date(),
    }

    setMessages((prev) => [...prev, agentMsg])
    setInput("")

    try {
      await axios.post(`/api/hc/tickets/${ticketId}/messages`, {
        senderId: user._id,
        senderType: "agent",
        message: agentMsg.message
      })
      fetchMessages()
    } catch (err) {
      setMessages((prev) => prev.filter((m) => m._id !== tempId))
    }
  }

  const handleToggleStatus = async () => {
    const nextStatus = currentStatus === "close" ? "open" : "close"
    try {
      await axios.patch("/api/hc/update-ticket", {
        id: ticketId,
        status: nextStatus,
      })
      setCurrentStatus(nextStatus)
      fetchMessages()
    } catch (err) {
    }
  }

  return (
    <div className="flex flex-col h-137.5 rounded-2xl border border-border/40 bg-card/30 shadow-xl backdrop-blur-md overflow-hidden">
      <div className="px-5 py-3.5 border-b border-border/40 bg-linear-to-r from-orange-600/5 to-amber-500/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <IconMessageCircle className="size-4.5 text-orange-500" />
          <span className="text-xs font-bold text-foreground">Chat</span>
        </div>
        <span className={cn(
          "text-xs font-bold capitalize",
          currentStatus === "open"
            ? "text-rose-500"
            : currentStatus === "pending"
            ? "text-blue-500"
            : "text-emerald-500"
        )}>{currentStatus}</span>
      </div>

      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 relative [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-foreground/10 [&::-webkit-scrollbar-thumb]:rounded-full">
        {chatMessages.map((msg) => {
          if (msg.senderType === "system") {
            return (
              <div
                key={msg._id}
                className="self-center my-2 text-[10px] text-muted-foreground/80 bg-muted/30 px-3 py-1.5 rounded-full border border-border/20"
              >
                {msg.message}
              </div>
            )
          }
          const isAgent = msg.senderType === "agent"
          return (
            <div
              key={msg._id}
              className={cn(
                "flex flex-col max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-xs z-10",
                isAgent
                  ? "self-end bg-orange-600/90 text-white rounded-tr-none"
                  : "self-start bg-muted/80 text-foreground border border-border/40 rounded-tl-none"
              )}
            >
              <div className="flex items-center gap-1.5 mb-1 text-[10px] opacity-75 font-semibold">
                {isAgent ? (
                  <>
                    <IconHeadset className="size-3" />
                    <span>{msg.senderId?.fullName ? (msg.senderId._id === user._id ? "You (Agent)" : msg.senderId.fullName) : "You (Agent)"}</span>
                  </>
                ) : (
                  <>
                    <IconUser className="size-3 text-orange-500" />
                    <span className="text-orange-500">{msg.senderId?.fullName || customerName}</span>
                  </>
                )}
              </div>
              <span className="whitespace-pre-wrap wrap-break-word">{msg.message}</span>
              <span className="text-[9px] mt-1.5 self-end opacity-60 font-mono">
                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSendMessage}
        className="p-4 border-t border-border/40 bg-card/40 flex items-end gap-3"
      >
        <textarea
          ref={textareaRef}
          value={input}
          disabled={currentStatus === "close"}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              handleSendMessage(e)
            }
          }}
          rows={1}
          placeholder={currentStatus === "close" ? "This ticket is closed." : `Reply to ${customerName}...`}
          className="flex-1 px-4 py-2.5 rounded-xl border border-border/40 bg-background/50 text-xs focus:outline-hidden focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all placeholder:text-muted-foreground/60 resize-none max-h-36 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-foreground/10 [&::-webkit-scrollbar-thumb]:rounded-full disabled:opacity-50 disabled:bg-muted/10"
        />
        <Button
          type="button"
          onClick={handleToggleStatus}
          className={cn(
            "h-9 rounded-xl px-4 text-xs font-bold transition-all border shrink-0",
            currentStatus === "close"
              ? "border-red-500/30 bg-red-500/10 text-red-500 hover:bg-red-500/20"
              : "border-green-500/30 bg-green-500/10 text-green-500 hover:bg-green-500/20"
          )}
        >
          {currentStatus === "close" ? "Open" : "Close"}
        </Button>
        <Button
          type="submit"
          size="icon"
          disabled={!input.trim() || currentStatus === "close"}
          className="size-9 rounded-xl bg-linear-to-r from-orange-600 to-amber-500 text-white hover:from-orange-500 hover:to-amber-400 hover:scale-105 active:scale-95 transition-all shadow-md shadow-orange-500/10 disabled:opacity-50 disabled:scale-100 disabled:pointer-events-none shrink-0"
        >
          <IconSend className="size-4" />
        </Button>
      </form>
    </div>
  )
}
