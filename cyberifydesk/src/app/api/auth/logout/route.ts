import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const isCustomer = request.headers.get("x-role") === "customer"
  const cookieName = isCustomer ? "customerRefreshToken" : "refreshToken"
  const cookieStore = await cookies()
  cookieStore.delete(cookieName)
  return NextResponse.json({ success: true })
}
