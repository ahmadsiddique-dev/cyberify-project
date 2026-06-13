import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST() {
  const cookieStore = await cookies()
  cookieStore.delete("refreshToken")
  cookieStore.delete("customerRefreshToken")
  return NextResponse.json({ success: true })
}
