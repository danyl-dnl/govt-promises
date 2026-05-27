import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

const KV_REST_API_URL = process.env.KV_REST_API_URL
const KV_REST_API_TOKEN = process.env.KV_REST_API_TOKEN

// Helper to fetch submissions from Vercel KV
async function getKVSubmissions(): Promise<any[]> {
  if (!KV_REST_API_URL || !KV_REST_API_TOKEN) {
    throw new Error("Vercel KV is not configured on the Vercel Dashboard.")
  }

  const res = await fetch(`${KV_REST_API_URL}/get/submissions`, {
    headers: {
      Authorization: `Bearer ${KV_REST_API_TOKEN}`,
    },
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error(`Vercel KV read failed: ${res.statusText}`)
  }

  const data = await res.json()
  const val = data.result
  if (!val) return []
  return typeof val === "string" ? JSON.parse(val) : val
}

// Helper to write submissions back to Vercel KV
async function saveKVSubmissions(submissions: any[]): Promise<void> {
  if (!KV_REST_API_URL || !KV_REST_API_TOKEN) {
    throw new Error("Vercel KV is not configured on the Vercel Dashboard.")
  }

  const res = await fetch(`${KV_REST_API_URL}/set/submissions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${KV_REST_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(submissions),
  })

  if (!res.ok) {
    throw new Error(`Vercel KV write failed: ${res.statusText}`)
  }
}

// Helper function to check if the session user is an authorized admin
function isAdmin(email?: string | null): boolean {
  if (!email) return false
  const adminEmailsEnv = process.env.ADMIN_EMAILS || ""
  const adminEmails = adminEmailsEnv
    .split(",")
    .map((e) => e.trim().toLowerCase())
  return adminEmails.includes(email.toLowerCase())
}

// 1. GET - Fetch all submissions (Admin Only)
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user || !isAdmin(session.user.email)) {
      return NextResponse.json(
        { error: "Access Denied: You are not authorized to view this page." },
        { status: 403 }
      )
    }

    const submissions = await getKVSubmissions()

    // Sort submissions newest first
    submissions.sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    return NextResponse.json({ success: true, submissions })
  } catch (error: any) {
    console.error("Admin Submissions GET Error:", error)
    return NextResponse.json(
      { error: `Internal Server Error: ${error?.message || error}` },
      { status: 500 }
    )
  }
}

// 2. PATCH - Update submission status (Admin Only)
export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user || !isAdmin(session.user.email)) {
      return NextResponse.json(
        { error: "Access Denied: You are not authorized to perform this action." },
        { status: 403 }
      )
    }

    // Parse request body
    const body = await req.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json(
        { error: "Missing required fields: id and status." },
        { status: 400 }
      )
    }

    const allowedStatuses = ["pending", "approved", "rejected"]
    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Allowed values are pending, approved, or rejected." },
        { status: 400 }
      )
    }

    const submissions = await getKVSubmissions()

    // Find and update target submission
    const index = submissions.findIndex((sub: any) => sub.id === id)
    if (index === -1) {
      return NextResponse.json(
        { error: "Submission not found with the provided ID." },
        { status: 404 }
      )
    }

    submissions[index].status = status
    submissions[index].lastUpdatedBy = session.user.email
    submissions[index].lastUpdatedAt = new Date().toISOString()

    // Write back to Vercel KV
    await saveKVSubmissions(submissions)

    return NextResponse.json({
      success: true,
      submission: submissions[index],
    })
  } catch (error: any) {
    console.error("Admin Submissions PATCH Error:", error)
    return NextResponse.json(
      { error: `Internal Server Error: ${error?.message || error}` },
      { status: 500 }
    )
  }
}
